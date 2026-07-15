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

The JustGo pages use the verified 2026-07-15 post-build snapshot: 58 cataloged
cities, 46 included OSM network baselines, two included city packs with 606
station records, 56 source-pending cities, and zero verified indoor transfers.

The site is plain HTML, CSS, and JavaScript with no build step.

Every page supports English and Simplified Chinese through the shared
`language.js` and `language.css` assets. A first visit follows the browser's
preferred language. An explicit choice is shared across all routes in
`localStorage` (`erail-language`) and the first-party `erail_language` cookie.
