import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { english } from "../src/translations.js";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");
const productsSection = html.match(/<section\b(?=[^>]*\bid="products")[\s\S]*?<\/section>/)?.[0];

test("shows real local screenshots for both product cases", async () => {
  assert.ok(productsSection, "missing products section");
  const captures = [
    {
      caseName: "Comandinha",
      articleClass: "product-case-comandinha",
      source: "/comandinha-panel-login.png",
      altKey: "comandinhaImageAlt",
      captionKey: "comandinhaCaption",
    },
    {
      caseName: "Black Market",
      articleClass: "product-case-black-market",
      source: "/black-market-dashboard.webp",
      altKey: "blackMarketImageAlt",
      captionKey: "blackMarketCaption",
    },
  ];

  for (const capture of captures) {
    const productCase = productsSection.match(
      new RegExp(`<article class="product-case ${capture.articleClass}[^>]*>[\\s\\S]*?<\\/article>`),
    )?.[0];
    assert.ok(productCase, `missing ${capture.caseName} case study`);
    const image = productCase.match(/<img\b([^>]*)>/)?.[1];
    assert.ok(image, `missing ${capture.caseName} screenshot`);
    assert.match(image, new RegExp(`src=["']${capture.source}["']`));
    assert.match(image, new RegExp(`data-i18n-alt=["']${capture.altKey}["']`));
    assert.match(image, /\bwidth=["']\d+["']/i);
    assert.match(image, /\bheight=["']\d+["']/i);
    assert.match(image, /\bloading=["']lazy["']/i);
    assert.match(productCase, new RegExp(`data-i18n=["']${capture.captionKey}["']`));
    await stat(new URL(`public${capture.source}`, siteRoot));
    assert.equal(typeof english[capture.altKey], "string", `missing English alt for ${capture.caseName}`);
    assert.equal(typeof english[capture.captionKey], "string", `missing English caption for ${capture.caseName}`);
  }

  assert.doesNotMatch(productsSection, /concept\.svg|product-flow-panel/i);
  assert.match(productsSection, /Migração em andamento|Migration in progress/i);
  assert.match(productsSection, /captura local|local capture/i);
  assert.doesNotMatch(
    productsSection,
    /href=["']https:\/\/github\.com\/bellussi1\/Black-Market(?:["'/?#])/i,
    "the private source repository must not be linked publicly",
  );
});
