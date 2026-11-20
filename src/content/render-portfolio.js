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

function figure(image, alt, className, loading = "lazy") {
  return (
    '<img class="' +
    className +
    '" src="' +
    escapeHtml(image.src) +
    '" alt="' +
    escapeHtml(alt) +
    '" width="' +
    image.width +
    '" height="' +
    image.height +
    '" loading="' +
    loading +
    '" decoding="async">'
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
          '<div><dd><a href="' +
          escapeHtml(metric.href) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(metric.value[language]) +
          "</a></dd><dt>" +
          escapeHtml(metric.label[language]) +
          "</dt></div>",
      )
      .join("") +
    '</dl><p class="atlas-metrics-note">' +
    escapeHtml(copy.metricsNote) +
    "</p></div>"
  );
}

function renderFlagshipViewer(flagship, copy) {
  const tabs = flagship.tour
    .map((entry, index) => {
      const item = copy.tour[entry.key];
      return (
        '<button type="button" role="tab" class="atlas-tab" id="atlas-tab-' +
        entry.key +
        '" aria-controls="atlas-panel-' +
        entry.key +
        '" aria-selected="' +
        (index === 0 ? "true" : "false") +
        '"' +
        (index === 0 ? "" : ' tabindex="-1"') +
        ">" +
        escapeHtml(item.name) +
        "</button>"
      );
    })
    .join("");
  const panels = flagship.tour
    .map((entry, index) => {
      const item = copy.tour[entry.key];
      return (
        '<div role="tabpanel" class="atlas-panel" id="atlas-panel-' +
        entry.key +
        '" aria-labelledby="atlas-tab-' +
        entry.key +
        '"' +
        (index === 0 ? "" : " hidden") +
        ">" +
        figure(flagship.images[entry.key], item.alt, "atlas-panel-image", index === 0 ? "eager" : "lazy") +
        '<p class="atlas-panel-caption">' +
        escapeHtml(item.caption) +
        "</p>" +
        anchor(entry, copy.tourOpen + " " + item.name, "text-link") +
        "</div>"
      );
    })
    .join("");
  return (
    '<div class="atlas-viewer"><div class="atlas-tablist" role="tablist" aria-label="' +
    escapeHtml(copy.tourLabel) +
    '">' +
    tabs +
    "</div>" +
    panels +
    "</div>"
  );
}

function renderFlagshipChapter(chapter, index) {
  const points = chapter.points?.length
    ? '<ul class="atlas-chapter-points">' +
      chapter.points.map((point) => "<li>" + escapeHtml(point) + "</li>").join("") +
      "</ul>"
    : "";
  return (
    '<details class="atlas-chapter" name="atlas-chapters"' +
    (index === 0 ? " open" : "") +
    '><summary><span class="atlas-chapter-label">' +
    escapeHtml(chapter.label) +
    '</span><span class="atlas-chapter-title">' +
    escapeHtml(chapter.title) +
    '</span><span class="details-icon" aria-hidden="true">+</span></summary><div class="atlas-chapter-body"><p>' +
    escapeHtml(chapter.body) +
    "</p>" +
    points +
    "</div></details>"
  );
}

function renderFlagship(language) {
  const flagship = portfolioContent.flagship;
  const copy = flagship[language];
  return (
    '<article class="atlas-case" aria-labelledby="product-' +
    flagship.id +
    '"><div class="atlas-stage"><div class="atlas-lead-copy"><p class="project-category">' +
    escapeHtml(flagship.category) +
    '</p><h3 id="product-' +
    flagship.id +
    '">' +
    escapeHtml(flagship.name) +
    "</h3><h4>" +
    escapeHtml(copy.headline) +
    "</h4><p>" +
    escapeHtml(copy.description) +
    '</p><div class="product-links">' +
    flagship.links
      .map((link) => anchor(link, copy.linkLabels[link.type], "text-link product-repo-link"))
      .join("") +
    "</div>" +
    techTags(flagship.technologies) +
    "</div>" +
    renderFlagshipViewer(flagship, copy) +
    "</div>" +
    renderFlagshipMetrics(flagship, language, copy) +
    '<div class="atlas-chapters">' +
    copy.chapters.map((chapter, index) => renderFlagshipChapter(chapter, index)).join("") +
    "</div></article>"
  );
}

function renderOtherWork(language) {
  return (
    '<ul class="work-grid">' +
    portfolioContent.otherWork
      .map((project) => {
        const copy = project[language];
        const [main, ...rest] = project.links;
        const mainLabel = copy.linkLabels?.[main.type] ?? defaultLinkLabels[language][main.type];
        return (
          '<li class="work-tile reveal"><p class="project-category">' +
          escapeHtml(project.category) +
          (copy.status ? '</p><p class="work-status">' + escapeHtml(copy.status) : "") +
          '</p><h3><a class="work-main" href="' +
          escapeHtml(main.href) +
          '" target="_blank" rel="noopener noreferrer" aria-label="' +
          escapeHtml(project.name + ": " + mainLabel) +
          '">' +
          escapeHtml(project.name) +
          '</a></h3><h4>' +
          escapeHtml(copy.headline) +
          "</h4><p class=\"work-description\">" +
          escapeHtml(copy.description) +
          "</p>" +
          (rest.length
            ? '<div class="project-links">' +
              rest
                .map((link) =>
                  anchor(link, copy.linkLabels?.[link.type] ?? defaultLinkLabels[language][link.type]),
                )
                .join("") +
              "</div>"
            : "") +
          '<p class="work-stack">' +
          escapeHtml(project.technologies.slice(0, 4).join(", ")) +
          "</p></li>"
        );
      })
      .join("") +
    "</ul>"
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
