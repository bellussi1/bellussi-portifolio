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

- [x] Add Lenis using the package manager and import its recommended stylesheet in `src/main.js`.
- [x] Replace the custom wheel handler with a Lenis lifecycle that creates the instance when motion is allowed, starts/stops it with document visibility, reacts to live reduced-motion preference changes, and returns a cleanup function.
- [x] Remove native `scroll-behavior: smooth` so it does not compete with Lenis; keep browser-native touch tracking with `syncTouch: false`.
- [x] Update the existing smooth-scroll test file to assert constructor options, visibility stop/start, and destroy/recreate behavior when reduced-motion preference changes; do not add a separate test suite.
- [ ] Review keyboard scrolling, anchor navigation, PT/EN interaction, mobile touch, and live reduced-motion changes.
