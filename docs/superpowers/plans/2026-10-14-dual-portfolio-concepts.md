# Dual Portfolio Concepts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Deliver two switchable, distinct portfolio experiences that preserve Enzo's real content and work well on desktop and mobile.

**Architecture:** Keep one semantic HTML document and one source for PT/EN content. Select `field` or `index` from the `concept` query parameter, style each with separate theme files, and initialize only the corresponding decorative effects. Use Lenis for document scroll and a standalone WebGL2 canvas for the Deep Field hero, with CSS fallbacks.

**Tech Stack:** Existing Vite + HTML/CSS/JavaScript; Lenis; WebGL2; native `requestAnimationFrame`, `IntersectionObserver`, and browser history APIs.

**Spec:** [`docs/superpowers/specs/2026-10-14-portfolio-concepts-design.md`](../specs/2026-10-14-portfolio-concepts-design.md)

## Global Constraints

- `/` opens version A by default; `/?concept=b` opens version B directly.
- Keep the portfolio in Portuguese and English, with the existing experience, products, open source projects, approach, about, resume, and contact content.
- The composition is desktop-first. The mobile experience must be recomposed for touch and smaller screens, not merely reduced.
- Integrate Lenis while preserving keyboard scrolling, anchor links, natural mobile touch response, and reduced-motion behavior.
- `prefers-reduced-motion` disables Lenis and decorative movement, leaving complete static compositions.
- Keep the HTML semantic and shared content as the single source; do not duplicate translations or project data.
- Do not invent metrics, responsibilities, or outcomes; keep the effects original rather than copying reference sites.
- Add no UI framework or animation dependency beyond Lenis without a demonstrated need.
- Provide CSS/static fallbacks when WebGL or animation APIs are unavailable; content and navigation must remain usable.
- Do not expand the test suite in this scope without an identified need; the scroll-engine replacement may require updating its existing lifecycle tests.

## Review Focus

- **Missing or unknown `concept` query:** show Deep Field and mark only FIELD as selected. Manually open `/`, `/?concept=b`, and `/?concept=unknown` (Task 1).
- **Browser history after switching concepts:** keep the visual state and selected control in sync with Back/Forward. Manually switch A → B → Back → Forward (Task 1).
- **Reduced-motion preference changing while the page is open:** stop/destroy smooth and decorative motion, and restore only when the preference allows it. Toggle the OS/browser preference while the page is open (Tasks 2, 3, and 4).
- **WebGL2 unavailable or canvas context creation fails:** show the static Deep Field fallback without hiding copy, controls, or projects. Disable WebGL in browser settings or force the context initializer to fail during review (Task 3).
- **Touch-only viewport with no hover:** keep project details and actions visible and usable, and avoid the custom desktop cursor. Review both concepts at a narrow mobile viewport and use touch emulation (Tasks 4 and 5).

---

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

- [ ] Add the early document concept value in `index.html` so a direct `?concept=b` load does not flash the A palette before the module initializes.
- [ ] Add accessible `FIELD` and `INDEX` buttons using `[data-concept-option]`; expose the selected state with `aria-pressed`.
- [ ] Implement `readConcept` and `initConceptSwitcher` in `src/utils/concept.js`; selecting A removes the `concept` parameter, selecting B writes `concept=b`, and unrelated query parameters remain intact.
- [ ] Initialize the switcher in `src/main.js` and confirm selection, direct URLs, and Back/Forward through the Task 1 Review Focus checks.

