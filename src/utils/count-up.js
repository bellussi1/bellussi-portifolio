const easeOutCubic = (t) => 1 - (1 - t) ** 3;

/** Whole number shown at progress `t` (0 to 1) on the way to `target`. */
export function valueAt(target, t) {
  return Math.round(target * easeOutCubic(Math.min(Math.max(t, 0), 1)));
}

/** The number in a label such as "12,146" or "1.482", or null. */
export function parseCount(text) {
  const digits = text.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

/** Same grouping as the original: a dot means pt-BR, anything else en-US. */
export function formatLike(original, value) {
  return new Intl.NumberFormat(original.includes(".") ? "pt-BR" : "en-US").format(value);
}

/**
 * Counts each `.atlas-metrics dd a` up from 0 the first time it is seen.
 * The final text is always restored exactly, and nothing runs under reduced motion.
 */
export function initCountUp({ root = document, win = window, duration = 700 } = {}) {
  if (
    !("IntersectionObserver" in win) ||
    win.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return () => {};
  }
  const observer = new win.IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const final = entry.target.textContent;
      const target = parseCount(final);
      if (target === null) continue;
      entry.target.setAttribute("aria-label", final);
      const start = win.performance.now();
      const step = (now) => {
        const t = (now - start) / duration;
        entry.target.textContent = t >= 1 ? final : formatLike(final, valueAt(target, t));
        if (t < 1) win.requestAnimationFrame(step);
      };
      win.requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
  const seen = new WeakSet();
  const scan = () => {
    for (const element of root.querySelectorAll(".atlas-metrics dd a")) {
      if (seen.has(element)) continue;
      seen.add(element);
      observer.observe(element);
    }
  };
  scan();
  const main = root.querySelector("main");
  const mutations = new win.MutationObserver(scan);
  if (main) mutations.observe(main, { childList: true });
  return () => {
    observer.disconnect();
    mutations.disconnect();
  };
}
