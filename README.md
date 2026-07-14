# e-rail.github.io

Personal website for Ethan Song, hosted with GitHub Pages.

- `/` — introduction, GitHub projects, and Bilibili videos
- `/justgo` — current product page for [JustGo](https://github.com/E-Rail/JustGo)
- `/justgo/docs` — implementation-level routing, confidence, coverage, and accessibility documentation
- `/justgo/docs/services` — runtime service catalog and network boundaries
- `/justgo/docs/privacy` — privacy policy and field-level data handling
- `/justgo/docs/terms` — service terms and transit-data limitations

The site is plain HTML, CSS, and JavaScript with no build step.

Every page supports English and Simplified Chinese through the shared
`language.js` and `language.css` assets. A first visit follows the browser's
preferred language. An explicit choice is shared across all routes in
`localStorage` (`erail-language`) and the first-party `erail_language` cookie.
