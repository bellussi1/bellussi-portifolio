import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/projects.css";
import "../styles/components/premium.css";
import "../styles/concepts/pixel-index.css";
import "../styles/concepts/index-atmosphere.css";
import "../styles/variants/zilla.css";
import "../styles/variants/typography.css";
import "../styles/components/wordmark.css";
import { initialLanguage } from "./utils/language.js";
import { portuguese } from "./translations.js";
import { syncPageMetadata } from "./utils/page-metadata.js";

import {
  setInnerHtmlIfChanged,
  setMarkupInFrames,
} from "./utils/content-update.js";
import { renderScrollProgress } from "./utils/scroll-progress.js";
import {
  renderPortfolioSection,
  renderPortfolioSections,
} from "./content/render-portfolio.js";

const root = document.documentElement;
let language = "en";
try {
  language = localStorage.getItem("portfolio-language") === "pt" ? "pt" : "en";
} catch {
  /* The page starts in English when storage is unavailable. */
}
language = initialLanguage(location.search, language);
let hasRenderedLanguage = false;
let portfolioRenderVersion = 0;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeColor = document.querySelector("[data-theme-color]");

function updateThemeControl() {
  const dark = root.dataset.theme === "dark";
  const label = language === "en" ? "Dark theme" : "Tema escuro";
  const action =
    language === "en"
      ? dark
        ? "Switch to light theme"
        : "Switch to dark theme"
      : dark
        ? "Ativar tema claro"
        : "Ativar tema escuro";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", label);
  themeToggle.setAttribute("title", action);
  if (themeColor) themeColor.content = dark ? "#1d1c19" : "#e9e5da";
}

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("portfolio-theme", root.dataset.theme);
  } catch {
    /* Theme switching still works when storage is unavailable. */
  }
  updateThemeControl();
});
updateThemeControl();

function syncPortfolioContent({ frameByFrame = false } = {}) {
  const renderVersion = ++portfolioRenderVersion;
  const parameters = {
    concept: root.dataset.concept,
    language,
  };
  const targets = [
    ["experience", document.querySelector('[data-portfolio-content="experience"]')],
    ["products", document.querySelector('[data-portfolio-content="products"]')],
    ["projects", document.querySelector('[data-portfolio-content="projects"]')],
  ];
  function complete() {}
  if (frameByFrame) {
    setMarkupInFrames(
      targets.map(([section, target]) => [
        target,
        () => renderPortfolioSection(section, parameters),
      ]),
      window.requestAnimationFrame.bind(window),
      complete,
      () => renderVersion === portfolioRenderVersion,
    );
    return;
  }
  const sections = renderPortfolioSections(parameters);
  targets.forEach(([section, target]) =>
    setInnerHtmlIfChanged(target, sections[section]),
  );
  complete();
}

if (language !== "en") syncPortfolioContent({ frameByFrame: true });
root.classList.add("js");
const translatedElements = [...document.querySelectorAll("[data-i18n]")];
const translatedAltElements = [...document.querySelectorAll("[data-i18n-alt]")];
const englishContent = Object.fromEntries(
  translatedElements.map((element) => [
    element.dataset.i18n,
    element.innerHTML,
  ]),
);
const englishAlt = Object.fromEntries(
  translatedAltElements.map((element) => [
    element.dataset.i18nAlt,
    element.alt,
  ]),
);
let languageTransition;
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function updateMenuLabel() {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute(
    "aria-label",
    language === "en"
      ? isOpen
        ? "Close menu"
        : "Open menu"
      : isOpen
        ? "Fechar menu"
        : "Abrir menu",
  );
}