### Task 2: Replace custom wheel inertia with Lenis

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/utils/smooth-scroll.js`
- Modify: `src/main.js`
- Modify: `styles/style.css`
- Modify: `test/smooth-scroll.test.js` only as required to replace assertions tied to the removed custom wheel algorithm

**Interfaces:**
- Produces: `initSmoothScroll({ view = window, page = document, LenisClass = Lenis } = {}) -> cleanup()` in `src/utils/smooth-scroll.js`; `LenisClass` is injectable so the existing lifecycle tests can use a small fake instance.
- Consumes: Lenis default export and the existing `initSmoothScroll()` call in `src/main.js`.
- Lenis options: `autoRaf: true`, `anchors: true`, `stopInertiaOnNavigate: true`, `syncTouch: false`, and `respectReducedMotion: true`.

- [ ] Add Lenis using the package manager and import its recommended stylesheet in `src/main.js`.
- [ ] Replace the custom wheel handler with a Lenis lifecycle that creates the instance when motion is allowed, starts/stops it with document visibility, reacts to live reduced-motion preference changes, and returns a cleanup function.
- [ ] Remove native `scroll-behavior: smooth` so it does not compete with Lenis; keep browser-native touch tracking with `syncTouch: false`.
- [ ] Update the existing smooth-scroll test file to assert constructor options, visibility stop/start, and destroy/recreate behavior when reduced-motion preference changes; do not add a separate test suite.
- [ ] Review keyboard scrolling, anchor navigation, PT/EN interaction, mobile touch, and live reduced-motion changes.

### Task 3: Deep Field hero and atmosphere

**Files:**
- Create: `src/visuals/deep-field.js`
- Create: `styles/concepts/deep-field.css`
- Modify: `index.html`
- Modify: `src/main.js`

**Interfaces:**
- Produces: `initDeepField(canvas, { view = window } = {}) -> cleanup()`; returns a no-op cleanup when WebGL2 or shader setup is unavailable, and stops its render loop whenever reduced motion is active.
- Consumes: the hero canvas marked `data-deep-field`, the selected concept state from Task 1, and Lenis/native scroll position from Task 2.

- [ ] Add an `aria-hidden` WebGL canvas beside the existing hero copy; preserve all title, description, resume, and contact content as normal HTML.
- [ ] Implement a procedural WebGL2 light/material field with smooth pointer influence on fine-pointer desktop, a capped device pixel ratio, and CSS fallback when context or shader setup fails.
- [ ] Pause the animation when the canvas leaves view, the document is hidden, or reduced motion is active; respond to live preference changes and clean up observers, pointer listeners, animation frames, and WebGL resources through the returned cleanup function.
- [ ] Add Deep Field tokens and desktop composition in `styles/concepts/deep-field.css`; keep the visual restrained behind the professional content.
- [ ] Review WebGL fallback and live reduced-motion behavior using the Task 3 Review Focus check.

### Task 4: Pixel Index texture and pointer treatment

**Files:**
- Create: `src/visuals/pixel-index.js`
- Create: `styles/concepts/pixel-index.css`
- Modify: `index.html`
- Modify: `src/main.js`

**Interfaces:**
- Produces: `initPixelIndex({ root = document.documentElement, view = window } = {}) -> cleanup()`; it tracks pointer position only when motion is allowed and `(hover: hover) and (pointer: fine)`.
- Consumes: `root.dataset.concept === "index"` from Task 1; no additional canvas or animation package.

- [ ] Add a decorative pixel/grain layer and an `aria-hidden` pointer marker; keep the native cursor visible and preserve keyboard focus styling.
- [ ] Implement low-intensity animated grid/grain and pointer-position CSS variables, with event listeners active only for fine pointers and removed by `cleanup()`.
- [ ] Add the marfim, ink, cobalt, and lima token set plus modular project-index styling in `styles/concepts/pixel-index.css`.
- [ ] Keep the texture static and pointer marker still for reduced motion, hide the custom marker on touch-only devices, and confirm through the Task 4 Review Focus check.

### Task 5: Responsive shared sections and accessibility integration

**Files:**
- Modify: `index.html`
- Modify: `src/main.js`
- Modify: `styles/concepts/deep-field.css`
- Modify: `styles/concepts/pixel-index.css`
- Modify: `styles/style.css`
- Modify: `styles/components/projects.css`
- Modify: `styles/components/premium.css`

**Interfaces:**
- Consumes: both concept controllers and the shared semantic content from Tasks 1–4.
- Produces: fully responsive A/B section compositions with the existing PT/EN controls, navigation, project links, resume downloads, and contact actions.

- [ ] Apply each concept's distinct composition to the existing experience, product, open-source, approach, about, and contact sections without duplicating translated content or project records.
- [ ] Recompose the hero, header/menu, and project cards for narrow touch viewports; ensure no text or action is available only through hover.
- [ ] Ensure concept switching leaves the language, selected section, and available actions intact; keep the selected button state announced to assistive technology.
- [ ] Confirm contrast, visible keyboard focus, skip link, menu behavior, reduced-motion static state, and that animation failure never hides content.
- [ ] Review both concepts at desktop and narrow mobile widths, including touch-only behavior, using the Task 5 Review Focus check.

### Task 6: Production build and final review

**Files:**
- Verify: `dist/` output from the existing Vite build; do not commit generated build output.

**Interfaces:**
- Consumes: all implementation tasks.
- Produces: a production build and reviewed local previews at `/` and `/?concept=b`.

- [ ] Run `npm run build`; expected result is Vite completing without compilation errors.
- [ ] Preview both URLs and verify the Task 1–5 acceptance checks in desktop, narrow mobile, reduced-motion, and WebGL fallback states.
- [ ] Summarize any platform limitation encountered and provide the two preview URLs for evaluation.

## Self-review

- **Spec coverage:** URL selection and content continuity (Task 1); Lenis, anchors, touch, and reduced motion (Task 2); WebGL field and fallback (Task 3); pixel grain and fine-pointer cursor (Task 4); all portfolio sections, desktop/mobile composition, and accessibility (Task 5); production build and direct concept previews (Task 6).
- **Step scan:** each checkbox is one code change or one review action with an observable result; no placeholder tasks remain.
- **Interface consistency:** `readConcept`, `initConceptSwitcher`, `initSmoothScroll`, `initDeepField`, and `initPixelIndex` each have one declared signature and cleanup contract.
- **Review Focus coverage:** all five input conditions map to a concrete review step in their owning task; implementation does not need a new automated suite for these visual/browser-dependent states.
- **Proportion:** six tasks separate URL/scroll infrastructure, two visual systems, shared integration, and the final build/review without duplicating project content.

## References

- Approved design: [`docs/superpowers/specs/2026-10-14-portfolio-concepts-design.md`](../specs/2026-10-14-portfolio-concepts-design.md)
- Lenis official setup, options, anchor behavior, and reduced-motion behavior: [darkroomengineering/lenis README](https://github.com/darkroomengineering/lenis/blob/main/README.md)
