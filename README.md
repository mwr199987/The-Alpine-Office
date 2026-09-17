# The Alpine Office

A static, cinematic homepage. No application framework or build step is required.

## Review locally

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. The page, imagery, motion libraries and silent film are all self-hosted. The complete page remains readable when JavaScript is disabled. Reduced-motion preference removes scroll choreography and autoplay.

## Production and staging

The redesign lives on `redesign/cinematic-homepage`. The production baseline is `abc172047ead04dfd0fed7218e3f25f7175624f7`.

The existing GitHub integration reports **Cloudflare Workers Builds**, worker `muddy-sun-e521`. Preserve its current settings. The repository does not contain a Wrangler configuration or the account's preview-branch settings, so a Pages URL or preview deployment must not be assumed. Configure a non-production Workers build/preview for this branch before merging. Do not change the production branch or switch hosting providers to review this work.

To recover the former homepage, revert the redesign commit/PR. The original files and images remain in Git history.

## Enquiry delivery

The previous form was a non-delivering visual preview. This redesign keeps that limitation explicit and does not display a false delivery confirmation.

To enable delivery, add `data-endpoint="https://YOUR_VERIFIED_ENDPOINT"` to `form[data-enquiry]`. The endpoint must accept JSON by POST and return JSON `{ "accepted": true }` only after durable acceptance. A successful HTTP response alone is insufficient. It must validate input, rate-limit abuse, apply an origin policy and securely forward to the intended inbox/CRM. Never put credentials in this repository. Configure the actual destination and privacy information, then test real delivery before publishing. No server or Salesforce credentials have been invented.

The fields are `firstName`, `lastName`, `email`, `clientType`, `note`, and `consent`. No personal information is written to browser storage. Failed delivery retains the visitor's input. Native dialog supplies keyboard containment, Escape and return focus.

## Motion and media

GSAP and ScrollTrigger 3.15.0 are vendored under `assets/js/vendor`; upstream license headers are retained. No remote font or animation CDN is required. CSS sticky handles the opening narrative; the libraries animate transforms and opacity without intercepting scroll.

The film is silent, about 0.95 MB, and only loads when its scene is visible on desktop or explicitly played on mobile. Reduced motion and Save-Data disable automatic playback. Hidden tabs and closed scenes pause playback. Portrait mobile hero and responsive detail image reduce image transfer size.

## Review documentation

- `docs/HOMEPAGE-STORYBOARD.md`: scene intent, copy, assets and responsive behaviour.
- `docs/ASSETS.md`: source provenance and remaining photography decisions.
- `docs/REVIEW.md`: performed checks and outstanding device/deployment gates.
