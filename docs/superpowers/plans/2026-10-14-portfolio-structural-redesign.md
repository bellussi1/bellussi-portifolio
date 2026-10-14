# Portfolio Structural Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Replace the two rejected color-led variants with two structurally distinct portfolio compositions, keeping real content shared and readable on desktop and mobile.

**Architecture:** Keep the existing Vite/HTML/CSS/JavaScript app and URL concept switcher. Move experience, product, and open-source records into a bilingual content model and render two semantic HTML templates from it; the rest of the page remains shared. Give FIELD and INDEX their own hero/section composition and solid-color styling, then verify responsive, accessibility, and motion behavior in the browser.

**Tech Stack:** Vite 8, native HTML/CSS/ES modules, Node node:test, existing Lenis, existing WebGL2 controller, existing browser automation tools.

**Spec:** [docs/superpowers/specs/2026-10-14-portfolio-redesign-design.md](../specs/2026-10-14-portfolio-redesign-design.md)

## Global Constraints

- / opens FIELD; /?concept=b opens INDEX.
- The composition is desktop-first; each version also needs a mobile experience with its own rhythm and hierarchy.
- The user does not want gradients, rejected the saturated lime green from INDEX, and prioritizes clear reading.
- Both versions preserve experience, products, open source, approach, about, resumes, contact, languages, links, and existing metadata.
- No results, responsibilities, or metrics may be invented.
- Keep Lenis with keyboard scrolling, anchors, and natural touch behavior; destroy its instance when reduced motion is active.
- prefers-reduced-motion stops all translations, parallax, animated textures, and canvas motion, including more-specific hover rules.
- Hover and focus states keep sufficient contrast; the selected language remains visually identifiable.
- Changing pointer capability from fine to coarse detaches inapplicable listeners and clears visual state.
- Keep semantic HTML, skip link, landmarks, headings, visible focus, named controls, keyboard navigation, and accessible links.
- Do not add an interface framework or animation package beyond the existing Lenis.
- Keep WebGL isolated with capped resolution/cadence, offscreen pause, and a static fallback.
- Do not use CSS gradients or color gradients in canvas; use solid colors, outlines, lines, and subtle texture.

## Review Focus

- **Direct concept load and history with a non-default language:** / and /?concept=b must produce the requested composition; Back/Forward must restore the composition while preserving language and unrelated query values (Tasks 1 and 5).
- **Localized records and private work:** both templates must show the same project facts and real screenshots/links in PT and EN, while never exposing a public source URL for Black Market (Task 1).
- **WebGL or shader unavailable:** FIELD remains readable and navigable when WebGL2 or shader setup fails; its static fallback stays visible (Tasks 2 and 5).
- **Fine pointer becomes coarse, or reduced motion changes live:** remove pointer listeners/state and stop all decorative motion, then reinitialize only when motion and pointer preferences allow it (Tasks 4 and 5).
- **320px viewport and focused contact controls:** keep the header within the viewport, tap targets at least 44px, and hover/focus text distinguishable from its surface (Task 4 browser review).

---

### Task 1: Shared bilingual content and concept-specific renderers

**Files:**
- Create: src/content/portfolio.js
- Create: src/content/render-portfolio.js
- Create: test/portfolio-rendering.test.js
- Modify: index.html
- Modify: src/main.js
- Modify: src/utils/parallax.js
- Modify: test/parallax.test.js
- Modify: test/product-showcase.test.js

**Interfaces:**
- portfolioContent in src/content/portfolio.js exports experiences, products, and openSourceProjects. Each record has a stable id, localized pt and en content, technologies, and its existing public links; product records also carry image path, dimensions, localized alt/caption, and status. Private Black Market has no source link.
- renderPortfolioSections({ concept, language }) -> { experience: string, products: string, projects: string } in src/content/render-portfolio.js returns semantic section-body markup. concept is "field" | "index" and language is "pt" | "en"; each template reads the same records but owns its markup and ordering.
- The three existing section wrappers keep their IDs/headings and receive [data-portfolio-content="experience|products|projects"] mounts. src/main.js calls the renderer on initial language setup and on concept/language changes, then refreshes reveal observation and parallax against the new nodes. initParallax(view = window, page = document) -> cleanup() removes its listeners, cancels a pending frame, and clears offsets so a concept switch can safely dispose and recreate it.

