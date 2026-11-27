# e-rail.github.io

Personal website for Ethan Song, hosted with GitHub Pages.

- `/` — introduction, GitHub projects, and Bilibili videos. Just-Go links to [just-go.com.cn](https://just-go.com.cn)
- `/ccmgr` — product page, install options, internals, and keybindings for [ccmgr](https://github.com/E-Rail/ccmgr) v0.1.12
- `/ccmgr/install.sh` — first-party mirror of the upstream ccmgr installer

Just-Go’s own site lives at just-go.com.cn and is not hosted in this repository.

ccmgr is v0.1.12. The public installer matches the upstream `install.sh` at that tag
byte-for-byte, and always downloads the latest GitHub release.

The site is plain HTML, CSS, and JavaScript with no build step.

Every page supports English and Simplified Chinese through the shared
`language.js` and `language.css` assets. A first visit follows the browser's
preferred language. An explicit choice is shared across all routes in
`localStorage` (`erail-language`) and the first-party `erail_language` cookie.
