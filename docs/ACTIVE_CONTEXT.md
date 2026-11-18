# Active context

Handoff between sessions. Read this first; update it before you stop. This file
is the shared state for both Claude Code and OpenCode, so it must describe the
real repository, not a plan.

Status: current as of 2026-11-18. Revalidate with `git status` and `git log`
before acting on anything below.

## Repository

- Current branch: `codex/portfolio-comandinha-visuals`, synchronized with
  `main` (`origin/main` and `origin/codex/portfolio-comandinha-visuals`).
- Sibling repository updated alongside this work:
  `C:\Users\Bellussi\Documents\Workspace\Portifolio\github-profile-readme`
  (`bellussi1/bellussi1`, synced on `main` / `origin/main`).

## Published state

- https://bellussi.vercel.app serves the V2 editorial site, English by default,
  Portuguese through `?lang=pt`.
- Lighthouse production audit: 100 in performance, accessibility, best practices
  and SEO, on mobile and desktop (last recorded at `ddb7700`; re-verify after
  the 2026-11-18 update).
- Resumes updated to Pleno / B2+, in PT and EN, one page, ATS; PDFs in `cv/`,
  `public/` and `Documents\Curriculos`.

## Recent updates (2026-11-18)

- **Hero ATLAS reading capture (`public/atlas-reading.webp`):** regenerated at
  `1200x1178` WebP from the current `/leitura/marxismo` capture
  (`ATLAS/docs/social/linkedin/assets/leitura-top.jpg`).
- **New projects (`src/content/portfolio.js`, `src/content/render-portfolio.js`, `index.html`):**
  - Added `dalibre-plugins` (Hardcover, ISBN Brasil, Open Library) and `dalibre`
    (fork + upstream Go/MyGo/SDK contributions and `dalibre-plugin-template`) to
    `openSourceProjects` in PT and EN.
  - Added `copy.linkLabels?.[type]` support in `render-portfolio.js` so tool
    entries can label multiple distinct repository links cleanly.
  - Regenerated pre-rendered English containers in `index.html` and updated
    `test/portfolio-rendering.test.js` with the 6-item `openSourceProjects` id list.
- **Documentation (`README.md`):**
  - Listed Scriptorium, Dalibre Plugins and Dalibre alongside the existing
    open-source tools in English and Portuguese.
  - Reconciled the `lenis` divergence: noted that `lenis` is the only declared
    runtime dependency in `package.json` (`src/utils/smooth-scroll.js` configures
    `syncTouch: false` and `respectReducedMotion: true`, while `src/main.js` keeps
    native scrolling active).
- **GitHub profile README (`github-profile-readme` / `bellussi1/bellussi1`):**
  - Updated `assets/atlas-preview.webp` from `public/atlas-home.webp` (`1200x716`).
  - Added Dalibre, Scriptorium, Dalibre Hardcover, Dalibre ISBN Brasil and
    Dalibre Open Library to `README.md` (both English and Portuguese sections).

## Open items

- Re-run Lighthouse audit against production after the 2026-11-18 deploy.
- Decide whether to keep `lenis` / `src/utils/smooth-scroll.js` wired or prune
  unused scroll/parallax utilities if not needed.
- Contact modality and availability remain omitted from the repo; ATLAS card
  height at 375 px (~1,035 px) due to copy length.
