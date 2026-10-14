import { portfolioContent } from "./portfolio.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function techTags(technologies) {
  return (
    '<ul class="tech-tags">' +
    technologies.map((technology) => "<li>" + escapeHtml(technology) + "</li>").join("") +
    "</ul>"
  );
}

function anchor(link, label, className = "text-link") {
  return (
    '<a class="' +
    className +
    '" href="' +
    escapeHtml(link.href) +
    '" target="_blank" rel="noopener noreferrer">' +
    escapeHtml(label) +
    '<span aria-hidden="true">↗</span></a>'
  );
}

function productImage(product, copy) {
  return (
    '<figure class="portfolio-product-visual">' +
    '<img src="' +
    escapeHtml(product.image.src) +
    '" alt="' +
    escapeHtml(copy.imageAlt) +
    '" width="' +
    product.image.width +
    '" height="' +
    product.image.height +
    '" loading="lazy" decoding="async">' +
    '<figcaption><span>' +
    escapeHtml(copy.imageCaption) +
    "</span></figcaption></figure>"
  );
}

function renderExperienceDetails(copy) {
  if (!copy.details) return "";
  return (
    '<details class="experience-details"><summary>' +
    escapeHtml(copy.detailsLabel) +
    '<span class="details-icon" aria-hidden="true">+</span></summary><p>' +
    escapeHtml(copy.details) +
    "</p></details>"
  );
}

function renderExperienceFacts(experience, copy) {
  return (
    "<p>" +
    escapeHtml(copy.description) +
    "</p><ul class=\"outcome-list\">" +
    copy.bullets.map((bullet) => "<li>" + escapeHtml(bullet) + "</li>").join("") +
    "</ul>" +
    techTags(experience.technologies) +
    renderExperienceDetails(copy)
  );
}

function renderFieldExperience(language) {
  return (
    '<div class="field-experience-list">' +
    portfolioContent.experiences
      .map((experience, index) => {
        const copy = experience[language];
        return (
          '<article class="field-experience-entry reveal" aria-labelledby="field-experience-' +
          experience.id +
          '">' +
          '<aside class="field-experience-meta"><span class="field-entry-number">0' +
          (index + 1) +
          "</span><time>" +
          escapeHtml(copy.period) +
          "</time><h3>" +
          escapeHtml(experience.name) +
          '</h3><span class="role-pill">' +
          escapeHtml(copy.pill) +
          '</span></aside><div class="field-experience-content"><p class="role-label">' +
          escapeHtml(copy.role) +
          '</p><h4 id="field-experience-' +
          experience.id +
          '">' +
          escapeHtml(copy.title) +
          "</h4>" +
          renderExperienceFacts(experience, copy) +
          "</div></article>"
        );
      })
      .join("") +
    "</div>"
  );
}

function renderIndexExperience(language) {
  const copyKey = language === "en" ? "en" : "pt";
  const labels =
    copyKey === "en"
      ? ["PERIOD", "ORGANIZATION", "CONTRIBUTION", "Professional experience"]
      : ["PERÍODO", "ORGANIZAÇÃO", "CONTRIBUIÇÃO", "Experiência profissional"];
  return (
    '<div class="index-experience-table"><table aria-label="' +
    labels[3] +
    '"><thead><tr><th scope="col">' +
    labels[0] +
    '</th><th scope="col">' +
    labels[1] +
    '</th><th scope="col">' +
    labels[2] +
    "</th></tr></thead><tbody>" +
    portfolioContent.experiences
      .map((experience) => {
        const copy = experience[copyKey];
        return (
          '<tr class="index-experience-entry"><th scope="row"><time>' +
          escapeHtml(copy.period) +
          '</time></th><td class="index-experience-organization"><strong>' +
          escapeHtml(experience.name) +
          '</strong><span class="role-pill">' +
          escapeHtml(copy.pill) +
          '</span><span class="role-label">' +
          escapeHtml(copy.role) +
          '</span></td><td class="index-experience-contribution"><h3>' +
          escapeHtml(copy.title) +
          "</h3><p>" +
          escapeHtml(copy.description) +
          '</p><ul class="outcome-list">' +
          copy.bullets
            .map((bullet) => "<li>" + escapeHtml(bullet) + "</li>")
            .join("") +
          "</ul>" +
          techTags(experience.technologies) +
          renderExperienceDetails(copy) +
          "</td></tr>"
        );
      })
      .join("") +
    "</tbody></table></div>"
  );
}

function renderProductCopy(product, language, concept, index) {
  const copy = product[language];
  const links = product.links
    .map((link) => anchor(link, copy.linkLabel, "text-link product-repo-link"))
    .join("");
  const privateNote = copy.privateNote
    ? '<p class="private-project-note">' + escapeHtml(copy.privateNote) + "</p>"
    : "";
  const identity =
    concept === "field"
      ? '<p class="project-category"><span>0' +
        (index + 1) +
        " /</span> " +
        escapeHtml(product.category) +
        '</p><span class="product-status">' +
        escapeHtml(copy.status) +
        "</span>"
      : '<p class="project-category"><span>0' +
        (index + 1) +
        " /</span> " +
        escapeHtml(product.category) +
        '</p><p class="product-status">' +
        escapeHtml(copy.status) +
        "</p>";
  return (
    '<div class="product-copy ' +
    (concept === "field" ? "field-product-copy" : "index-product-copy") +
    '">' +
    identity +
    '<h3 id="product-' +
    product.id +
    '">' +
    escapeHtml(product.name) +
    "</h3><h4>" +
    escapeHtml(copy.headline) +
    "</h4><p>" +
    escapeHtml(copy.description) +
    '</p><p class="product-detail">' +
    escapeHtml(copy.details) +
    "</p>" +
    techTags(product.technologies) +
    links +
    privateNote +
    "</div>"
  );
}

