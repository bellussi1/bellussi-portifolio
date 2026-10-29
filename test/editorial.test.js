import test from "node:test";
import assert from "node:assert/strict";
import { renderEditorial } from "../src/editorial/render.js";
import { portfolioContent } from "../src/content/portfolio.js";
import { extractPortuguese } from "../scripts/source-copy.mjs";
import { readFileSync } from "node:fs";
const original = readFileSync(
  new URL("../index.html", import.meta.url),
  "utf8",
);
const pt = extractPortuguese(original);
test("extracts complete static PT markup, including accents and inline emphasis", () => {
  assert.match(pt.heroDescription, /Construo/);
  assert.match(pt.aboutLead, /Gosto/);
  assert.match(pt.approachTitle, /<br\s*\/>/);
  assert.equal(pt.resume, "Baixar currículo");
});
for (const language of ["pt", "en"])
  test(`C prerenders all professional facts, projects and links in ${language}`, () => {
    const html = renderEditorial({ language, portuguese: pt });
    for (const item of [
      ...portfolioContent.experiences,
      ...portfolioContent.products,
      ...portfolioContent.openSourceProjects,
    ]) {
      assert.ok(html.includes(item.name), item.name);
      assert.ok(html.includes(item[language].description), item.id);
      for (const link of item.links ?? [])
        assert.ok(html.includes(link.href), link.href);
    }
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
    assert.match(html, /id="main"/);
    assert.match(html, /id="copy-status"/);
    assert.match(html, /curriculo-pt.pdf/);
    assert.match(html, /curriculo-en.pdf/);
    assert.ok(!html.includes("undefined"));
  });
