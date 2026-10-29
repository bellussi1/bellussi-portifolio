import "../../styles/variants/zilla.css";
import "../../styles/variants/editorial.css";
import { renderEditorial } from "./render.js";
import { portuguese } from "./portuguese.generated.js";
import { portfolioContent } from "../content/portfolio.js";
import { mediaFor } from "./case-studies.js";
import { initEditorialMotion } from "./motion.js";
import { initialLanguage } from "../experiment/state.js";
import { syncPageMetadata } from "../utils/page-metadata.js";

const root = document.documentElement;
const container = document.querySelector("#editorial-root");
let saved;
try {
  saved = localStorage.getItem("portfolio-language");
} catch {
  /* URL and controls still work. */
}
let language = initialLanguage(location.search, saved);
let activeProject = portfolioContent.products[0].id;
let theme = root.dataset.theme === "dark" ? "dark" : "light";
let copyReset;
let cleanupMotion = () => {};
let selectionAnimation;
let dialogAnimation;
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
motionPreference.addEventListener("change", () => {
  if (motionPreference.matches) {
    selectionAnimation?.cancel();
    dialogAnimation?.cancel();
  }
});
let manualSelectionUntil = 0;
let latestVisibleProject;
let selectionReconcileTimer;
let booted = false;
function syncMetadata() {
  syncPageMetadata(document, language);
  document.querySelector("[data-theme-color]").content =
    theme === "dark" ? "#17191c" : "#ffffff";
}
function render(focusLanguage = false) {
  const scrollY = window.scrollY;
  cleanupMotion();
  clearTimeout(selectionReconcileTimer);
  manualSelectionUntil = 0;
  latestVisibleProject = undefined;
  selectionAnimation?.cancel();
  container.innerHTML = renderEditorial({
    language,
    portuguese,
    activeProject,
    theme,
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
  syncMetadata();
  if (focusLanguage) {
    document
      .querySelector(`[data-language="${language}"]`)
      .focus({ preventScroll: true });
    window.scrollTo({ top: scrollY, behavior: "instant" });
  }
  if (booted) connectMotion();
}
// Reuse the static PT document unless a stored preference needs applying.
if (language === "en" || theme === "dark") render();
else syncMetadata();
document.querySelector("#year").textContent = new Date().getFullYear();
container.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.language) {
    language = button.dataset.language === "en" ? "en" : "pt";
    clearTimeout(copyReset);
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Keep current session. */
    }
    // An explicit shareable locale must follow subsequent choices.
    const url = new URL(location.href);
    url.searchParams.set("lang", language);
    history.replaceState(null, "", url);
    render(true);
  } else if (button.hasAttribute("data-theme-toggle")) {
    theme = theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Keep current session. */
    }
    const label =
      language === "en"
        ? theme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
        : theme === "dark"
          ? "Ativar tema claro"
          : "Ativar tema escuro";
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute("aria-label", label);
    button.title = label;
    syncMetadata();
  } else if (button.dataset.preview) {
    manualSelectionUntil = performance.now() + 900;
    clearTimeout(selectionReconcileTimer);
    selectionReconcileTimer = setTimeout(() => {
      manualSelectionUntil = 0;
      if (latestVisibleProject)
        selectProject(latestVisibleProject, { animate: event.detail !== 0 });
    }, 910);
    selectProject(button.dataset.preview, { animate: event.detail !== 0 });
    document.getElementById(button.dataset.preview)?.scrollIntoView({
      behavior:
        matchMedia("(prefers-reduced-motion: reduce)").matches ||
        event.detail === 0
          ? "instant"
          : "smooth",
      block: "start",
    });
  } else if (button.classList.contains("copy-email")) {
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText("enzobellussi3@gmail.com");
      status.textContent =
        language === "en" ? "Email address copied." : "E-mail copiado.";
      clearTimeout(copyReset);
      copyReset = setTimeout(() => {
        status.textContent = "";
      }, 2500);
    } catch {
      status.textContent =
        language === "en"
          ? "Could not copy. Select the email address or use the contact link."
          : "Não foi possível copiar. Selecione o e-mail ou use o link de contato.";
    }
  }
});
// Project controls enhance the static, fully readable document only when JS is available.
root.classList.add("editorial-js");
if (
  import.meta.env.VITE_PORTFOLIO_COMPARE !== "false" &&
  new URLSearchParams(location.search).get("compare") !== "0"
) {
  import("../experiment/compare.js").then(({ initComparison }) =>
    initComparison(),
  );
}

function selectProject(id, { animate = false } = {}) {
  const project = portfolioContent.products.find((p) => p.id === id);
  if (!project || project.id === activeProject) return;
  activeProject = project.id;
  const image = mediaFor(project, language);
  const target = document.querySelector("#stage-image");
  target.src = image.src;
  target.alt = project[language].imageAlt;
  const caption = document.querySelector("#stage-caption");
  caption.replaceChildren(document.createTextNode(project.name + " "));
  const detail = document.createElement("span");
  detail.textContent = project[language].imageCaption;
  caption.append(detail);
  document
    .querySelectorAll("[data-preview]")
    .forEach((control) =>
      control.setAttribute(
        "aria-pressed",
        String(control.dataset.preview === id),
      ),
    );
  document.querySelector(".identity").dataset.focusProject = id;
  selectionAnimation?.cancel();
  if (animate && !matchMedia("(prefers-reduced-motion: reduce)").matches)
    selectionAnimation = caption.animate(
      [
        { opacity: 0.4, transform: "translateY(7px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
}
function connectMotion(entrance = false) {
  cleanupMotion = initEditorialMotion({
    entrance,
    onProjectVisible: (id) => {
      latestVisibleProject = id;
      if (performance.now() > manualSelectionUntil)
        selectProject(id, { animate: true });
    },
  });
}
let dialogTrigger;
container.addEventListener("click", (event) => {
  const link = event.target.closest("[data-inspect]");
  const close = event.target.closest("[data-dialog-close]");
  const dialog = document.querySelector("#project-dialog");
  if (close) {
    dialog.close();
    return;
  }
  if (!link || !dialog?.showModal) return;
  const project = portfolioContent.products.find(
    (p) => p.id === link.dataset.inspect,
  );
  if (!project) return;
  event.preventDefault();
  dialogTrigger = link;
  const image = mediaFor(project, language);
  const target = document.querySelector("#dialog-image");
  target.src = image.originalSrc;
  document.querySelector("#dialog-source").href = image.originalSrc;
  target.width = image.width;
  target.height = image.height;
  target.alt = project[language].imageAlt;
  document.querySelector("#dialog-title").textContent = project.name;
  document.querySelector("#dialog-caption").textContent =
    project[language].imageCaption;
  dialogAnimation?.cancel();
  dialog.showModal();
  dialog.scrollTop = 0;
  if (event.detail && !motionPreference.matches)
    dialogAnimation = dialog.animate(
      [
        { opacity: 0.6, transform: "translateY(8px) scale(.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
});
container.addEventListener("click", (event) => {
  if (event.target.matches("#project-dialog")) {
    const bounds = event.target.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      event.target.close();
  }
});
container.addEventListener(
  "close",
  (event) => {
    if (event.target.id === "project-dialog") {
      dialogAnimation?.cancel();
      dialogTrigger?.focus({ preventScroll: true });
    }
  },
  true,
);
booted = true;
connectMotion(true);
