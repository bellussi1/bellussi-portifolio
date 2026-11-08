import { test } from "node:test";
import assert from "node:assert/strict";
import { initParallax } from "../src/utils/parallax.js";

function harness({ mobile = false, reduced = false } = {}) {
  const listeners = new Map();
  const media = new Map();
  const frames = new Map();
  const observers = [];
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
    closest: () => anchor,
  };
  let geometryReads = 0;
  const anchor = {
    getBoundingClientRect: () => {
      geometryReads++;
      return { top: -1000, height: 500 };
    },
  };
  const main = {};
  const document = {
    hidden: false,
    querySelector: (selector) => (selector === "main" ? main : null),
    querySelectorAll: (selector) =>
      selector === ".project-demo" ? [element] : [],
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
  };
  const window = {
    innerHeight: 800,
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
    matchMedia(query) {
      const value = {
        matches: query.includes("reduce") ? reduced : mobile,
        addEventListener: (_, fn) => {
          value.change = fn;
        },
        removeEventListener: (_, fn) => {
          if (value.change === fn) delete value.change;
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
    ResizeObserver: class {
      constructor(callback) {
        this.callback = callback;
        this.targets = [];
        this.disconnected = false;
        observers.push(this);
      }
      observe(target) {
        this.targets.push(target);
      }
      disconnect() {
        this.disconnected = true;
      }
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
  return {
    window,
    document,
    element,
    listeners,
    media,
    frames,
    observers,
    main,
    settle,
    get geometryReads() {
      return geometryReads;
    },
  };
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

test("reuses anchor geometry during scrolling and measures again on resize", () => {
  const h = harness();
  initParallax(h.window, h.document);
  const readsAfterInitialization = h.geometryReads;
  h.listeners.get("scroll")();
  h.settle();
  assert.equal(h.geometryReads, readsAfterInitialization);
  h.listeners.get("resize")();
  assert.equal(h.geometryReads, readsAfterInitialization + 1);
});

test("remeasures cached geometry when the main content changes size", () => {
  const h = harness();
  const cleanup = initParallax(h.window, h.document);
  const readsAfterInitialization = h.geometryReads;
  const [observer] = h.observers;
  assert.deepEqual(observer.targets, [h.main]);

  observer.callback([{ target: h.main }]);

  assert.equal(h.geometryReads, readsAfterInitialization + 1);
  cleanup();
  assert.equal(observer.disconnected, true);
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

test("parallax cleanup detaches listeners and cancels scheduled frames", () => {
  const h = harness();
  const cleanup = initParallax(h.window, h.document);
  assert.equal(typeof cleanup, "function");
  assert.ok(h.frames.size > 0);
  cleanup();
  assert.equal(h.frames.size, 0);
  assert.equal(h.listeners.size, 0);
  assert.equal(h.media.get("(prefers-reduced-motion: reduce)").change, undefined);
  assert.equal(h.media.get("(max-width: 760px)").change, undefined);
  assert.equal(h.element.style.value, "");
});
