export function renderScrollProgress({ progress, header, scrollY, scrollable }) {
  const scale =
    scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;
  progress.style.transform = `scaleX(${scale})`;
  header.classList.toggle("is-scrolled", scrollY > 24);
}
