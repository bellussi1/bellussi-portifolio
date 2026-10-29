import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const origin = "http://127.0.0.1:4180";
const dir = "docs/evidence/v3-refinement/final";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, pass: true });
  } catch (e) {
    results.push({ name, pass: false, error: e.message });
  }
}
const p = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "no-preference",
});
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
await check("normal motion and reading-driven project focus", async () => {
  await p.goto(origin + "/v3?lang=pt&compare=0");
  await p.waitForTimeout(1100);
  await p.locator("#black-market").scrollIntoViewIfNeeded();
  await p.waitForTimeout(180);
  assert.equal(
    await p
      .locator("[data-preview][aria-pressed=true]")
      .getAttribute("data-preview"),
    "black-market",
  );
  assert.match(
    await p.locator("#stage-image").getAttribute("src"),
    /black-market/,
  );
  const progress = await p
    .locator("#reading-progress")
    .evaluate((e) => getComputedStyle(e).transform);
  assert.notEqual(progress, "matrix(1, 0, 0, 0, 0, 0)");
  await p.screenshot({ path: dir + "/desktop-case-motion.png" });
});
await check(
  "pointer depth is bounded and stops when reduced motion changes",
  async () => {
    const surface = p.locator(".case-art--black-market");
    await surface.scrollIntoViewIfNeeded();
    const box = await surface.boundingBox();
    await p.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.4);
    await p.waitForTimeout(50);
    const offset = await surface.evaluate((e) =>
      parseFloat(e.style.getPropertyValue("--pointer-x")),
    );
    assert.ok(offset > 0 && offset <= 5);
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.waitForTimeout(50);
    assert.equal(
      await surface.evaluate((e) => e.style.getPropertyValue("--pointer-x")),
      "",
    );
    assert.equal(
      await p.evaluate(
        () =>
          document.getAnimations().filter((a) => a.playState === "running")
            .length,
      ),
      0,
    );
  },
);
await check(
  "real screenshot dialog: keyboard open, focus trap, Escape and focus return",
  async () => {
    const trigger = p.locator('[data-inspect="black-market"]').first();
    await trigger.focus();
    await p.keyboard.press("Enter");
    const dialog = p.locator("#project-dialog");
    assert.equal(await dialog.isVisible(), true);
    await p.locator("#dialog-image").evaluate((img) => img.decode());
    assert.match(
      await p.locator("#dialog-image").getAttribute("src"),
      /black-market-recipe.png/,
    );
    assert.equal(
      await p.locator("#dialog-source").getAttribute("href"),
      await p.locator("#dialog-image").getAttribute("src"),
    );
    await p.keyboard.press("Tab");
    assert.equal(
      await p.locator(":focus").evaluate((e) => !!e.closest("dialog")),
      true,
    );
    await p.screenshot({ path: dir + "/desktop-dialog.png" });
    await p.keyboard.press("Escape");
    assert.equal(await dialog.isVisible(), false);
    assert.equal(
      await p.locator(":focus").getAttribute("data-inspect"),
      "black-market",
    );
  },
);
await check("rapid project changes settle on the last selection", async () => {
  await p.setViewportSize({ width: 1440, height: 900 });
  for (const id of ["koreader-ecosystem", "black-market", "koreader-ecosystem"])
    await p.locator(`[data-preview="${id}"]`).click();
  await p.waitForTimeout(1100);
  assert.match(await p.locator("#stage-image").getAttribute("src"), /koreader/);
  assert.equal(await p.locator("[data-preview][aria-pressed=true]").count(), 1);
});
await check(
  "interrupted manual navigation reconciles the case actually visible",
  async () => {
    await p.goto(origin + "/v3?lang=pt&compare=0");
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.locator('[data-preview="black-market"]').click();
    await p.waitForTimeout(100);
    await p
      .locator("#koreader-ecosystem")
      .evaluate((e) =>
        e.scrollIntoView({ behavior: "instant", block: "start" }),
      );
    await p.waitForTimeout(1300);
    assert.equal(
      await p
        .locator("[data-preview][aria-pressed=true]")
        .getAttribute("data-preview"),
      "koreader-ecosystem",
    );
  },
);
await check(
  "reopening a different screenshot resets modal scroll",
  async () => {
    await p.locator('[data-inspect="koreader-ecosystem"]').first().click();
    await p.locator("#dialog-image").evaluate((img) => img.decode());
    await p
      .locator("#project-dialog")
      .evaluate((d) => (d.scrollTop = d.scrollHeight));
    assert.ok(
      (await p.locator("#project-dialog").evaluate((d) => d.scrollTop)) > 0,
    );
    await p.keyboard.press("Escape");
    await p.locator('[data-inspect="black-market"]').first().click();
    await p.locator("#dialog-image").evaluate((img) => img.decode());
    assert.equal(
      await p.locator("#project-dialog").evaluate((d) => d.scrollTop),
      0,
    );
    assert.match(
      await p.locator("#dialog-source").getAttribute("href"),
      /black-market-recipe/,
    );
    await p.keyboard.press("Escape");
  },
);
await check(
  "screenshots and reading have no overflow in all target sizes/themes/locales",
  async () => {
    for (const theme of ["light", "dark"])
      for (const lang of ["pt", "en"])
        for (const width of [320, 390, 768, 960, 1440, 1920]) {
          await p.goto(origin + "/v3?compare=0&lang=" + lang);
          await p.evaluate(
            (t) => localStorage.setItem("portfolio-theme", t),
            theme,
          );
          await p.reload();
          await p.setViewportSize({ width, height: width >= 960 ? 900 : 844 });
          await p.waitForLoadState("networkidle");
          assert.ok(
            await p.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            `${theme}/${lang}/${width}`,
          );
          if (lang === "pt" && [390, 1440].includes(width)) {
            await p.screenshot({ path: `${dir}/${theme}-${width}-fold.png` });
            await p.locator("#black-market").scrollIntoViewIfNeeded();
            await p
              .locator("#black-market .case-media img")
              .evaluate((img) => img.decode());
            await p.waitForTimeout(650);
            await p.screenshot({ path: `${dir}/${theme}-${width}-case.png` });
            if (width === 390 && theme === "light") {
              await p.locator('[data-inspect="black-market"]').first().click();
              await p.locator("#dialog-image").evaluate((img) => img.decode());
              await p.screenshot({ path: dir + "/mobile-dialog.png" });
              await p.keyboard.press("Escape");
            }
          }
        }
  },
);
await check(
  "repeated locale changes reconnect only current motion targets",
  async () => {
    await p.setViewportSize({ width: 1440, height: 900 });
    await p.goto(origin + "/v3?lang=pt");
    for (const lang of ["en", "pt", "en"])
      await p.locator(`[data-language="${lang}"]`).click();
    await p.locator("#black-market").scrollIntoViewIfNeeded();
    await p.waitForTimeout(1100);
    assert.equal(await p.locator("html").getAttribute("lang"), "en");
    assert.match(
      await p.locator("#stage-image").getAttribute("src"),
      /black-market/,
    );
  },
);
await p.close();
await browser.close();
results.push({ name: "console", pass: errors.length === 0, errors });
await writeFile(
  "docs/evidence/v3-refinement/interaction-results.json",
  JSON.stringify(results, null, 2),
);
console.log(results);
if (results.some((r) => !r.pass)) process.exitCode = 1;
