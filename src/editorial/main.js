import "../../styles/variants/zilla.css";
import "../../styles/variants/editorial.css";
import { renderEditorial } from "./render.js";
import { portuguese } from "./portuguese.generated.js";
import { portfolioContent } from "../content/portfolio.js";
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
function syncMetadata() {
  syncPageMetadata(document, language);
  document.querySelector("[data-theme-color]").content =
    theme === "dark" ? "#17191c" : "#ffffff";
}
function render(focusLanguage = false) {
  const scrollY = window.scrollY;
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
    const project = portfolioContent.products.find(
      (p) => p.id === button.dataset.preview,
    );
    if (!project) return;
    activeProject = project.id;
    const image = project.image[language]?.desktop ?? project.image;
    const target = document.querySelector("#stage-image");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.src = image.src;
    target.width = image.width;
    target.height = image.height;
    target.alt = project[language].imageAlt;
    if (image.webp) {
      target.srcset = image.webp.map((i) => `${i.src} ${i.width}w`).join(", ");
      target.sizes = "(min-width: 960px) 45vw, 100vw";
    } else {
      target.removeAttribute("srcset");
      target.removeAttribute("sizes");
    }
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
          String(control.dataset.preview === activeProject),
        ),
      );
    if (!reduced)
      target.animate?.([{ opacity: 0.6 }, { opacity: 1 }], {
        duration: 180,
        easing: "ease-out",
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
