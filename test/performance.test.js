import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");
const main = await readFile(new URL("src/main.js", siteRoot), "utf8");

test("ships local fonts and preloads the critical assets", () => {
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  assert.match(html, /href="\/fonts\/dm-sans-subset\.woff2"/);
  assert.match(html, /href="\/fonts\/dm-serif-display-italic-subset\.woff2"/);
  assert.match(html, /href="\/images\/atlas-home-1200\.avif"/);
  assert.match(html, /fetchpriority="high"/);
});

test("avoids scroll hijacking and heavy runtime animation dependencies", () => {
  assert.doesNotMatch(
    main,
    /initParallax|initSmoothScroll|requestAnimationFrame\(updateScroll/,
  );
  assert.doesNotMatch(html, /<script[^>]+src="https?:\/\//i);
  assert.doesNotMatch(main, /from "jquery|from "gsap|from "framer-motion/i);
});

test("declares dimensions for every content image", () => {
  const images = [...html.matchAll(/<img\b([^>]*)>/g)].map((m) => m[1]);
  assert.ok(images.length >= 5);
  for (const image of images) {
    assert.match(image, /\bwidth=["']\d+["']/i);
    assert.match(image, /\bheight=["']\d+["']/i);
    assert.match(image, /\balt=["'][^"']+["']/i);
  }
});
