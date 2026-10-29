import { readFile, writeFile, mkdir } from "node:fs/promises";
import { extractPortuguese } from "./source-copy.mjs";
import { renderEditorial } from "../src/editorial/render.js";
const root = new URL("../", import.meta.url);
const original = await readFile(new URL("index.html", root), "utf8");
const portuguese = extractPortuguese(original);
await writeFile(
  new URL("src/editorial/portuguese.generated.js", root),
  `// Generated from index.html; edit original copy, not this file.
export const portuguese = ${JSON.stringify(portuguese, null, 2)};
`,
);
// Keep other metadata factual, canonical at root, and prevent experiment indexing without JS.
function experimentHead(html) {
  return html
    .replace(/(<meta name="robots" content=")[^"]+/, "$1noindex, follow")
    .replace(/<link\s+rel="preload"[\s\S]*?\/>/g, "");
}
const preload =
  '<link rel="preload" href="/fonts/zilla-slab-400-normal-latin.woff2" as="font" type="font/woff2" crossorigin>';
const displayPreload =
  '<link rel="preload" href="/fonts/zilla-slab-500-normal-latin.woff2" as="font" type="font/woff2" crossorigin>';
const italicPreload =
  '<link rel="preload" href="/fonts/zilla-slab-400-italic-latin.woff2" as="font" type="font/woff2" crossorigin>';
const b = experimentHead(original)
  .replace('data-concept="index"', 'data-concept="index" data-variant="b"')
  .replace("</head>", `${preload}${displayPreload}${italicPreload}</head>`)
  .replace("/src/main.js", "/src/experiment/typography.js");
let head = experimentHead(original).match(/<head>([\s\S]*?)<\/head>/)[1];
head = head
  .replace('let theme = "dark"', 'let theme = "light"')
  .replace(
    "Dark is the intentional first-visit theme.",
    "Light is the editorial first-visit theme.",
  );
head = head.replace(
  'content="#1d1c19" data-theme-color',
  'content="#ffffff" data-theme-color',
);
head +=
  preload +
  displayPreload +
  '<link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>';
const c = `<!doctype html><html lang="pt-BR" data-variant="c"><head>${head}</head><body><div id="editorial-root">${renderEditorial({ portuguese })}</div><script type="module" src="/src/editorial/main.js"></script></body></html>`;
for (const [path, html] of [
  ["v2", b],
  ["v3", c],
]) {
  await mkdir(new URL(path + "/", root), { recursive: true });
  await writeFile(new URL(path + "/index.html", root), html);
}
console.log(
  "Generated /v2 from unchanged A and /v3 from shared content (PT prerendered).",
);
