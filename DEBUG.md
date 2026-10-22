# v10 layout-shift investigation

Observed during the production viewport audit: the homepage at 768px reported a cumulative layout-shift sum of approximately 0.20. Other tested pages and mobile widths reported zero. No horizontal overflow, text intersections or header collisions accompanied it.

Reproduction: `W=768`, `P=/` with `scripts/v10-browser.mjs` against the production server. The script now records shift times and source rectangles and fails above 0.1. Focused output uses `OUT=shots/v10/cls`.

Hypotheses pending source evidence:

1. Heading word splitting changes wrapping after hydration; compare shifted heading rectangles and timing.
2. Font or image intrinsic dimensions change; inspect affected nodes and their old/new bounds.
3. Scroll animation initialization changes layout or transformed visible content; inspect timing relative to setup/scroll and affected sources.

## Evidence and fix

- At 768px, the h1 changed from 126.89px tall to 84.59px when `document.fonts` emitted `loadingdone`. This happened before the word-splitting mutation. Its bottom-aligned hero content moved down 42.30px.
- A no-JavaScript page had the same final heading dimensions: animations were not the source.
- Controlled CSS-response experiment: default `font-display: swap` reproduced 0.2001 at 768px and 0.2505 at 1440px; changing only font display to `optional` produced zero at both widths.
- Changed both existing `next/font` declarations to `display: 'optional'`. Preloaded Sora/Inter and their metric-adjusted fallback faces are preserved; a slow font no longer swaps after first paint. Motion is unchanged.
- Final production rebuild and browser verification recorded in `CHANGES_v10.md` and `shots/v10/`.
