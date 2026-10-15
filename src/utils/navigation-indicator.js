export function positionNavigationIndicator(indicator, current) {
  if (!current) {
    indicator.style.opacity = "0";
    return;
  }

  const width = current.offsetWidth;
  const left = current.offsetLeft;
  indicator.style.width = `${width}px`;
  indicator.style.transform = `translateX(${left}px)`;
  indicator.style.opacity = "1";
}
