# The Alpine Office: luxury-brand refinement

Review branch: `refine/luxury-brand-2026-09`. Built on the existing cinematic draft at `cabd12064a787aac97f82be3b19af981bd6e130d`. Production baseline: `c36cdd32c6c65acae9d739ac44f7f951ddc15e1d`.

## Brief and audit

The brief is precision, consistent art direction, a recognisable identity and believable personal judgement. Visual stature must be supported by actual experience. No invented clients, awards, affiliations, property availability or operating history.

The live production homepage and the Cloudflare cinematic preview were inspected on 29 September 2026. Their source was compared locally, including the two later production commits that added grain, entrance animation, parallax and season-card tilt. Their useful motion intent is carried through the cinematic draft; grain and card tilt are omitted as part of the restraint pass. Production is the original all-season membership homepage; the cinematic work remains a separate draft. This distinction matters: the refinement preserves the draft's strongest work rather than starting a third concept.

| Element | Finding | Decision |
| --- | --- | --- |
| Proposition | A private office, personal accountability and a continuing relationship are strong. | Preserve the positioning, founder and memory sections. Make the practical service easier to understand. |
| Opening | Twilight image, asymmetric typography and a quiet navigation already provide a strong arrival. | Retain image and composition; improve type consistency and mobile legibility. |
| Imagery | The four-image opening repeats hero, detail and summer assets later on. The same hero closes the page. | Use two marginal landscapes in the choice sequence. Remove the extra panorama and repeated photographic closing. |
| Typography | System font stacks produce materially different metrics and italics across devices. Over-tight tracking compounds this. | Self-host a consistent regular/italic serif and a quiet sans. Moderate tracking and refresh scroll geometry after fonts load. |
| Credibility | The real founder is useful evidence. Most service copy remains abstract. | Add an explicitly illustrative Office note that explains a concrete planning trade-off. It is not a case study or testimonial. |
| Identity | The typographic wordmark is restrained but the generic initial/favicon and scattered numbering have little continuity. | Add a small Office notation device, shared with the favicon. Keep the wordmark as the principal identity. |
| Interaction | Native scrolling, dialog and film policy are sensible. Mobile reveals and long sticky scenes slow reading. | Keep subtle desktop choreography; shorten the opening sequence and make mobile body copy continuously visible. |
| Technical detail | Previous draft had no browser QA. | Validate six widths, motion changes, fallbacks, dialogue, disclosures and simulated delivery. Keep launch gaps explicit. |

## Art direction

The main image is expansive and atmospheric. Supporting images move towards the lived experience: a quiet village, the morning inside a chalet, a summer landscape. Founder imagery supplies real human accountability. Cold exterior light is balanced with natural timber and warm ivory. Avoid exaggerated orange, stock luxury props, glossy cards, faux handwritten signatures and invented endorsements.

Generated chalet stills and film remain atmospheric concepts with recorded provenance. They are not named or offered as properties. Creating another fictional chalet would add little and weaken the credibility objective. This pass therefore creates exact vector identity assets and typography assets, and improves the composition of existing photography. The commercial photography brief is below.

## Design system

| Role | Specification | Rule |
| --- | --- | --- |
| Paper | Ivory `#f3efe7`, lighter paper `#f8f5ef` | Use quiet continuous surfaces. |
| Type | Ink `#242523`, muted `#62635c` | Keep supporting text readable, not faint decoration. |
| Dark scenes | Charcoal / muted Alpine green | Reserve for the place scene, the Alpine perspective and closing. |
| Rule | `#cbc6bc`, 1 px | Define margins and editorial hierarchy, not cards. |
| Display | Self-hosted Baskervville regular and italic | Familiarity with the earlier Baskerville direction; consistent across operating systems. Italic marks emphasis rather than every paragraph. |
| Utility / body | Self-hosted Source Sans 3 regular | One sans for navigation, annotations and practical text. No font-service account or external font request. |
| Section spacing | `--space-section: clamp(80px, 9vw, 140px)` | Shared rhythm across the main editorial sections. |
| Page margin | `--gutter: clamp(24px, 5vw, 90px)` | Match image edges, copy and fine rules. |
| Identity device | `office-mark.svg`: open register, two vertical strokes and a point | Appears at the opening footnote, Office note and final introduction. Do not repeat in every section. |
| Office note | Rule, reference, question, reasoning and conclusion | Always distinguish an illustration from evidence of an actual client result. |
| Interaction | Native anchors, disclosures and dialog; restrained transform/opacity | No scroll interception, bespoke cursor, loader or animated ornament. |
| Mobile | Portrait hero, single-column editorial scenes, readable body text without reveal | Mobile is a deliberate composition rather than a scaled desktop. |

Open font files have their original upstream OFL licences included. The Adobe catalog lookup did not reliably resolve the intended family; these are independently sourced open fonts, not Adobe kit assets.

## Photography brief for commercial use

Commission or license a small coherent set rather than accumulating unrelated stock:
1. A real Alpine arrival at blue hour, landscape master and a deliberately composed portrait alternate. Leave calm space at left for the identity. A slow, stable approach film can share this framing.
2. An actual morning/detail image at a property Marcus knows, with evidence of use and natural window light.
3. A real village/access context, supporting practical resort judgement rather than a generic mountain view.
4. An updated real founder portrait only if needed; retain the present authentic portrait until a better one exists.

Require documented commercial website rights, a natural colour treatment, subtle highlights, believable architecture and appropriate crops. Do not use stock preview watermarks in the delivered site. Retained generated concepts are clearly recorded in the asset register; no unlicensed stock purchase was made.

## Restraint pass

Removed two collage images, the additional panorama, the repeated closing hero, redundant slogan copy and unused panorama CSS. Shortened the sticky sequence and reduction scene. Kept the service structure and art direction already agreed. No new carousel, card grid, scrolling trick or framework.

The illustrative Office note is the one new content component. Its purpose is to show the practical reasoning the private-office promise otherwise only states.

## Production boundary

No merge, Worker promotion, production deploy command, domain change, hosting migration or delivery endpoint configuration is authorised by this review work. The original main commit remains the rollback baseline. Production approval should follow visual review and resolution of the launch gaps recorded in REVIEW.md.