- [ ] **Step 1: Write the failing tests.** Add test/portfolio-rendering.test.js tests named renders distinct experience and product structures for FIELD and INDEX, keeps project facts, image paths, and public links consistent across concepts, renders PT and EN copy for every record, and does not publish a Black Market source link. Extend test/parallax.test.js with parallax cleanup detaches listeners and cancels scheduled frames, asserting scroll/resize/visibility/media listeners are removed and no frame or CSS offset remains. Assert FIELD products use ordered case-study articles and INDEX products use a two-column catalog-card structure; assert FIELD experience uses timeline rows and INDEX uses a table/index structure; assert the actual image paths, project destinations, language-specific copy, and private-link exclusion. Refactor test/product-showcase.test.js to validate assets and localized alternatives through portfolioContent, not hard-coded article markup.
- [ ] **Step 2: Run the focused test and verify it fails.** Run node --test --test-name-pattern="distinct experience|project facts|PT and EN|Black Market|parallax cleanup" test/portfolio-rendering.test.js test/parallax.test.js; expected: FAIL because the content module/renderer and cleanup contract do not exist.
- [ ] **Step 3: Implement the bilingual records and renderPortfolioSections interface.** Move current facts, copy, image metadata, technologies, and destinations without rewriting or inventing them. Use separate FIELD and INDEX templates; escape text and attribute values before producing HTML.
- [ ] **Step 4: Replace repeated experience/product/open-source articles in index.html with the three stable content mounts.** Keep section headings, labels, IDs, and the surrounding semantic section structure.
- [ ] **Step 5: Integrate rendering in src/main.js.** Render with the active language and concept at boot, after language changes, after concept-control clicks, and after popstate; disconnect and reobserve reveal nodes, dispose/recreate parallax for the current nodes, and preserve menu behavior, focus, and existing section IDs.
- [ ] **Step 6: Run node --test --test-name-pattern="distinct experience|project facts|PT and EN|Black Market" test/portfolio-rendering.test.js and npm test.** Expected: focused tests and the full suite pass; existing project screenshot assertions now read the content model.
- [ ] **Step 7: Commit.** git add src/content/portfolio.js src/content/render-portfolio.js test/portfolio-rendering.test.js test/product-showcase.test.js index.html src/main.js src/utils/parallax.js test/parallax.test.js && git commit -m "feat: render portfolio from shared bilingual content"

### Task 2: FIELD editorial hero and case-study narrative

**Files:**
- Modify: index.html
- Modify: src/visuals/deep-field.js
- Modify: styles/concepts/deep-field.css
- Modify: styles/style.css
- Modify: styles/components/projects.css
- Modify: test/deep-field.test.js
- Create: test/concept-styles.test.js

**Interfaces:**
- Consumes renderPortfolioSections({ concept, language }) from Task 1. The FIELD output uses semantic .field-experience-entry, .field-product-case, and .field-open-source-row structures.
- Keeps initDeepField(canvas, { view = window } = {}) -> cleanup() and its WebGL2 lifecycle contract.

- [ ] **Step 1: Add failing FIELD structure/style tests.** In test/concept-styles.test.js, add FIELD uses solid surfaces and positions the technical caption, asserting the .field-caption rule positions the caption and both deep-field.css and style.css contain no CSS gradient function. In test/portfolio-rendering.test.js, add hero markup exposes the FIELD composition anchor, checking the hero has an explicit FIELD visual-panel class and retains its HTML copy/actions. In test/deep-field.test.js, capture fragment shader source and add draws a crisp line field with one solid ink color, asserting the shader renders line/grid marks without a color wash. Run these tests and confirm failure against current styles/shader.
- [ ] **Step 2: Recompose the shared hero markup for the FIELD desktop layout.** Keep all translated title, description, location, CTA, and resume copy in normal HTML; make the visual field a large adjacent panel with coordinate labels and a static line fallback.
- [ ] **Step 3: Implement the FIELD shader and visual rules.** Draw crisp contour/grid lines with a single solid cyan ink and pointer deformation; remove the existing radial/linear washes, glow-heavy shadow treatment, and all gradients from deep-field.css and style.css, including the shared .visual-grid fallback. Set .field-caption { position: absolute; } so its insets take effect.
- [ ] **Step 4: Style FIELD content structures.** Make experience a vertical year/metadata rail with a content column; present large alternating product case studies; keep open-source projects as compact technical ledger rows; compose approach principles as a numbered sequence and about facts as an editorial grid. Maintain white/warm text contrast against solid blue-black surfaces.
- [ ] **Step 5: Verify red-to-green and regressions.** Run node --test --test-name-pattern="FIELD uses solid|hero markup exposes|crisp line field|WebGL2 failure|shader setup failure" test/concept-styles.test.js test/portfolio-rendering.test.js test/deep-field.test.js, then npm test. Expected: all targeted and full tests pass; both WebGL fallback lifecycle tests remain green.
- [ ] **Step 6: Review FIELD in browser at desktop and mobile.** At desktop 1440px wide, confirm a near-viewport hero panel, readable title, timeline, large alternating cases, and compact ledger. At 390px, confirm the content stacks intentionally and controls remain usable.
- [ ] **Step 7: Commit.** git add index.html src/visuals/deep-field.js styles/concepts/deep-field.css styles/style.css styles/components/projects.css test/deep-field.test.js test/concept-styles.test.js && git commit -m "feat: build the FIELD portfolio composition"