function renderFieldProducts(language) {
  return (
    '<div class="field-product-list">' +
    portfolioContent.products
      .map(
        (product, index) =>
          '<article class="field-product-case reveal' +
          (index % 2 ? " is-reversed" : "") +
          '" aria-labelledby="product-' +
          product.id +
          '">' +
          renderProductCopy(product, language, "field", index) +
          productImage(product, product[language]) +
          "</article>",
      )
      .join("") +
    "</div>"
  );
}

function renderIndexProducts(language) {
  return (
    '<div class="index-product-grid">' +
    portfolioContent.products
      .map(
        (product, index) =>
          '<article class="index-product-card reveal" aria-labelledby="product-' +
          product.id +
          '"><span class="index-card-number">0' +
          (index + 1) +
          "</span>" +
          productImage(product, product[language]) +
          renderProductCopy(product, language, "index", index) +
          "</article>",
      )
      .join("") +
    "</div>"
  );
}

function linkLabel(copy, type) {
  if (type === "tests") return copy.testsLabel;
  if (type === "demo") return copy.demoLabel;
  return copy.codeLabel;
}

function renderFieldTools(language) {
  const copy = language === "en" ? "en" : "pt";
  return (
    '<div class="field-open-source-ledger">' +
    portfolioContent.openSourceProjects
      .map((project, index) => {
        const localized = project[copy];
        const standardLinks = project.links
          .filter(({ type }) => type !== "demo")
          .map((link) => anchor(link, linkLabel(localized, link.type)))
          .join("");
        const demoLink = project.links.find(({ type }) => type === "demo");
        return (
          '<article class="field-open-source-row reveal"><span class="field-entry-number">0' +
          (index + 1) +
          '</span><div class="field-tool-copy"><p class="project-category">' +
          escapeHtml(project.category) +
          "</p><h3>" +
          escapeHtml(project.name) +
          "</h3><h4>" +
          escapeHtml(localized.headline) +
          "</h4><p>" +
          escapeHtml(localized.description) +
          '</p><p class="project-decision">' +
          escapeHtml(localized.decision) +
          "</p>" +
          techTags(project.technologies) +
          '<details class="field-tool-demo"><summary>' +
          escapeHtml(localized.exampleLabel) +
          "</summary><pre><code>" +
          escapeHtml(project.command) +
          "</code></pre><p>" +
          escapeHtml(localized.demo) +
          "</p>" +
          (demoLink
            ? anchor(demoLink, localized.demoLabel)
            : "") +
          "</details><div class=\"project-links\">" +
          standardLinks +
          "</div></div></article>"
        );
      })
      .join("") +
    "</div>"
  );
}

function renderIndexTools(language) {
  const copy = language === "en" ? "en" : "pt";
  return (
    '<div class="index-tool-list">' +
    portfolioContent.openSourceProjects
      .map((project, index) => {
        const localized = project[copy];
        return (
          '<article class="index-tool-row reveal"><span class="index-card-number">0' +
          (index + 1) +
          '</span><div class="index-tool-title"><p class="project-category">' +
          escapeHtml(project.category) +
          "</p><h3>" +
          escapeHtml(project.name) +
          "</h3></div><div class=\"index-tool-description\"><h4>" +
          escapeHtml(localized.headline) +
          "</h4><p>" +
          escapeHtml(localized.description) +
          '</p><p class="project-decision">' +
          escapeHtml(localized.decision) +
          "</p>" +
          techTags(project.technologies) +
          '<details class="index-tool-demo"><summary>' +
          escapeHtml(localized.exampleLabel) +
          "</summary><pre><code>" +
          escapeHtml(project.command) +
          "</code></pre><p>" +
          escapeHtml(localized.demo) +
          "</p></details><div class=\"project-links\">" +
          project.links
            .map((link) => anchor(link, linkLabel(localized, link.type)))
            .join("") +
          "</div></div></article>"
        );
      })
      .join("") +
    "</div>"
  );
}

export function renderPortfolioSections({ concept, language }) {
  const selectedConcept = concept === "index" ? "index" : "field";
  const selectedLanguage = language === "en" ? "en" : "pt";

  return {
    experience:
      selectedConcept === "field"
        ? renderFieldExperience(selectedLanguage)
        : renderIndexExperience(selectedLanguage),
    products:
      selectedConcept === "field"
        ? renderFieldProducts(selectedLanguage)
        : renderIndexProducts(selectedLanguage),
    projects:
      selectedConcept === "field"
        ? renderFieldTools(selectedLanguage)
        : renderIndexTools(selectedLanguage),
  };
}
