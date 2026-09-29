/* Development-only. Requires Playwright and axe-core; never submits a live enquiry. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium, webkit } = require('playwright');
const browserName = process.env.QA_BROWSER || 'chromium';
const output = process.env.QA_OUTPUT || '/tmp/alpine-office-qa';
const origin = process.env.QA_URL || 'http://127.0.0.1:8000';
assert(['127.0.0.1', 'localhost', '[::1]'].includes(new URL(origin).hostname), 'QA_URL must be a local test server');
const axePath = process.env.QA_AXE_PATH || require.resolve('axe-core/axe.min.js');
const report = { browser: browserName, viewports: [], checks: [], violations: [] };
fs.mkdirSync(output, { recursive: true });
const launch = browserName === 'webkit' ? {} : { args: ['--no-sandbox'], ...(process.env.QA_CHROME_PATH ? { executablePath: process.env.QA_CHROME_PATH } : {}) };
async function ready(page) {
  await page.goto(origin);
  await page.evaluate(() => document.fonts.ready);
}
async function scan(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(950);
}
async function fill(page) {
  await page.locator('[name=firstName]').fill('Preview');
  await page.locator('[name=lastName]').fill('Test');
  await page.locator('[name=email]').fill('preview@example.invalid');
  await page.locator('[name=clientType]').selectOption({ label: 'Private client or family' });
  await page.locator('[name=note]').fill('Synthetic local QA. No client data.');
  await page.locator('[name=consent]').check();
}
(async () => {
  const browser = await (browserName === 'webkit' ? webkit : chromium).launch(launch);
  try {
    for (const width of [320, 390, 430, 768, 1440, 1728]) {
      const page = await browser.newPage({ viewport: { width, height: width > 700 ? 900 : 844 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await ready(page); await scan(page);
      const metrics = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.body.scrollHeight,
        headings: [...document.querySelectorAll('h1,h2,h3')].map(el => ({ text: el.textContent, left: el.getBoundingClientRect().left, right: el.getBoundingClientRect().right })),
        images: [...document.images].filter(img => img.getBoundingClientRect().height > 0).map(img => ({ src: img.currentSrc, complete: img.complete, decoded: img.naturalWidth > 0 })),
        fonts: [...document.fonts].map(font => ({ family: font.family, status: font.status }))
      }));
      assert.equal(metrics.scrollWidth, width, 'Horizontal overflow at ' + width);
      assert(metrics.headings.every(h => h.left >= -1 && h.right <= width + 1), 'Heading overflow at ' + width);
      assert(metrics.images.every(img => img.complete && img.decoded), 'Undecoded image at ' + width + ': ' + JSON.stringify(metrics.images.filter(img => !img.complete || !img.decoded)));
      assert(metrics.fonts.every(font => font.status === 'loaded'), 'Missing webfont at ' + width);
      assert.equal(errors.length, 0, 'JavaScript error at ' + width);
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ type: 'jpeg', quality: 86, path: path.join(output, browserName + '-' + width + '.jpg'), fullPage: true });
      await page.screenshot({ type: 'jpeg', quality: 86, path: path.join(output, browserName + '-' + width + '-hero.jpg') });
      await page.addScriptTag({ path: axePath });
      const axe = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
      report.violations.push(...axe.violations.map(v => ({ width, id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })));
      report.viewports.push({ width, height: metrics.height, errors });
      await page.close();
    }
    assert.equal(report.violations.length, 0, 'Accessibility violations: ' + JSON.stringify(report.violations));
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const requests = [];
    page.on('request', r => { if (r.method() === 'POST') requests.push(r.url()); });
    await ready(page);
    assert.equal(await page.locator('[data-enquiry]').getAttribute('data-endpoint'), null, 'Preview QA requires delivery to be disabled');
    await page.locator('.nav-enquire').click();
    assert(await page.locator('dialog').evaluate(el => el.open));
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press('Tab');
      assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), 'Focus escaped dialog');
    }
    await page.locator('[data-submit]').click();
    assert.equal(await page.locator('[data-form-status]').textContent(), '', 'Invalid form accepted');
    await fill(page);
    await page.locator('[data-submit]').click();
    assert.match(await page.locator('[data-form-status]').textContent(), /No enquiry has been submitted/);
    assert.equal(requests.length, 0, 'Preview sent a request');
    await page.screenshot({ type: 'jpeg', quality: 86, path: path.join(output, browserName + '-dialog.jpg') });
    await page.addScriptTag({ path: axePath });
    const dialogAxe = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
    assert.equal(dialogAxe.violations.length, 0, 'Dialog accessibility violations');
    await page.keyboard.press('Escape');
    assert(await page.locator('.nav-enquire').evaluate(el => el === document.activeElement), 'Focus did not return');
    await page.locator('.nav-enquire').click();
    assert.equal(await page.locator('[name=firstName]').inputValue(), 'Preview');
    await page.mouse.click(10, 300);
    assert.equal(await page.locator('dialog').evaluate(el => el.open), false, 'Backdrop did not close');
    report.checks.push('Dialog validation, focus containment, Escape, focus return, backdrop, input retention and zero preview POSTs');
    await page.evaluate(() => scrollTo({ top: 180, behavior: 'instant' }));
    await page.waitForTimeout(700);
    assert(await page.locator('[data-header]').evaluate(el => el.classList.contains('is-solid')), 'Masthead unreadable on ivory frame');
    const inset = await page.locator('.arrival-frame').evaluate(el => parseFloat(getComputedStyle(el).left));
    assert(inset > 0 && inset < 1440 * .035 + 1, 'Hero frame did not follow scroll');
    assert(await page.locator('h1').evaluate(el => +getComputedStyle(el).opacity > .99), 'Hero text disappeared while scrolling');
    await scan(page);
    assert(await page.locator('[data-reveal]').evaluateAll(els => els.every(el => +getComputedStyle(el).opacity > .99)), 'Copy stranded by motion');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert(await page.locator('[data-reveal]').evaluateAll(els => els.every(el => +getComputedStyle(el).opacity > .99)));
    assert.equal(await page.locator('.arrival-frame').evaluate(el => parseFloat(getComputedStyle(el).left)), 0, 'Reduced-motion frame not reset');
    assert.equal(await page.locator('video').count(), 0, 'Generated film remains visible');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'no-preference' }); await ready(page);
    await page.locator('.place').scrollIntoViewIfNeeded();
    assert(await page.locator('[data-reveal]').evaluateAll(els => els.every(el => +getComputedStyle(el).opacity > .99)), 'Mobile copy hidden by motion');
    assert.equal(await page.locator('.arrival-stage').evaluate(el => getComputedStyle(el).position), 'relative', 'Mobile pinned scene remains');
    await page.setViewportSize({ width: 768, height: 900 }); await scan(page);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 768);
    await page.locator('.countries details').nth(1).locator('summary').click();
    assert(await page.locator('.countries details').nth(1).evaluate(el => el.open));
    report.checks.push('Opening frame, readable masthead, visible hero, scroll reveals, live reduced motion, resize, unpinned mobile and country disclosures');
    await page.close();
    for (const accepted of [true, false]) {
      const live = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8').replace('<form data-enquiry', '<form data-endpoint="https://qa.invalid/introduction" data-enquiry');
      await live.route(origin + '/', route => route.fulfill({ contentType: 'text/html', body: html }));
      let posts = 0;
      await live.route('https://qa.invalid/introduction', async route => {
        posts++; await new Promise(resolve => setTimeout(resolve, 250));
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ accepted }) });
      });
      await ready(live); await live.locator('.nav-enquire').click(); await fill(live);
      await live.locator('form').evaluate(el => { el.requestSubmit(); el.requestSubmit(); });
      await live.waitForFunction(() => document.querySelector('[data-submit]').disabled === false && document.querySelector('[data-form-status]').textContent);
      assert.equal(posts, 1, 'Duplicate submission');
      if (accepted) {
        assert.match(await live.locator('[data-form-status]').textContent(), /has been received/);
        assert.equal(await live.locator('[name=firstName]').inputValue(), '');
      } else {
        assert.match(await live.locator('[data-form-status]').textContent(), /could not confirm delivery/);
        assert.equal(await live.locator('[name=firstName]').inputValue(), 'Preview');
      }
      await live.close();
    }
    report.checks.push('Locally intercepted delivery acceptance/rejection, input retention and duplicate prevention');
    for (const jsDisabled of [true, false]) {
      const fallback = await browser.newPage({ javaScriptEnabled: !jsDisabled, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
      if (!jsDisabled) await fallback.route('**/vendor/**', route => route.abort());
      await ready(fallback); await scan(fallback);
      assert(await fallback.locator('h1').isVisible());
      assert(await fallback.locator('#office-title').isVisible());
      assert.equal(await fallback.evaluate(() => document.documentElement.scrollWidth), 390);
      if (!jsDisabled) { await fallback.locator('.nav-enquire').click(); assert(await fallback.locator('dialog').evaluate(el => el.open)); }
      await fallback.close();
    }
    report.checks.push('Readable no-JavaScript and animation-library failure fallbacks');
    fs.writeFileSync(path.join(output, browserName + '-report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } catch (error) {
    fs.writeFileSync(path.join(output, browserName + '-report.json'), JSON.stringify({ ...report, failure: error.message }, null, 2));
    throw error;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