### Task 3: INDEX catalog hero and table-led sections

**Files:**
- Modify: index.html
- Modify: styles/concepts/pixel-index.css
- Modify: styles/style.css
- Modify: styles/components/projects.css
- Modify: src/visuals/pixel-index.js
- Modify: test/concept-styles.test.js
- Modify: test/portfolio-rendering.test.js

**Interfaces:**
- Consumes renderPortfolioSections({ concept, language }) from Task 1. INDEX output uses .index-experience-table, .index-product-grid, and .index-tool-row structures.
- Keeps initPixelIndex({ root = document.documentElement, view = window } = {}) -> cleanup() and the native cursor.

- [ ] **Step 1: Add failing INDEX composition and no-gradient tests.** Add INDEX uses a metadata hero, experience table, and two-column product catalog, asserting distinct returned structures from FIELD and checking .index-hero-meta/.index-hero-mark in index.html. Add both concept stylesheets contain no CSS gradients and INDEX avoids lime, asserting both concept stylesheets contain no gradient functions and INDEX tokens do not contain the rejected lime color. Run the focused tests and confirm they fail on current markup/styles.
- [ ] **Step 2: Recompose the INDEX hero markup and graphic.** Keep the name/function hierarchy in HTML; add an editorial metadata/index column and a solid modular graphic with crisp rules and typography.
- [ ] **Step 3: Implement INDEX palette and structure.** Use solid warm paper, charcoal, muted dark terracotta, and readable secondary text. Style experience as explicit period/organization/contribution columns, products as a two-column screenshot catalog, and open source as short rows; compose approach principles as a modular diagram and biography facts as labeled fields. Replace the current lime blocks and gradient textures with fine solid rules and a low-intensity SVG print-grain texture that shifts only a few pixels; do not use CSS gradient functions.
- [ ] **Step 4: Preserve the pointer treatment without replacing the native cursor.** Keep the terracotta marker small, decorative, hidden for coarse/no-hover pointers, and inactive when reduced motion is requested.
- [ ] **Step 5: Run targeted and full tests.** Run node --test --test-name-pattern="INDEX uses|both concept stylesheets|distinct experience|project facts" test/concept-styles.test.js test/portfolio-rendering.test.js, then npm test. Expected: both concept renderers remain different while using the same records; neither palette/style file contains gradients or lime.
- [ ] **Step 6: Review INDEX in browser at desktop and mobile.** At 1440px, confirm the column-led hero, experience table, two-column product grid, and compact tool rows. At 390px, confirm a deliberate single-column catalog without lost metadata or hover-only content.
- [ ] **Step 7: Commit.** git add index.html styles/concepts/pixel-index.css styles/style.css styles/components/projects.css src/visuals/pixel-index.js public/print-grain.svg test/concept-styles.test.js test/portfolio-rendering.test.js && git commit -m "feat: build the INDEX portfolio composition"

### Task 4: Accessibility, pointer lifecycle, and responsive regressions

**Files:**
- Modify: styles/components/concept-switcher.css
- Modify: styles/concepts/pixel-index.css
- Modify: styles/concepts/deep-field.css
- Modify: styles/style.css
- Modify: src/visuals/pixel-index.js
- Modify: test/pixel-index.test.js
- Modify: test/concept-styles.test.js

**Interfaces:**
- Consumes both completed concept renderers and their existing design tokens.
- Pixel Index pointer listeners remain owned by initPixelIndex; a capability change must detach or attach each pointer listener exactly once and clear --index-pointer-x, --index-pointer-y, and cursor state on detach.

