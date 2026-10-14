import { test } from "node:test";
import assert from "node:assert/strict";

async function loadConceptModule() {
  try {
    return await import("../src/utils/concept.js");
  } catch (error) {
    if (error.code === "ERR_MODULE_NOT_FOUND")
      assert.fail("concept URL state module is missing");
    throw error;
  }
}

class FakeControl {
  constructor(concept) {
    this.dataset = { conceptOption: concept };
    this.attributes = new Map();
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  removeEventListener(type) {
    this.listeners.delete(type);
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  click() {
    this.listeners.get("click")?.({
      currentTarget: this,
      preventDefault() {},
    });
  }
}

class FakeView {
  constructor(href) {
    this.url = new URL(href);
    this.listeners = new Map();
    this.location = {};
    Object.defineProperties(this.location, {
      href: { get: () => this.url.href },
      search: { get: () => this.url.search },
    });
    this.history = {
      pushState: (_state, _title, href) => {
        this.url = new URL(href, this.url);
      },
    };
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  removeEventListener(type) {
    this.listeners.delete(type);
  }

  popTo(href) {
    this.url = new URL(href, this.url);
    this.listeners.get("popstate")?.();
  }
}

function makeRoot(view) {
  const controls = [new FakeControl("field"), new FakeControl("index")];
  return {
    root: {
      dataset: {},
      querySelectorAll(selector) {
        assert.equal(selector, "[data-concept-option]");
        return controls;
      },
    },
    controls,
    view,
  };
}

test("concept query defaults to field and selects index only for concept=b", async () => {
  const { readConcept } = await loadConceptModule();
  assert.equal(readConcept(""), "field");
  assert.equal(readConcept("?campaign=portfolio"), "field");
  assert.equal(readConcept("?concept=unknown"), "field");
  assert.equal(readConcept("?concept=b"), "index");
});

test("switcher updates the URL and pressed state without dropping other query values", async () => {
  const { initConceptSwitcher } = await loadConceptModule();
  const h = makeRoot(new FakeView("https://portfolio.test/?campaign=2026"));
  const cleanup = initConceptSwitcher({ root: h.root, view: h.view });

  assert.equal(h.root.dataset.concept, "field");
  assert.equal(h.controls[0].getAttribute("aria-pressed"), "true");
  assert.equal(h.controls[1].getAttribute("aria-pressed"), "false");

  h.controls[1].click();
  assert.equal(h.root.dataset.concept, "index");
  assert.equal(h.view.url.searchParams.get("concept"), "b");
  assert.equal(h.view.url.searchParams.get("campaign"), "2026");
  assert.equal(h.controls[0].getAttribute("aria-pressed"), "false");
  assert.equal(h.controls[1].getAttribute("aria-pressed"), "true");

  h.controls[0].click();
  assert.equal(h.root.dataset.concept, "field");
  assert.equal(h.view.url.searchParams.has("concept"), false);
  assert.equal(h.view.url.searchParams.get("campaign"), "2026");
  cleanup();
});

test("browser history restores the selected concept and cleanup removes listeners", async () => {
  const { initConceptSwitcher } = await loadConceptModule();
  const h = makeRoot(new FakeView("https://portfolio.test/?concept=b"));
  const cleanup = initConceptSwitcher({ root: h.root, view: h.view });

  assert.equal(h.root.dataset.concept, "index");
  h.view.popTo("https://portfolio.test/");
  assert.equal(h.root.dataset.concept, "field");
  assert.equal(h.controls[0].getAttribute("aria-pressed"), "true");
  assert.equal(h.controls[1].getAttribute("aria-pressed"), "false");

  cleanup();
  h.controls[1].click();
  assert.equal(h.root.dataset.concept, "field");
  assert.equal(h.view.url.searchParams.has("concept"), false);
});
