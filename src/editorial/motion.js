// C-only motion: no scroll hijacking, persistent loop, or hidden-until-JS content.
export function initEditorialMotion({
  onProjectVisible,
  entrance = false,
} = {}) {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = matchMedia("(hover: hover) and (pointer: fine)");
  const surfaces = [...document.querySelectorAll("[data-pointer-surface]")];
  let frame = 0,
    pointerFrame = 0,
    range = 1,
    pending,
    disposed = false,
    revealObserver;
  const animations = new Set();
  function animate(element, keyframes, options) {
    if (reduced.matches || !element?.animate) return;
    const animation = element.animate(keyframes, options);
    animations.add(animation);
    animation.finished
      .catch(() => {})
      .finally(() => animations.delete(animation));
  }
  const motionOptions = {
    duration: 500,
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
  };
  function syncPreference() {
    revealObserver?.disconnect();
    if (reduced.matches) {
      root.removeAttribute("data-intro-motion");
      animations.forEach((a) => a.cancel());
      animations.clear();
      resetPointer();
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          if (element.dataset.reveal === "title")
            animate(
              element,
              [
                {
                  clipPath: "inset(0 0 100% 0)",
                  transform: "translateY(10px)",
                },
                { clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
              ],
              motionOptions,
            );
          else if (element.dataset.reveal === "case") {
            const heading = element.querySelector(".case-heading");
            animate(
              heading,
              [
                { opacity: 0.55, transform: "translateX(14px)" },
                { opacity: 1, transform: "translateX(0)" },
              ],
              motionOptions,
            );
            animate(
              element.querySelector(".case-art"),
              [
                { opacity: 0.6, transform: "translateY(18px) scale(.98)" },
                { opacity: 1, transform: "translateY(0) scale(1)" },
              ],
              { ...motionOptions, delay: 70, duration: 600 },
            );
          } else
            animate(
              element,
              [
                { opacity: 0.65, transform: "translateY(10px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { ...motionOptions, duration: 420 },
            );
          revealObserver.unobserve(element);
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => revealObserver.observe(element));
  }
  if (entrance && !reduced.matches) root.dataset.introMotion = "ready";
  // The identity entrance is not replayed every time the language changes.
  const introTimer = setTimeout(
    () => root.removeAttribute("data-intro-motion"),
    1100,
  );
  syncPreference();
  reduced.addEventListener("change", syncPreference);
  function updateProgress() {
    frame = 0;
    if (disposed || document.hidden) return;
    const progress = document.querySelector("#reading-progress");
    if (progress)
      progress.style.transform = `scaleY(${Math.min(1, Math.max(0, scrollY / range))})`;
  }
  function scheduleProgress() {
    if (!frame && !document.hidden)
      frame = requestAnimationFrame(updateProgress);
  }
  function measure() {
    range = Math.max(1, root.scrollHeight - innerHeight);
    scheduleProgress();
  }
  window.addEventListener("scroll", scheduleProgress, { passive: true });
  window.addEventListener("resize", measure);
  const resizeObserver =
    typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
  resizeObserver?.observe(document.querySelector(".reading"));
  measure();
  function resetPointer() {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    pending = null;
    surfaces.forEach((surface) => {
      surface.style.removeProperty("--pointer-x");
      surface.style.removeProperty("--pointer-y");
    });
  }
  function applyPointer() {
    pointerFrame = 0;
    if (!pending || disposed || document.hidden) return;
    const { surface, x, y } = pending;
    surface.style.setProperty("--pointer-x", `${x}px`);
    surface.style.setProperty("--pointer-y", `${y}px`);
  }
  function move(event) {
    if (reduced.matches || !pointer.matches || document.hidden) return;
    const surface = event.currentTarget,
      bounds = surface.getBoundingClientRect();
    pending = {
      surface,
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 8,
    };
    if (!pointerFrame) pointerFrame = requestAnimationFrame(applyPointer);
  }
  surfaces.forEach((surface) => {
    surface.addEventListener("pointermove", move);
    surface.addEventListener("pointerleave", resetPointer);
  });
  pointer.addEventListener("change", resetPointer);
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      resetPointer();
    } else measure();
  }
  document.addEventListener("visibilitychange", visibility);
  const caseObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) onProjectVisible?.(visible.target.dataset.case);
          },
          { rootMargin: "-12% 0px -45% 0px", threshold: 0 },
        )
      : null;
  document
    .querySelectorAll("[data-case]")
    .forEach((element) => caseObserver?.observe(element));
  const navObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            const visible = entries.find((e) => e.isIntersecting);
            if (!visible) return;
            document.querySelectorAll(".reading-header a").forEach((link) => {
              if (link.hash === `#${visible.target.id}`)
                link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
          },
          { rootMargin: "-12% 0px -65% 0px", threshold: 0 },
        )
      : null;
  document
    .querySelectorAll("main>section[id]")
    .forEach((element) => navObserver?.observe(element));
  return () => {
    disposed = true;
    root.removeAttribute("data-intro-motion");
    clearTimeout(introTimer);
    cancelAnimationFrame(frame);
    cancelAnimationFrame(pointerFrame);
    animations.forEach((a) => a.cancel());
    resetPointer();
    revealObserver?.disconnect();
    resizeObserver?.disconnect();
    caseObserver?.disconnect();
    navObserver?.disconnect();
    window.removeEventListener("scroll", scheduleProgress);
    window.removeEventListener("resize", measure);
    reduced.removeEventListener("change", syncPreference);
    pointer.removeEventListener("change", resetPointer);
    document.removeEventListener("visibilitychange", visibility);
    surfaces.forEach((surface) => {
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", resetPointer);
    });
  };
}
