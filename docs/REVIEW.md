# Review status: 29 September 2026

Branch: `refine/luxury-brand-2026-09`. Current production baseline: `c36cdd32c6c65acae9d739ac44f7f951ddc15e1d`. The branch builds on the earlier cinematic draft and accounts for the later production motion commits.

## Complete in this pass

- Repository and live production/draft audit, including mobile production-source rendering.
- Focused art direction and a documented design system.
- Consistent self-hosted typography, original SVG Office notation and matching favicon.
- Simpler image sequence, clearer service copy, an illustrative planning note, retained real founder and a quieter closing.
- Native dialog focus wrap, no-JavaScript introduction fallback and refresh after fonts load.
- Restraint pass, responsive visual inspection and reproducible functional checks.

## Browser evidence

Both Chrome and Playwright WebKit passed the same six-width run:

| Width | Layout | Image/font loading | JS errors | Automated WCAG 2 A/AA and 2.1 AA checks |
| --- | --- | --- | --- | --- |
| 320 px | No horizontal or heading overflow | Passed | None observed | No violations reported |
| 390 px | No horizontal or heading overflow | Passed | None observed | No violations reported |
| 430 px | No horizontal or heading overflow | Passed | None observed | No violations reported |
| 768 px | No horizontal or heading overflow | Passed | None observed | No violations reported |
| 1440 px | No horizontal or heading overflow | Passed | None observed | No violations reported |
| 1728 px | No horizontal or heading overflow | Passed | None observed | No violations reported |

Viewport checks use reduced motion for consistent complete-page inspection. Separate tests exercise normal motion, resizing and live preference changes. Automated checks do not establish full WCAG conformance.

Both engines also passed:
- Invalid-field handling; preview submission without a POST or false delivery acknowledgement.
- Forward Tab cycling, Escape, focus return, backdrop close and retained input.
- Open-dialog axe check with no reported violations.
- Desktop reveal completion and live reduced-motion reset.
- Reduced-motion film pause; mobile film requires explicit opt-in; dialog pauses film.
- Resize without overflow and native country disclosures.
- Locally intercepted acceptance/rejection and duplicate-submit prevention. Strict `accepted: true` is required; rejected delivery preserves fields.
- Readable no-JavaScript and animation-library failure fallbacks.

The first WebKit media test crashed because the local engine lacked its media/rendering dependencies. After those were supplied in temporary storage, the full run passed. This was not resolved by removing a website feature or weakening the test.

Reports: [Chrome](review/chromium-report.json), [WebKit](review/webkit-report.json). Screenshots: [desktop](review/desktop-hero.jpg), [mobile](review/mobile-hero.jpg). The script is `scripts/qa-homepage.cjs`; it is restricted to a local test server and requires preview delivery to be disabled.

Other completed checks: JavaScript syntax, diff whitespace, local paths, fragment targets, single H1, unique IDs and actual image dimensions. No real client data was used or real enquiry submitted.

## Approval and commercial launch gaps

1. Marcus's visual approval of this refinement.
2. A physical iPhone/Safari review, including address-bar viewport changes, scrolling feel and real connection conditions. Playwright WebKit is not physical Safari.
3. Confirm commercial rights to inherited photographs; decide whether to replace atmospheric generated property concepts with real licensed/commissioned imagery.
4. Provide the actual delivery destination and privacy information; connect and verify real enquiry acceptance in the intended inbox/CRM. No live endpoint currently exists.
5. Measure real deployed mobile performance if required. No Lighthouse score is claimed.

No main-branch write, merge, production Worker promotion, domain change or hosting migration was performed. Preview/review activity does not constitute production approval.