function setLanguage(nextLanguage, { persist = true } = {}) {
  const previousLanguage = language;
  language = nextLanguage === "pt" ? "pt" : "en";
  syncPageMetadata(document, language);
  const localeUrl = new URL(location.href);
  if (localeUrl.searchParams.has("lang")) {
    localeUrl.searchParams.set("lang", language);
    history.replaceState(null, "", localeUrl);
  }
  const content = language === "pt" ? portuguese : englishContent;
  // Both translation dictionaries contain only local, trusted strings.
  if (language === "pt" || hasRenderedLanguage) {
    translatedElements.forEach((element) => {
      setInnerHtmlIfChanged(
        element,
        content[element.dataset.i18n] ?? englishContent[element.dataset.i18n],
      );
    });
    translatedAltElements.forEach((element) => {
      const translatedAlt =
        content[element.dataset.i18nAlt] ??
        englishAlt[element.dataset.i18nAlt];
      if (element.alt !== translatedAlt) element.alt = translatedAlt;
    });
  }
  hasRenderedLanguage = true;
  if (previousLanguage !== language) syncPortfolioContent();
  document
    .querySelectorAll("[data-language]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.language === language),
      ),
    );
  document.querySelectorAll("[data-resume]").forEach((link) => {
    link.href = language === "en" ? "/curriculo-en.pdf" : "/curriculo-pt.pdf";
  });
  navigation.setAttribute(
    "aria-label",
    language === "en" ? "Main navigation" : "Navegação principal",
  );
  document
    .querySelector(".copy-email")
    .setAttribute(
      "aria-label",
      language === "en" ? "Copy email address" : "Copiar e-mail",
    );
  document
    .querySelectorAll(".brand")
    .forEach((link) =>
      link.setAttribute(
        "aria-label",
        language === "en" ? "eb, Enzo Bellussi, home" : "eb, Enzo Bellussi, início",
      ),
    );
  updateMenuLabel();
  updateThemeControl();
  languageTransition?.cancel();
  if (
    previousLanguage !== language &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    languageTransition = document
      .querySelector("main")
      .animate?.([{ opacity: 0.45 }, { opacity: 1 }], {
        duration: 220,
        easing: "ease-out",
      });
  }
  if (persist) {
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* The switch works when storage is unavailable. */
    }
  }
}

function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  updateMenuLabel();
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  updateMenuLabel();
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
document
  .querySelectorAll("[data-language]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      setLanguage(button.dataset.language),
    ),
  );
// The initial document ships in English with matching metadata and ARIA labels.
// Only the Portuguese entry point needs a DOM pass on first load.
if (language !== "en") setLanguage(language, { persist: false });

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) languageTransition?.cancel();
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll("a").forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }),
    { rootMargin: "-15% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => sectionObserver.observe(section));
}

const progress = document.querySelector(".scroll-progress");
let scrollScheduled = false;
let scrollableRange = 0;
function updateProgress() {
  if (!scrollableRange) {
    scrollableRange = Math.max(0, root.scrollHeight - window.innerHeight);
  }
  renderScrollProgress({
    progress,
    header: document.querySelector(".site-header"),
    scrollY: window.scrollY,
    scrollable: scrollableRange,
  });
  scrollScheduled = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(updateProgress);
    }
  },
  { passive: true },
);
window.addEventListener("resize", () => {
  scrollableRange = 0;
});
document.querySelector("#year").textContent = new Date().getFullYear();

let copyReset;
document.querySelector(".copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText("enzobellussi3@gmail.com");
    const label = document.querySelector(".copy-email [data-i18n]");
    label.textContent = language === "en" ? "Copied" : "Copiado";
    status.textContent =
      language === "en" ? "Email address copied." : "E-mail copiado.";
    clearTimeout(copyReset);
    copyReset = setTimeout(() => {
      label.textContent =
        language === "en" ? englishContent.copyEmail : portuguese.copyEmail;
      status.textContent = "";
    }, 2500);
  } catch {
    status.textContent =
      language === "en"
        ? "Could not copy. Select the email address or use the contact link."
        : "Não foi possível copiar. Selecione o endereço ou use o link de contato.";
  }
});
