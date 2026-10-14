import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("FIELD uses solid surfaces and positions the technical caption", () => {
  const css = read("../styles/concepts/deep-field.css");
  const base = read("../styles/style.css");
  const captionRule = css.match(/\.field-caption\s*\{([^}]+)\}/)?.[1] ?? "";

  assert.match(captionRule, /position:\s*absolute/);
  assert.doesNotMatch(css + base, /\b(?:radial|linear|conic)-gradient\s*\(/i);
});

test("INDEX uses a metadata hero, table and product catalog without lime", () => {
  const html = read("../index.html");
  const css = read("../styles/concepts/pixel-index.css");

  assert.match(html, /class="[^"]*index-hero-meta/);
  assert.match(html, /class="[^"]*index-hero-mark/);
  assert.match(css, /\.index-experience-table/);
  assert.match(css, /\.index-product-grid/);
  assert.doesNotMatch(css, /\b(?:radial|linear|conic)-gradient\s*\(/i);
  assert.doesNotMatch(css, /#c6ed5b|#d8ff79|index-lime/i);
});

test("both concepts have structurally distinct, solid-color compositions", () => {
  const field = read("../styles/concepts/deep-field.css");
  const index = read("../styles/concepts/pixel-index.css");

  assert.match(field, /\.field-experience-list/);
  assert.match(field, /\.field-product-list/);
  assert.match(index, /\.index-experience-table/);
  assert.match(index, /\.index-product-grid/);
  assert.doesNotMatch(field + index, /\b(?:radial|linear|conic)-gradient\s*\(/i);
});

test("mobile header controls keep 44px targets and reflow at 320px", () => {
  const base = read("../styles/style.css");
  const controls = read("../styles/components/concept-switcher.css");

  assert.match(controls, /\.concept-control button\s*\{[^}]*min-height:\s*44px/s);
  assert.match(base, /\.language-control button\s*\{[^}]*min-width:\s*44px/s);
  assert.match(base, /\.menu-toggle\s*\{[^}]*width:\s*44px[^}]*height:\s*44px/s);
  assert.match(base, /@media\s*\(max-width:\s*380px\)[\s\S]*\.header-inner\s*\{[^}]*grid-template-columns/s);
});

test("mobile INDEX disclosures and contact/footer controls keep 44px targets", () => {
  const base = read("../styles/style.css");
  const index = read("../styles/concepts/pixel-index.css");

  assert.match(index, /\.index-tool-demo summary\s*\{[^}]*min-height:\s*44px/s);
  assert.match(base, /\.brand\s*\{[^}]*min-width:\s*44px/s);
  assert.match(base, /\.email-line > a\s*\{[^}]*min-height:\s*44px/s);
  assert.match(base, /\.copy-email\s*\{[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
  assert.match(base, /\.footer-links a\s*\{[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
});

test("selected language and INDEX contact links remain distinct and readable", () => {
  const base = read("../styles/style.css");
  const index = read("../styles/concepts/pixel-index.css");

  assert.match(base, /\.language-control button\[aria-pressed="true"\][^{]*\{[^}]*color:\s*var\(--accent\)/s);
  assert.match(index, /\.language-control button\[aria-pressed="true"\][^{]*\{[^}]*text-decoration:\s*underline/s);
  assert.match(index, /\.contact-section \.email-line > a:(?:hover|focus-visible)/);
  assert.match(index, /\.contact-section \.contact-note[\s\S]*color:\s*#[0-9a-f]{6}/i);
});

test("reduced motion removes hover transforms from cards and screenshots", () => {
  const field = read("../styles/concepts/deep-field.css");
  const index = read("../styles/concepts/pixel-index.css");

  for (const css of [field, index]) {
    const reducedMotion = css.split("@media (prefers-reduced-motion: reduce)").at(-1);
    assert.match(reducedMotion, /\.approach-card:hover\s*\{[^}]*transform:\s*none/s);
    assert.match(reducedMotion, /\.portfolio-product-visual:hover img\s*\{[^}]*transform:\s*none/s);
  }
});
