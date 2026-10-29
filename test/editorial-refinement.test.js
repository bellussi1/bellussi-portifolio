import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderEditorial } from "../src/editorial/render.js";
import { extractPortuguese } from "../scripts/source-copy.mjs";
const pt = extractPortuguese(
  readFileSync(new URL("../index.html", import.meta.url), "utf8"),
);
test("C showcases are cropped views with accessible full real screenshots", () => {
  const html = renderEditorial({ portuguese: pt });
  assert.equal((html.match(/class="case-art/g) ?? []).length, 2);
  assert.match(html, /data-inspect="black-market"/);
  assert.match(html, /data-inspect="koreader-ecosystem"/);
  assert.match(html, /<dialog[^>]+id="project-dialog"/);
  assert.match(html, /aria-labelledby="dialog-title"/);
  assert.match(html, /data-dialog-close/);
  assert.match(html, /class="name-line"/);
  assert.match(html, /id="reading-progress"/);
});
