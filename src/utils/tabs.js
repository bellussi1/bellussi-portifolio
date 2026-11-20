/** Index of the tab that a navigation key moves to, or -1 for other keys. */
export function nextTabIndex(key, index, count) {
  if (key === "ArrowRight" || key === "ArrowDown") return (index + 1) % count;
  if (key === "ArrowLeft" || key === "ArrowUp") return (index - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return -1;
}

function select(tablist, tab, { focus = false } = {}) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const viewer = tablist.parentElement;
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = viewer.querySelector("#" + item.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  }
  if (focus) tab.focus();
}

/** Wires every `[role="tablist"]` on the page. Safe to call once: it delegates from `root`. */
export function initTabs(root = document) {
  root.addEventListener("click", (event) => {
    const tab = event.target.closest?.('[role="tab"]');
    if (tab) select(tab.closest('[role="tablist"]'), tab);
  });
  root.addEventListener("keydown", (event) => {
    const tab = event.target.closest?.('[role="tab"]');
    if (!tab) return;
    const tablist = tab.closest('[role="tablist"]');
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const next = nextTabIndex(event.key, tabs.indexOf(tab), tabs.length);
    if (next < 0) return;
    event.preventDefault();
    select(tablist, tabs[next], { focus: true });
  });
}
