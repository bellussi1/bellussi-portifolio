import { comparisonLinks, readVariant } from "./state.js";

export function initComparison() {
  if (new URLSearchParams(location.search).get("compare") === "0") return;
  const host = document.createElement("portfolio-comparison");
  const shadow = host.attachShadow({ mode: "open" });
  shadow.innerHTML = `<style>
    :host { all: initial; position:fixed; bottom:14px; right:14px; z-index:10000; color-scheme:light; }
    nav { display:flex; align-items:center; background:#fff; color:#111; padding:4px; box-shadow:0 3px 18px #0002; font:500 13px/1.3 system-ui,sans-serif; }
    span { padding:0 10px; } a { display:grid; place-items:center; min-width:44px; min-height:44px; color:inherit; text-decoration:none; }
    a[aria-current] { background:#111; color:#fff; } a:hover { text-decoration:underline; }
    a:focus-visible { outline:3px solid #1a4be0; outline-offset:2px; }
    @media(max-width:480px) { :host { bottom:8px; right:8px; } span { display:none; } }
  </style><nav aria-label="Comparar versões / Compare versions"><span>A/B/C</span></nav>`;
  const nav = shadow.querySelector("nav");
  const active = readVariant(location.pathname);
  const names = {
    pt: ["Original", "Tipografia", "Redesign"],
    en: ["Original", "Typography", "Redesign"],
  };
  const links = ["a", "b", "c"].map((variant, i) => {
    const link = document.createElement("a");
    link.textContent = variant.toUpperCase();
    if (variant === active) link.setAttribute("aria-current", "page");
    nav.append(link);
    return link;
  });
  function sync() {
    const language = document.documentElement.lang.startsWith("en")
      ? "en"
      : "pt";
    const urls = comparisonLinks(location.href, language);
    links.forEach((link, i) => {
      link.href = urls[i].href;
      link.title = names[language][i];
      link.setAttribute(
        "aria-label",
        `${link.textContent}: ${names[language][i]}`,
      );
    });
  }
  sync();
  // Read the current hash on activation, including anchor navigation since the last language change.
  host.addEventListener("pointerdown", sync);
  host.addEventListener("click", sync);
  host.addEventListener("focusin", sync);
  const observer = new MutationObserver(sync);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  document.body.append(host);
}
