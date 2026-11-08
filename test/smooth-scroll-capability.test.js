import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldEnableSmoothScroll } from "../src/utils/smooth-scroll-capability.js";

function device({ finePointer = true, hardwareConcurrency = 8 } = {}) {
  return {
    matchMedia: () => ({ matches: finePointer }),
  };
}

test("enables Lenis for a capable desktop pointer", () => {
  assert.equal(shouldEnableSmoothScroll(device(), 8), true);
});

test("keeps native scrolling for touch-first screens", () => {
  assert.equal(shouldEnableSmoothScroll(device({ finePointer: false }), 8), false);
});

test("keeps native scrolling on lower-core devices", () => {
  assert.equal(shouldEnableSmoothScroll(device(), 4), false);
});

test("defaults to a fine-pointer desktop when core count is unavailable", () => {
  assert.equal(shouldEnableSmoothScroll(device(), undefined), true);
});
