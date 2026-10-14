### Task 4: Pixel Index texture and pointer treatment

**Files:**
- Create: `src/visuals/pixel-index.js`
- Create: `styles/concepts/pixel-index.css`
- Modify: `index.html`
- Modify: `src/main.js`

**Interfaces:**
- Produces: `initPixelIndex({ root = document.documentElement, view = window } = {}) -> cleanup()`; it tracks pointer position only when motion is allowed and `(hover: hover) and (pointer: fine)`.
- Consumes: `root.dataset.concept === "index"` from Task 1; no additional canvas or animation package.

- [x] Add a decorative pixel/grain layer and an `aria-hidden` pointer marker; keep the native cursor visible and preserve keyboard focus styling.
- [x] Implement low-intensity animated grid/grain and pointer-position CSS variables, with event listeners active only for fine pointers and removed by `cleanup()`.
- [x] Add the marfim, ink, cobalt, and lima token set plus modular project-index styling in `styles/concepts/pixel-index.css`.
- [ ] Keep the texture static and pointer marker still for reduced motion, hide the custom marker on touch-only devices, and confirm through the Task 4 Review Focus check.
