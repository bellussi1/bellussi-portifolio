import { test } from "node:test";
import assert from "node:assert/strict";
import { initDeepField } from "../src/visuals/deep-field.js";

function createGl() {
  let serial = 0;
  const deleted = [];
  const pointerValues = [];
  return {
    deleted,
    pointerValues,
    VERTEX_SHADER: 1,
    FRAGMENT_SHADER: 2,
    COMPILE_STATUS: 3,
    LINK_STATUS: 4,
    ARRAY_BUFFER: 5,
    STATIC_DRAW: 6,
    FLOAT: 7,
    TRIANGLES: 8,
    COLOR_BUFFER_BIT: 9,
    createShader: () => ({ id: ++serial }),
    shaderSource() {},
    compileShader() {},
    getShaderParameter: () => true,
    getShaderInfoLog: () => "",
    createProgram: () => ({ id: ++serial }),
    attachShader() {},
    linkProgram() {},
    getProgramParameter: () => true,
    getProgramInfoLog: () => "",
    getAttribLocation: () => 0,
    getUniformLocation: (_, name) => ({ name }),
    createBuffer: () => ({ id: ++serial }),
    createVertexArray: () => ({ id: ++serial }),
    bindVertexArray() {},
    bindBuffer() {},
    bufferData() {},
    enableVertexAttribArray() {},
    vertexAttribPointer() {},
    useProgram() {},
    uniform2f: (location, x, y) => {
      if (location.name === "u_pointer") pointerValues.push([x, y]);
    },
    uniform1f() {},
    viewport() {},
    clearColor() {},
    clear() {},
    drawArrays() {},
    deleteShader: (value) => deleted.push(value),
    deleteProgram: (value) => deleted.push(value),
    deleteBuffer: (value) => deleted.push(value),
    deleteVertexArray: (value) => deleted.push(value),
  };
}

function createHarness({ reduced = false, fine = true, context = createGl() } = {}) {
  const listeners = new Map();
  const frames = new Map();
  const preferences = new Map();
  function createPreference(query) {
    if (!preferences.has(query)) {
      const preference = {
        matches:
          (query.includes("prefers-reduced-motion") && reduced) ||
          (query.includes("pointer: fine") && fine),
        addEventListener: (_, fn) => (preference.change = fn),
        removeEventListener: (_, fn) => {
          if (preference.change === fn) delete preference.change;
        },
      };
      preferences.set(query, preference);
    }
    return preferences.get(query);
  }
  let serial = 0;
  let intersectionCallback;
  class FakeIntersectionObserver {
    constructor(callback) {
      intersectionCallback = callback;
    }
    observe() {}
    disconnect() {
      this.disconnected = true;
    }
  }
  const page = {
    hidden: false,
    addEventListener: (name, fn) => listeners.set(`page:${name}`, fn),
    removeEventListener: (name) => listeners.delete(`page:${name}`),
  };
  const view = {
    devicePixelRatio: 2,
    matchMedia: createPreference,
    IntersectionObserver: FakeIntersectionObserver,
    addEventListener: (name, fn) => listeners.set(`view:${name}`, fn),
    removeEventListener: (name) => listeners.delete(`view:${name}`),
    requestAnimationFrame(fn) {
      frames.set(++serial, fn);
      return serial;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
  };
  const canvas = {
    width: 0,
    height: 0,
    dataset: {},
    ownerDocument: page,
    getContext: (name) => (name === "webgl2" ? context : null),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 640, height: 520 }),
  };
  const cleanup = initDeepField(canvas, { view });
  return {
    canvas,
    cleanup,
    context,
    emitIntersection(isIntersecting) {
      intersectionCallback?.([{ isIntersecting }]);
    },
    frames,
    listeners,
    page,
    preference: createPreference("(prefers-reduced-motion: reduce)"),
    view,
  };
}

test("WebGL2 failure keeps the decorative canvas safely inactive", () => {
  const h = createHarness({ context: null });
  assert.equal(typeof h.cleanup, "function");
  assert.equal(h.frames.size, 0);
  assert.equal(h.listeners.size, 0);
  assert.doesNotThrow(h.cleanup);
});

test("shader setup failure releases partial GPU resources and falls back", () => {
  const gl = createGl();
  gl.getShaderParameter = () => false;
  const h = createHarness({ context: gl });
  assert.equal(h.frames.size, 0);
  assert.equal(h.listeners.size, 0);
  assert.equal(gl.deleted.length, 1);
  h.cleanup();
});

test("runs only while visible and motion is allowed, then cleans up WebGL state", () => {
  const gl = createGl();
  const h = createHarness({ context: gl });
  assert.equal(h.frames.size, 0);
  const pointerMove = h.listeners.get("view:pointermove");
  assert.equal(typeof pointerMove, "function");

  h.emitIntersection(true);
  assert.equal(h.frames.size, 1);
  pointerMove({ clientX: 480, clientY: 260 });
  const [[id, frame]] = h.frames;
  h.frames.delete(id);
  frame(16);
  assert.equal(h.frames.size, 1);
  assert.ok(gl.pointerValues.at(-1)[0] > 0.5);

  h.preference.matches = true;
  h.preference.change();
  assert.equal(h.frames.size, 0);
  h.preference.matches = false;
  h.preference.change();
  assert.equal(h.frames.size, 1);

  h.page.hidden = true;
  h.listeners.get("page:visibilitychange")();
  assert.equal(h.frames.size, 0);
  h.page.hidden = false;
  h.listeners.get("page:visibilitychange")();
  assert.equal(h.frames.size, 1);

  h.cleanup();
  assert.equal(h.frames.size, 0);
  assert.equal(h.listeners.size, 0);
  assert.ok(gl.deleted.length >= 4);
});

test("does not start rendering while reduced motion is preferred", () => {
  const h = createHarness({ reduced: true });
  h.emitIntersection(true);
  assert.equal(h.frames.size, 0);
  h.cleanup();
});
