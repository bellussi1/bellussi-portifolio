import { portfolioContent } from "../content/portfolio.js";
import { english } from "../translations.js";

const wording = {
  pt: {
    role: "Engenheiro de software, foco em front-end.",
    opening: "Interfaces cuidadosas.\nSistemas que evoluem.",
    intro:
      "Da experiência de quem usa à arquitetura de quem mantém. Construo aplicações web com Angular, React e TypeScript, com vivência em consultoria e no ambiente bancário.",
    work: "Produtos em construção",
    experience: "Experiência",
    tools: "Ferramentas abertas",
    approach: "Como trabalho",
    about: "Além do código",
    contact: "Vamos conversar.",
    workIntro:
      "Dois contextos diferentes. O mesmo cuidado com a interface, os dados e as decisões por trás de cada fluxo.",
    toolsIntro:
      "Projetos autorais para problemas concretos de desenvolvimento. O código, os testes e os exemplos estão abertos.",
    preview: "Projeto em destaque",
    choose: "Escolher preview de projeto",
    contributions: "Contribuições",
    stack: "Tecnologias",
    usage: "Exemplo de uso",
    expected: "Fluxo esperado",
    theme: "Ativar tema escuro",
    themeLight: "Ativar tema claro",
    copy: "Copiar e-mail",
    back: "Voltar ao início",
    allWork: "Ver produtos",
    themeLabel: "Tema",
    since: "Na web desde 2022",
    cv: "Currículo",
    links: "Perfis e currículos",
  },
  en: {
    role: "Software engineer, focused on front-end.",
    opening: "Thoughtful interfaces.\nEvolving systems.",
    intro:
      "From the people using an interface to the teams maintaining it. I build web applications with Angular, React and TypeScript, with experience in consulting and banking.",
    work: "Products in progress",
    experience: "Experience",
    tools: "Open tools",
    approach: "How I work",
    about: "Beyond the code",
    contact: "Let’s talk.",
    workIntro:
      "Two different contexts. The same care for interfaces, data and the decisions behind every flow.",
    toolsIntro:
      "Personal projects for everyday development problems. Explore the code, tests and runnable examples.",
    preview: "Featured project",
    choose: "Choose project preview",
    contributions: "Contributions",
    stack: "Technologies",
    usage: "Usage example",
    expected: "Expected flow",
    theme: "Switch to dark theme",
    themeLight: "Switch to light theme",
    copy: "Copy email address",
    back: "Back to top",
    allWork: "Explore products",
    themeLabel: "Theme",
    since: "Building for the web since 2022",
    cv: "Resume",
    links: "Profiles and resumes",
  },
};
export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
const ext = (href, label) =>
  `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
const tech = (items) =>
  `<ul class="technology-list">${items.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`;
const list = (items) =>
  `<ul class="contributions">${items.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`;
const arrow =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
function productImage(item, language, stage = false) {
  const image = item.image[language]?.desktop ?? item.image;
  const srcset = image.webp?.map((i) => `${i.src} ${i.width}w`).join(", ");
  return `<img ${stage ? 'id="stage-image"' : ""} src="${image.src}" ${srcset ? `srcset="${srcset}" sizes="(min-width: 960px) 45vw, 100vw"` : ""} width="${image.width}" height="${image.height}" alt="${escapeHtml(item[language].imageAlt)}" loading="${stage ? "eager" : "lazy"}" decoding="async" ${stage ? 'fetchpriority="high"' : ""}>`;
}
export function renderEditorial({
  language = "pt",
  portuguese = {},
  activeProject = "koreader-ecosystem",
  theme = "light",
} = {}) {
  const lang = language === "en" ? "en" : "pt";
  const w = wording[lang];
  const text = (key) =>
    (lang === "en" ? english[key] : portuguese[key]) ?? portuguese[key] ?? "";
  const selected =
    portfolioContent.products.find((p) => p.id === activeProject) ??
    portfolioContent.products[0];
  const label = theme === "dark" ? w.themeLight : w.theme;
  const nav = [
    ["products", w.allWork],
    ["experience", w.experience],
    ["projects", w.tools],
    ["about", w.about],
    ["contact", lang === "pt" ? "Contato" : "Contact"],
  ];
  return `<a class="skip" href="#main">${text("skip")}</a>
  <div class="editorial-shell" id="home">
    <aside class="identity" aria-labelledby="name">
      <div class="identity-top"><a class="home-link" href="#home" aria-label="Enzo Bellussi">EB.</a><div class="preferences">
        <div class="languages" role="group" aria-label="Idioma / Language"><button data-language="pt" aria-label="Português" aria-pressed="${lang === "pt"}">PT</button><button data-language="en" aria-label="English" aria-pressed="${lang === "en"}">EN</button></div>
        <button class="theme-control" data-theme-toggle aria-label="${label}" title="${label}" aria-pressed="${theme === "dark"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.1A8.2 8.2 0 0 1 9.9 4 8.2 8.2 0 1 0 20 14.1Z"/></svg></button>
      </div></div>
      <div class="identity-copy"><h1 id="name">Enzo<br>Bellussi.</h1><p class="role">${w.role}</p><p class="place">${text("location")}<br>${w.since}</p><a class="resume-link" data-resume href="/curriculo-${lang}.pdf" download>${text("resume")}${arrow}</a></div>
      <figure class="project-stage" aria-label="${w.preview}">${productImage(selected, lang, true)}<figcaption id="stage-caption">${selected.name} <span>${selected[lang].imageCaption}</span></figcaption></figure>
      <div class="preview-controls" role="group" aria-label="${w.choose}">${portfolioContent.products.map((p) => `<button data-preview="${p.id}" aria-controls="stage-image stage-caption" aria-pressed="${p.id === selected.id}">${p.name}</button>`).join("")}</div>
      <div class="identity-bottom"><a href="mailto:enzobellussi3@gmail.com">enzobellussi3@gmail.com</a>${ext("https://github.com/bellussi1", "GitHub")}</div>
    </aside>
    <div class="reading">
      <header class="reading-header"><nav aria-label="${lang === "pt" ? "Navegação principal" : "Main navigation"}">${nav.map(([id, t]) => `<a href="#${id}">${t}</a>`).join("")}</nav></header>
      <main id="main" tabindex="-1">
        <section class="introduction" aria-labelledby="intro-title"><h2 id="intro-title">${w.opening.replace("\\n", "<br>").replace("\n", "<br>")}</h2><p class="lead">${w.intro}</p><a class="primary-action" href="#experience">${text("heroCta")}${arrow}</a><p class="production-context">MarketData <span aria-hidden="true">/</span> Banco do Brasil</p></section>
        <section id="products" aria-labelledby="work-title"><h2 id="work-title">${w.work}</h2><p class="section-intro">${w.workIntro}</p>
          ${portfolioContent.products
            .map((item) => {
              const l = item[lang];
              return `<article class="product" id="${item.id}"><div class="product-title"><h3>${item.name}</h3><p>${l.status}</p></div><figure class="product-image">${productImage(item, lang)}<figcaption>${l.imageCaption}</figcaption></figure><h4>${l.headline}</h4><p>${l.description}</p><p>${l.details}</p>${tech(item.technologies)}<div class="project-links">${item.links.map((link) => ext(link.href, l.linkLabel)).join("")}</div></article>`;
            })
            .join("")}
        </section>
        <section id="experience" aria-labelledby="experience-title"><h2 id="experience-title">${w.experience}</h2><p class="section-intro">${text("experienceIntro")}</p>${portfolioContent.experiences
          .map((item) => {
            const l = item[lang];
            return `<article class="employment"><h3>${item.name}</h3><div class="employment-meta"><p>${l.period}</p><p>${l.pill}</p></div><p class="job-role">${l.role}</p><h4>${l.title}</h4><p>${l.description}</p>${list(l.bullets)}${tech(item.technologies)}${l.details ? `<details><summary>${l.detailsLabel}</summary><p>${l.details}</p></details>` : ""}</article>`;
          })
          .join(
            "",
          )}<p class="confidentiality">${text("confidentiality")}</p></section>
        <section id="projects" aria-labelledby="tools-title"><h2 id="tools-title">${w.tools}</h2><p class="section-intro">${w.toolsIntro}</p>${portfolioContent.openSourceProjects
          .map((item) => {
            const l = item[lang];
            return `<article class="tool" id="${item.id}"><h3>${item.name}</h3><h4>${l.headline}</h4><p>${l.description}</p><p>${l.decision}</p>${tech(item.technologies)}<details class="usage"><summary>${w.usage}</summary><pre><code>$ ${escapeHtml(item.command)}</code></pre><p>${w.expected}: ${l.demo}</p></details><div class="project-links">${item.links.map((link) => ext(link.href, link.type === "tests" ? l.testsLabel : link.type === "demo" ? l.demoLabel : l.codeLabel)).join("")}</div></article>`;
          })
          .join("")}</section>
        <section id="approach" aria-labelledby="approach-title"><h2 id="approach-title">${w.approach}</h2><p class="section-intro">${text("approachIntro")}</p><dl class="approach">${[1, 2, 3].map((n) => `<div><dt>${text(`approach${n}Title`)}</dt><dd>${text(`approach${n}Description`)}</dd></div>`).join("")}</dl>${tech(["React", "Angular", "Vue", "TypeScript", "WCAG", "Web Vitals", "Node.js", "REST", "AWS", "CI/CD"])}</section>
        <section id="about" aria-labelledby="about-title"><h2 id="about-title">${w.about}</h2><p class="lead">${text("aboutLead")}</p><p>${text("aboutBody")}</p><p>${text("aboutLearning")}</p><dl class="about-facts"><div><dt>${text("educationLabel")}</dt><dd>${text("educationTitle")}<br>${text("educationDetails")}</dd></div><div><dt>${text("languagesLabel")}</dt><dd>${text("languagesTitle")}<br>${text("languagesDetails")}</dd></div></dl>${ext("https://www.linkedin.com/in/enzo-bellussi/", text("linkedinCta"))}</section>
        <section id="contact" aria-labelledby="contact-title"><h2 id="contact-title">${w.contact}</h2><p class="lead">${text("contactNote")}</p><p>${text("contactDescription")}</p><a class="contact-email" href="mailto:enzobellussi3@gmail.com">enzobellussi3@gmail.com</a><div class="contact-actions"><a class="primary-action" href="mailto:enzobellussi3@gmail.com">${text("emailCta")}${arrow}</a><button class="copy-email">${w.copy}</button></div><p id="copy-status" role="status" aria-live="polite"></p><a data-resume href="/curriculo-${lang}.pdf" download>${text("resume")}</a></section>
      </main>
      <footer><p class="closing-name">Enzo Bellussi.</p><div class="footer-meta"><p>© <span id="year">2026</span> Enzo Bellussi</p><nav aria-label="${w.links}">${ext("https://github.com/bellussi1", "GitHub")}${ext("https://www.linkedin.com/in/enzo-bellussi/", "LinkedIn")}<a href="/curriculo-pt.pdf" download>CV PT</a><a href="/curriculo-en.pdf" download>CV EN</a><a href="#home">${w.back}</a></nav></div></footer>
    </div>
  </div>`;
}
