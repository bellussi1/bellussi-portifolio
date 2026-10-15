import { test } from "node:test";
import assert from "node:assert/strict";
import { positionNavigationIndicator } from "../src/utils/navigation-indicator.js";

test("measures the active link before writing indicator styles", () => {
  const events = [];
  const values = {};
  const indicator = {
    style: new Proxy(values, {
      set(target, property, value) {
        events.push("write:" + property);
        target[property] = value;
        return true;
      },
    }),
  };
  const current = {
    get offsetWidth() {
      events.push("read:width");
      return 82;
    },
    get offsetLeft() {
      events.push("read:left");
      return 37;
    },
  };

  positionNavigationIndicator(indicator, current);

  assert.deepEqual(events, [
    "read:width",
    "read:left",
    "write:width",
    "write:transform",
    "write:opacity",
  ]);
  assert.equal(values.width, "82px");
  assert.equal(values.transform, "translateX(37px)");
  assert.equal(values.opacity, "1");
});

test("hides the indicator when no navigation link is active", () => {
  const values = {};
  positionNavigationIndicator({ style: values }, null);
  assert.equal(values.opacity, "0");
});
