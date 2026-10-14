const vertexSource = `#version 300 es
void main() {
  vec2 point = gl_VertexID == 0 ? vec2(-1.0, -1.0)
    : gl_VertexID == 1 ? vec2(3.0, -1.0) : vec2(-1.0, 3.0);
  gl_Position = vec4(point, 0.0, 1.0);
}`;

const fragmentSource = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
uniform float u_scroll;
out vec4 outputColor;

void main() {
  vec2 uv = gl_FragCoord.xy / max(u_resolution, vec2(1.0));
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0);
  float time = u_time * 0.11 + u_scroll * 0.08;
  float pointerDistance = length(p - pointer);
  vec2 field = p;
  float pointerPressure = exp(-pointerDistance * 3.2);
  float ripple = sin(pointerDistance * 16.0 - time * 2.0) * pointerPressure * 0.018;
  field += normalize(p - pointer + vec2(0.0001)) * ripple;
  field.x += sin(field.y * 3.4 + time) * 0.012;
  field.y += cos(field.x * 2.8 - time * 0.8) * 0.009;

  vec2 gridPosition = field * 18.0;
  vec2 lineDistance = abs(fract(gridPosition) - 0.5) / fwidth(gridPosition);
  float line = 1.0 - smoothstep(0.18, 1.15, min(lineDistance.x, lineDistance.y));
  float majorLine = 1.0 - smoothstep(0.2, 1.4, min(lineDistance.x, lineDistance.y));
  majorLine *= step(2.5, mod(floor(gridPosition.x) + floor(gridPosition.y), 6.0));
  float pointerLine = exp(-pointerDistance * 2.3) * line;
  float lineStrength = clamp(line * 0.34 + majorLine * 0.09 + pointerLine * 0.2, 0.0, 0.48);
  vec3 ink = vec3(0.39, 0.67, 0.69);
  outputColor = vec4(ink * lineStrength, lineStrength);
}`;

const noop = () => {};

export function initDeepField(canvas, { view = window } = {}) {
  if (!canvas?.getContext) return noop;

  let gl;
  try {
    gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
  } catch {
    return noop;
  }
  if (!gl) return noop;

  let vertexShader;
  let fragmentShader;
  let program;
  let vertexArray;
  try {
    vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    if (!program) throw new Error("Unable to create a WebGL program.");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program) || "Unable to link shaders.");
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    vertexShader = null;
    fragmentShader = null;
    vertexArray = gl.createVertexArray();
    if (!vertexArray) throw new Error("Unable to create a vertex array.");
  } catch {
    releaseResources(gl, { vertexShader, fragmentShader, program, vertexArray });
    return noop;
  }

  const uniforms = {
    resolution: gl.getUniformLocation(program, "u_resolution"),
    pointer: gl.getUniformLocation(program, "u_pointer"),
    time: gl.getUniformLocation(program, "u_time"),
    scroll: gl.getUniformLocation(program, "u_scroll"),
  };
  const page = canvas.ownerDocument ?? view.document;
  const reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = view.matchMedia("(hover: hover) and (pointer: fine)");
  const mobileViewport = view.matchMedia("(max-width: 760px)");
  let visible = false;
  const observer =
    typeof view.IntersectionObserver === "function"
      ? new view.IntersectionObserver(([entry]) => {
          visible = Boolean(entry?.isIntersecting);
          if (visible) start();
          else stop();
        }, { threshold: 0.01 })
      : null;
  if (!observer) visible = true;
  let frame = null;
  let running = false;
  let disposed = false;
  let lastRenderedAt = 0;
  let pointerX = 0.5;
  let pointerY = 0.5;
  let easedX = pointerX;
  let easedY = pointerY;

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return false;
    const pixelRatio = Math.min(
      view.devicePixelRatio || 1,
      mobileViewport.matches ? 1.15 : 1.5,
    );
    const width = Math.max(1, Math.round(bounds.width * pixelRatio));
    const height = Math.max(1, Math.round(bounds.height * pixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    return true;
  }

  function draw(time, easePointer = true) {
    if (!resize()) return;
    if (easePointer) {
      easedX += (pointerX - easedX) * 0.045;
      easedY += (pointerY - easedY) * 0.045;
    } else {
      easedX = pointerX = 0.5;
      easedY = pointerY = 0.5;
    }
    gl.useProgram(program);
    gl.bindVertexArray(vertexArray);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, easedX, easedY);
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.scroll, (view.scrollY || 0) / Math.max(view.innerHeight || 1, 1));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function canAnimate() {
    return !disposed && !reducedMotion.matches && visible && !page?.hidden;
  }

  function render(timestamp) {
    frame = null;
    if (!canAnimate()) {
      stop();
      return;
    }
    if (
      mobileViewport.matches &&
      lastRenderedAt &&
      timestamp - lastRenderedAt < 32
    ) {
      frame = view.requestAnimationFrame(render);
      return;
    }
    lastRenderedAt = timestamp;
    draw(timestamp / 1000, true);
    frame = view.requestAnimationFrame(render);
  }

  function start() {
    if (running || !canAnimate()) return;
    running = true;
    lastRenderedAt = 0;
    frame = view.requestAnimationFrame(render);
  }

  function stop() {
    running = false;
    lastRenderedAt = 0;
    if (frame !== null) view.cancelAnimationFrame(frame);
    frame = null;
    if (!disposed) draw(0, false);
  }

  function onPointerMove(event) {
    if (!finePointer.matches || !visible) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    pointerX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    pointerY = 1 - Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
  }

  function onMotionChange() {
    if (reducedMotion.matches) stop();
    else start();
  }

  function onVisibilityChange() {
    if (page?.hidden) stop();
    else start();
  }

  function onPointerCapabilityChange() {
    if (!finePointer.matches) {
      view.removeEventListener("pointermove", onPointerMove);
      pointerX = pointerY = 0.5;
    } else {
      view.addEventListener("pointermove", onPointerMove, { passive: true });
    }
  }

  function onResize() {
    if (!running) draw(0, false);
  }

  try {
    canvas.dataset.fieldReady = "true";
    gl.clearColor(0, 0, 0, 0);
    draw(0, false);
    observer?.observe(canvas);
    view.addEventListener("resize", onResize, { passive: true });
    reducedMotion.addEventListener("change", onMotionChange);
    finePointer.addEventListener("change", onPointerCapabilityChange);
    page?.addEventListener("visibilitychange", onVisibilityChange);
    if (finePointer.matches)
      view.addEventListener("pointermove", onPointerMove, { passive: true });
    start();
  } catch {
    observer?.disconnect();
    view.removeEventListener("resize", onResize);
    reducedMotion.removeEventListener("change", onMotionChange);
    finePointer.removeEventListener("change", onPointerCapabilityChange);
    page?.removeEventListener("visibilitychange", onVisibilityChange);
    view.removeEventListener("pointermove", onPointerMove);
    releaseResources(gl, { program, vertexArray });
    delete canvas.dataset.fieldReady;
    return noop;
  }

  return () => {
    if (disposed) return;
    disposed = true;
    running = false;
    if (frame !== null) view.cancelAnimationFrame(frame);
    frame = null;
    observer?.disconnect();
    view.removeEventListener("resize", onResize);
    view.removeEventListener("pointermove", onPointerMove);
    reducedMotion.removeEventListener("change", onMotionChange);
    finePointer.removeEventListener("change", onPointerCapabilityChange);
    page?.removeEventListener("visibilitychange", onVisibilityChange);
    releaseResources(gl, { program, vertexArray });
    delete canvas.dataset.fieldReady;
  };
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create a WebGL shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader) || "Unable to compile a shader.";
    gl.deleteShader(shader);
    throw new Error(error);
  }
  return shader;
}

function releaseResources(gl, { vertexShader, fragmentShader, program, vertexArray }) {
  if (vertexShader) gl.deleteShader(vertexShader);
  if (fragmentShader) gl.deleteShader(fragmentShader);
  if (program) gl.deleteProgram(program);
  if (vertexArray) gl.deleteVertexArray(vertexArray);
}
