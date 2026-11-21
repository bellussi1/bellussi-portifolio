import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../styles/tokens.css", import.meta.url), "utf8");
const primitives = Object.fromEntries(
  [...css.matchAll(/--(p-[a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]),
);

function theme(name) {
  const start = css.indexOf(`html[data-theme="${name}"][data-concept="index"] {`);
  const block = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries(
    [...block.matchAll(/--([a-z-]+):\s*(?:var\(--(p-[a-z0-9-]+)\)|(#[0-9a-f]{6}))/gi)].map(
      (m) => [m[1], m[3] ?? primitives[m[2]]],
    ),
  );
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

for (const name of ["light", "dark"]) {
  const t = theme(name);
  const surfaces = ["bg", "surface", "raised"];
  test(`${name}: text roles reach 4.5:1 on every surface`, () => {
    for (const surface of surfaces) {
      for (const role of ["text", "muted", "accent", "technical"]) {
        assert.ok(ratio(t[role], t[surface]) >= 4.5, `${role} on ${surface}`);
      }
    }
  });
  test(`${name}: interactive borders reach 3:1`, () => {
    for (const surface of surfaces) {
      assert.ok(ratio(t["line-strong"], t[surface]) >= 3, `line-strong on ${surface}`);
    }
    assert.ok(ratio(t.focus, t.bg) >= 3, "focus ring on bg");
  });
  test(`${name}: button text reaches 4.5:1`, () => {
    assert.ok(ratio(t["on-accent"], t["button-accent"]) >= 4.5);
    assert.ok(ratio(t["on-accent"], t["button-accent-hover"]) >= 4.5);
  });
}
