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
    technologies
      .map(
        (technology, index) =>
          '<li data-tech="' +
          escapeHtml(technology) +
          '" style="--badge-delay:' +
          index * 42 +
          'ms">' +
          escapeHtml(technology) +
          "</li>",
      )
      .join("") +
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

function renderExperienceDetails(copy) {
  if (!copy.details) return "";
  return (
    '<details class="experience-details" open><summary>' +
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
          '<article class="field-experience-entry reveal" data-reveal="' +
          (index % 2 ? "right" : "left") +
          '" style="--reveal-delay:' +
          index * 100 +
          'ms" aria-labelledby="field-experience-' +
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
      .map((experience, index) => {
        const copy = experience[copyKey];
        return (
          '<tr class="index-experience-entry reveal" data-reveal="' +
          (index % 2 ? "right" : "left") +
          '" style="--reveal-delay:' +
          index * 105 +
          'ms"><th scope="row"><time>' +
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

const defaultLinkLabels = {
  en: { code: "Code", tests: "Tests and CI" },
  pt: { code: "Código", tests: "Testes e CI" },
};

function figure(image, alt, caption, className, loading = "lazy") {
  return (
    '<figure class="portfolio-product-visual ' +
    className +
    '"><img src="' +
    escapeHtml(image.src) +
    '" alt="' +
    escapeHtml(alt) +
    '" width="' +
    image.width +
    '" height="' +
    image.height +
    '" loading="' +
    loading +
    '" decoding="async"><figcaption><span>' +
    escapeHtml(caption) +
    "</span></figcaption></figure>"
  );
}

function renderFlagshipMetrics(flagship, language, copy) {
  return (
    '<div class="atlas-metrics-block"><dl class="atlas-metrics" aria-label="' +
    escapeHtml(copy.metricsLabel) +
    '">' +
    flagship.metrics
      .map(
        (metric) =>
          "<div><dt>" +
          escapeHtml(metric.label[language]) +
          "</dt><dd>" +
          escapeHtml(metric.value[language]) +
          "</dd></div>",
      )
      .join("") +
    '</dl><p class="atlas-metrics-note">' +
    escapeHtml(copy.metricsNote) +
    "</p></div>"
  );
}

function renderFlagshipTour(flagship, copy) {
  return (
    '<section class="atlas-tour reveal" aria-labelledby="atlas-tour-title"><h4 id="atlas-tour-title">' +
    escapeHtml(copy.tourLabel) +
    '</h4><ul class="atlas-tour-grid">' +
    flagship.tour
      .map((entry) => {
        const item = copy.tour[entry.key];
        return (
          '<li class="atlas-tour-item">' +
          figure(flagship.images[entry.key], item.alt, item.name, "atlas-tour-figure") +
          "<p>" +
          escapeHtml(item.caption) +
          "</p>" +
          anchor(entry, copy.tourOpen + " " + item.name, "text-link") +
          "</li>"
        );
      })
      .join("") +
    "</ul></section>"
  );
}

function renderFlagshipChapter(chapter) {
  const points = chapter.points?.length
    ? '<ul class="atlas-chapter-points">' +
      chapter.points.map((point) => "<li>" + escapeHtml(point) + "</li>").join("") +
      "</ul>"
    : "";
  return (
    '<li class="atlas-chapter reveal"><p class="atlas-chapter-label">' +
    escapeHtml(chapter.label) +
    '</p><div class="atlas-chapter-body"><div class="atlas-chapter-text"><h4>' +
    escapeHtml(chapter.title) +
    "</h4><p>" +
    escapeHtml(chapter.body) +
    "</p>" +
    points +
    "</div></div></li>"
  );
}

function renderFlagship(language) {
  const flagship = portfolioContent.flagship;
  const copy = flagship[language];
  return (
    '<article class="atlas-case" aria-labelledby="product-' +
    flagship.id +
    '"><div class="atlas-lead reveal">' +
    figure(flagship.images.home, copy.imageAlt, copy.imageCaption, "atlas-lead-figure") +
    '<div class="atlas-lead-copy"><p class="project-category">' +
    escapeHtml(flagship.category) +
    '</p><h3 id="product-' +
    flagship.id +
    '">' +
    escapeHtml(flagship.name) +
    "</h3><h4>" +
    escapeHtml(copy.headline) +
    "</h4><p>" +
    escapeHtml(copy.description) +
    "</p>" +
    techTags(flagship.technologies) +
    '<div class="product-links">' +
    flagship.links
      .map((link) => anchor(link, copy.linkLabels[link.type], "text-link product-repo-link"))
      .join("") +
    "</div></div></div>" +
    renderFlagshipMetrics(flagship, language, copy) +
    renderFlagshipTour(flagship, copy) +
    '<ol class="atlas-chapters">' +
    copy.chapters
      .map((chapter, index) => renderFlagshipChapter(chapter))
      .join("") +
    "</ol></article>"
  );
}

function renderOtherWork(language) {
  return (
    '<ol class="work-ledger">' +
    portfolioContent.otherWork
      .map((project) => {
        const copy = project[language];
        const usage = project.command
          ? '<p class="work-command"><code>' + escapeHtml(project.command) + "</code></p>"
          : "";
        return (
          '<li class="work-row reveal" aria-labelledby="work-' +
          project.id +
          '"><div class="work-title"><p class="project-category">' +
          escapeHtml(project.category) +
          '</p><h3 id="work-' +
          project.id +
          '">' +
          escapeHtml(project.name) +
          "</h3>" +
          (copy.status ? '<p class="work-status">' + escapeHtml(copy.status) + "</p>" : "") +
          '</div><div class="work-copy"><h4>' +
          escapeHtml(copy.headline) +
          "</h4><p>" +
          escapeHtml(copy.description) +
          "</p>" +
          usage +
          '<div class="work-meta">' +
          techTags(project.technologies) +
          '<div class="project-links">' +
          project.links
            .map((link) =>
              anchor(link, copy.linkLabels?.[link.type] ?? defaultLinkLabels[language][link.type]),
            )
            .join("") +
          "</div></div></div></li>"
        );
      })
      .join("") +
    "</ol>"
  );
}

export function renderPortfolioSection(section, { concept, language }) {
  const selectedConcept = concept === "index" ? "index" : "field";
  const selectedLanguage = language === "en" ? "en" : "pt";

  if (section === "experience")
    return selectedConcept === "field"
      ? renderFieldExperience(selectedLanguage)
      : renderIndexExperience(selectedLanguage);
  if (section === "atlas") return renderFlagship(selectedLanguage);
  if (section === "work") return renderOtherWork(selectedLanguage);
  return "";
}

export function renderPortfolioSections(parameters) {
  return {
    experience: renderPortfolioSection("experience", parameters),
    atlas: renderPortfolioSection("atlas", parameters),
    work: renderPortfolioSection("work", parameters),
  };
}
