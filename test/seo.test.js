import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");

function getMeta(attribute, value) {
  const tags = [...html.matchAll(/<meta\b([^>]*)>/gs)];
  const tag = tags.find(([, rawAttributes]) => {
    const attributes = new Map(
      [...rawAttributes.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(
        ([, name, content]) => [name, content],
      ),
    );
    return attributes.get(attribute) === value;
  });

  if (!tag) return undefined;
  const content = tag[1].match(/\bcontent\s*=\s*["']([^"']*)["']/);
  return content?.[1];
}

test("publishes complete canonical and social metadata", () => {
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<title>Enzo Bellussi \| Software Engineer[^<]*<\/title>/);
  assert.equal(getMeta("name", "author"), "Enzo Bellussi");
  assert.match(getMeta("name", "description") ?? "", /Enzo Bellussi/);
  assert.match(getMeta("name", "robots") ?? "", /index,\s*follow/);
  assert.match(html, /<link rel="canonical" href="https:\/\/bellussi\.vercel\.app\/"\s*\/>/);

  for (const property of [
    "og:title",
    "og:description",
    "og:type",
    "og:url",
    "og:site_name",
    "og:locale",
    "og:image",
    "og:image:type",
    "og:image:width",
    "og:image:height",
    "og:image:alt",
  ]) {
    assert.ok(getMeta("property", property), `missing ${property}`);
  }

  assert.equal(getMeta("property", "og:type"), "website");
  assert.equal(getMeta("property", "og:url"), "https://bellussi.vercel.app/");
  assert.equal(getMeta("property", "og:image:width"), "1200");
  assert.equal(getMeta("property", "og:image:height"), "630");
  assert.equal(getMeta("name", "twitter:card"), "summary_large_image");
  assert.ok(getMeta("name", "twitter:title"));
  assert.ok(getMeta("name", "twitter:description"));
  assert.equal(
    getMeta("name", "twitter:image"),
    "https://bellussi.vercel.app/og-image.png",
  );
  assert.ok(getMeta("name", "twitter:image:alt"));
});

test("provides factual profile structured data connected to public profiles", () => {
  const script = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(script, "missing JSON-LD script");

  const graph = JSON.parse(script[1])["@graph"];
  assert.ok(Array.isArray(graph), "JSON-LD should expose an @graph");
  const profile = graph.find((entry) => entry["@type"] === "ProfilePage");
  const person = graph.find((entry) => entry["@type"] === "Person");
  const website = graph.find((entry) => entry["@type"] === "WebSite");

  assert.equal(profile.mainEntity["@id"], person["@id"]);
  assert.equal(person.name, "Enzo Bellussi");
  assert.match(person.jobTitle, /Software Engineer/);
  assert.ok(person.sameAs.includes("https://github.com/bellussi1"));
  assert.ok(person.sameAs.includes("https://www.linkedin.com/in/enzo-bellussi/"));
  assert.equal(website.url, "https://bellussi.vercel.app/");
});

test("publishes an accessible 1200 by 630 PNG social image", async () => {
  const image = await readFile(new URL("public/og-image.png", siteRoot));
  assert.deepEqual(
    image.subarray(0, 8),
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  );
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});

test("allows public crawlers and advertises the single-page sitemap", async () => {
  const robots = await readFile(new URL("public/robots.txt", siteRoot), "utf8");
  const sitemap = await readFile(new URL("public/sitemap.xml", siteRoot), "utf8");

  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/bellussi\.vercel\.app\/sitemap\.xml/i);
  assert.match(sitemap, /<loc>https:\/\/bellussi\.vercel\.app\/<\/loc>/);
  assert.doesNotMatch(sitemap, /#contact/);
});
