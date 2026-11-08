import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { portuguese } from "../src/translations.js";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");

const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(
  (match) => match[0],
);

function articleWith(id) {
  return articles.find((article) => article.includes(`id="${id}"`));
}

test("features ATLAS as the main case study with the current live URL", async () => {
  assert.match(html, /<section[^>]+id="work"/);
  const atlas = articleWith("atlas-title");
  assert.ok(atlas, "missing ATLAS feature");
  assert.match(atlas, /id="atlas-title">ATLAS</);
  assert.match(
    atlas,
    /href="https:\/\/atlas-bellussi\.pages\.dev\/"/,
    "ATLAS must link to the current live deployment",
  );
  assert.match(atlas, /href="https:\/\/github\.com\/bellussi1\/ATLAS"/);
  assert.doesNotMatch(html, /atlas-kappa-drab\.vercel\.app/);
  assert.match(atlas, /data-i18n="atlasMetric2Value">7,918</);
  assert.match(atlas, /data-i18n="atlasMetric3Value">898</);
  assert.match(atlas, /data-i18n="atlasMetric1Value">896</);
});

test("shows real, responsive screenshots for every product", async () => {
  const captures = [
    {
      name: "ATLAS",
      id: "atlas-title",
      source: "/images/atlas-reading-1200.webp",
      altKey: "atlasReadingAlt",
    },
    {
      name: "KOReader Ecosystem",
      id: "koreader-title",
      source: "/images/koreader-library-720.webp",
      altKey: "koreaderAlt",
    },
    {
      name: "Black Market",
      id: "black-market-title",
      source: "/images/black-market-720.webp",
      altKey: "blackMarketAlt",
    },
    {
      name: "Comandinha",
      id: "comandinha-title",
      source: "/images/comandinha-720.webp",
      altKey: "comandinhaAlt",
    },
  ];

  for (const capture of captures) {
    const block = articleWith(capture.id);
    assert.ok(block, `missing ${capture.name} block`);

    const picture = block.match(/<picture>[\s\S]*?<\/picture>/)?.[0];
    assert.ok(picture, `missing responsive picture for ${capture.name}`);
    assert.match(picture, /type="image\/avif"/);
    assert.match(picture, /type="image\/webp"/);
    assert.match(picture, /720\.(avif|webp)/);
    assert.match(picture, /1200\.(avif|webp)/);

    const image = picture.match(/<img\b([^>]*)>/)?.[1];
    assert.ok(image, `missing image for ${capture.name}`);
    assert.match(image, new RegExp(`src=["']${capture.source}["']`));
    assert.match(
      image,
      new RegExp(`data-i18n-alt=["']${capture.altKey}["']`),
    );
    assert.match(image, /\bwidth=["']\d+["']/i);
    assert.match(image, /\bheight=["']\d+["']/i);
    assert.match(image, /\bloading=["']lazy["']/i);
    assert.equal(
      typeof portuguese[capture.altKey],
      "string",
      `missing Portuguese alt for ${capture.name}`,
    );
    await stat(new URL(`public${capture.source}`, siteRoot));
  }
});

test("links the open-source tools and their current repositories", () => {
  for (const repo of [
    "deploy-preflight",
    "local-webhook-recorder",
    "compose-doctor",
    "koreader-ecosystem",
    "Black-Market",
    "comandinha",
  ]) {
    assert.match(
      html,
      new RegExp(`https://github\\.com/bellussi1/${repo}`),
      `missing repository link: ${repo}`,
    );
  }
});
