import assert from "node:assert/strict";
import test from "node:test";
import { syncPageMetadata } from "../src/utils/page-metadata.js";

function createDocument() {
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:locale"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
  ];
  const elements = new Map(selectors.map((selector) => [selector, { content: "" }]));

  return {
    documentElement: { lang: "" },
    title: "",
    querySelector(selector) {
      assert.ok(elements.has(selector), `unexpected metadata selector: ${selector}`);
      return elements.get(selector);
    },
    metadata: elements,
  };
}

test("keeps document and share metadata aligned with the selected language", () => {
  const document = createDocument();

  syncPageMetadata(document, "en");
  assert.equal(document.documentElement.lang, "en");
  assert.equal(document.title, "Enzo Bellussi | Front-end Software Engineer");
  assert.equal(
    document.metadata.get('meta[name="description"]').content,
    "Enzo Bellussi is a Software Engineer focused on front-end, with experience at MarketData and Banco do Brasil.",
  );
  assert.equal(
    document.metadata.get('meta[property="og:locale"]').content,
    "en_US",
  );
  assert.equal(
    document.metadata.get('meta[name="twitter:title"]').content,
    document.title,
  );

  syncPageMetadata(document, "pt");
  assert.equal(document.documentElement.lang, "pt-BR");
  assert.equal(document.title, "Enzo Bellussi | Software Engineer com foco em Front-end");
  assert.equal(
    document.metadata.get('meta[property="og:locale"]').content,
    "pt_BR",
  );
});
