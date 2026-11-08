import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { englishUi, portuguese } from "../src/translations.js";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");

function collectKeys(attribute) {
  return [
    ...new Set(
      [...html.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map(
        (match) => match[1],
      ),
    ),
  ];
}

test("every English-first string has a Portuguese translation", () => {
  for (const key of collectKeys("data-i18n")) {
    assert.equal(
      typeof portuguese[key],
      "string",
      `missing Portuguese translation for ${key}`,
    );
  }
  for (const key of collectKeys("data-i18n-alt")) {
    assert.equal(
      typeof portuguese[key],
      "string",
      `missing Portuguese alt text for ${key}`,
    );
  }
  for (const key of [
    "menuOpen",
    "menuClose",
    "mainNavigation",
    "copyEmailAria",
    "copied",
    "emailCopied",
    "copyError",
    "brandHome",
  ]) {
    assert.equal(typeof englishUi[key], "string", `missing English UI ${key}`);
    assert.equal(typeof portuguese[key], "string", `missing Portuguese ${key}`);
  }
});

test("ships English by default and keeps the resume language-aware", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Enzo Bellussi — Software Engineer<\/title>/);
  assert.match(html, /data-language="en"[^>]*aria-pressed="true"/);
  assert.match(html, /data-language="pt"[^>]*aria-pressed="false"/);
  assert.match(
    html,
    /class="header-resume" href="\/curriculo-en\.pdf" data-resume/,
  );
  assert.match(html, /href="\/curriculo-pt\.pdf"|data-resume/);
});
