import { test } from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import { portfolioContent } from "../src/content/portfolio.js";
import { renderPortfolioSections } from "../src/content/render-portfolio.js";

const siteRoot = new URL("../", import.meta.url);

test("shows a dashboard preview and a real local recipe screenshot", async () => {
  assert.equal(portfolioContent.products.length, 2);
  const field = renderPortfolioSections({ concept: "field", language: "pt" });
  const index = renderPortfolioSections({ concept: "index", language: "pt" });

  for (const product of portfolioContent.products) {
    assert.ok(product.pt.imageAlt, "missing Portuguese alt for " + product.name);
    assert.ok(product.en.imageAlt, "missing English alt for " + product.name);
    assert.ok(product.pt.imageCaption, "missing Portuguese caption for " + product.name);
    assert.ok(product.en.imageCaption, "missing English caption for " + product.name);

    if (product.id === "comandinha") {
      for (const section of [field.products, index.products]) {
        assert.match(section, /class="comandinha-dashboard" role="img"/);
        assert.doesNotMatch(section, /<main\b[^>]*comandinha-dashboard__main/);
        assert.ok(section.includes(product.pt.imageAlt));
      }
    } else {
      assert.ok(product.image.src, "missing recipe screenshot for " + product.name);
      assert.ok(product.image.width > 0, "missing image width for " + product.name);
      assert.ok(product.image.height > 0, "missing image height for " + product.name);
      for (const section of [field.products, index.products])
        assert.ok(section.includes(product.image.src));
      await stat(new URL("public" + product.image.src, siteRoot));
    }
  }
  const blackMarket = portfolioContent.products.find(
    ({ id }) => id === "black-market",
  );
  assert.deepEqual(blackMarket.links, []);
});
