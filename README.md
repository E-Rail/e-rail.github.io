# e-rail.github.io

Personal website for Ethan Song, hosted with GitHub Pages.

- `/` — introduction, GitHub projects, and Bilibili videos
- `/ccmgr` — product page, install options, internals, and keybindings for [ccmgr](https://github.com/E-Rail/ccmgr)
- `/ccmgr/install.sh` — first-party mirror of the upstream ccmgr installer
- `/just-go` — current product page for [Just-Go](https://github.com/E-Rail/Just-Go)
- `/just-go/docs` — implementation-level routing, confidence, coverage, and accessibility documentation
- `/just-go/docs/services` — runtime service catalog and network boundaries
- `/just-go/docs/data-sources` — verified included, external-reference, live-API, and source-pending data record
- `/just-go/download` — downloads and offline-content boundary
- `/just-go/docs/privacy` — privacy policy and field-level data handling
- `/just-go/docs/terms` — service terms and transit-data limitations
- `/just-go/docs/attribution` — OpenStreetMap, MTR/DATA.GOV.HK, media, and software credits

The Just-Go pages use the verified Round 36 snapshot dated 2026-07-15: 58
cataloged cities, 53 route-picker baselines, 5 catalog-only cities, 14 included
offline city packs with 2,849 matched station records and 582 accessibility
records, and zero verified indoor transfers. A separate official-resource
directory contains 770 hyperlink records across 698 unique targets, and a
station-information layer covers 1,598 stations — 1,436 of them fetched from
four mainland operators on the rider's own device rather than bundled.

Current source snapshots are Just-Go `main` at `fc4bce3` (the merged Round 36
tree) and ccmgr v0.1.3 at `c3de597`. The public ccmgr installer mirrors the
current upstream `install.sh` byte-for-byte.

The site is plain HTML, CSS, and JavaScript with no build step.

Every page supports English and Simplified Chinese through the shared
`language.js` and `language.css` assets. A first visit follows the browser's
preferred language. An explicit choice is shared across all routes in
`localStorage` (`erail-language`) and the first-party `erail_language` cookie.
