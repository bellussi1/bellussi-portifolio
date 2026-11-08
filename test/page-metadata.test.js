import assert from "node:assert/strict";
import test from "node:test";
import { syncPageMetadata } from "../src/utils/page-metadata.js";

function createDocument() {
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:locale"]',
    'meta[property="og:locale:alternate"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
  ];
  const elements = new Map(
    selectors.map((selector) => [selector, { content: "" }]),
  );

  return {
    documentElement: { lang: "" },
    title: "",
    querySelector(selector) {
      assert.ok(
        elements.has(selector),
        `unexpected metadata selector: ${selector}`,
      );
      return elements.get(selector);
    },
    metadata: elements,
  };
}

test("keeps document and share metadata aligned with the selected language", () => {
  const document = createDocument();

  syncPageMetadata(document, "en");
  assert.equal(document.documentElement.lang, "en");
  assert.equal(document.title, "Enzo Bellussi — Software Engineer");
  assert.equal(
    document.metadata.get('meta[name="description"]').content,
    "Software engineer with 3+ years building enterprise web products. TypeScript, React, Angular and Node.js — performance, accessibility and maintainable systems.",
  );
  assert.equal(
    document.metadata.get('meta[property="og:locale"]').content,
    "en_US",
  );
  assert.equal(
    document.metadata.get('meta[property="og:locale:alternate"]').content,
    "pt_BR",
  );
  assert.equal(
    document.metadata.get('meta[name="twitter:title"]').content,
    document.title,
  );

  syncPageMetadata(document, "pt");
  assert.equal(document.documentElement.lang, "pt-BR");
  assert.equal(document.title, "Enzo Bellussi — Engenheiro de Software");
  assert.equal(
    document.metadata.get('meta[property="og:locale"]').content,
    "pt_BR",
  );
  assert.match(
    document.metadata.get('meta[name="description"]').content,
    /Engenheiro de software/,
  );
});
