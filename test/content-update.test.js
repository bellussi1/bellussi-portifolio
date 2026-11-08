import { test } from "node:test";
import assert from "node:assert/strict";
import {
  setInnerHtmlIfChanged,
  setMarkupInFrames,
} from "../src/utils/content-update.js";

test("keeps matching translation markup without rewriting the DOM", () => {
  let writes = 0;
  const element = {
    value: "<em>arquitetura.</em>",
    get innerHTML() {
      return this.value;
    },
    set innerHTML(value) {
      writes++;
      this.value = value;
    },
  };

  assert.equal(setInnerHtmlIfChanged(element, "<em>arquitetura.</em>"), false);
  assert.equal(writes, 0);
  assert.equal(setInnerHtmlIfChanged(element, "<em>architecture.</em>"), true);
  assert.equal(writes, 1);
  assert.equal(element.innerHTML, "<em>architecture.</em>");
});

test("writes each large section in its own animation frame", () => {
  const writes = [];
  const makeTarget = (name) => ({
    _html: "",
    get innerHTML() {
      return this._html;
    },
    set innerHTML(value) {
      this._html = value;
      writes.push(name);
    },
  });
  const targets = [makeTarget("experience"), makeTarget("products"), makeTarget("projects")];
  const frames = [];
  let completed = false;

  setMarkupInFrames(
    targets.map((target, index) => [target, `section-${index}`]),
    (callback) => frames.push(callback),
    () => {
      completed = true;
    },
  );
  assert.deepEqual(writes, []);
  frames.shift()();
  assert.deepEqual(writes, ["experience"]);
  assert.equal(completed, false);
  frames.shift()();
  assert.deepEqual(writes, ["experience", "products"]);
  assert.equal(completed, false);
  frames.shift()();
  assert.deepEqual(writes, ["experience", "products", "projects"]);
  assert.equal(completed, true);
});

test("renders lazy section markup only in its assigned frame", () => {
  const writes = [];
  const frames = [];
  const target = (name) => {
    let html = "";
    return {
      get innerHTML() {
        return html;
      },
      set innerHTML(value) {
        html = value;
        writes.push(name);
      },
    };
  };
  const first = target("experience");
  const second = target("products");
  const rendered = [];

  setMarkupInFrames(
    [
      [first, () => (rendered.push("experience"), "experience markup")],
      [second, () => (rendered.push("products"), "products markup")],
    ],
    (callback) => frames.push(callback),
  );
  assert.deepEqual(rendered, []);
  frames.shift()();
  assert.deepEqual(rendered, ["experience"]);
  assert.deepEqual(writes, ["experience"]);
  frames.shift()();
  assert.deepEqual(rendered, ["experience", "products"]);
  assert.deepEqual(writes, ["experience", "products"]);
});
