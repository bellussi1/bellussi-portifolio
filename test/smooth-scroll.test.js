import { test } from "node:test";
import assert from "node:assert/strict";
import { initSmoothScroll } from "../src/utils/smooth-scroll.js";

function createHarness({ reduced = false, hidden = false } = {}) {
  const listeners = new Map();
  const preference = {
    matches: reduced,
    addEventListener: (_, listener) => (preference.change = listener),
    removeEventListener: (_, listener) => {
      if (preference.change === listener) delete preference.change;
    },
  };
  const view = {
    matchMedia: () => preference,
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener: (name, listener) => {
      if (listeners.get(name) === listener) listeners.delete(name);
    },
  };
  const page = {
    hidden,
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener: (name, listener) => {
      if (listeners.get(name) === listener) listeners.delete(name);
    },
  };
  const instances = [];
  class FakeLenis {
    constructor(options) {
      this.options = options;
      this.started = 1;
      this.stopped = 0;
      this.destroyed = 0;
      instances.push(this);
    }
    start() {
      this.started++;
    }
    stop() {
      this.stopped++;
    }
    destroy() {
      this.destroyed++;
    }
  }
  const cleanup = initSmoothScroll({ view, page, LenisClass: FakeLenis });
  return { cleanup, instances, listeners, page, preference };
}

test("creates Lenis with document scrolling and anchor-friendly options", () => {
  const { cleanup, instances } = createHarness();
  assert.equal(instances.length, 1);
  assert.deepEqual(instances[0].options, {
    autoRaf: true,
    anchors: true,
    stopInertiaOnNavigate: true,
    syncTouch: false,
    respectReducedMotion: true,
  });
  assert.equal(instances[0].started, 1);
  cleanup();
  assert.equal(instances[0].destroyed, 1);
});

test("stops and resumes Lenis with document visibility", () => {
  const { instances, listeners, page, cleanup } = createHarness();
  const instance = instances[0];

  page.hidden = true;
  listeners.get("visibilitychange")();
  assert.equal(instance.stopped, 1);

  page.hidden = false;
  listeners.get("visibilitychange")();
  assert.equal(instance.started, 2);
  assert.equal(instances.length, 1);
  cleanup();
});

test("destroys and recreates Lenis when reduced-motion preference changes", () => {
  const { cleanup, instances, preference } = createHarness();
  const first = instances[0];

  preference.matches = true;
  preference.change();
  assert.equal(first.destroyed, 1);
  assert.equal(instances.length, 1);

  preference.matches = false;
  preference.change();
  assert.equal(instances.length, 2);
  assert.equal(instances[1].started, 1);
  cleanup();
  assert.equal(instances[1].destroyed, 1);
});

test("does not create Lenis while reduced motion is active or the page is hidden", () => {
  const reduced = createHarness({ reduced: true });
  assert.equal(reduced.instances.length, 0);
  reduced.preference.matches = false;
  reduced.preference.change();
  assert.equal(reduced.instances.length, 1);
  reduced.cleanup();

  const hidden = createHarness({ hidden: true });
  assert.equal(hidden.instances.length, 0);
  hidden.page.hidden = false;
  hidden.listeners.get("visibilitychange")();
  assert.equal(hidden.instances.length, 1);
  hidden.cleanup();
});

test("cleanup removes preference and visibility listeners", () => {
  const { cleanup, listeners, preference } = createHarness();
  cleanup();
  assert.equal(preference.change, undefined);
  assert.equal(listeners.size, 0);
});
