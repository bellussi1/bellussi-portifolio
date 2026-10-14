import { test } from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import { portfolioContent } from "../src/content/portfolio.js";

const siteRoot = new URL("../", import.meta.url);

test("shows real local screenshots for both product cases", async () => {
  assert.equal(portfolioContent.products.length, 2);
  for (const product of portfolioContent.products) {
    assert.ok(product.image.src, "missing image for " + product.name);
    assert.ok(product.image.width > 0, "missing image width for " + product.name);
    assert.ok(product.image.height > 0, "missing image height for " + product.name);
    assert.ok(product.pt.imageAlt, "missing Portuguese alt for " + product.name);
    assert.ok(product.en.imageAlt, "missing English alt for " + product.name);
    assert.ok(product.pt.imageCaption, "missing Portuguese caption for " + product.name);
    assert.ok(product.en.imageCaption, "missing English caption for " + product.name);
    await stat(new URL("public" + product.image.src, siteRoot));
  }
  const blackMarket = portfolioContent.products.find(
    ({ id }) => id === "black-market",
  );
  assert.deepEqual(blackMarket.links, []);
});
