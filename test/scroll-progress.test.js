import { test } from "node:test";
import assert from "node:assert/strict";
import { renderScrollProgress } from "../src/utils/scroll-progress.js";

function controls() {
  const writes = [];
  return {
    writes,
    progress: { style: { set transform(value) { writes.push(["progress", value]); } } },
    header: {
      classList: {
        toggle(name, active) {
          writes.push([name, active]);
        },
      },
    },
  };
}

test("updates the progress indicator from cached geometry and clamps its range", () => {
  const { progress, header, writes } = controls();
  renderScrollProgress({ progress, header, scrollY: 140, scrollable: 100 });
  assert.deepEqual(writes, [
    ["progress", "scaleX(1)"],
    ["is-scrolled", true],
  ]);
});

test("keeps progress at zero when the page has no scroll range", () => {
  const { progress, header, writes } = controls();
  renderScrollProgress({ progress, header, scrollY: 0, scrollable: 0 });
  assert.deepEqual(writes, [
    ["progress", "scaleX(0)"],
    ["is-scrolled", false],
  ]);
});
