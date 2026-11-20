import { test } from "node:test";
import assert from "node:assert/strict";
import { nextTabIndex } from "../src/utils/tabs.js";

test("moves between tabs with arrows and wraps at the ends", () => {
  assert.equal(nextTabIndex("ArrowRight", 0, 5), 1);
  assert.equal(nextTabIndex("ArrowRight", 4, 5), 0);
  assert.equal(nextTabIndex("ArrowLeft", 0, 5), 4);
  assert.equal(nextTabIndex("ArrowDown", 2, 5), 3);
  assert.equal(nextTabIndex("ArrowUp", 2, 5), 1);
});

test("jumps to the first and last tab and ignores other keys", () => {
  assert.equal(nextTabIndex("Home", 3, 5), 0);
  assert.equal(nextTabIndex("End", 1, 5), 4);
  assert.equal(nextTabIndex("Enter", 1, 5), -1);
});
