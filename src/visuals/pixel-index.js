const noop = () => {};

export function initPixelIndex({
  root = document.documentElement,
  view = window,
} = {}) {
  if (root.dataset.concept !== "index") return noop;

  const page = root.ownerDocument ?? view.document;
  const cursor = root.querySelector("[data-pixel-cursor]");
  const ornaments = [...root.querySelectorAll("[data-index-depth]")];
  const reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = view.matchMedia("(hover: hover) and (pointer: fine)");
  let pointerAttached = false;
  let disposed = false;

  function clearPointer() {
    root.style.removeProperty("--index-pointer-x");
    root.style.removeProperty("--index-pointer-y");
    ornaments.forEach((ornament) => {
      ornament.style.removeProperty("--index-shift-x");
      ornament.style.removeProperty("--index-shift-y");
    });
    if (cursor) {
      cursor.dataset.active = "false";
      cursor.dataset.pressed = "false";
    }
  }

  function onPointerMove(event) {
    if (reducedMotion.matches || !finePointer.matches || page?.hidden) return;
    root.style.setProperty("--index-pointer-x", `${event.clientX}px`);
    root.style.setProperty("--index-pointer-y", `${event.clientY}px`);
    const horizontal = event.clientX / Math.max(1, view.innerWidth) - 0.5;
    const vertical = event.clientY / Math.max(1, view.innerHeight) - 0.5;
    ornaments.forEach((ornament) => {
      const depth = Number.parseFloat(ornament.dataset.indexDepth) || 0;
      ornament.style.setProperty(
        "--index-shift-x",
        `${(horizontal * depth * 2).toFixed(2)}px`,
      );
      ornament.style.setProperty(
        "--index-shift-y",
        `${(vertical * depth * 2).toFixed(2)}px`,
      );
    });
    if (cursor) cursor.dataset.active = "true";
  }

  function onPointerLeave() {
    clearPointer();
  }

  function onPointerDown() {
    if (cursor?.dataset.active === "true") cursor.dataset.pressed = "true";
  }

  function onPointerUp() {
    if (cursor) cursor.dataset.pressed = "false";
  }

  function detachPointer() {
    if (pointerAttached) {
      view.removeEventListener("pointermove", onPointerMove);
      view.removeEventListener("pointerleave", onPointerLeave);
      view.removeEventListener("pointerdown", onPointerDown);
      view.removeEventListener("pointerup", onPointerUp);
      view.removeEventListener("pointercancel", onPointerUp);
      view.removeEventListener("blur", onPointerLeave);
      pointerAttached = false;
    }
    clearPointer();
  }

  function attachPointer() {
    if (pointerAttached || reducedMotion.matches || !finePointer.matches || page?.hidden)
      return;
    view.addEventListener("pointermove", onPointerMove, { passive: true });
    view.addEventListener("pointerleave", onPointerLeave, { passive: true });
    view.addEventListener("pointerdown", onPointerDown, { passive: true });
    view.addEventListener("pointerup", onPointerUp, { passive: true });
    view.addEventListener("pointercancel", onPointerUp, { passive: true });
    view.addEventListener("blur", onPointerLeave, { passive: true });
    pointerAttached = true;
  }

  function syncMotion() {
    if (disposed) return;
    root.dataset.indexEffects = "ready";
    if (reducedMotion.matches || page?.hidden) {
      root.dataset.indexPaused = "true";
      detachPointer();
      return;
    }
    delete root.dataset.indexPaused;
    if (!finePointer.matches) {
      detachPointer();
      return;
    }
    attachPointer();
  }

  function onVisibilityChange() {
    syncMotion();
  }

  page?.addEventListener("visibilitychange", onVisibilityChange);
  reducedMotion.addEventListener("change", syncMotion);
  finePointer.addEventListener("change", syncMotion);
  syncMotion();

  return () => {
    if (disposed) return;
    disposed = true;
    page?.removeEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.removeEventListener("change", syncMotion);
    finePointer.removeEventListener("change", syncMotion);
    detachPointer();
    delete root.dataset.indexEffects;
    delete root.dataset.indexPaused;
  };
}
