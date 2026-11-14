# AGENTS.md

Project instructions for coding agents. Read `docs/ACTIVE_CONTEXT.md` before
starting and update it when you stop.

## What this is

Personal site of Enzo Bellussi: an editorial, English-first portfolio with a full
Portuguese version, product case studies and ATS-oriented resumes. It is a
showcase, not a product. The ATLAS case study is the flagship.

## Stack

- Plain HTML, CSS and modern JavaScript. **No UI framework.**
- Vite 8 for dev and build; Node.js 24 and the committed lockfile.
- `lenis` is the only runtime dependency, used for smooth scrolling.
- Hosting on Vercel. The production URL is https://bellussi.vercel.app.

## Design direction

The **V2 editorial** design is approved and is a criterion, not a suggestion:

- Zilla Slab for display, a technical index grid, inline rules, light and dark
  themes, locally hosted subset fonts.
- English is the default. Portuguese lives in `src/translations.js` and is served
  through `?lang=pt`.
- No card-grid template, no dashboard look, no generic SaaS section rhythm.

Do not restore or reintroduce older concepts (deep field, pixel index) unless the
user asks. The V2 restoration is the current state.

## Layout

| Path | Purpose |
| --- | --- |
| `index.html` | Pre-rendered English content and the page shell |
| `src/main.js` | Entry: language, theme, navigation, scroll, reveal |
| `src/content/portfolio.js` | Structured content data |
| `src/content/render-portfolio.js` | Renders content into the page |
| `src/translations.js` | pt-BR strings |
| `src/utils/`, `src/visuals/` | Focused modules (language, theme, parallax, deep field) |
| `styles/` | `style.css`, `components/`, `concepts/`, `variants/` |
| `test/` | `node --test` suites |
| `cv/` | LaTeX sources and generated PDFs |
| `public/` | Fonts, images, resumes, `og-image.png`, `robots.txt` |

## Commands

```sh
npm ci
npm run dev        # Vite dev server
npm test           # node --test test/*.test.js
npm run build      # production build
npm run preview    # serve the built output
```

## Rules

- Keep English as the source of truth: update `index.html` and
  `src/translations.js` together when a user-facing string changes.
- Keep accessibility: semantic HTML, visible focus, keyboard navigation, skip
  link, WCAG-minded contrast. Verify at 320 px width and with 200% text.
- Preserve the Lighthouse result (100 in all four categories on mobile and
  desktop). A change that drops performance needs a measured justification, not
  a guess.
- Images stay WebP/AVIF with explicit dimensions; fonts stay self-hosted and
  subsetted.
- Never deploy or push without explicit authorization.
- Report the commands you ran and their real result. Do not claim a check you did
  not execute.
