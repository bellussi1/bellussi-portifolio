# Active context

Handoff between sessions. Read this first; update it before you stop. This file
is the shared state for both Claude Code and OpenCode, so it must describe the
real repository, not a plan.

Status: current as of 2026-11-10. Revalidate with `git status` and `git log`
before acting on anything below.

## Repository

- Current branch: `codex/portfolio-comandinha-visuals`, clean working tree, at
  `ddb7700` — `docs: record the final Lighthouse 100 audit`.
- That branch is **5 commits ahead of `main`**: V2 editorial restoration, the
  mid-level / English B2+ content update, the pre-paint JS class and the
  Lighthouse audit docs. The work is not merged into `main`.
- Branch name does not describe its content. Confirm with the user whether it
  should be merged, renamed or rebased before starting new work on top of it.

## Published state

- https://bellussi.vercel.app serves the V2 editorial site, English by default,
  Portuguese through `?lang=pt`.
- Lighthouse production audit: 100 in performance, accessibility, best practices
  and SEO, on mobile and desktop.
- Resumes updated to Pleno / B2+, in PT and EN, one page, ATS; PDFs in `cv/`,
  `public/` and `Documents\Curriculos`.

## Uncommitted work (2026-11-13)

- Home card of ATLAS now shows the new home (`public/atlas-home.webp`, captured
  from https://atlas-bellussi.pages.dev). The reading capture
  (`public/atlas-reading.webp`) is still in `public/`, unused by the cards.
- Scriptorium added to `openSourceProjects` (personal fork of
  TranslateBooksWithLLMs, source at github.com/bellussi1/Scriptorium).
- `index.html` product and project sections regenerated from the renderer;
  `test/portfolio-rendering.test.js` expects the new id list.
- Verified: `npm test` 54/54, `npm run build` ok, visual check at 1280 and 320 px.
- Committed as `72027dc` on `codex/portfolio-comandinha-visuals`. Not pushed.
- Critique fixes, not committed (2026-11-14): font sizes raised to a 12px floor
  in `styles/`; nav renamed to Case studies / Tools (PT: Estudos de caso /
  Ferramentas); mobile header is one row at 380px and below (105 → 65px);
  experience context disclosures open by default; Approach items cite facts
  already on the site (Zod, Lighthouse 100, ATLAS pipeline); Contact states
  role, São Paulo and language level.
- `test/concept-styles.test.js` now expects the one-row header at ≤380px.
- Open: Contact modality and availability (not in the repo); ATLAS card is still
  about 1,035 px tall at 375 px because of copy length; detector reports
  `flat-type-hierarchy` on index.html, likely a false positive because the scan
  does not read the CSS sizes.

## Known divergence

`README.md` says the site uses "no animation library", but `lenis` is a runtime
dependency and `src/utils/smooth-scroll.js` plus `src/utils/parallax.js` exist.
The README needs correcting, or the dependency needs justifying — decide which
is true before touching scroll behavior.

## Next steps

1. Decide the fate of the current branch (merge into `main`, rename, or rebase).
2. Reconcile the README with the real scroll/motion stack.
3. Only then take new visual or content work.
