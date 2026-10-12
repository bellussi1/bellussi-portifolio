import { test } from "node:test";
import assert from "node:assert/strict";
import { initSmoothScroll } from "../src/utils/smooth-scroll.js";

function harness({ reduced = false, fine = true, rounded = false } = {}) {
  const listeners = new Map(),
    media = new Map(),
    frames = new Map();
  const root = { scrollHeight: 4000 };
  const page = {
    documentElement: root,
    body: {},
    hidden: false,
    addEventListener: (key, fn) => listeners.set(key, fn),
  };
  let serial = 0,
    time = 0;
  const view = {
    scrollY: 0,
    scrollX: 0,
    innerHeight: 800,
    matchMedia(query) {
      const value = {
        matches: query.includes("reduce") ? reduced : fine,
        addEventListener: (_, fn) => {
          value.change = fn;
        },
      };
      media.set(query, value);
      return value;
    },
    addEventListener: (key, fn) => listeners.set(key, fn),
    requestAnimationFrame(fn) {
      frames.set(++serial, fn);
      return serial;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
    scrollTo(options) {
      assert.equal(options.behavior, "instant");
      view.scrollY = rounded ? Math.round(options.top) : options.top;
    },
    getComputedStyle(node) {
      return { overflowY: node.overflowY ?? "visible" };
    },
  };
  const target = { closest: () => null, parentElement: null };
  const wheel = (overrides = {}) => {
    const event = {
      deltaY: 120,
      deltaX: 0,
      deltaMode: 0,
      cancelable: true,
      target,
      preventDefault() {
        this.defaultPrevented = true;
      },
      ...overrides,
    };
    listeners.get("wheel")(event);
    return event;
  };
  function tick() {
    const pending = [...frames.values()];
    frames.clear();
    time += 16;
    pending.forEach((fn) => fn(time));
  }
  function settle() {
    for (let i = 0; frames.size && i < 200; i++) tick();
    assert.equal(frames.size, 0);
  }
  initSmoothScroll(view, page);
  return { view, page, media, frames, listeners, wheel, tick, settle };
}

test("wheel movement eases, accumulates, reverses immediately and settles within page bounds", () => {
  const h = harness();
  assert.equal(h.wheel().defaultPrevented, true);
  h.tick();
  assert.ok(h.view.scrollY > 0 && h.view.scrollY < 120);
  h.wheel();
  h.settle();
  assert.equal(h.view.scrollY, 240);
  h.wheel({ deltaY: 500 });
  h.tick();
  const before = h.view.scrollY;
  h.wheel({ deltaY: -80 });
  h.tick();
  assert.ok(h.view.scrollY < before);
  h.settle();
  h.view.scrollY = 3190;
  h.wheel();
  h.settle();
  assert.equal(h.view.scrollY, 3200);
});

test("integer scroll positions do not leave an endless animation at the destination", () => {
  const h = harness({ rounded: true });
  h.wheel();
  h.settle();
  assert.equal(h.view.scrollY, 120);
});

test("native interactions, nested scrolling, zoom and reduced motion retain control", () => {
  for (const options of [{ reduced: true }, { fine: false }]) {
    const h = harness(options);
    assert.ok(!h.wheel().defaultPrevented);
    assert.equal(h.frames.size, 0);
  }
  const h = harness();
  for (const overrides of [
    { ctrlKey: true },
    { shiftKey: true },
    { deltaX: 200 },
    { cancelable: false },
    { target: { closest: () => ({ tagName: "TEXTAREA" }) } },
    {
      target: {
        closest: () => null,
        overflowY: "auto",
        scrollHeight: 800,
        clientHeight: 200,
        scrollTop: 20,
        parentElement: null,
      },
    },
  ])
    assert.ok(!h.wheel(overrides).defaultPrevented);
  for (const key of ["keydown", "pointerdown", "touchstart", "click"]) {
    h.wheel();
    h.listeners.get(key)({ key: "PageDown" });
    assert.equal(h.frames.size, 0);
  }
  h.wheel();
  const reduced = h.media.get("(prefers-reduced-motion: reduce)");
  reduced.matches = true;
  reduced.change();
  assert.equal(h.frames.size, 0);
});
