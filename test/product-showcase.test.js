import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { portfolioContent } from "../src/content/portfolio.js";
import { renderPortfolioSections } from "../src/content/render-portfolio.js";

const siteRoot = new URL("../", import.meta.url);

test("uses responsive Comandinha previews with the Black Market image ratio", async () => {
  assert.equal(portfolioContent.products.length, 2);
  const sections = ["pt", "en"].flatMap((language) => [
    renderPortfolioSections({ concept: "field", language }),
    renderPortfolioSections({ concept: "index", language }),
  ]);

  for (const product of portfolioContent.products) {
    assert.ok(product.pt.imageAlt, "missing Portuguese alt for " + product.name);
    assert.ok(product.en.imageAlt, "missing English alt for " + product.name);
    assert.ok(product.pt.imageCaption, "missing Portuguese caption for " + product.name);
    assert.ok(product.en.imageCaption, "missing English caption for " + product.name);

    if (product.id === "comandinha") {
      const blackMarket = portfolioContent.products.find(
        ({ id }) => id === "black-market",
      );
      for (const language of ["pt", "en"]) {
        const localizedImages = product.image[language];
        assert.ok(localizedImages.desktop.src, "missing desktop screenshot");
        assert.ok(localizedImages.mobile.src, "missing mobile screenshot");
        for (const imageSource of [
          localizedImages.desktop,
          localizedImages.mobile,
        ]) {
          assert.equal(imageSource.width, blackMarket.image.width);
          assert.equal(imageSource.height, blackMarket.image.height);
          assert.equal(
            imageSource.width / imageSource.height,
            blackMarket.image.width / blackMarket.image.height,
          );
          const imagePath = new URL("public" + imageSource.src, siteRoot);
          await stat(imagePath);
          const image = await readFile(imagePath);
          assert.equal(image.readUInt32BE(16), imageSource.width);
          assert.equal(image.readUInt32BE(20), imageSource.height);
        }

        const alt = product[language].imageAlt;
        const languageSections = [
          sections[language === "pt" ? 0 : 2],
          sections[language === "pt" ? 1 : 3],
        ];
        for (const rendered of languageSections) {
          const section = rendered.products;
          assert.match(section, /<picture>/);
          assert.ok(
            section.includes(
              '<source media="(max-width: 760px)" srcset="' +
                localizedImages.mobile.src +
                '" type="image/png">',
            ),
          );
          assert.ok(
            section.includes('src="' + localizedImages.desktop.src + '"'),
          );
          assert.ok(section.includes(alt));
          assert.doesNotMatch(section, /class="comandinha-dashboard"/);
        }
      }
    } else {
      assert.ok(
        product.image.src,
        "missing recipe screenshot for " + product.name,
      );
      assert.ok(
        product.image.width > 0,
        "missing image width for " + product.name,
      );
      assert.ok(
        product.image.height > 0,
        "missing image height for " + product.name,
      );
      for (const { products: section } of sections)
        assert.ok(section.includes(product.image.src));
      const imagePath = new URL("public" + product.image.src, siteRoot);
      await stat(imagePath);
      const image = await readFile(imagePath);
      assert.equal(image.readUInt32BE(16), product.image.width);
      assert.equal(image.readUInt32BE(20), product.image.height);
    }
  }
  const blackMarket = portfolioContent.products.find(
    ({ id }) => id === "black-market",
  );
  assert.deepEqual(blackMarket.links, []);
});
