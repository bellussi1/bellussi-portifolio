# Active context

Handoff between sessions. Read this first; update it before you stop. This file
is the shared state for both Claude Code and OpenCode, so it must describe the
real repository, not a plan.

Status: current as of 2026-11-20. Revalidate with `git status` and `git log`
before acting on anything below.

## Palette tokens and motion pass (2026-11-21, branch feat/ui-polish, local commit, not pushed)

- `styles/tokens.css` (imported right after `style.css`) is now the only place that defines theme colours: primitives `--p-*`, then semantic roles per theme. Added `--line-strong` (3:1 for interactive borders; `--line` stays decorative at ~2:1), `--accent-hover`, `--on-accent`, `--button-accent(-hover)`, `--focus`. The old token blocks in `pixel-index.css` and `index-atmosphere.css` were removed; `#atlas`/`#work` bands in `flagship.css` set their own `--line-strong`, `--accent-hover`, `--focus`.
- Audit (computed styles, 146 text nodes per theme, transitions disabled): 0 text failures in both themes, min 5.44 dark / 5.63 light. Real gaps found: `--line` 2.01 dark / 1.88 light used for text-link underline and status pills; fixed with `--line-strong` (3.6 to 4.0). Earlier "failures" were reveal opacity and stalled colour transitions, not palette bugs.
- `test/palette-contrast.test.js` guards the token pairs (68/68 tests).
- Motion: theme switch uses `document.startViewTransition` (280 ms cross-fade, instant under reduced motion or without support); nav and text-link underlines scale in (transform only); tiles lift 3 px on fine pointers; language switch fades and rises 6 px; durations are `--dur-fast/base/slow` (160/280/440). Anchor jumps land 88 px below the top (header is 65 px).
- Not run: Lighthouse (not installed; `npx -y lighthouse` was blocked by the permission classifier). Run it before publishing.

## In progress (2026-11-20): ATLAS as the absolute flagship

Branch `feat/atlas-flagship` (from `main` at `badc6db`), **uncommitted, not
pushed, not deployed**.

- Order is now Hero → `01 ATLAS` (flagship case study) → `02 Experience` →
  `03 Other work` → Approach → About → Contact. Nav: ATLAS · Experience · Work.
- Hero CTA points to `#atlas` ("Read the ATLAS case study"); hero copy mentions
  ATLAS in EN and PT.
- `portfolio.js` now has `flagship` (ATLAS: metrics, six chapters, two
  captures) and `otherWork` (8 compact rows, no images). `products` and
  `openSourceProjects` were removed; Black Market became a row.
- ATLAS numbers come from the ATLAS release `5974a46` (graph of 2026-11-18):
  1,320 entities, 12,146 claims (all cited, none human-reviewed yet), 1,482
  sources, 3,025 relations; the claim classes add up to 12,146.
- New `styles/components/flagship.css`; removed the global 1425/1400 crop on
  product captures (nothing is paired any more).
- New `npm run prerender:sync` (`scripts/sync-prerender.mjs`) plus a test that
  fails when `index.html` drifts from `portfolio.js`.
- Verified: `npm test` 56/56, `npm run build` OK, visual check at 1440, 375 and
  320 px, PT and EN, light and dark, 200% text without overflow.
- Captures of the local ATLAS (rebranding, 2026-11-20): `public/atlas-{home,reading,itineraries,graph,map}.webp`; the flagship has a four-page tour (readings, itineraries, graph, map).
- `cv/*.tex` updated to 1,320 / 12,146 / 1,482 / 3,025 in text only; PDFs in `cv/` and `public/` NOT rebuilt (no LaTeX here: use tectonic).
- Not done: Lighthouse re-audit, rebuilding the PDFs, GitHub pins (web UI only).

## UI polish (2026-11-20, branch feat/ui-polish, unmerged)

- New palettes: dark `#14120f` with coral accent `#f08a5d`; light `#f2ede0` with ATLAS red `#b02a1a`. Mono labels now 13px minimum, secondary text 15px, `text-wrap` balance/pretty.
- The scroll-reveal CSS had no observer (nothing set `data-motion` or `.is-visible`). `src/utils/reveal.js` now does, and `polish.css` owns the reveal as one `transform` because the build rewrote the individual `translate`/`scale` properties and left the offset stuck.
- Motion follows the motion skill: no hover colour transitions, press scale 0.98, arrow on tile hover, tab panel fade, animated accordion via `::details-content`, metric count-up (`src/utils/count-up.js`), all under `prefers-reduced-motion`.
- Header wraps at large text (200% no longer overflows at 1024 or 812x375). 44px targets on touch.
- Tests 62/62; contrast audit clean (one false positive: closed `<details>`); no sideways overflow at 320 to 1440.

## Compact layout (2026-11-20, branch feat/compact-layout, unmerged)

- True page height at 1440 px went from ~12.3k (inflated by stale `contain-intrinsic-size`) to ~6.9k; 375 px ~9.9k. Measure with `content-visibility: visible !important`, otherwise offscreen sections report placeholder heights.
- ATLAS: copy beside a tabbed viewer (Home, Readings, Itineraries, Graph, Map; `src/utils/tabs.js`), clickable metrics, six chapters as exclusive `<details>`. Other work: two-column grid of whole-tile links.
- Section subtitles and approach icons/numbers removed (unslop-ui U2, U3, U11). `#atlas` is a paper band (ATLAS pigments), `#work` a navy band, fixed in both themes (`styles/components/flagship.css`).
- Tests 58/58, build OK. Not checked: Lighthouse, light theme of the bands.

## Repository

- Previous branch: `codex/portfolio-comandinha-visuals`, synchronized with
  `main` (`origin/main` and `origin/codex/portfolio-comandinha-visuals`).
- Sibling repository updated alongside this work:
  `C:\Users\Bellussi\Documents\Workspace\Portifolio\github-profile-readme`
  (`bellussi1/bellussi1`, synced on `main` / `origin/main`).

## Published state

- https://bellussi.vercel.app serves the V2 editorial site, English by default,
  Portuguese through `?lang=pt`.
- Lighthouse production audit: 100 in performance, accessibility, best practices
  and SEO, on mobile and desktop (re-verified on 2026-11-18 against
  https://bellussi.vercel.app/ with Lighthouse 13.6.0).
- Resumes updated to Pleno / B2+, in PT and EN, one page, ATS; PDFs in `cv/`,
  `public/` and `Documents\Curriculos`.

## Recent updates (2026-11-18)

- **ATLAS captures from live production (`https://atlas-bellussi.pages.dev/`):**
  - `public/atlas-home.webp` (`1200x716` WebP) captured directly from
    `https://atlas-bellussi.pages.dev/` and mirrored to
    `github-profile-readme/assets/atlas-preview.webp`.
  - `public/atlas-reading.webp` (`1200x1178` WebP) captured directly from
    `https://atlas-bellussi.pages.dev/leitura/marxismo`.
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
  - Updated `assets/atlas-preview.webp` from the live `https://atlas-bellussi.pages.dev/` capture (`1200x716`).
  - Added Dalibre, Scriptorium, Dalibre Hardcover, Dalibre ISBN Brasil and
    Dalibre Open Library to `README.md` (both English and Portuguese sections).

## Open items

- Decide whether to keep `lenis` / `src/utils/smooth-scroll.js` wired or prune
  unused scroll/parallax utilities if not needed.
- Contact modality and availability remain omitted from the repo; ATLAS card
  height at 375 px (~1,035 px) due to copy length.
