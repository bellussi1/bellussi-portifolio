export function shouldEnableSmoothScroll(view, hardwareConcurrency) {
  const hasFinePointer = view.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  return hasFinePointer && (hardwareConcurrency == null || hardwareConcurrency > 4);
}
