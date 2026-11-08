import Lenis from "lenis";

const lenisOptions = {
  autoRaf: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  syncTouch: false,
  respectReducedMotion: true,
};

export function initSmoothScroll({
  view = window,
  page = document,
  LenisClass = Lenis,
} = {}) {
  const reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)");
  let instance = null;
  let stopped = false;
  let disposed = false;

  function stop() {
    if (instance && !stopped) instance.stop();
    stopped = true;
  }

  function destroy() {
    if (!instance) return;
    instance.destroy();
    instance = null;
    stopped = false;
  }

  function sync() {
    if (disposed) return;
    if (reducedMotion.matches) {
      destroy();
      return;
    }
    if (page.hidden) {
      stop();
      return;
    }
    if (!instance) {
      instance = new LenisClass({ ...lenisOptions });
      stopped = false;
    } else if (stopped) {
      instance.start();
      stopped = false;
    }
  }

  function onVisibilityChange() {
    sync();
  }

  function onMotionChange() {
    sync();
  }

  page.addEventListener("visibilitychange", onVisibilityChange);
  reducedMotion.addEventListener("change", onMotionChange);
  sync();

  return () => {
    if (disposed) return;
    disposed = true;
    page.removeEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.removeEventListener("change", onMotionChange);
    destroy();
  };
}
