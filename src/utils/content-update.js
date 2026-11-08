export function setInnerHtmlIfChanged(element, value) {
  if (element.innerHTML === value) return false;
  element.innerHTML = value;
  return true;
}

export function setMarkupInFrames(
  entries,
  requestFrame,
  onComplete = () => {},
  isCurrent = () => true,
) {
  const pending = entries.filter(
    ([element, value]) =>
      typeof value === "function" || element.innerHTML !== value,
  );
  let index = 0;

  function writeNext() {
    if (!isCurrent()) return;
    const [element, render] = pending[index++];
    setInnerHtmlIfChanged(
      element,
      typeof render === "function" ? render() : render,
    );
    if (index < pending.length) requestFrame(writeNext);
    else onComplete();
  }

  if (!pending.length) {
    if (isCurrent()) onComplete();
    return null;
  }
  return requestFrame(writeNext);
}
