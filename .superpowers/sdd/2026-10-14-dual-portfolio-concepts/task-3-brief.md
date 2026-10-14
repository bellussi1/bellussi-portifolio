### Task 3: Deep Field hero and atmosphere

**Files:**
- Create: `src/visuals/deep-field.js`
- Create: `styles/concepts/deep-field.css`
- Modify: `index.html`
- Modify: `src/main.js`

**Interfaces:**
- Produces: `initDeepField(canvas, { view = window } = {}) -> cleanup()`; returns a no-op cleanup when WebGL2 or shader setup is unavailable, and stops its render loop whenever reduced motion is active.
- Consumes: the hero canvas marked `data-deep-field`, the selected concept state from Task 1, and Lenis/native scroll position from Task 2.

- [x] Add an `aria-hidden` WebGL canvas beside the existing hero copy; preserve all title, description, resume, and contact content as normal HTML.
- [x] Implement a procedural WebGL2 light/material field with smooth pointer influence on fine-pointer desktop, a capped device pixel ratio, and CSS fallback when context or shader setup fails.
- [x] Pause the animation when the canvas leaves view, the document is hidden, or reduced motion is active; respond to live preference changes and clean up observers, pointer listeners, animation frames, and WebGL resources through the returned cleanup function.
- [x] Add Deep Field tokens and desktop composition in `styles/concepts/deep-field.css`; keep the visual restrained behind the professional content.
- [ ] Review WebGL fallback and live reduced-motion behavior using the Task 3 Review Focus check.
