import { test } from "node:test";
import assert from "node:assert/strict";
import { formatLike, parseCount, valueAt } from "../src/utils/count-up.js";
import { initReveal } from "../src/utils/reveal.js";

test("counts up from zero to the target and clamps", () => {
  assert.equal(valueAt(1320, 0), 0);
  assert.equal(valueAt(1320, 1), 1320);
  assert.equal(valueAt(1320, 2), 1320);
  assert.ok(valueAt(1320, 0.5) > 660);
});

test("keeps the original number grouping", () => {
  assert.equal(parseCount("12,146"), 12146);
  assert.equal(parseCount("1.482"), 1482);
  assert.equal(parseCount("none"), null);
  assert.equal(formatLike("12,146", 3025), "3,025");
  assert.equal(formatLike("1.482", 3025), "3.025");
});

test("reveal does nothing under reduced motion", () => {
  const win = {
    IntersectionObserver: class {},
    matchMedia: () => ({ matches: true }),
  };
  const root = { documentElement: { dataset: {} } };
  const stop = initReveal({ root, win });
  assert.equal(root.documentElement.dataset.motion, undefined);
  stop();
});

test("reveal marks entries visible once and stops watching them", () => {
  const observed = [];
  let callback;
  const win = {
    IntersectionObserver: class {
      constructor(cb) { callback = cb; }
      observe(element) { observed.push(element); }
      unobserve(element) { observed.splice(observed.indexOf(element), 1); }
      disconnect() {}
    },
    MutationObserver: class { observe() {} disconnect() {} },
    matchMedia: () => ({ matches: false }),
  };
  const classes = new Set();
  const element = { classList: { add: (name) => classes.add(name) } };
  const root = {
    documentElement: { dataset: {} },
    querySelector: () => ({}),
    querySelectorAll: () => [element],
  };
  const stop = initReveal({ root, win });
  assert.equal(root.documentElement.dataset.motion, "enabled");
  assert.deepEqual(observed, [element]);
  callback([{ isIntersecting: true, target: element }]);
  assert.ok(classes.has("is-visible"));
  assert.deepEqual(observed, []);
  stop();
  assert.equal(root.documentElement.dataset.motion, undefined);
});
