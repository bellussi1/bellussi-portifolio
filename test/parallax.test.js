import { test } from "node:test";
import assert from "node:assert/strict";
import { initParallax } from "../src/utils/parallax.js";

function harness({ mobile = false, reduced = false } = {}) {
  const listeners = new Map();
  const media = new Map();
  const frames = new Map();
  let serial = 0;
  const style = {
    value: "",
    setProperty(_, value) {
      this.value = value;
    },
    removeProperty() {
      this.value = "";
    },
  };
  const element = {
    style,
    dataset: {},
    closest: () => ({
      getBoundingClientRect: () => ({ top: -1000, height: 500 }),
    }),
  };
  const document = {
    hidden: false,
    querySelectorAll: (selector) =>
      selector === ".project-demo" ? [element] : [],
    addEventListener: (name, fn) => listeners.set(name, fn),
  };
  const window = {
    innerHeight: 800,
    addEventListener: (name, fn) => listeners.set(name, fn),
    matchMedia(query) {
      const value = {
        matches: query.includes("reduce") ? reduced : mobile,
        addEventListener: (_, fn) => {
          value.change = fn;
        },
      };
      media.set(query, value);
      return value;
    },
    requestAnimationFrame(fn) {
      frames.set(++serial, fn);
      return serial;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
  };
  let now = 0;
  function settle() {
    for (let i = 0; frames.size && i < 200; i++) {
      const pending = [...frames.values()];
      frames.clear();
      now += 16;
      pending.forEach((fn) => fn(now));
    }
    assert.equal(frames.size, 0, "animation must stop after settling");
  }
  return { window, document, element, listeners, media, frames, settle };
}

test("parallax is bounded, settles and reduces movement on mobile", () => {
  for (const mobile of [false, true]) {
    const h = harness({ mobile });
    initParallax(h.window, h.document);
    h.settle();
    const offset = Math.abs(parseFloat(h.element.style.value));
    assert.ok(offset > 0);
    assert.ok(offset <= (mobile ? 10 : 36));
    h.listeners.get("scroll")();
    h.settle();
  }
});

test("reduced motion disables offsets and cancels scheduled frames when changed", () => {
  const disabled = harness({ reduced: true });
  initParallax(disabled.window, disabled.document);
  assert.equal(disabled.frames.size, 0);
  assert.equal(disabled.element.style.value, "");
  const h = harness();
  initParallax(h.window, h.document);
  h.settle();
  h.listeners.get("scroll")();
  const preference = h.media.get("(prefers-reduced-motion: reduce)");
  preference.matches = true;
  preference.change();
  assert.equal(h.frames.size, 0);
  assert.equal(h.element.style.value, "");
});
