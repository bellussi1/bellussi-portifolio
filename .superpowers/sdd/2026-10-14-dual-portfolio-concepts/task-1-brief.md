### Task 1: Concept URL state and switcher

**Files:**
- Create: `src/utils/concept.js`
- Modify: `index.html`
- Modify: `src/main.js`
- Modify: `styles/components/premium.css` or the new shared concept-control stylesheet selected during implementation

**Interfaces:**
- Produces: `readConcept(search: string) -> "field" | "index"`, where only `concept=b` selects `index`; all other values select `field`.
- Produces: `initConceptSwitcher({ root, view } = {}) -> cleanup()`, which sets `root.dataset.concept`, updates `[data-concept-option]` button `aria-pressed` values, changes the query with `history.pushState`, and synchronizes on `popstate`.
- Consumes: the existing header controls and the above interface is consumed by `src/main.js` before visual controllers initialize.

- [x] Add the early document concept value in `index.html` so a direct `?concept=b` load does not flash the A palette before the module initializes.
- [x] Add accessible `FIELD` and `INDEX` buttons using `[data-concept-option]`; expose the selected state with `aria-pressed`.
- [x] Implement `readConcept` and `initConceptSwitcher` in `src/utils/concept.js`; selecting A removes the `concept` parameter, selecting B writes `concept=b`, and unrelated query parameters remain intact.
- [x] Initialize the switcher in `src/main.js` and confirm selection, direct URLs, and Back/Forward through the Task 1 Review Focus checks.
