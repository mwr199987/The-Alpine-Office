# Review status

## Implemented

- Entire homepage rebuilt around possibility → reduction → judgement → relationship.
- Separate mobile compositions, shorter mobile narrative and portrait hero asset.
- Native scrolling; GSAP/ScrollTrigger reveal, reduction and restrained desktop parallax.
- Reduced-motion styles and live preference handling; no autoplay under reduced motion or Save-Data.
- Local assets, deferred scripts, priority hero, lazy lower images and responsive detail image.
- Native enquiry dialog, labelled fields, Escape and return-focus handling.
- Existing non-delivering form behaviour made explicit; configurable validated-response delivery path.
- Real founder portrait, established colour language and factual biography retained.

## Checks completed in the implementation environment

- All original production files verified against GitHub blob hashes at abc172047ead04dfd0fed7218e3f25f7175624f7.
- JavaScript syntax: `node --check assets/js/site.js` passed.
- `git diff --check` passed.
- Static HTML audit: unique IDs, exactly one H1, all local image/script/CSS/video paths resolve, all fragment links have targets, every image has alt/dimension attributes.
- All WebP files decoded/verified successfully.
- No delivery endpoint is enabled; no enquiry data was sent during work.
- Static media budget: all self-hosted assets total approximately 2.53 MB. This is not the first-load transfer size: lazy imagery and the 0.95 MB film defer most of it. No measured Lighthouse score is claimed.

## Browser and launch checks still required

The provided cloud browser rejected local HTTP and file previews. No visual browser result, WebKit result, iPhone performance result or Lighthouse result is claimed. These remain launch gates rather than fabricated passes.

1. Review at 1440 × 900 and 1920 × 1080 in current Chrome and Safari; inspect every scene, image crop and text contrast.
2. Review at 390 × 844 and 430 × 932 on iPhone Safari, plus 320 px narrow layout. Confirm no sideways overflow and sufficient tap targets.
3. Scroll in both directions, jump directly through navigation and resize/orient the device. Confirm sticky scenes release, image layers clear and no content is stranded at opacity zero.
4. Enable reduced motion before loading and while the page is open. Confirm no pinning/parallax/autoplay and all copy remains readable.
5. Test keyboard-only enquiry: open, tab/shift-tab, validation, Escape, backdrop close and focus return. Confirm input is retained on close and failed delivery.
6. Test preview form with synthetic data. It must explicitly state nothing was sent, with no network submission.
7. Configure the verified endpoint and test actual inbox/CRM delivery, rejection, timeout and duplicate-click prevention before enabling production.
8. Throttle the connection, block video and disable JavaScript. Hero must appear without waiting for video; all core copy remains available. On mobile, film must require an explicit Play action.
9. Confirm image rights and review generated-property imagery before commercial launch.
10. Verify the Cloudflare staging URL, build settings and rollback point before merging.
