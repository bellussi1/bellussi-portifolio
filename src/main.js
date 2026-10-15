import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/projects.css";
import "../styles/components/premium.css";
import "../styles/concepts/pixel-index.css";
import "../styles/concepts/index-atmosphere.css";
import { english } from "./translations.js";
import { syncPageMetadata } from "./utils/page-metadata.js";
import { initPixelIndex } from "./visuals/pixel-index.js";
import { initParallax } from "./utils/parallax.js";
import { positionNavigationIndicator } from "./utils/navigation-indicator.js";
import {
  setInnerHtmlIfChanged,
  setMarkupInFrames,
} from "./utils/content-update.js";
import { shouldEnableSmoothScroll } from "./utils/smooth-scroll-capability.js";
import { renderScrollProgress } from "./utils/scroll-progress.js";
import {
  renderPortfolioSection,
  renderPortfolioSections,
} from "./content/render-portfolio.js";

const root = document.documentElement;
let language = "pt";
try {
  language = localStorage.getItem("portfolio-language") === "en" ? "en" : "pt";
} catch {
  /* The page starts in Portuguese when storage is unavailable. */
}
let motionInitialized = false;
let cleanupParallax = () => {};
let parallaxStartFrame = 0;
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

function scheduleParallax() {
  cancelAnimationFrame(parallaxStartFrame);
  parallaxStartFrame = requestAnimationFrame(() => {
    parallaxStartFrame = 0;
    cleanupParallax();
    cleanupParallax = initParallax();
  });
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
  function complete() {
    if (!motionInitialized) return;
    setupMotion();
    cleanupParallax();
    scheduleParallax();
  }
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

initPixelIndex({ root });
syncPortfolioContent({ frameByFrame: true });
root.classList.add("js");
const translatedElements = [...document.querySelectorAll("[data-i18n]")];
const translatedAltElements = [...document.querySelectorAll("[data-i18n-alt]")];
const portuguese = Object.fromEntries(
  translatedElements.map((element) => [
    element.dataset.i18n,
    element.innerHTML,
  ]),
);
const portugueseAlt = Object.fromEntries(
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

function setLanguage(nextLanguage) {
  const previousLanguage = language;
  language = nextLanguage === "en" ? "en" : "pt";
  syncPageMetadata(document, language);
  const content = language === "en" ? english : portuguese;
  // Both translation dictionaries contain only local, trusted strings.
  translatedElements.forEach((element) => {
    setInnerHtmlIfChanged(
      element,
      content[element.dataset.i18n] ?? portuguese[element.dataset.i18n],
    );
  });
  translatedAltElements.forEach((element) => {
    const translatedAlt =
      content[element.dataset.i18nAlt] ?? portugueseAlt[element.dataset.i18nAlt];
    if (element.alt !== translatedAlt) element.alt = translatedAlt;
  });
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
        language === "en" ? "Enzo Bellussi, home" : "Enzo Bellussi, início",
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
  requestAnimationFrame(updateNavigationIndicator);
  try {
    localStorage.setItem("portfolio-language", language);
  } catch {
    /* The switch works when storage is unavailable. */
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
// The initial document already contains Portuguese labels, metadata and copy.
// Apply the stored English locale only when it differs from that default.
if (language === "en") setLanguage(language);

// Content remains visible without animation APIs or when reduced motion is set.
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver;
function setupMotion() {
  revealObserver?.disconnect();
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    delete root.dataset.motion;
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));
  root.dataset.motion = "enabled";
}
setupMotion();
motionInitialized = true;
reducedMotion.addEventListener("change", setupMotion);
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) languageTransition?.cancel();
});
if (shouldEnableSmoothScroll(window, navigator.hardwareConcurrency)) {
  requestAnimationFrame(() => {
    Promise.all([
      import("./utils/smooth-scroll.js"),
      import("lenis/dist/lenis.css"),
    ])
      .then(([{ initSmoothScroll }]) => initSmoothScroll())
      .catch(() => {
        // Native scrolling remains available if the optional Lenis chunk fails.
      });
  });
}

const navigationIndicator = document.createElement("span");
navigationIndicator.className = "navigation-indicator";
navigationIndicator.setAttribute("aria-hidden", "true");
navigation.append(navigationIndicator);
function updateNavigationIndicator() {
  const current = navigation.querySelector('a[aria-current="location"]');
  const indicator = navigation.querySelector(".navigation-indicator");
  if (!indicator) return;
  positionNavigationIndicator(indicator, current);
}
window.addEventListener("resize", updateNavigationIndicator);
document.fonts?.ready.then(updateNavigationIndicator);

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
        updateNavigationIndicator();
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
function measureScrollRange() {
  scrollableRange = Math.max(0, root.scrollHeight - window.innerHeight);
}
function updateProgress() {
  renderScrollProgress({
    progress,
    header: document.querySelector(".site-header"),
    scrollY: window.scrollY,
    scrollable: scrollableRange,
  });
  scrollScheduled = false;
}
function measureAndUpdateProgress() {
  measureScrollRange();
  updateProgress();
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
window.addEventListener("resize", measureAndUpdateProgress);
if ("ResizeObserver" in window) {
  const progressResizeObserver = new ResizeObserver(measureScrollRange);
  progressResizeObserver.observe(document.querySelector("main"));
}
document.fonts?.ready.then(measureAndUpdateProgress);
requestAnimationFrame(measureAndUpdateProgress);
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
        language === "en" ? english.copyEmail : portuguese.copyEmail;
      status.textContent = "";
    }, 2500);
  } catch {
    status.textContent =
      language === "en"
        ? "Could not copy. Select the email address or use the contact link."
        : "Não foi possível copiar. Selecione o endereço ou use o link de contato.";
  }
});
