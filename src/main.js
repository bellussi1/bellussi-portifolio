import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/projects.css";
import "../styles/components/premium.css";
import { english } from "./translations.js";
import { initParallax } from "./utils/parallax.js";

const root = document.documentElement;
root.classList.add("js");
const translatedElements = [...document.querySelectorAll("[data-i18n]")];
const portuguese = Object.fromEntries(
  translatedElements.map((element) => [
    element.dataset.i18n,
    element.innerHTML,
  ]),
);
let language = "pt";
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
  root.lang = language === "en" ? "en" : "pt-BR";
  const content = language === "en" ? english : portuguese;
  // Both translation dictionaries contain only local, trusted strings.
  translatedElements.forEach((element) => {
    element.innerHTML =
      content[element.dataset.i18n] ?? portuguese[element.dataset.i18n];
  });
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
  document.querySelector('meta[name="description"]').content =
    language === "en"
      ? "Enzo Bellussi, Software Engineer focused on front-end. Experience with enterprise applications, Angular, React, TypeScript and legacy modernization."
      : "Enzo Bellussi, Software Engineer com foco em front-end. Experiência em aplicações corporativas, Angular, React, TypeScript e modernização de sistemas.";
  updateMenuLabel();
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
try {
  setLanguage(localStorage.getItem("portfolio-language") ?? "pt");
} catch {
  setLanguage("pt");
}

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
reducedMotion.addEventListener("change", setupMotion);
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) languageTransition?.cancel();
});
initParallax();

const navigationIndicator = document.createElement("span");
navigationIndicator.className = "navigation-indicator";
navigationIndicator.setAttribute("aria-hidden", "true");
navigation.append(navigationIndicator);
function updateNavigationIndicator() {
  const current = navigation.querySelector('a[aria-current="location"]');
  const indicator = navigation.querySelector(".navigation-indicator");
  if (!indicator) return;
  indicator.style.opacity = current ? "1" : "0";
  if (!current) return;
  indicator.style.width = `${current.offsetWidth}px`;
  indicator.style.transform = `translateX(${current.offsetLeft}px)`;
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
function updateProgress() {
  document
    .querySelector(".site-header")
    .classList.toggle("is-scrolled", window.scrollY > 24);
  const scrollable = root.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0})`;
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
window.addEventListener("resize", updateProgress);
updateProgress();
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
