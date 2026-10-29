import { portfolioContent } from "../content/portfolio.js";
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const arrow =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
export function mediaFor(project, language) {
  const original = project.image[language]?.desktop ?? project.image;
  const name =
    project.id === "black-market" ? "black-market" : `koreader-${language}`;
  return {
    ...original,
    originalSrc: original.src,
    src: `/project-previews/v3-${name}-480.webp`,
    srcset: `/project-previews/v3-${name}-480.webp 480w, /project-previews/v3-${name}-960.webp 960w`,
  };
}
export function projectThumb(project, language) {
  const image = mediaFor(project, language);
  return `<img id="stage-image" src="${image.src}" width="80" height="72" alt="${escape(project[language].imageAlt)}" decoding="async" loading="lazy">`;
}
export function renderCaseStudies(language) {
  const pt = language === "pt";
  return portfolioContent.products
    .map((project, index) => {
      const l = project[language],
        image = mediaFor(project, language);
      const subject =
        project.id === "black-market"
          ? pt
            ? "Produção."
            : "Production."
          : pt
            ? "Biblioteca."
            : "Library.";
      const inspect = pt ? "Explorar a interface" : "Explore the interface";
      return `<article class="product case-study" id="${project.id}" data-case="${project.id}" data-reveal="case">
   <header class="case-heading"><h3>${project.name}</h3><p>${l.status}</p></header>
   <figure class="case-art case-art--${project.id}" data-pointer-surface>
    <span class="case-word" aria-hidden="true">${subject}</span>
    <a class="case-media" href="${image.originalSrc}" data-inspect="${project.id}" aria-label="${inspect}: ${project.name}">
     <img src="${image.src}" srcset="${image.srcset}" sizes="(min-width: 960px) 42vw, 90vw" width="${image.width}" height="${image.height}" alt="${escape(l.imageAlt)}" loading="lazy" decoding="async">
    </a>
    <figcaption><span>${project.id === "black-market" ? (pt ? "Custos e produção" : "Costs and production") : pt ? "Biblioteca · dados demo" : "Library · demo data"}</span><a href="${image.originalSrc}" data-inspect="${project.id}">${inspect}${arrow}</a></figcaption>
   </figure>
   <div class="case-copy" data-reveal="copy"><h4>${l.headline}</h4><p>${l.description}</p>
    <details class="case-decisions"><summary>${pt ? "Por trás da interface" : "Behind the interface"}<span aria-hidden="true">+</span></summary><p>${l.details}</p></details>
    <ul class="technology-list">${project.technologies.map((t) => `<li>${escape(t)}</li>`).join("")}</ul>
    <div class="project-links">${project.links.map((link) => `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${l.linkLabel}${arrow}</a>`).join("")}</div>
   </div>
  </article>`;
    })
    .join("");
}
export function imageDialog(language) {
  const pt = language === "pt";
  return `<dialog id="project-dialog" aria-labelledby="dialog-title"><div class="dialog-toolbar"><h2 id="dialog-title">${pt ? "Interface do projeto" : "Project interface"}</h2><button data-dialog-close aria-label="${pt ? "Fechar captura" : "Close screenshot"}">${pt ? "Fechar" : "Close"}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><figure><img id="dialog-image" alt=""><figcaption id="dialog-caption"></figcaption><a class="dialog-source" id="dialog-source" href="/koreader-library-pt.png" target="_blank" rel="noopener noreferrer">${pt ? "Abrir imagem original" : "Open original image"}</a></figure></dialog>`;
}
