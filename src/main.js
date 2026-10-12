import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/projects.css";
import { english } from "./translations.js";

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
function updateProgress() {
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
