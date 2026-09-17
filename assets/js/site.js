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

  // Navigation changes only after the opening scene has passed.
  const header = $('[data-header]');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => header.classList.toggle('is-solid', !entry.isIntersecting), {
      rootMargin: '-80px 0px 0px 0px'
    }).observe($('.arrival'));
  } else {
    header.classList.add('is-solid');
  }

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
    syncFilm();
  }
  $$('[data-apply]').forEach(link => link.addEventListener('click', openEnquiry));
  $('[data-close]').addEventListener('click', () => dialog.close());
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
    syncFilm();
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

  // No video request until the scene is close. Mobile is explicitly opt-in.
  const video = $('[data-video]');
  const filmButton = $('[data-film]');
  const filmLabel = $('[data-film-label]');
  const filmIcon = $('[data-film-icon]');
  let filmVisible = false;
  let filmIntent = null; // null = automatic desktop policy; false = visitor paused.
  let filmLoaded = false;
  function updateFilmButton() {
    const playing = !video.paused && !video.ended;
    filmLabel.textContent = playing ? 'Pause film' : 'Play film';
    filmIcon.textContent = playing ? 'Ⅱ' : '▷';
    filmButton.setAttribute('aria-label', playing ? 'Pause chalet film' : 'Play chalet film');
  }
  function syncFilm() {
    const allowed = !reduced.matches && !document.hidden && !dialog.open && filmVisible;
    const requested = filmIntent === true || (filmIntent === null && !mobile.matches && !saveData);
    if (!allowed || !requested) { video.pause(); return; }
    if (!filmLoaded) { video.src = video.dataset.src; video.load(); filmLoaded = true; }
    video.play().catch(() => { video.classList.remove('is-playing'); updateFilmButton(); });
  }
  video.addEventListener('playing', () => { video.classList.add('is-playing'); updateFilmButton(); });
  video.addEventListener('pause', updateFilmButton);
  video.addEventListener('error', () => {
    video.classList.remove('is-playing'); filmIntent = false;
    filmLabel.textContent = 'Film unavailable'; filmButton.disabled = true;
  });
  filmButton.addEventListener('click', () => {
    filmIntent = video.paused;
    syncFilm();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { filmVisible = entry.isIntersecting; syncFilm(); }, { threshold: .15 }).observe($('.place'));
  } else {
    filmVisible = true; filmIntent = false;
  }
  document.addEventListener('visibilitychange', syncFilm);
  reduced.addEventListener('change', syncFilm);
  mobile.addEventListener('change', syncFilm);

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
    if (desktop) {
      const arrival = gsap.timeline({ scrollTrigger: { trigger: '.arrival', start: 'top top', end: 'bottom top', scrub: .65 } });
      arrival.to('.arrival-image', { scale: 1.045, yPercent: 3, ease: 'none' }, 0)
        .to('.arrival-copy', { yPercent: -14, opacity: .08, ease: 'none' }, 0)
        .to('.arrival-shade', { opacity: .7, ease: 'none' }, 0);
    }
    const perspective = gsap.timeline({ scrollTrigger: {
      trigger: '.possibility', start: 'top top', end: 'bottom bottom', scrub: desktop ? .65 : .25,
      invalidateOnRefresh: true
    }});
    perspective.fromTo('.possibility-copy h2 em', { scale: .92 }, { scale: 1, duration: .35, ease: 'none' }, 0)
      .to('.image-one', { yPercent: desktop ? -28 : -8, opacity: 0, scale: .88, duration: .55, ease: 'power1.inOut' }, .12)
      .to('.image-three', { yPercent: desktop ? 30 : 8, opacity: 0, scale: .88, duration: .5, ease: 'power1.inOut' }, .24)
      .to('.image-two', { yPercent: desktop ? -22 : -5, opacity: 0, scale: .92, duration: .48, ease: 'power1.inOut' }, .34)
      .to('.image-four', { yPercent: desktop ? 20 : 5, opacity: 0, scale: .95, duration: .45, ease: 'power1.inOut' }, .42)
      .to('.possibility-copy', { opacity: 0, y: -25, duration: .2, ease: 'none' }, .83);
    $$('[data-reveal]').forEach(element => {
      gsap.fromTo(element, { y: desktop ? 26 : 14, opacity: 0 }, { y: 0, opacity: 1, duration: .85, ease: 'power2.out', scrollTrigger: {
        trigger: element, start: 'top 94%', once: true
      }});
    });
    if (desktop) {
      $$('.image-reveal').forEach(element => {
        gsap.fromTo(element, { clipPath: 'inset(7% 0% 7% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: {
          trigger: element, start: 'top 95%', end: 'top 35%', scrub: .6
        }});
      });
    }
    ScrollTrigger.refresh();
    return () => { document.documentElement.classList.remove('motion-enabled'); };
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
