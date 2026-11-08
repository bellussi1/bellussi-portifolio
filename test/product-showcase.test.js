import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { portfolioContent } from "../src/content/portfolio.js";
import { renderPortfolioSections } from "../src/content/render-portfolio.js";

const siteRoot = new URL("../", import.meta.url);

test("renders the KOReader showcase with localized demo screenshots", async () => {
  const product = portfolioContent.products.find(({ id }) => id === "koreader-ecosystem");
  assert.ok(product);
  assert.equal(product.links[0].href, "https://github.com/bellussi1/koreader-ecosystem");
  for (const language of ["pt", "en"]) {
    const image = product.image[language].desktop;
    const bytes = await readFile(new URL("public" + image.src, siteRoot));
    assert.equal(bytes.readUInt32BE(16), image.width);
    assert.equal(bytes.readUInt32BE(20), image.height);
    for (const concept of ["field", "index"]) {
      const section = renderPortfolioSections({ concept, language }).products;
      assert.ok(section.includes(image.src));
      assert.ok(section.includes(product[language].imageAlt));
      assert.ok(section.includes(product.name));
      assert.doesNotMatch(section, /Comandinha/i);
    }
  }
});
