import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const origin = process.env.PORTFOLIO_TEST_URL ?? "http://127.0.0.1:4180";
const output = new URL("../docs/evidence/browser/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
  headless: true,
});
const axe = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const results = {
  origin,
  at: new Date().toISOString(),
  matrix: [],
  flows: [],
  failures: [],
  knownLimitations: [],
};
async function check(name, action) {
  try {
    await action();
    results.flows.push({ name, pass: true });
  } catch (error) {
    results.failures.push({ name, message: error.message });
    results.flows.push({ name, pass: false });
  }
}
try {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const [variant, path] of process.env.PORTFOLIO_CHECK_FLOWS_ONLY
    ? []
    : [
        ["a", "/"],
        ["b", "/v2"],
        ["c", "/v3"],
      ]) {
    for (const language of ["pt", "en"])
      for (const theme of ["light", "dark"])
        for (const width of [320, 390, 768, 1440]) {
          const errors = [];
          const failed = [];
          const onError = (error) => errors.push(error.message);
          const onResponse = (response) => {
            if (response.status() >= 400)
              failed.push({ url: response.url(), status: response.status() });
          };
          page.on("pageerror", onError);
          page.on("response", onResponse);
          await page.setViewportSize({
            width,
            height: width === 1440 ? 900 : 844,
          });
          await page.goto(origin + "/?compare=0");
          await page.evaluate(
            (theme) => localStorage.setItem("portfolio-theme", theme),
            theme,
          );
          await page.goto(`${origin}${path}?lang=${language}&compare=0`);
          await page.waitForLoadState("networkidle");
          await page.evaluate(() => document.fonts.ready);
          const metrics = await page.evaluate(() => ({
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            language: document.documentElement.lang,
            theme: document.documentElement.dataset.theme,
            h1s: document.querySelectorAll("h1").length,
            headings: [...document.querySelectorAll("h1,h2")].map((e) =>
              e.textContent.trim(),
            ),
            resume: [...document.querySelectorAll("[data-resume]")].map((a) =>
              a.getAttribute("href"),
            ),
            anchors: [...document.querySelectorAll('a[href^="#"]')]
              .filter(
                (a) =>
                  !document.getElementById(a.hash.slice(1)) &&
                  a.hash.length > 1,
              )
              .map((a) => a.hash),
            font: getComputedStyle(document.querySelector("h1")).fontFamily,
            robots: document.querySelector("[name=robots]").content,
            canonical: document.querySelector("[rel=canonical]").href,
            images: [...document.images]
              .filter((i) => !i.complete || i.naturalWidth === 0)
              .map((i) => i.src),
          }));
          if (metrics.scrollWidth > width)
            (variant !== "c" && width === 320 && metrics.scrollWidth === 333
              ? results.knownLimitations
              : results.failures
            ).push({
              name: `overflow ${variant}/${language}/${theme}/${width}`,
              message: `${metrics.scrollWidth}>${width}`,
            });
          if (
            metrics.language !== (language === "en" ? "en" : "pt-BR") ||
            metrics.theme !== theme ||
            metrics.h1s !== 1 ||
            metrics.anchors.length ||
            metrics.resume.some((h) => h !== `/curriculo-${language}.pdf`) ||
            errors.length ||
            failed.length
          )
            results.failures.push({
              name: `matrix ${variant}/${language}/${theme}/${width}`,
              message: JSON.stringify({ metrics, errors, failed }),
            });
          if (variant !== "a" && !metrics.robots.includes("noindex"))
            results.failures.push({
              name: `noindex ${variant}`,
              message: metrics.robots,
            });
          if (width === 390 || width === 1440) {
            // Capture readable content with reduced motion so every disclosure/section is available.
            if (language === "pt")
              await page.screenshot({
                path: new URL(
                  `${variant}-${theme}-${width}.png`,
                  output,
                ).pathname.replace(/^\/([A-Z]:)/, "$1"),
                fullPage: false,
              });
          }
          let accessibility;
          if (width === 390 || width === 1440) {
            await page.addScriptTag({ content: axe });
            const report = await page.evaluate(
              async () =>
                await axe.run(document, {
                  runOnly: {
                    type: "tag",
                    values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
                  },
                }),
            );
            accessibility = report.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            }));
            if (variant === "c" && accessibility.length)
              results.failures.push({
                name: `a11y C/${language}/${theme}/${width}`,
                message: JSON.stringify(accessibility),
              });
          }
          results.matrix.push({
            variant,
            language,
            theme,
            width,
            metrics,
            accessibility,
            errors,
            failed,
          });
          page.off("pageerror", onError);
          page.off("response", onResponse);
        }
  }
  await check("direct paths with and without slash", async () => {
    for (const path of [
      "/v2",
      "/v2/",
      "/v2/index.html",
      "/v3",
      "/v3/",
      "/v3/index.html",
    ]) {
      await page.goto(origin + path);
      assert.equal(
        await page.locator("html").getAttribute("data-variant"),
        path.includes("v2") ? "b" : "c",
      );
    }
  });
  await check(
    "comparison A -> B -> C preserves EN and active state",
    async () => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(origin + "/?lang=en");
      await page
        .locator('portfolio-comparison a[aria-current="page"]')
        .waitFor();
      await page
        .getByRole("link", { name: "B: Typography", exact: true })
        .click();
      await page.waitForURL(/\/v2.*lang=en/);
      assert.equal(await page.locator("html").getAttribute("lang"), "en");
      await page
        .getByRole("link", { name: "C: Redesign", exact: true })
        .click();
      await page.waitForURL(/\/v3.*lang=en/);
      assert.equal(await page.locator("html").getAttribute("lang"), "en");
      assert.equal(
        await page
          .locator('portfolio-comparison a[aria-current="page"]')
          .textContent(),
        "C",
      );
    },
  );
  await check("C preview, language, theme and clipboard", async () => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"], {
      origin,
    });
    await page.goto(origin + "/v3?lang=pt");
    const image = page.locator("#stage-image");
    await page.locator('[data-preview="black-market"]').click();
    assert.match(await image.getAttribute("src"), /black-market/);
    await page.getByRole("button", { name: "English", exact: true }).click();
    assert.match(
      await page.locator("#stage-image").getAttribute("src"),
      /black-market/,
    );
    assert.match(await page.locator("h1").innerText(), /Enzo/);
    const before = await page.locator("html").getAttribute("data-theme");
    await page.locator("[data-theme-toggle]").click();
    assert.notEqual(
      await page.locator("html").getAttribute("data-theme"),
      before,
    );
    await page
      .getByRole("button", { name: "Copy email address", exact: true })
      .click();
    assert.equal(
      await page.evaluate(() => navigator.clipboard.readText()),
      "enzobellussi3@gmail.com",
    );
    assert.match(await page.locator("#copy-status").innerText(), /copied/);
  });
  await check(
    "keyboard skip link, disclosure, and mobile A/B menu Escape",
    async () => {
      await page.goto(origin + "/v3?lang=pt");
      await page.keyboard.press("Tab");
      assert.equal(await page.locator(":focus").getAttribute("href"), "#main");
      await page.keyboard.press("Enter");
      assert.equal(await page.locator(":focus").getAttribute("id"), "main");
      const summary = page.locator("details summary").first();
      await summary.focus();
      await page.keyboard.press("Enter");
      assert.equal(await summary.locator("..").getAttribute("open"), "");
      for (const path of ["/", "/v2"]) {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(origin + path);
        const button = page.locator(".menu-toggle");
        await button.click();
        assert.equal(await button.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await button.getAttribute("aria-expanded"), "false");
        assert.equal(
          await page.locator(":focus").getAttribute("class"),
          await button.getAttribute("class"),
        );
      }
    },
  );
  await check(
    "resources: both PDFs, sitemap, robots and local links",
    async () => {
      await page.goto(origin + "/v3");
      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((elements) => [
          ...new Set(elements.map((e) => e.getAttribute("href"))),
        ]);
      for (const path of [...hrefs, "/sitemap.xml", "/robots.txt"]) {
        const response = await page.request.get(origin + path);
        assert.equal(response.status(), 200, path);
      }
    },
  );
  await check(
    "storage blocked: query locale and comparison still work",
    async () => {
      const isolated = await browser.newContext();
      await isolated.addInitScript(() => {
        Object.defineProperty(window, "localStorage", {
          get() {
            throw new Error("blocked storage");
          },
        });
      });
      const p = await isolated.newPage();
      for (const path of ["/", "/v2", "/v3"]) {
        await p.goto(origin + path + "?lang=en");
        await p.waitForLoadState("networkidle");
        assert.equal(await p.locator("html").getAttribute("lang"), "en");
        assert.equal(await p.locator("portfolio-comparison a").count(), 3);
      }
      await isolated.close();
    },
  );
  await check("C retains all content without JavaScript", async () => {
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const p = await nojs.newPage();
    await p.goto(origin + "/v3");
    const text = await p.locator("body").innerText();
    for (const name of [
      "MarketData",
      "Banco do Brasil",
      "KOReader Ecosystem",
      "Black Market",
      "Deploy Preflight",
      "Local Webhook Recorder",
      "Compose Doctor",
      "Ciência da Computação",
    ])
      assert.ok(text.includes(name), name);
    assert.equal(await p.locator("portfolio-comparison").count(), 0);
    await nojs.close();
  });
  await check(
    "hidden comparison has no DOM, listeners or module download",
    async () => {
      for (const path of ["/", "/v2", "/v3"]) {
        const p = await context.newPage();
        const requests = [];
        p.on("request", (request) => requests.push(request.url()));
        await p.goto(origin + path + "?compare=0");
        await p.waitForLoadState("networkidle");
        assert.equal(await p.locator("portfolio-comparison").count(), 0);
        assert.ok(
          !requests.some((url) => /compare-[^/]+\.js/.test(url)),
          requests.join("\n"),
        );
        await p.close();
      }
    },
  );
  await check(
    "explicit locale follows controls after reload in all variants",
    async () => {
      for (const path of ["/", "/v2", "/v3"]) {
        await page.goto(origin + path + "?lang=en");
        await page
          .getByRole("button", { name: "Português", exact: true })
          .click();
        await page.reload();
        await page.waitForLoadState("networkidle");
        assert.equal(await page.locator("html").getAttribute("lang"), "pt-BR");
      }
    },
  );
  await check(
    "normal motion project selection and 200% equivalent reflow",
    async () => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(origin + "/v3");
      await page.locator('[data-preview="black-market"]').click();
      await page.setViewportSize({ width: 720, height: 450 });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
    },
  );
  await check(
    "short desktop keeps preview and contact controls reachable",
    async () => {
      await page.setViewportSize({ width: 1440, height: 600 });
      await page.goto(origin + "/v3?lang=en");
      await page.waitForLoadState("networkidle");
      for (const selector of [
        '[data-preview="black-market"]',
        ".identity-bottom a",
      ]) {
        const control = page.locator(selector).first();
        await control.scrollIntoViewIfNeeded();
        const box = await control.boundingBox();
        assert.ok(box.y >= -0.5 && box.y + box.height <= 600.5, selector);
      }
      await page.locator('[data-preview="black-market"]').click();
      assert.match(
        await page.locator("#stage-image").getAttribute("src"),
        /black-market/,
      );
    },
  );
  await context.close();
} finally {
  await browser.close();
  await writeFile(
    new URL("results.json", output),
    JSON.stringify(results, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        matrix: results.matrix.length,
        flows: results.flows,
        failures: results.failures,
      },
      null,
      2,
    ),
  );
}
if (results.failures.length) process.exitCode = 1;
