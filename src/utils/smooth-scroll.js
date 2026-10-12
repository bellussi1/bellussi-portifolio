// Short wheel inertia on the real document: no virtual wrapper or altered touch.
export function initSmoothScroll(view = window, page = document) {
  const reduced = view.matchMedia("(prefers-reduced-motion: reduce)");
  const fine = view.matchMedia("(hover: hover) and (pointer: fine)");
  let frame = 0,
    target = view.scrollY,
    previousTime,
    direction = 0;
  const maxScroll = () =>
    Math.max(0, page.documentElement.scrollHeight - view.innerHeight);
  const clamp = (value) => Math.max(0, Math.min(maxScroll(), value));
  function stop() {
    view.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = undefined;
    direction = 0;
    target = view.scrollY;
  }
  function enabled() {
    return fine.matches && !reduced.matches && !page.hidden;
  }
  function hasNativeTarget(event) {
    if (
      event.target?.closest?.(
        "input, textarea, select, [contenteditable], [data-native-scroll]",
      )
    )
      return true;
    for (
      let node = event.target;
      node && node !== page.body && node !== page.documentElement;
      node = node.parentElement
    ) {
      if (node.scrollHeight <= node.clientHeight) continue;
      const overflow = view.getComputedStyle(node).overflowY;
      if (!/^(auto|scroll|overlay)$/.test(overflow)) continue;
      if (
        event.deltaY < 0
          ? node.scrollTop > 0
          : node.scrollTop + node.clientHeight < node.scrollHeight
      )
        return true;
    }
    return false;
  }
  function render(time) {
    frame = 0;
    if (!enabled()) {
      stop();
      return;
    }
    target = clamp(target);
    const elapsed =
      previousTime === undefined ? 16 : Math.min(64, time - previousTime);
    previousTime = time;
    const before = view.scrollY;
    const distance = target - before;
    const settled = Math.abs(distance) < 0.5;
    view.scrollTo({
      top: settled
        ? target
        : view.scrollY + distance * (1 - Math.exp(-elapsed / 95)),
      left: view.scrollX,
      behavior: "instant",
    });
    // Some browsers round scroll positions; finish instead of spinning on a
    // subpixel step that cannot change their actual document position.
    if (settled || view.scrollY === before) {
      if (!settled)
        view.scrollTo({ top: target, left: view.scrollX, behavior: "instant" });
      previousTime = undefined;
      direction = 0;
    } else frame = view.requestAnimationFrame(render);
  }
  function wheel(event) {
    if (
      !enabled() ||
      event.defaultPrevented ||
      !event.cancelable ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      !Number.isFinite(event.deltaY) ||
      event.deltaY === 0 ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
      hasNativeTarget(event)
    ) {
      stop();
      return;
    }
    const unit =
      event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? view.innerHeight : 1;
    const delta = event.deltaY * unit;
    // A reversed wheel gesture should brake now, rather than finish queued travel.
    if (!frame || Math.sign(delta) !== direction) target = view.scrollY;
    direction = Math.sign(delta);
    const next = clamp(target + delta);
    if (next === view.scrollY && !frame) return;
    event.preventDefault();
    // Limit queued travel during fast wheel bursts so the page stays responsive.
    target = clamp(
      Math.max(
        view.scrollY - view.innerHeight * 1.5,
        Math.min(view.scrollY + view.innerHeight * 1.5, next),
      ),
    );
    if (!frame) frame = view.requestAnimationFrame(render);
  }
  view.addEventListener("wheel", wheel, { passive: false });
  view.addEventListener("keydown", (event) => {
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
        "Tab",
      ].includes(event.key)
    )
      stop();
  });
  for (const name of ["pointerdown", "touchstart", "click", "resize"])
    view.addEventListener(name, stop, { passive: true });
  page.addEventListener("visibilitychange", stop);
  reduced.addEventListener("change", stop);
  fine.addEventListener("change", stop);
}
