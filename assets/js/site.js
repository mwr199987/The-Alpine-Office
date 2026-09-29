/* The Alpine Office. Native document scrolling, progressively enhanced. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 700px)');
  const connection = navigator.connection;
  const saveData = Boolean(connection?.saveData);
  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // The masthead becomes paper as the opening photograph acquires its frame.
  const header = $('[data-header]');
  let headerPending = false;
  function updateHeader() {
    header.classList.toggle('is-solid', window.scrollY > 64);
    headerPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!headerPending) { headerPending = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  updateHeader();

  // A native dialog provides Escape, focus containment and inert background.
  const dialog = $('#enquiry');
  const form = $('[data-enquiry]');
  const status = $('[data-form-status]');
  const submit = $('[data-submit]');
  let opener = null;
  let sending = false;
  let closePointerStartedOutside = false;
  const endpoint = form.dataset.endpoint || ''; // Configure a verified HTTPS delivery endpoint before production.
  const isLive = /^https:\/\//.test(endpoint) && !endpoint.includes('example.');
  if (isLive) {
    submit.innerHTML = 'Send introduction <span aria-hidden="true">↗</span>';
    $('[data-preview-note]').textContent = 'Your details will only be used to respond to this enquiry.';
  }
  function openEnquiry(event) {
    event?.preventDefault();
    opener = event?.currentTarget || document.activeElement;
    dialog.showModal();
    document.body.classList.add('locked');
    $('[data-close]').focus({ preventScroll: true });
  }
  $$('[data-apply]').forEach(link => link.addEventListener('click', openEnquiry));
  $('[data-close]').addEventListener('click', () => dialog.close());
  // Keep the keyboard cycle predictable across native-dialog implementations.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = $$('button, input, select, textarea, a[href]', dialog)
      .filter(control => !control.disabled && control.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('pointerdown', event => {
    const rect = dialog.getBoundingClientRect();
    closePointerStartedOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && closePointerStartedOutside) dialog.close();
    closePointerStartedOutside = false;
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('locked');
    opener?.focus({ preventScroll: true });
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    status.classList.remove('is-error');
    if (!form.reportValidity()) return;
    if (!isLive) {
      status.textContent = 'Your introduction is ready to review. This preview does not send or save your details. No enquiry has been submitted.';
      status.scrollIntoView({ block: 'nearest', behavior: reduced.matches ? 'instant' : 'smooth' });
      return;
    }
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    status.textContent = '';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const payload = Object.fromEntries(new FormData(form));
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal, credentials: 'omit'
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true) throw new Error('Not accepted');
      status.textContent = 'Thank you. Your introduction has been received. We will be in touch personally.';
      form.reset();
    } catch {
      status.classList.add('is-error');
      status.textContent = 'We could not confirm delivery. Your details remain here. Please try again.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      submit.innerHTML = 'Send introduction <span aria-hidden="true">↗</span>';
    }
  });

  // Progressive enhancement: failure to load either library leaves a complete page.
  if (!window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 701px)', mobile: '(max-width: 700px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
    if (context.conditions.reduce) return;
    const desktop = context.conditions.desktop;
    document.documentElement.classList.add('motion-enabled');
    // One opening gesture: the photograph settles into an ivory frame.
    // The page keeps its native scroll position and text never disappears on scroll.
    if (desktop) {
      gsap.fromTo('.arrival-copy > *', { y: 18, opacity: 0 }, {
        y: 0, opacity: 1, stagger: .12, duration: 1.1, ease: 'power2.out'
      });
      gsap.to('.arrival-frame', { '--frame': '3.5vw', ease: 'none', scrollTrigger: {
        trigger: '.arrival', start: 'top top', end: 'bottom bottom', scrub: .45
      }});
      gsap.fromTo('.arrival-image img', { scale: 1.045 }, { scale: 1, ease: 'none', scrollTrigger: {
        trigger: '.arrival', start: 'top top', end: 'bottom bottom', scrub: .45
      }});
      $$('[data-reveal]').forEach(element => {
        gsap.fromTo(element, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power2.out', scrollTrigger: {
          trigger: element, start: 'top 94%', once: true
        }});
      });
      $$('.image-reveal').forEach(element => {
        const image = $('img', element);
        gsap.fromTo(image, { scale: 1.035 }, { scale: 1, ease: 'none', scrollTrigger: {
          trigger: element, start: 'top bottom', end: 'bottom top', scrub: .6
        }});
      });
    }
    ScrollTrigger.refresh();
    return () => { document.documentElement.classList.remove('motion-enabled'); };
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
