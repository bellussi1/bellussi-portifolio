# Portfolio Project Previews Implementation Plan

> For agentic workers: implement this plan task by task with superpowers:executing-plans. Steps use checkbox syntax for tracking.

**Goal:** Replace the weak Comandinha preview and oversized Black Market screenshot with two legible, professionally composed product previews that fit the Index portfolio.

**Architecture:** Keep Comandinha as accessible, static HTML/SVG rendered by the existing portfolio renderer. Capture the Black Market preview from the updated recipe screen and crop away application chrome so its recipe calculation and graph lead the image.

**Tech Stack:** Vanilla JavaScript, CSS, Node test runner, Playwright browser capture.

**Spec:** User-approved direction in this conversation: editorial operations dashboard with a dominant revenue chart, concise indicators and order activity; Black Market preview focused on recipe graph and revenue calculation.

## Global Constraints

- Keep the portfolio Index dark, cream, charcoal and terracotta visual language; do not add gradients.
- Keep desktop as the primary composition while making narrow previews reflow without clipping or horizontal overflow.
- Label all Comandinha sample numbers as demonstration data.
- Keep Portuguese and English accessible labels and captions accurate.
- Use a screenshot captured from the real Black Market interface; do not fabricate application data.

## Review Focus

- Narrow preview widths: headings, chart labels and order states remain visible without clipping.
- English and Portuguese markup: every visible dashboard label stays localized.
- Screenshot crop: result metrics and production graph remain recognizable at portfolio scale.
- Reduced-motion and reveal state: project rows remain aligned to the architectural grid when animation is enabled or disabled.

---

## Task 1: Recompose the Comandinha dashboard preview

- [x] Add assertions to test/product-showcase.test.js for the revenue-led composition, order queue and absence of the oversized navigation rail.
- [x] Run node --test test/product-showcase.test.js; confirm the new assertions fail against the current dashboard.
- [x] Rewrite renderComandinhaDashboard() markup into a compact restaurant header, meaningful sales metrics, dominant revenue chart and concise order queue.
- [x] Replace the old plum sidebar styling in styles/concepts/index-atmosphere.css with cream, graphite and restrained terracotta surfaces; preserve responsive layouts.
- [x] Run node --test test/product-showcase.test.js and then npm test; both must pass.
- [x] Commit the Comandinha markup, styles, test and plan together as one atomic portfolio change.

Expected: the Comandinha preview presents useful operational information at a glance, remains visibly marked as demonstration data, and has no wide navigation rail.

## Task 2: Replace the Black Market preview image

- [x] Add an assertion that public/black-market-recipe.png pixel dimensions match portfolioContent.products metadata.
- [x] Run node --test test/product-showcase.test.js; confirm the dimension assertion fails for a mismatched artifact.
- [x] Capture the updated real recipe workspace with the application sidebar omitted and the result metrics plus production graph visible.
- [x] Replace public/black-market-recipe.png and update its actual dimensions, alt text and caption in src/content/portfolio.js.
- [x] Run node --test test/product-showcase.test.js and then npm test; both must pass.
- [x] Inspect the project section at desktop and narrow viewport widths; confirm the image remains in the grid and does not overflow.
- [x] Commit the Black Market image and its metadata/test updates together as one atomic portfolio change.

Expected: the Black Market image clearly communicates recipe value and production structure instead of showing a tiny full-page screenshot.
