# e-rail.github.io

Personal website for Ethan Song, hosted with GitHub Pages.

- `/` — introduction, GitHub projects, and Bilibili videos
- `/justgo` — current product page for [JustGo](https://github.com/E-Rail/JustGo)
- `/justgo/docs` — implementation-level routing, confidence, coverage, and accessibility documentation
- `/justgo/docs/services` — runtime service catalog and network boundaries
- `/justgo/docs/data-sources` — verified included, external-reference, live-API, and source-pending data record
- `/justgo/download` — downloads and offline-content boundary
- `/justgo/docs/privacy` — privacy policy and field-level data handling
- `/justgo/docs/terms` — service terms and transit-data limitations
- `/justgo/docs/attribution` — OpenStreetMap, MTR/DATA.GOV.HK, media, and software credits

The JustGo pages use the verified Round 35 snapshot dated 2026-07-15: 58
cataloged cities, 46 route-picker baselines, 12 catalog-only cities, two
included offline city packs with 606 station records, and zero verified indoor
transfers. A separate official-resource directory contains 330 hyperlink
records across 275 unique targets.

The site is plain HTML, CSS, and JavaScript with no build step.

Every page supports English and Simplified Chinese through the shared
`language.js` and `language.css` assets. A first visit follows the browser's
preferred language. An explicit choice is shared across all routes in
`localStorage` (`erail-language`) and the first-party `erail_language` cookie.
