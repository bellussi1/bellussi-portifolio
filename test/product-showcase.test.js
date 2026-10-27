import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { portfolioContent } from "../src/content/portfolio.js";
import { renderPortfolioSections } from "../src/content/render-portfolio.js";

const siteRoot = new URL("../", import.meta.url);

test("renders the KOReader showcase with localized demo screenshots", async () => {
  const product = portfolioContent.products.find(({ id }) => id === "koreader-ecosystem");
  assert.ok(product);
  assert.equal(product.links[0].href, "https://github.com/bellussi1/koreader-ecosystem");
  for (const language of ["pt", "en"]) {
    const image = product.image[language].desktop;
    const bytes = await readFile(new URL("public" + image.src, siteRoot));
    assert.equal(bytes.readUInt32BE(16), image.width);
    assert.equal(bytes.readUInt32BE(20), image.height);
    for (const concept of ["field", "index"]) {
      const section = renderPortfolioSections({ concept, language }).products;
      assert.ok(section.includes(image.src));
      assert.ok(section.includes(product[language].imageAlt));
      assert.ok(section.includes(product.name));
      assert.doesNotMatch(section, /Comandinha/i);
    }
  }
});

test("serves responsive WebP sources sized for each project preview", async () => {
  const renderedByLanguage = Object.fromEntries(
    ["pt", "en"].map((language) => [
      language,
      ["field", "index"].map(
        (concept) =>
          renderPortfolioSections({ concept, language }).products,
      ),
    ]),
  );
  const blackMarket = portfolioContent.products.find(
    ({ id }) => id === "black-market",
  );
  const variants = [];

  variants.push({
    image: blackMarket.image,
    languages: ["pt", "en"],
    media: "",
    sizes:
      "(min-width: 1360px) 583px, (min-width: 1101px) calc(50vw - 93px), (min-width: 761px) calc(50vw - 65px), calc(100vw - 66px)",
    expectedWidths: [350, 700, 1200],
  });

  for (const { image, languages, media, sizes, expectedWidths } of variants) {
    assert.deepEqual(
      image.webp.map(({ width }) => width),
      expectedWidths,
      "missing width-appropriate image candidates",
    );
    const originalRatio = image.width / image.height;
    const srcset = [];

    for (const candidate of image.webp) {
      assert.ok(
        Math.abs(candidate.width / candidate.height - originalRatio) < 0.002,
        "optimized preview changed the screenshot aspect ratio",
      );
      const imagePath = new URL("public" + candidate.src, siteRoot);
      const bytes = await readFile(imagePath);
      assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
      assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
      srcset.push(candidate.src + " " + candidate.width + "w");
    }

    const source =
      "<source " +
      (media ? 'media="' + media + '" ' : "") +
      'type="image/webp" srcset="' +
      srcset.join(", ") +
      '" sizes="' +
      sizes +
      '">';
    const renderedSections = languages.flatMap(
      (language) => renderedByLanguage[language],
    );
    assert.ok(
      renderedSections.every((section) => section.includes(source)),
      "every project preview should render its responsive WebP source",
    );
  }
});
