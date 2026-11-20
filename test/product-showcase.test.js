import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { portfolioContent } from "../src/content/portfolio.js";
import { renderPortfolioSections } from "../src/content/render-portfolio.js";

const siteRoot = new URL("../", import.meta.url);

test("renders the ATLAS captures as real WebP files with explicit dimensions", async () => {
  const { flagship } = portfolioContent;
  for (const image of Object.values(flagship.images)) {
    const bytes = await readFile(new URL("public" + image.src, siteRoot));
    assert.equal(bytes.subarray(0, 4).toString(), "RIFF");
    assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
    assert.ok(image.width > 0 && image.height > 0);
  }
  for (const language of ["pt", "en"]) {
    const { atlas } = renderPortfolioSections({ concept: "index", language });
    assert.ok(atlas.includes(escape(flagship[language].imageAlt)));
    for (const entry of flagship.tour) assert.ok(atlas.includes(escape(flagship[language].tour[entry.key].alt)));
    assert.match(atlas, /width="1200" height="716"/);
  }
});

function escape(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
