// Rewrites the pre-rendered English markup inside index.html from
// src/content/portfolio.js, so the static HTML never drifts from the data.
// Usage: npm run prerender:sync
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { renderPortfolioSections } from "../src/content/render-portfolio.js";

const indexUrl = new URL("../index.html", import.meta.url);

/** Replaces the inner HTML of every `[data-portfolio-content]` container. */
export function syncPrerenderedSections(html, sections) {
  let output = html;
  for (const [key, markup] of Object.entries(sections)) {
    const opening = '<div data-portfolio-content="' + key + '">';
    const start = output.indexOf(opening);
    if (start === -1) throw new Error("Missing container: " + key);
    const contentStart = start + opening.length;
    const tag = /<\/?div\b[^>]*>/g;
    tag.lastIndex = contentStart;
    let depth = 1;
    let match;
    while ((match = tag.exec(output))) {
      depth += match[0].startsWith("</") ? -1 : 1;
      if (depth === 0) break;
    }
    if (!match) throw new Error("Unclosed container: " + key);
    output = output.slice(0, contentStart) + markup + output.slice(match.index);
  }
  return output;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const html = await readFile(indexUrl, "utf8");
  const sections = renderPortfolioSections({ concept: "index", language: "en" });
  const next = syncPrerenderedSections(html, sections);
  if (next !== html) await writeFile(indexUrl, next);
  console.log(next === html ? "index.html already in sync" : "index.html updated");
}
