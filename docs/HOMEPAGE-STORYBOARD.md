# The Alpine Office: cinematic homepage

Baseline: production tree abc172047ead04dfd0fed7218e3f25f7175624f7. Every original local file was compared by Git blob hash with the live repository. Work is isolated on redesign/cinematic-homepage; main stays recoverable.

## Scene direction

| Scene | Feeling and purpose | Copy and assets | Desktop behaviour and transitions | Mobile behaviour |
| --- | --- | --- | --- | --- |
| Arrival | Desire; a recognisable, assured identity | The Alpine Office. Exceptional Alpine travel, personally considered. Latest supplied twilight chalet still | Full viewport; short sticky hold, gentle 4% scale and exposure change; title travels independently; the next scene covers the image | Art-directed portrait crop; viewport uses svh; no pin or parallax |
| Possibility | Intrigue and scale | The Alps offer endless choice. Existing landscapes and chalet detail | One native sticky stage, GSAP scroll-synchronised typography and four image layers; no wheel interception; images progressively recede | Shorter sticky sequence with two images and smaller typography; no horizontal motion |
| Reduction | Relief | We don’t. We search widely, know personally and recommend selectively. | Cream fills the frame; imagery leaves; typography remains still, followed by generous breathing room | Normal document flow; no compulsory delay |
| Judgement | Demonstrate knowledge through consequences | The right place. The right week. The right details. | Three editorial compositions with changing image proportions; film in place scene, quiet winter village, morning-detail concept; masks only where they assist selection | Single-column scenes, imagery followed by readable copy; video explicitly played by visitor |
| The Office | Explain the service only after desire | A private office for exceptional Alpine travel. | Quiet asymmetrical editorial grid with one short explanation and a line on personal capacity | Stacked editorial copy, no cards |
| Founder | Trust and accountability | Judgement is personal. Marcus Roberts. | Modest portrait recovered from user's investor proposal, factual biography retained from current site | Portrait remains secondary to brand; no invented lifestyle portrait |
| Memory | Relationship and continuity | The better we know you, the less you need to tell us. | Large restrained type; one domestic travel detail supports memory without a CRM feature list | Natural reading order; no animation dependency |
| Across the Alps | Breadth and all-season relevance | Beyond a place. Beyond a season. France, Switzerland, Austria, Italy. | Summer landscape and editorial country lines; warm mountain panorama adds seasonal change without four cards | One principal image, native details disclosures for country copy, keyboard and touch usable |
| Conversation | Confidence leading naturally to action | You don’t need more choice. You need the right choice. Begin a conversation. | Full-bleed evening image with still copy; understated enquiry link opens native dialog | Same emotional closing, smaller type and generous touch targets |

## Asset decisions

- Keep original colour tokens and five WebP landscapes. Avoid labelling unverified landscape images as specific countries or resorts.
- Latest supplied twilight image is the principal visual. It is generated concept imagery, not evidence of an available property. Do not add a property name or promise availability.
- Supplied eight-second generated chalet film supports atmosphere; self-host a compressed silent MP4, load only near the scene and only automatically on desktop without reduced motion or Save-Data. Mobile uses a still and optional Play control.
- Recover the real founder portrait (548 × 612) from the existing investor proposal. Other embedded proposal images are only 133–168 pixels wide and are rejected. Generate one new 1536 × 1024 morning-detail concept image instead; retain its provenance.
- Before production, check image usage rights and replace generated property visuals with approved real photography where the image could imply an actual recommendation. The page is a staging presentation, not a catalogue.

## Implementation decisions

Semantic HTML first; all copy visible without JavaScript. Locally vendored GSAP/ScrollTrigger 3.15.0 only handles cinematic choreography. Native scrolling, no custom cursor, no loading screen. CSS sticky provides geometry; GSAP transforms/opacity provide motion. Reduced motion removes pins, reveals and autoplay, including live preference changes. System typography retains the established Iowan/Baskerville character without render-blocking remote fonts.

Native dialog replaces the inaccessible overlay while preserving existing form fields. Escape, initial focus, focus containment and return focus are supported. No real delivery endpoint existed in production. Preview explicitly says nothing is sent and never pretends a message was delivered. A configured HTTPS endpoint is required before enabling submissions; no inbox is invented.

## Deployment

Static HTML/CSS/JS; no build process. The live GitHub check identifies Cloudflare Workers Builds, script muddy-sun-e521, rather than a confirmed Pages project. No Wrangler configuration exists in the repository. Retain that deployment integration. Branch previews depend on the account’s existing build settings, which are not stored here. Do not assume Pages preview URLs. Create a review branch and draft PR; do not merge to main. Keep the production commit in the PR for rollback. No production hosting-provider migration.
