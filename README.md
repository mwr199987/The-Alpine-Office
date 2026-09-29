# The Alpine Office

A static, cinematic homepage. No application framework or build step is required.

## Review locally

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. The page, imagery, typefaces, motion libraries and silent film are all self-hosted. The complete page remains readable when JavaScript is disabled. Reduced-motion preference removes scroll choreography and autoplay.

## Production and staging

The current refinement lives on `refine/luxury-brand-2026-09`, built from the existing `redesign/cinematic-homepage` draft. The production baseline is `c36cdd32c6c65acae9d739ac44f7f951ddc15e1d`.

The existing GitHub integration uses **Cloudflare Workers Builds**, worker `muddy-sun-e521`. The confirmed review-branch settings are root `/`, build command `exit 0`, and deploy command `npx wrangler versions upload`. Preserve these settings: version upload creates a review version without promoting it to production.

`wrangler.jsonc` declares the static asset directory and enables version preview URLs. `.assetsignore` allows only `index.html` and `assets/` to be uploaded, excluding Git metadata, configuration and review documentation. No Worker script or application build step is needed. The preview URL is reported in the successful Cloudflare build output; do not guess it. Keep the redesign on this branch until browser review and enquiry delivery checks are complete.

To recover the former homepage, revert the redesign commit/PR. The original files and images remain in Git history.

## Enquiry delivery

The previous form was a non-delivering visual preview. This redesign keeps that limitation explicit and does not display a false delivery confirmation.

To enable delivery, add `data-endpoint="https://YOUR_VERIFIED_ENDPOINT"` to `form[data-enquiry]`. The endpoint must accept JSON by POST and return JSON `{ "accepted": true }` only after durable acceptance. A successful HTTP response alone is insufficient. It must validate input, rate-limit abuse, apply an origin policy and securely forward to the intended inbox/CRM. Never put credentials in this repository. Configure the actual destination and privacy information, then test real delivery before publishing. No server or Salesforce credentials have been invented.

The fields are `firstName`, `lastName`, `email`, `clientType`, `note`, and `consent`. No personal information is written to browser storage. Failed delivery retains the visitor's input. Native dialog supplies keyboard containment, Escape and return focus.

## Motion and media

GSAP and ScrollTrigger 3.15.0 are vendored under `assets/js/vendor`; upstream license headers are retained. No remote font or animation CDN is required. CSS sticky handles the opening narrative; the libraries animate transforms and opacity without intercepting scroll.

The film is silent, about 0.95 MB, and only loads when its scene is visible on desktop or explicitly played on mobile. Reduced motion disables playback and Save-Data disables automatic playback. Hidden tabs and closed scenes pause playback. Portrait mobile hero and responsive detail image reduce image transfer size.

## Review documentation

- `docs/BRAND-REFINEMENT.md`: audit, art direction, design system and restraint decisions.
- `docs/HOMEPAGE-STORYBOARD.md`: current scene intent, assets and responsive behaviour.
- `docs/ASSETS.md`: source provenance and remaining photography decisions.
- `docs/REVIEW.md`: performed checks and outstanding device/deployment gates.


## Repeat development QA

The static site still has no build step. The optional development script requires Playwright and axe-core available to Node. Start the static server, then run:

```sh
node scripts/qa-homepage.cjs
QA_BROWSER=webkit node scripts/qa-homepage.cjs
```

Install the corresponding Playwright browsers and runtime dependencies in your own development environment. Optional variables: `QA_URL` (local test server), `QA_OUTPUT` (default /tmp/alpine-office-qa), `QA_CHROME_PATH` (Chrome executable) and `QA_AXE_PATH` (axe.min.js). The script expects this review branch's non-delivering form. Delivery tests intercept a reserved .invalid URL locally; no client data or real enquiries are submitted.
