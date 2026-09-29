# The Alpine Office: editorial refinement, second review

Branch: `refine/luxury-brand-2026-09`. Production baseline: `c36cdd32c6c65acae9d739ac44f7f951ddc15e1d`. This pass follows Marcus's feedback that the scrolling, transitions and layout still lacked the assurance of an established luxury brand.

## Diagnosis and changes

The previous draft used too much separate scroll distance for the opening slogans, then repeated large headings beside large images. Generated property imagery also weakened the intended sense of a real, knowledgeable travel office.

| Element | Current treatment | Purpose |
| --- | --- | --- |
| Arrival | Real Alpine evening photograph, centred masthead, one large heading and a quieter italic line | Lead with the place and proposition rather than repeat a large logo. |
| Opening transition | One desktop sticky scene, 135 svh total; photograph settles into a 3.5 vw ivory frame across 35 svh of scroll, then releases | A clear photographic-to-editorial transition with no wheel interception or content fading out on scroll. |
| Mobile arrival | Ordinary 100 svh scene, deliberate portrait crop, no pinned scroll or copy reveal | Preserve reading and movement on touch devices. |
| Introduction | One two-column spread joins “The Alps offer endless choice” with “We don't” | Remove the separate reduction screen and fading collage. Make the proposition readable without a long staged reveal. |
| Place | Generous framed interior photograph; index, heading and reasoning sit below it | Let the photograph breathe and give the service a practical interpretation. |
| Week | Smaller portrait village composition and offset copy | Vary scale and rhythm rather than repeat the same full-screen scene. |
| Details | Landscape snow texture and narrower copy | A different visual proportion; replace with a real guest/service detail when commissioning. |
| Evidence | Existing founder, practical Office note and service explanation | Preserve authentic accountability; no invented stature or client evidence. |
| Closing | “It begins with you” on ivory, a concise invitation and fine-rule link | End on the relationship rather than another campaign slogan or photograph. |

## Design system

- Ivory `#f3efe7`, paper `#f8f5ef`, ink `#242523`, muted copy `#62635c`, rule `#cbc6bc`.
- One self-hosted serif, Baskervville, with italic used selectively. One sans, Source Sans 3, for reading and annotation.
- Shared page gutter `clamp(24px, 5vw, 100px)`; shared section rhythm `clamp(90px, 10vw, 160px)`; 1480 px maximum editorial width.
- Typography scales by role rather than making every headline equally large. Photographs alternate generous landscape, narrow portrait and quieter landscape formats.
- Fixed masthead changes to ivory after 64 px of native scroll, keeping it readable as the frame appears.
- One motion system: measured entry on desktop, 18 px text rise, 3.5% photographic settling. Body copy remains readable on mobile. Reduced motion removes all choreography and resets the opening frame.
- Standard anchors, native disclosures and native enquiry dialogue. No loader, custom cursor, scroll interception, card tilt, grain layer or new framework.

## Photography and restraint

Five individually sourced real photographs now replace all visible generated/inherited travel imagery. Optimised WebPs are served locally with responsive sources; credit, licence and source details are in ASSETS.md. They are atmospheric placeholders, not offered inventory. The founder image and existing positioning are retained.

The generated film is removed from the document. Its media policy and the unused collage/reduction styles and animations are removed. Inactive legacy assets are excluded from upload. A commissioned real film can later replace a suitable photographic scene without rebuilding the page.

This improves visual discipline; stock images cannot create exclusive access, operating history or commercial credibility. Real experience and coherent commissioned photography must ultimately support the brand's appearance.

## Review boundary

Continue using draft PR #4 and Cloudflare's version-preview workflow. No main write, merge, Worker promotion, domain change or live enquiry endpoint is authorised by this work. Marcus's visual approval, physical iPhone review and verified enquiry delivery remain required before launch.
