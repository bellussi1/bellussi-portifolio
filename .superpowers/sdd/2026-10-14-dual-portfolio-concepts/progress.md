# SDD ledger — plan: docs/superpowers/plans/2026-10-14-dual-portfolio-concepts.md

## Setup
- Worktree: `C:/Users/Bellussi/Documents/Workspace/Portifolio/bellussi-portifolio/.worktrees/dual-portfolio-concepts`
- Branch: `codex/dual-portfolio-concepts`
- Base: `7fefd95` (`chore: ignore local worktrees`)
- Approved spec: `docs/superpowers/specs/2026-10-14-portfolio-concepts-design.md`
- Approved plan: `docs/superpowers/plans/2026-10-14-dual-portfolio-concepts.md`
- TDD skill loaded; existing tests may be updated where the scroll engine changes. No unrelated test suite expansion.

## Todo
- [x] Task 1: Concept URL state and switcher
- [ ] Task 2: Replace custom wheel inertia with Lenis
- [ ] Task 3: Deep Field hero and atmosphere
- [ ] Task 4: Pixel Index texture and pointer treatment
- [ ] Task 5: Responsive shared sections and accessibility integration
- [ ] Task 6: Production build and final review

## Pre-flight interface scan
- Task 1 -> Task 3: `root.dataset.concept` chooses the visual controller; initialize Deep Field only for `field`.
- Task 1 -> Task 4: `root.dataset.concept === "index"` gates Pixel Index listeners and texture behavior.
- Task 1 -> Task 5: concept selection shares one document and language state; query changes must not reload or duplicate content.
- Task 2 -> Task 3: Deep Field reads browser scroll state only; Lenis keeps native document scrolling, so the canvas can follow `window.scrollY` without a second scroll engine.
- Tasks 3 and 4 -> Task 5: both theme controllers are created in `src/main.js`; each must return a cleanup function and own only its own listeners/frames.
- Tasks 1-5 -> Task 6: final build and browser review depend on the integrated theme state and controllers.

## Task results

## Baseline
- `npm ci`: passed; 15 packages installed, 0 vulnerabilities.
- `npm test`: passed; 11 tests, 0 failures.

## Task 1
- Ruling: add `test/concept.test.js` for URL parsing and switcher history/ARIA behavior — the approved plan named review cases but no failing test file, while the selected Native executor requires TDD for production behavior — cost if wrong: one focused test file to maintain.

- Result: Task 1 complete; 
pm test passed 14/14 tests; git diff --check clean.
