# Code Alchemist · Alchemia

The portfolio and brand site of **Bright Mabuza**, a full-stack software engineer in South Africa.

Live: https://bright-mabuza.netlify.app/ (moving to its own domain).

## Structure

A static site with no build step and no third-party requests.

| Path | What |
|---|---|
| `index.html` | The one-page portfolio |
| `brand.html` | Brand guide: logo, colour, type and downloads |
| `thanks.html`, `404.html` | Contact-form confirmation and the not-found page |
| `assets/css/styles.css` | All styles and the brand tokens |
| `assets/js/main.js` | Mobile menu, section highlight, reveal and contact form (vanilla JS) |
| `assets/brand/` | Logo source files (SVG). The text in the lockups is outlined, so they need no fonts |
| `assets/fonts/` | Self-hosted fonts (SIL OFL, see `assets/fonts/LICENSE.md`) |
| `_headers` | Netlify security and caching headers (strict CSP: same-origin only, no inline scripts or styles) |

The contact form uses **Netlify Forms**, so no keys are needed in the page. Spam is filtered by a honeypot field.

## Editing CSS or JS

Pages load `styles.css` and `main.js` with a content hash (`?v=…`) so browsers can cache them for a year. Netlify runs the stamping on every deploy (`netlify.toml`), so the live site is always correct. Run it locally too, so the committed pages match:

```sh
python3 tools/stamp-assets.py
```

## Run locally

```sh
python3 -m http.server 8080
```

The contact form only submits on Netlify.

## Licence

- **Code** (HTML, CSS, JS): GPL-3.0, see `LICENSE`.
- **Brand and content** (the Code Alchemist and Alchemia names and marks, the logo files, the text and the photo): © Bright Mabuza, all rights reserved.
