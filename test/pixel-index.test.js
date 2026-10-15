import { test } from "node:test";
import assert from "node:assert/strict";
import { initPixelIndex } from "../src/visuals/pixel-index.js";

function createHarness({ concept = "index", reduced = false, fine = true } = {}) {
  const listeners = new Map();
  const preferences = new Map();
  function matchMedia(query) {
    if (!preferences.has(query)) {
      const preference = {
        matches:
          (query.includes("prefers-reduced-motion") && reduced) ||
          (query.includes("pointer: fine") && fine),
        addEventListener: (_, fn) => (preference.change = fn),
        removeEventListener: (_, fn) => {
          if (preference.change === fn) delete preference.change;
        },
      };
      preferences.set(query, preference);
    }
    return preferences.get(query);
  }
  const properties = new Map();
  const cursor = { dataset: { active: "false", pressed: "false" } };
  const page = {
    hidden: false,
    addEventListener: (name, fn) => listeners.set(`page:${name}`, fn),
    removeEventListener: (name) => listeners.delete(`page:${name}`),
  };
  const root = {
    dataset: { concept },
    ownerDocument: page,
    style: {
      setProperty: (name, value) => properties.set(name, value),
      removeProperty: (name) => properties.delete(name),
    },
    querySelector: (selector) =>
      selector === "[data-pixel-cursor]" ? cursor : null,
    querySelectorAll: () => [],
  };
  const view = {
    matchMedia,
    addEventListener: (name, fn) => listeners.set(`view:${name}`, fn),
    removeEventListener: (name) => listeners.delete(`view:${name}`),
  };
  const cleanup = initPixelIndex({ root, view });
  return {
    cleanup,
    cursor,
    listeners,
    page,
    properties,
    preference: matchMedia("(prefers-reduced-motion: reduce)"),
    finePreference: matchMedia("(hover: hover) and (pointer: fine)"),
    root,
    view,
  };
}

test("detaches pointer listeners and clears cursor state when capability becomes coarse", () => {
  const h = createHarness();
  const pointerListeners = [
    "pointermove",
    "pointerleave",
    "pointerdown",
    "pointerup",
    "pointercancel",
    "blur",
  ];
  const countPointerListeners = () =>
    pointerListeners.filter((name) => h.listeners.has(`view:${name}`)).length;

  h.listeners.get("view:pointermove")({ clientX: 412, clientY: 285 });
  h.listeners.get("view:pointerdown")();
  assert.equal(h.cursor.dataset.active, "true");
  assert.equal(h.cursor.dataset.pressed, "true");

  h.finePreference.matches = false;
  h.finePreference.change();
  assert.equal(countPointerListeners(), 0);
  assert.equal(h.properties.size, 0);
  assert.equal(h.cursor.dataset.active, "false");
  assert.equal(h.cursor.dataset.pressed, "false");

  h.finePreference.matches = true;
  h.finePreference.change();
  assert.equal(countPointerListeners(), pointerListeners.length);
  h.cleanup();
});

test("only enables the Pixel Index effects for the selected concept", () => {
  const inactive = createHarness({ concept: "field" });
  assert.equal(inactive.listeners.size, 0);
  assert.equal(inactive.root.dataset.indexEffects, undefined);
  inactive.cleanup();

  for (const options of [{ fine: false }, { reduced: true }]) {
    const h = createHarness(options);
    assert.equal(h.listeners.has("view:pointermove"), false);
    assert.equal(h.properties.size, 0);
    h.cleanup();
  }
});

test("tracks a fine pointer, pauses with visibility, and cleans up its effects", () => {
  const h = createHarness();
  assert.equal(h.root.dataset.indexEffects, "ready");
  assert.equal(typeof h.listeners.get("view:pointermove"), "function");
  h.listeners.get("view:pointermove")({ clientX: 412, clientY: 285 });
  assert.equal(h.properties.get("--index-pointer-x"), "412px");
  assert.equal(h.properties.get("--index-pointer-y"), "285px");
  assert.equal(h.cursor.dataset.active, "true");

  h.listeners.get("view:pointerdown")();
  assert.equal(h.cursor.dataset.pressed, "true");
  h.listeners.get("view:pointerup")();
  assert.equal(h.cursor.dataset.pressed, "false");
  h.page.hidden = true;
  h.listeners.get("page:visibilitychange")();
  assert.equal(h.root.dataset.indexPaused, "true");
  assert.equal(h.cursor.dataset.active, "false");
  h.page.hidden = false;
  h.listeners.get("page:visibilitychange")();
  assert.equal(h.root.dataset.indexPaused, undefined);

  h.cleanup();
  assert.equal(h.listeners.size, 0);
  assert.equal(h.properties.size, 0);
  assert.equal(h.root.dataset.indexEffects, undefined);
  assert.equal(h.cursor.dataset.active, "false");
});

test("stops pointer tracking when reduced motion becomes active", () => {
  const h = createHarness();
  const move = h.listeners.get("view:pointermove");
  move({ clientX: 100, clientY: 200 });
  h.preference.matches = true;
  h.preference.change();
  assert.equal(h.listeners.has("view:pointermove"), false);
  assert.equal(h.cursor.dataset.active, "false");
  assert.equal(h.root.dataset.indexPaused, "true");

  h.preference.matches = false;
  h.preference.change();
  assert.equal(typeof h.listeners.get("view:pointermove"), "function");
  assert.equal(h.root.dataset.indexPaused, undefined);
  h.cleanup();
});
