import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  readVariant,
  comparisonLinks,
  initialLanguage,
} from "../src/experiment/state.js";

test("variant routes distinguish trailing slashes, unrelated paths and default", () => {
  assert.equal(readVariant("/"), "a");
  assert.equal(readVariant("/v2"), "b");
  assert.equal(readVariant("/v2/"), "b");
  assert.equal(readVariant("/v3/index.html"), "c");
  assert.equal(readVariant("/v30"), "a");
});
test("comparison links preserve explicit language without depending on storage", () => {
  for (const lang of ["pt", "en"]) {
    const links = comparisonLinks(
      "https://example.com/v2?compare=1&lang=" + lang + "#experience",
      lang,
    );
    assert.deepEqual(
      links.map((l) => l.pathname),
      ["/", "/v2", "/v3"],
    );
    for (const link of links) {
      assert.equal(link.searchParams.get("lang"), lang);
      assert.equal(link.searchParams.get("compare"), "1");
      assert.equal(link.hash, "#experience");
    }
  }
});
test("URL language takes precedence; invalid query falls back to preference then PT", () => {
  assert.equal(initialLanguage("?lang=en", "pt"), "en");
  assert.equal(initialLanguage("?lang=pt", "en"), "pt");
  assert.equal(initialLanguage("?lang=xx", "en"), "en");
  assert.equal(initialLanguage("", null), "pt");
});
test("B styles declare typography only, with scope and no layout or color properties", () => {
  const css = readFileSync(
    new URL("../styles/variants/typography.css", import.meta.url),
    "utf8",
  ).replace(/\/\*[\s\S]*?\*\//g, "");
  const declarations = [...css.matchAll(/(?:^|[;{])\s*([\w-]+)\s*:/g)].map(
    (m) => m[1],
  );
  const allowed =
    /^(--font|--display|font[\w-]*|line-height|letter-spacing|text-rendering|text-wrap)$/;
  assert.ok(declarations.length > 5);
  assert.deepEqual(
    declarations.filter((p) => !allowed.test(p)),
    [],
  );
  assert.match(css, /data-variant="b"/);
});
import { normalizeVariantRequest } from "../src/experiment/state.js";
test("Vite route normalization preserves the query and maps only experiment paths", () => {
  assert.equal(
    normalizeVariantRequest("/v3?lang=en"),
    "/v3/index.html?lang=en",
  );
  assert.equal(normalizeVariantRequest("/v2/"), "/v2/index.html");
  assert.equal(normalizeVariantRequest("/v30"), "/v30");
});

test("Vercel cleanUrls never conflicts with explicit HTML rewrites", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  for (const rewrite of config.rewrites) {
    assert.ok(!(config.cleanUrls && rewrite.destination.endsWith('.html')), 'cleanUrls removes HTML extensions before rewrites');
  }
  assert.deepEqual(config.rewrites.map(r=>r.source), ['/v2','/v3']);
});
