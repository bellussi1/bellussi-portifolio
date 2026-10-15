import { test } from "node:test";
import assert from "node:assert/strict";
import { portfolioContent } from "../src/content/portfolio.js";
import { renderPortfolioSections } from "../src/content/render-portfolio.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function allRecords() {
  return [
    ...portfolioContent.experiences,
    ...portfolioContent.products,
    ...portfolioContent.openSourceProjects,
  ];
}

test("renders distinct experience and product structures for FIELD and INDEX", () => {
  const field = renderPortfolioSections({ concept: "field", language: "pt" });
  const index = renderPortfolioSections({ concept: "index", language: "pt" });

  assert.match(field.experience, /field-experience-entry/);
  assert.doesNotMatch(field.experience, /index-experience-table/);
  assert.match(index.experience, /index-experience-table/);
  assert.match(index.experience, /<table/);
  assert.match(field.products, /field-product-case/);
  assert.match(index.products, /index-product-grid/);
  assert.match(index.products, /index-product-card/);
  assert.match(field.projects, /field-open-source-row/);
  assert.match(index.projects, /index-tool-row/);
  assert.notEqual(field.products, index.products);
});

test("keeps project facts, image paths, and public links consistent across concepts", () => {
  const field = renderPortfolioSections({ concept: "field", language: "pt" });
  const index = renderPortfolioSections({ concept: "index", language: "pt" });

  assert.deepEqual(
    portfolioContent.products.map(({ id }) => id),
    ["comandinha", "black-market"],
  );
  assert.deepEqual(
    portfolioContent.openSourceProjects.map(({ id }) => id),
    ["deploy-preflight", "local-webhook-recorder", "compose-doctor"],
  );
  for (const product of portfolioContent.products) {
    for (const section of [field.products, index.products]) {
      if (product.id === "comandinha") {
        assert.match(section, /class="comandinha-dashboard" role="img"/);
        assert.ok(section.includes(escapeHtml(product.pt.imageAlt)));
      } else {
        assert.ok(section.includes(product.image.src), "missing image " + product.id);
      }
      assert.ok(section.includes(product.name), "missing product " + product.id);
      for (const link of product.links) assert.ok(section.includes(link.href));
    }
  }
  for (const project of portfolioContent.openSourceProjects) {
    for (const section of [field.projects, index.projects]) {
      assert.ok(section.includes(project.name), "missing project " + project.id);
      for (const link of project.links) assert.ok(section.includes(link.href));
    }
  }
});

test("renders PT and EN copy for every record", () => {
  for (const language of ["pt", "en"]) {
    const rendered = ["field", "index"]
      .map((concept) => renderPortfolioSections({ concept, language }))
      .flatMap((sections) => [sections.experience, sections.products, sections.projects])
      .join("\n");

    for (const record of allRecords()) {
      assert.ok(rendered.includes(record.name), "missing " + record.id);
      for (const value of Object.values(record[language])) {
        const values = Array.isArray(value) ? value : [value];
        for (const text of values) {
          if (typeof text === "string")
            assert.ok(
              rendered.includes(escapeHtml(text)),
              "missing " + language + " copy for " + record.id + ": " + text,
            );
        }
      }
    }
  }
});

test("does not publish a Black Market source link", () => {
  const blackMarket = portfolioContent.products.find(
    ({ id }) => id === "black-market",
  );
  assert.ok(blackMarket);
  assert.equal(blackMarket.links.length, 0);
  for (const concept of ["field", "index"]) {
    const sections = renderPortfolioSections({ concept, language: "en" });
    assert.doesNotMatch(
      sections.products,
      /github\.com\/bellussi1\/Black-Market/i,
    );
  }
});
