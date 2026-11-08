import "../styles/modern-normalize.css";
import "../styles/style.css";
import { englishUi, portuguese } from "./translations.js";
import { syncPageMetadata } from "./utils/page-metadata.js";

const root = document.documentElement;
root.classList.add("js");

const translatedElements = [...document.querySelectorAll("[data-i18n]")];
const translatedAltElements = [...document.querySelectorAll("[data-i18n-alt]")];
const englishContent = Object.fromEntries(
  translatedElements.map((element) => [element.dataset.i18n, element.innerHTML]),
);
const englishAlt = Object.fromEntries(
  translatedAltElements.map((element) => [element.dataset.i18nAlt, element.alt]),
);

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const main = document.querySelector("main");
const copyButton = document.querySelector(".copy-email");
const copyStatus = document.querySelector("#copy-status");
const copyLabel = document.querySelector(".copy-email [data-i18n]");
let language = "en";
let languageTransition;
let copyReset;

const ui = () => (language === "pt" ? portuguese : englishUi);

function updateMenuLabel() {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  const labels = language === "pt" ? portuguese : englishUi;
  menuButton.setAttribute(
    "aria-label",
    isOpen ? labels.menuClose : labels.menuOpen,
  );
}

function updateDocumentLanguage(nextLanguage) {
  language = nextLanguage === "pt" ? "pt" : "en";
  syncPageMetadata(document, language);
  const content = language === "pt" ? portuguese : englishContent;
  const altContent = language === "pt" ? portuguese : englishAlt;

  translatedElements.forEach((element) => {
    element.innerHTML =
      content[element.dataset.i18n] ?? englishContent[element.dataset.i18n];
  });
  translatedAltElements.forEach((element) => {
    element.alt =
      altContent[element.dataset.i18nAlt] ?? englishAlt[element.dataset.i18nAlt];
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === language),
    );
  });

  document.querySelectorAll("[data-resume]").forEach((link) => {
    link.href =
      language === "pt" ? "/curriculo-pt.pdf" : "/curriculo-en.pdf";
  });

  navigation.setAttribute("aria-label", ui().mainNavigation);
  copyButton.setAttribute("aria-label", ui().copyEmailAria);
  document.querySelectorAll(".brand").forEach((brand) => {
    brand.setAttribute("aria-label", ui().brandHome);
  });
  document.querySelectorAll(".language-control").forEach((control) => {
    control.setAttribute(
      "aria-label",
      language === "pt" ? "Idioma" : "Language",
    );
  });
  updateMenuLabel();

  const url = new URL(window.location.href);
  if (language === "pt") url.searchParams.set("lang", "pt");
  else url.searchParams.delete("lang");
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function setLanguage(nextLanguage, { persist = true } = {}) {
  const previousLanguage = language;
  language = nextLanguage === "pt" ? "pt" : "en";
  updateDocumentLanguage(language);

  if (persist) {
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Language switching still works when storage is unavailable. */
    }
  }

  languageTransition?.cancel();
  if (
    previousLanguage !== language &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    languageTransition = main.animate?.(
      [
        { opacity: 0.45, transform: "translateY(2px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 220, easing: "ease-out" },
    );
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
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
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
matchMedia("(min-width: 861px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

let initialLanguage = "en";
try {
  const storedLanguage = localStorage.getItem("portfolio-language");
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  initialLanguage = urlLanguage === "pt" || storedLanguage === "pt" ? "pt" : "en";
} catch {
  initialLanguage = "en";
}
setLanguage(initialLanguage, { persist: false });

// Content is always visible without JavaScript; motion is an enhancement.
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
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
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
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }),
    { rootMargin: "-18% 0px -62% 0px" },
  );
  document
    .querySelectorAll("main section[id], main section [id]")
    .forEach((section) => {
      if (section.matches("section[id]")) sectionObserver.observe(section);
    });
}

const progress = document.querySelector(".scroll-progress");
const header = document.querySelector(".site-header");
let scrollScheduled = false;
function updateProgress() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
  const scrollable = root.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${
    scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
  })`;
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

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("enzobellussi3@gmail.com");
    copyLabel.textContent = ui().copied;
    copyStatus.textContent = ui().emailCopied;
    clearTimeout(copyReset);
    copyReset = setTimeout(() => {
      copyLabel.textContent = language === "pt" ? "Copiar" : "Copy";
      copyStatus.textContent = "";
    }, 2500);
  } catch {
    copyStatus.textContent = ui().copyError;
  }
});
