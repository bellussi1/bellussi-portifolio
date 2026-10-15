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

function renderComandinhaDashboard(language, ariaLabel) {
  const labels =
    language === "en"
      ? {
          aria: "Comandinha operations dashboard preview with demonstration revenue, orders and service status.",
          venue: "CASA BELLUSSI · CENTER",
          day: "TUESDAY · OCTOBER 14",
          page: "Today's operation",
          demo: "DEMO DATA",
          service: "SERVICE RUNNING",
          revenue: "Sales today",
          orders: "Orders",
          average: "Average ticket",
          comparison: "vs. last Tuesday",
          chart: "Revenue through the day",
          orderQueue: "Order queue",
          active: "03 ACTIVE",
          table: "Table",
          items: "items",
          preparing: "Preparing",
          ready: "Ready",
          received: "Received",
          countUnit: "orders",
          values: ["$4,820.40", "$56.05"],
        }
      : {
          aria: "Prévia do dashboard do Comandinha com receita, pedidos e status do salão demonstrativos.",
          venue: "CASA BELLUSSI · CENTRO",
          day: "TERÇA-FEIRA · 14 DE OUTUBRO",
          page: "Operação de hoje",
          demo: "DADOS DEMONSTRATIVOS",
          service: "SALÃO EM OPERAÇÃO",
          revenue: "Vendas do dia",
          orders: "Pedidos",
          average: "Ticket médio",
          comparison: "vs. terça passada",
          chart: "Receita ao longo do dia",
          orderQueue: "Fila de pedidos",
          active: "03 EM ANDAMENTO",
          table: "Mesa",
          items: "itens",
          preparing: "Preparando",
          ready: "Pronto",
          received: "Recebido",
          countUnit: "pedidos",
          values: ["R$ 4.820,40", "R$ 56,05"],
        };
  const orders =
    language === "en"
      ? [
          ["14:26", "#1042", "08", "4", "$128.40", labels.preparing, "is-preparing"],
          ["14:21", "#1041", "03", "2", "$74.90", labels.ready, "is-ready"],
          ["14:18", "#1040", "11", "1", "$56.00", labels.received, "is-received"],
        ]
      : [
          ["14:26", "#1042", "08", "4", "R$ 128,40", labels.preparing, "is-preparing"],
          ["14:21", "#1041", "03", "2", "R$ 74,90", labels.ready, "is-ready"],
          ["14:18", "#1040", "11", "1", "R$ 56,00", labels.received, "is-received"],
        ];

  return [
    '<div class="comandinha-dashboard" role="img" aria-label="',
    escapeHtml(ariaLabel || labels.aria),
    '"><header class="comandinha-dashboard__topbar"><div class="comandinha-dashboard__brand"><span aria-hidden="true">c</span><strong>comandinha</strong></div><span class="comandinha-dashboard__venue">',
    escapeHtml(labels.venue),
    '</span><span class="comandinha-dashboard__service"><i aria-hidden="true"></i>',
    escapeHtml(labels.service),
    '</span><span class="comandinha-dashboard__demo">',
    escapeHtml(labels.demo),
    '</span></header><div class="comandinha-dashboard__main"><div class="comandinha-dashboard__heading"><div><p>',
    escapeHtml(labels.day),
    '</p><h4>',
    escapeHtml(labels.page),
    '</h4></div><span class="comandinha-dashboard__shift">14:00 — 22:00</span></div><section class="comandinha-dashboard__metrics"><article class="is-primary"><span>',
    escapeHtml(labels.revenue),
    '</span><strong>',
    escapeHtml(labels.values[0]),
    '</strong><small><i>+12,8%</i> ',
    escapeHtml(labels.comparison),
    '</small></article><article><span>',
    escapeHtml(labels.orders),
    '</span><strong>86</strong><small>+8,2% ',
    escapeHtml(labels.comparison),
    '</small></article><article><span>',
    escapeHtml(labels.average),
    '</span><strong>',
    escapeHtml(labels.values[1]),
    '</strong><small>+4,1% ',
    escapeHtml(labels.comparison),
    '</small></article></section><div class="comandinha-dashboard__main-grid"><section class="comandinha-dashboard__panel comandinha-dashboard__revenue"><header><div><span>',
    escapeHtml(labels.chart),
    '</span><strong>',
    escapeHtml(labels.values[0]),
    '</strong></div><small>08:00 — 18:00</small></header><div class="comandinha-dashboard__chart"><div class="comandinha-dashboard__axis" aria-hidden="true"><span>5k</span><span>3k</span><span>1k</span><span>0</span></div><svg viewBox="0 0 640 190" preserveAspectRatio="none" aria-hidden="true"><path class="comandinha-dashboard__gridline" d="M0 18H640 M0 66H640 M0 114H640 M0 162H640"/><path class="comandinha-dashboard__area" d="M0 160 C34 156 47 143 78 146 S122 130 156 136 S202 111 238 124 S282 96 318 108 S360 78 397 91 S443 62 480 74 S520 39 556 53 S606 28 640 34 V190H0Z"/><path class="comandinha-dashboard__line" d="M0 160 C34 156 47 143 78 146 S122 130 156 136 S202 111 238 124 S282 96 318 108 S360 78 397 91 S443 62 480 74 S520 39 556 53 S606 28 640 34"/><circle cx="480" cy="74" r="4"/><circle cx="640" cy="34" r="4"/></svg><div class="comandinha-dashboard__time" aria-hidden="true"><span>10h</span><span>12h</span><span>14h</span><span>16h</span><span>18h</span></div></div></section><section class="comandinha-dashboard__panel comandinha-dashboard__order-queue"><header><div><span>',
    escapeHtml(labels.orderQueue),
    '</span><small>86 ',
    escapeHtml(labels.countUnit),
    '</small></div><i>',
    escapeHtml(labels.active),
    '</i></header><ol class="comandinha-dashboard__orders">',
    orders
      .map(
        ([time, number, table, quantity, total, status, state], index) =>
          '<li class="comandinha-dashboard__order-row"><span class="comandinha-dashboard__order-index">0' +
          (index + 1) +
          '</span><div class="comandinha-dashboard__order-copy"><strong>' +
          escapeHtml(number) +
          '</strong><small>' +
          escapeHtml(labels.table) +
          ' ' +
          escapeHtml(table) +
          ' · ' +
          escapeHtml(quantity) +
          ' ' +
          escapeHtml(labels.items) +
          '</small></div><span class="comandinha-dashboard__order-time">' +
          escapeHtml(time) +
          '</span><strong class="comandinha-dashboard__order-total">' +
          escapeHtml(total) +
          '</strong><span class="comandinha-dashboard__order-status ' +
          state +
          '"><i aria-hidden="true"></i>' +
          escapeHtml(status) +
          '</span></li>',
      )
      .join(""),
    '</ol></section></div><div class="comandinha-dashboard__footline"><span>RESTAURANT OPERATIONS</span><span>',
    escapeHtml(labels.demo),
    '</span></div></div></div>',
  ].join("");
}
function productImage(product, copy, language) {
  if (product.id === "comandinha") {
    return (
      '<figure class="portfolio-product-visual portfolio-product-visual--comandinha">' +
      renderComandinhaDashboard(language, copy.imageAlt) +
      '<figcaption><span>' +
      escapeHtml(copy.imageCaption) +
      "</span></figcaption></figure>"
    );
  }

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
          '" data-reveal="' +
          (index % 2 ? "right" : "left") +
          '" style="--reveal-delay:' +
          index * 110 +
          'ms" aria-labelledby="product-' +
          product.id +
          '">' +
          renderProductCopy(product, language, "field", index) +
          productImage(product, product[language], language) +
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
          '<article class="index-product-card reveal" data-reveal="' +
          (index % 2 ? "right" : "left") +
          '" style="--reveal-delay:' +
          index * 110 +
          'ms" aria-labelledby="product-' +
          product.id +
          '"><span class="index-card-number">0' +
          (index + 1) +
          "</span>" +
          productImage(product, product[language], language) +
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
    '<span class="index-grid-cross index-grid-cross--half" aria-hidden="true"></span>' +
    portfolioContent.openSourceProjects
      .map((project, index) => {
        const localized = project[copy];
        const [executable, ...commandArguments] = project.command.split(/\s+/);
        const terminalCommand =
          '<span class="terminal-executable">' +
          escapeHtml(executable) +
          "</span> " +
          commandArguments
            .map(
              (argument) =>
                '<span class="' +
                (argument.startsWith("--")
                  ? "terminal-flag"
                  : "terminal-argument") +
                '">' +
                escapeHtml(argument) +
                "</span>",
            )
            .join(" ");
        const terminalMarkup =
          '<div class="index-terminal" role="group" aria-label="' +
          escapeHtml(
            language === "en"
              ? "Usage example for " + project.name
              : "Exemplo de uso de " + project.name,
          ) +
          '"><div class="index-terminal-head"><span><i aria-hidden="true"></i>' +
          "TERMINAL" +
          "</span><span>" +
          escapeHtml(project.category) +
          '</span></div><pre><code><span class="terminal-prompt" aria-hidden="true">$</span> ' +
          terminalCommand +
          '</code></pre><div class="index-terminal-flow"><span>' +
          (language === "en" ? "EXPECTED FLOW" : "FLUXO ESPERADO") +
          "</span><p>" +
          escapeHtml(localized.demo) +
          "</p></div></div>";
        return (
          '<article class="index-tool-row reveal" data-reveal="' +
          (index === 2 ? "scale" : index === 0 ? "left" : "right") +
          '" style="--reveal-delay:' +
          index * 95 +
          'ms">' +
          '<span class="index-card-number">0' +
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
          terminalMarkup +
          '<div class="project-links">' +
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
