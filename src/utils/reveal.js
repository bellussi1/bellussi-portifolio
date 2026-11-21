/**
 * Fades `.reveal` elements in once they scroll into view. It also switches on
 * `html[data-motion="enabled"]`, which is what the reveal styles key on, so
 * without JavaScript or under reduced motion everything is simply visible.
 * Returns a function that undoes it.
 */
export function initReveal({ root = document, win = window } = {}) {
  if (
    !("IntersectionObserver" in win) ||
    win.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return () => {};
  }
  const observer = new win.IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  const scan = () => {
    for (const element of root.querySelectorAll(".reveal:not(.is-visible)")) {
      observer.observe(element);
    }
  };
  scan();
  root.documentElement.dataset.motion = "enabled";
  const main = root.querySelector("main");
  const mutations = new win.MutationObserver(scan);
  if (main) mutations.observe(main, { childList: true, subtree: true });
  return () => {
    observer.disconnect();
    mutations.disconnect();
    delete root.documentElement.dataset.motion;
  };
}
