import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";
import { portfolioContent } from "../src/content/portfolio.js";
import {
  renderPortfolioSection,
  renderPortfolioSections,
} from "../src/content/render-portfolio.js";
import { syncPrerenderedSections } from "../scripts/sync-prerender.mjs";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function strings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

test("renders distinct experience structures for FIELD and INDEX", () => {
  const field = renderPortfolioSections({ concept: "field", language: "pt" });
  const index = renderPortfolioSections({ concept: "index", language: "pt" });

  assert.match(field.experience, /field-experience-entry/);
  assert.doesNotMatch(field.experience, /index-experience-table/);
  assert.match(index.experience, /index-experience-table/);
  assert.match(index.experience, /<table/);
});

test("renders ATLAS alone as the flagship case study", () => {
  const { flagship } = portfolioContent;
  for (const language of ["pt", "en"]) {
    const { atlas, work } = renderPortfolioSections({ concept: "index", language });
    assert.equal(atlas.match(/<article/g).length, 1);
        for (const image of Object.values(flagship.images)) assert.ok(atlas.includes(image.src));
    for (const link of flagship.links) assert.ok(atlas.includes(link.href));
    assert.equal(atlas.match(/<details class="atlas-chapter"/g).length, flagship[language].chapters.length);
    assert.equal(atlas.match(/<dt>/g).length, flagship.metrics.length);
    for (const metric of flagship.metrics) assert.ok(atlas.includes(metric.href));
    assert.equal(atlas.match(/role="tab"/g).length, flagship.tour.length);
    assert.equal(atlas.match(/role="tabpanel"/g).length, flagship.tour.length);
    assert.equal(atlas.match(/aria-selected="true"/g).length, 1);
    assert.equal(atlas.match(/ hidden>/g).length, flagship.tour.length - 1);
    assert.doesNotMatch(work, /ATLAS/);
  }
});

test("keeps claim classifications consistent with the claims metric", () => {
  const toNumber = (text) => Number(text.match(/^[\d,]+/)[0].replaceAll(",", ""));
  const claims = portfolioContent.flagship.metrics.find(({ label }) =>
    label.en.startsWith("claims"),
  );
  const epistemic = portfolioContent.flagship.en.chapters.find(
    ({ label }) => label === "EPISTEMIC MODEL",
  );
  const total = epistemic.points.reduce((sum, point) => sum + toNumber(point), 0);
  assert.equal(total, toNumber(claims.value.en));
});

test("lists other work as a grid of linked tiles without images", () => {
  assert.deepEqual(
    portfolioContent.otherWork.map(({ id }) => id),
    [
      "koreader-ecosystem",
      "black-market",
      "deploy-preflight",
      "compose-doctor",
      "local-webhook-recorder",
      "dalibre",
      "dalibre-plugins",
      "scriptorium",
    ],
  );
  for (const language of ["pt", "en"]) {
    const { work } = renderPortfolioSections({ concept: "index", language });
    assert.match(work, /<ul class="work-grid">/);
    assert.equal(work.match(/class="work-tile /g).length, portfolioContent.otherWork.length);
    assert.doesNotMatch(work, /<img/);
    for (const project of portfolioContent.otherWork) {
      assert.ok(work.includes(project.name), "missing project " + project.id);
      for (const link of project.links) assert.ok(work.includes(link.href));
    }
  }
});

test("renders PT and EN copy for every record", () => {
  const records = [
    ...portfolioContent.experiences,
    portfolioContent.flagship,
    ...portfolioContent.otherWork,
  ];
  for (const language of ["pt", "en"]) {
    const rendered = ["field", "index"]
      .map((concept) => Object.values(renderPortfolioSections({ concept, language })).join("\n"))
      .join("\n");
    for (const record of records) {
      assert.ok(rendered.includes(record.name), "missing " + record.id);
      for (const text of strings(record[language])) {
        assert.ok(
          rendered.includes(escapeHtml(text)),
          "missing " + language + " copy for " + record.id + ": " + text,
        );
      }
    }
    for (const metric of portfolioContent.flagship.metrics) {
      assert.ok(rendered.includes(escapeHtml(metric.value[language])));
      assert.ok(rendered.includes(escapeHtml(metric.label[language])));
    }
  }
});

test("renders each portfolio section independently without changing its markup", () => {
  for (const concept of ["field", "index"]) {
    for (const language of ["pt", "en"]) {
      const sections = renderPortfolioSections({ concept, language });
      for (const key of Object.keys(sections)) {
        assert.equal(renderPortfolioSection(key, { concept, language }), sections[key]);
      }
    }
  }
});

test("keeps the pre-rendered English markup in index.html in sync with the data", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const sections = renderPortfolioSections({ concept: "index", language: "en" });
  assert.equal(
    syncPrerenderedSections(html, sections),
    html,
    "run npm run prerender:sync",
  );
});
