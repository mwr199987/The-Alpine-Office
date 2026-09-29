# Current review status: second refinement, 29 September 2026

Branch: `refine/luxury-brand-2026-09`. Production baseline: `c36cdd32c6c65acae9d739ac44f7f951ddc15e1d`. This review supersedes the first refinement's screenshots and motion/media checks.

## Completed

- Five real photographic placeholders, source pages and licence checks, responsive WebP derivatives and a portrait hero crop.
- A centred opening, one photographic frame transition, a combined introduction and varied editorial proportions.
- Removal of the fading collage, separate reduction screen and generated film. All visible travel photography is real; inactive inherited/generated imagery is excluded from upload.
- Existing self-hosted typography, founder, Office note, service explanation and native enquiry handling retained.
- Visual inspection of complete desktop/mobile compositions, the hero, details, founder, Office, closing and actual opening transition.

## Executed browser checks

Chrome and Playwright's headless Linux WebKit passed the same run:

| Width | Horizontal/heading overflow | Images/fonts | JS errors observed | Automated WCAG 2 A/AA and 2.1 AA checks |
| --- | --- | --- | --- | --- |
| 320 px | None | Loaded | None | No violations |
| 390 px | None | Loaded | None | No violations |
| 430 px | None | Loaded | None | No violations |
| 768 px | None | Loaded | None | No violations |
| 1440 px | None | Loaded | None | No violations |
| 1728 px | None | Loaded | None | No violations |

Both engines passed:
- Native dialogue validation, forward Tab containment, Escape, focus return, backdrop dismissal and input retention.
- Open-dialogue automated accessibility checks and zero preview POSTs.
- Actual scroll-driven hero frame progression, masthead contrast state and visible hero copy.
- Desktop reveals completing, live reduced-motion changes resetting the frame and keeping copy visible.
- Ordinary unpinned mobile layout, continuously visible mobile copy and resize without overflow.
- Native country disclosures.
- Locally intercepted delivery acceptance/rejection, retained fields on rejected delivery and duplicate prevention. Strict `accepted: true` remains required.
- Readable no-JavaScript and animation-library-failure fallbacks.

No real enquiry was sent. Delivery tests use synthetic data and a reserved .invalid URL intercepted locally. Viewport screenshots use reduced motion for deterministic visual inspection; separate checks exercise normal motion and preference changes. WebKit ran using the temporary Linux shared-library bundle and its headless engine; graphical host-library preflight was bypassed, but the full browser checks were executed. This is not physical Safari or a claim of full WCAG conformance.

Reports: [Chrome](review/chromium-report.json), [WebKit](review/webkit-report.json). Screenshots: [desktop hero](review/desktop-hero.jpg), [desktop transition](review/desktop-transition.jpg), [full desktop page](review/desktop-page.jpg), [mobile hero](review/mobile-hero.jpg). `scripts/qa-homepage.cjs` is restricted to a local test server and requires preview delivery to be disabled.

Static checks passed: JavaScript syntax, diff whitespace, local paths/srcsets, fragment targets, unique IDs and one H1. No new framework or production service was added.

## Before production

1. Marcus's visual approval of the scrolling and composition.
2. Physical iPhone/Safari review, including address-bar changes, real scroll feel and connection conditions.
3. Decide final commissioned photography. The current stock placeholders have documented source/licence checks; they illustrate atmosphere, not available inventory. Prefer property-specific rights and permissions for eventual offered-property imagery.
4. Supply the delivery destination and privacy information, then verify real durable enquiry delivery to the intended inbox/CRM. This preview still has no live endpoint.
5. Measure deployed mobile performance if needed. No Lighthouse score is claimed.

No main write, merge, production Worker promotion, domain change or hosting migration was performed. Draft PR review and Cloudflare version previews do not constitute production approval.