- [ ] **Step 1: Add failing lifecycle and CSS regression tests.** Extend the pointer harness to retain listener counts for each event and expose the fine-pointer media preference. Add detaches pointer listeners and clears cursor state when capability becomes coarse, asserting zero pointer handlers/state after fine→coarse and exactly one each after coarse→fine. In test/concept-styles.test.js, add checks for visible selected-language differentiation, INDEX contact label/hover/focus contrast tokens, a reduced-motion override for all hover transforms, and FIELD caption positioning. Run focused tests and verify the listener and style assertions fail.
- [ ] **Step 2: Fix fine-to-coarse lifecycle in src/visuals/pixel-index.js.** On capability loss, remove all pointer handlers and clear pointer CSS variables and cursor data; on capability gain, attach one handler set only when motion is allowed and the page is visible.
- [ ] **Step 3: Fix language, contact, and reduced-motion styles.** Make the selected language visually distinct from inactive controls; ensure INDEX contact eyebrow and email hover/focus text differ clearly from the panel; reset .approach-card:hover movement under reduced motion with sufficient selector specificity. Preserve keyboard focus indicators in both palettes.
- [ ] **Step 4: Fix the 320px header while preserving touch targets.** Reflow/compact the concept selector, language controls, brand, and menu at narrow widths without reducing interactive targets below 44px.
- [ ] **Step 5: Verify focused tests.** Run node --test --test-name-pattern="detaches pointer listeners|selected language|contact|reduced motion|caption" test/pixel-index.test.js test/concept-styles.test.js, then npm test. Expected: all lifecycle/style regressions pass.
- [ ] **Step 6: Review both concepts at 320px, 360px, and 390px.** Assert document.documentElement.scrollWidth <= window.innerWidth; inspect every header control rectangle for at least 44px touch area; test keyboard focus and contact hover/focus contrast; check reduced motion has no computed transform on hover and no animated texture.
- [ ] **Step 7: Commit.** git add styles/components/concept-switcher.css styles/concepts/pixel-index.css styles/concepts/deep-field.css styles/style.css src/visuals/pixel-index.js test/pixel-index.test.js test/concept-styles.test.js && git commit -m "fix: make concept controls and motion accessible"

### Task 5: Cross-concept browser acceptance and production build

**Files:**
- Verify: production build and browser preview; do not commit dist/.
- Update: .superpowers/sdd/2026-10-14-portfolio-structural-redesign/progress.md with task results and final review rulings.

**Interfaces:**
- Consumes both rendered concept templates, the concept switcher, language controls, Lenis, WebGL fallback, and the Pixel Index pointer lifecycle.
- Produces a buildable portfolio locally available as FIELD at / and INDEX at /?concept=b.

- [ ] **Step 1: Run the full test suite and production build.** Run npm test and npm run build; expected: all tests pass and Vite completes without compilation errors.
- [ ] **Step 2: Preview both production routes and verify direct loads.** Confirm / selects FIELD and /?concept=b selects INDEX; change to EN, switch concepts, use Back/Forward, and confirm language and unrelated query parameters persist.
- [ ] **Step 3: Verify project integrity in both languages/concepts.** Confirm all five projects appear, both real product screenshots load with translated alt/captions, public links remain correct, Black Market has no source link, and no professional facts differ between layouts.
- [ ] **Step 4: Verify motion and fallback states.** Force WebGL2 context creation to fail and confirm FIELD copy/actions remain visible; test reduced motion on load and live preference changes; verify Lenis is absent while reduced motion is active; change fine→coarse pointer and confirm marker/listeners clear.
- [ ] **Step 5: Verify final desktop/mobile visual acceptance.** Review 1440px desktop for each concept, then 320px/360px/390px mobile; confirm no horizontal overflow, no gradients or lime treatment, legible text, visible focus, 44px targets, and no console errors.
- [ ] **Step 6: Record evidence and rulings in the SDD ledger.** Record exact test/build/browser outcomes and any remaining limitation using Final: Ruling: with its reason and cost if wrong.
- [ ] **Step 7: Commit the final ledger update.** git add .superpowers/sdd/2026-10-14-portfolio-structural-redesign/progress.md && git commit -m "docs: record structural redesign verification"

## Self-review

- **Spec coverage:** shared facts and PT/EN (Task 1); distinct FIELD hero/timeline/case studies/ledger and line field (Task 2); distinct INDEX hero/table/catalog/tool rows and palette (Task 3); all six previously reported issues, reduced motion, keyboard/focus and narrow layout (Task 4); direct routes, history, media fallback, both languages, desktop/mobile, and production build (Task 5).
- **Step scan:** each checkbox identifies one test, code change, review action, or commit with a concrete command/result; no TODO/TBD placeholders remain.
- **Interface consistency:** renderPortfolioSections({ concept, language }) and the three mount names are fixed in Task 1 and consumed consistently by Tasks 2–5; the existing visual-controller interfaces are preserved.
- **Review Focus coverage:** URL/language/history maps to Tasks 1 and 5; data/private links to Task 1; WebGL failure to Tasks 2 and 5; pointer/reduced-motion changes to Tasks 4 and 5; 320px/44px/contact contrast to Task 4.
- **Proportion:** five tasks separate content/rendering, each design system, cross-cutting accessibility, and final acceptance; implementation details stay at interface/test level.

## References

- Approved direction: docs/superpowers/specs/2026-10-14-portfolio-redesign-design.md
- Existing source and content model: index.html, src/main.js, src/translations.js, test/product-showcase.test.js
