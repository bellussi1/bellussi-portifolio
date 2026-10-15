// Animate visual layers, while the document keeps native scrolling and focus.
export function initParallax(view = window, page = document) {
  const reduced = view.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = view.matchMedia("(max-width: 760px)");
  const definitions = [
    [".visual-grid", ".engineering-visual", 0.035, 22],
    [".orbit-one", ".engineering-visual", -0.075, 44],
    [".orbit-two", ".engineering-visual", 0.09, 52],
    [".field-orbit", ".field-hero-visual", 0.035, 24],
    [".pixel-index-preview", ".engineering-visual", -0.045, 24],
    [".index-ornament", ".engineering-visual", 0.06, 18],
    [".index-hero-orbit-point", ".engineering-visual", -0.07, 30],
    [".index-grid-section", ".index-grid-section", 0.022, 16],
    [".approach-section", ".approach-section", 0.022, 16],
    [".portfolio-product-visual", ".field-product-case", 0.025, 18],
    [".system-window", ".engineering-visual", 0.045, 28],
    [".code-fragment", ".engineering-visual", -0.06, 36],
    [".visual-tag", ".engineering-visual", 0.025, 16],
    [".project-demo", ".project-row", 0.055, 36],
  ];
  const layers = definitions
    .flatMap(([selector, anchor, speed, limit]) =>
      [...page.querySelectorAll(selector)].map((element) => ({
        element,
        anchor: element.closest(anchor),
        speed,
        limit,
        current: 0,
        target: 0,
      })),
    )
    .filter((layer) => layer.anchor);
  const anchorGeometry = new Map();
  let frame = 0;
  let previousTime;
  let disposed = false;

  function enabled() {
    return !reduced.matches && !page.hidden;
  }
  function reset() {
    view.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = undefined;
    layers.forEach((layer) => {
      layer.current = layer.target = 0;
      layer.element.style.removeProperty("--parallax-y");
    });
  }
  function render(time) {
    frame = 0;
    if (disposed) return;
    if (!enabled()) {
      reset();
      return;
    }
    const elapsed =
      previousTime === undefined ? 16 : Math.min(64, time - previousTime);
    previousTime = time;
    const blend = 1 - Math.exp(-elapsed / 110);
    let unsettled = false;
    layers.forEach((layer) => {
      const remaining = layer.target - layer.current;
      layer.current =
        Math.abs(remaining) < 0.1
          ? layer.target
          : layer.current + remaining * blend;
      layer.element.style.setProperty(
        "--parallax-y",
        `${layer.current.toFixed(2)}px`,
      );
      if (Math.abs(layer.target - layer.current) >= 0.1) unsettled = true;
    });
    if (unsettled) frame = view.requestAnimationFrame(render);
    else previousTime = undefined;
  }
  function measureAnchors() {
    anchorGeometry.clear();
    layers.forEach(({ anchor }) => {
      if (anchorGeometry.has(anchor)) return;
      const bounds = anchor.getBoundingClientRect();
      const ownLayer = layers.find((layer) => layer.element === anchor);
      anchorGeometry.set(anchor, {
        top: bounds.top + (view.scrollY || 0) - (ownLayer?.current || 0),
        height: bounds.height,
      });
    });
  }

  function update(measure = false) {
    if (disposed) return;
    if (!enabled()) {
      reset();
      return;
    }
    if (measure) measureAnchors();
    layers.forEach((layer) => {
      const rect = anchorGeometry.get(layer.anchor);
      const viewportTop = rect.top - (view.scrollY || 0);
      const displacement =
        view.innerHeight / 2 - (viewportTop + rect.height / 2);
      const limit = mobile.matches
        ? Math.min(10, layer.limit * 0.25)
        : layer.limit;
      const speed = layer.speed * (mobile.matches ? 0.25 : 1);
      layer.target = Math.max(-limit, Math.min(limit, displacement * speed));
    });
    if (!frame && layers.length) frame = view.requestAnimationFrame(render);
  }
  function onResize() {
    update(true);
  }
  view.addEventListener("scroll", update, { passive: true });
  view.addEventListener("resize", onResize);
  page.addEventListener("visibilitychange", onResize);
  reduced.addEventListener("change", onResize);
  mobile.addEventListener("change", onResize);
  update(true);
  return () => {
    if (disposed) return;
    disposed = true;
    view.removeEventListener("scroll", update);
    view.removeEventListener("resize", onResize);
    page.removeEventListener("visibilitychange", onResize);
    reduced.removeEventListener("change", onResize);
    mobile.removeEventListener("change", onResize);
    reset();
  };
}
