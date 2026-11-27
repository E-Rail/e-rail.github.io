# e-rail.github.io

Personal website for Ethan Song, hosted with GitHub Pages.

- `/` — introduction, GitHub projects, and Bilibili videos. Just-Go links to [just-go.com.cn](https://just-go.com.cn)
- `/ccmgr` — product page, install options, internals, and keybindings for [ccmgr](https://github.com/E-Rail/ccmgr)
- `/ccmgr/install.sh` — first-party mirror of the upstream ccmgr installer
- `/just-go` — product page for [Just-Go](https://github.com/E-Rail/Just-Go)
- `/just-go/docs` — routing, Quick Tags, data layers, coverage, and known limits
- `/just-go/docs/services` — the Station Information API contract
- `/just-go/docs/privacy` — privacy policy and field-level data handling
- `/just-go/docs/terms` — service terms and transit-data limitations
- `/just-go/docs/attribution` — OpenStreetMap, MTR/DATA.GOV.HK, Taipei, and operator credits

The `/just-go` section is imported from [E-Rail/just-go-site](https://github.com/E-Rail/just-go-site),
which is also deployed standalone at just-go.com.cn. It carries its own design
system: `just-go/base.css` rather than the site-wide `base.css`, system fonts
only, and no external requests. Re-importing means copying that repository's
files in and rewriting its root-relative paths to `/just-go/`.

It tracks the verified Round 36 snapshot at `fc4bce3`: 58 cataloged cities, 53
routed metro networks, 14 station packs holding 2,849 matched records, a
station-information directory of 1,598 stations across 5 reviewed sources, and
770 official-resource links across 698 unique targets.

ccmgr is v0.1.3 at `c3de597`. The public ccmgr installer mirrors the current
upstream `install.sh` byte-for-byte.

The site is plain HTML, CSS, and JavaScript with no build step.

Every page supports English and Simplified Chinese through the shared
`language.js` and `language.css` assets. A first visit follows the browser's
preferred language. An explicit choice is shared across all routes in
`localStorage` (`erail-language`) and the first-party `erail_language` cookie.
