import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { english } from "../src/translations.js";

const siteRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", siteRoot), "utf8");
const productsSection = html.match(/<section\b(?=[^>]*\bid="products")[\s\S]*?<\/section>/)?.[0];

test("presents product case studies with local concept visuals and English copy", async () => {
  assert.ok(productsSection, "missing products section");
  assert.match(html, /href="#products"/);
  assert.match(productsSection, /Comandinha/);
  assert.match(productsSection, /Black Market/);
  assert.match(productsSection, /conceito/i);
  assert.match(productsSection.replace(/\s+/g, " "), /migração ainda não está pronta para produção/i);
  assert.match(english.comandinhaDetails, /not production-ready/i);
  assert.doesNotMatch(
    productsSection,
    /href=["']https:\/\/github\.com\/bellussi1\/Black-Market(?:["'/?#])/i,
    "the private source repository must not be linked publicly",
  );

  const imageTags = [...productsSection.matchAll(/<img\b([^>]*)>/g)].map(([, attributes]) => attributes);
  assert.ok(imageTags.length >= 3, "each product should use an actual interface image");
  for (const attributes of imageTags) {
    assert.match(attributes, /\balt=["'][^"']+[^"']["']/i);
    assert.match(attributes, /\bwidth=["']\d+["']/i);
    assert.match(attributes, /\bheight=["']\d+["']/i);
    assert.match(attributes, /\bloading=["']lazy["']/i);

    const source = attributes.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    assert.ok(source?.startsWith("/"), "showcase imagery should use local assets");
    await stat(new URL(`public${source}`, siteRoot));
  }

  const translationKeys = [...productsSection.matchAll(/\bdata-i18n=["']([^"']+)["']/g)].map(([, key]) => key);
  assert.ok(translationKeys.length > 0, "product copy must participate in the language switch");
  for (const key of translationKeys) {
    assert.equal(typeof english[key], "string", `missing English translation for ${key}`);
    assert.ok(english[key].trim(), `empty English translation for ${key}`);
  }
});
