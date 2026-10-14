export function readConcept(search) {
  return new URLSearchParams(search).get("concept") === "b"
    ? "index"
    : "field";
}

export function initConceptSwitcher({
  root = document.documentElement,
  view = window,
} = {}) {
  const controls = [...root.querySelectorAll("[data-concept-option]")];

  function applyConcept(concept) {
    root.dataset.concept = concept;
    controls.forEach((control) => {
      control.setAttribute(
        "aria-pressed",
        String(control.dataset.conceptOption === concept),
      );
    });
  }

  function syncFromUrl() {
    applyConcept(readConcept(view.location.search));
  }

  function selectConcept(event) {
    const concept =
      event.currentTarget.dataset.conceptOption === "index" ? "index" : "field";
    if (root.dataset.concept === concept) return;

    const url = new URL(view.location.href);
    if (concept === "index") url.searchParams.set("concept", "b");
    else url.searchParams.delete("concept");
    view.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    applyConcept(concept);
  }

  controls.forEach((control) =>
    control.addEventListener("click", selectConcept),
  );
  view.addEventListener("popstate", syncFromUrl);
  syncFromUrl();

  return () => {
    controls.forEach((control) =>
      control.removeEventListener("click", selectConcept),
    );
    view.removeEventListener("popstate", syncFromUrl);
  };
}
