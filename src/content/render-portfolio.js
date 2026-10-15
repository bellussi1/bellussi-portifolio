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
          aria:
            "Comandinha operations dashboard preview with demonstration sales, orders and popular menu items.",
          page: "Today's operation",
          greeting: "Tuesday · October 14",
          export: "Export report",
          sales: "Sales today",
          orders: "Orders",
          average: "Average ticket",
          compared: "vs. last Tuesday",
          timeline: "Sales through the day",
          hours: "Orders by time",
          recent: "Recent orders",
          viewAll: "View all",
          popular: "Popular this week",
          table: "TABLE",
          total: "TOTAL",
          status: "STATUS",
          preparing: "Preparing",
          ready: "Ready",
          open: "Open",
          operations: "OPERATIONS",
          salonActive: "ROOM ACTIVE",
          menu: ["Overview", "Orders", "Menu", "Team", "Reports"],
          restaurant: "CASA BELLUSSI · CENTER",
          units: "orders",
          mock: "DEMO DATA",
        }
      : {
          aria:
            "Prévia de dashboard do Comandinha com vendas, pedidos e itens populares de demonstração.",
          page: "Operação de hoje",
          greeting: "Terça-feira · 14 de outubro",
          export: "Exportar relatório",
          sales: "Vendas hoje",
          orders: "Pedidos",
          average: "Ticket médio",
          compared: "vs. terça passada",
          timeline: "Vendas ao longo do dia",
          hours: "Pedidos por horário",
          recent: "Pedidos recentes",
          viewAll: "Ver todos",
          popular: "Mais pedidos na semana",
          table: "MESA",
          total: "TOTAL",
          status: "STATUS",
          preparing: "Preparando",
          ready: "Pronto",
          open: "Aberto",
          operations: "OPERAÇÃO",
          salonActive: "SALÃO ATIVO",
          menu: ["Visão geral", "Pedidos", "Cardápio", "Equipe", "Relatórios"],
          restaurant: "CASA BELLUSSI · CENTRO",
          units: "pedidos",
          mock: "DADOS DEMONSTRATIVOS",
        };
  const menuMarks = ["⌂", "▤", "▦", "◌", "▥"];
  const orders = [
    ["#1042", "08", "R$ 128,40", labels.preparing, "is-preparing"],
    ["#1041", "03", "R$ 74,90", labels.ready, "is-ready"],
    ["#1040", "11", "R$ 56,00", labels.open, "is-open"],
  ];
  const popularItems =
    language === "en"
      ? [
          ["House bruschetta", "42", "84%"],
          ["Mushroom risotto", "36", "68%"],
          ["Apple tart", "28", "52%"],
        ]
      : [
          ["Bruschetta da casa", "42", "84%"],
          ["Risoto de cogumelos", "36", "68%"],
          ["Torta de maçã", "28", "52%"],
        ];

  return (
    '<div class="comandinha-dashboard" role="img" aria-label="' +
    escapeHtml(ariaLabel || labels.aria) +
    '"><aside class="comandinha-dashboard__sidebar" aria-hidden="true"><div class="comandinha-dashboard__brand"><span>c</span><strong>comandinha</strong></div><p>' +
    labels.operations +
    "</p><nav>" +
    labels.menu
      .map(
        (item, index) =>
          '<span class="' +
          (index === 0 ? "is-active" : "") +
          '"><i>' +
          menuMarks[index] +
          "</i>" +
          item +
          "</span>",
      )
      .join("") +
    '</nav><div class="comandinha-dashboard__side-foot"><i></i> ' +
    labels.salonActive +
    '</div></aside><div class="comandinha-dashboard__workspace" aria-hidden="true"><header class="comandinha-dashboard__topbar"><strong>' +
    labels.restaurant +
    '</strong><span class="comandinha-dashboard__top-actions">⌕　◷　<b>EB</b></span></header><div class="comandinha-dashboard__main"><div class="comandinha-dashboard__heading"><div><p>' +
    labels.greeting +
    '</p><h4>' +
    labels.page +
    '</h4></div><span class="comandinha-dashboard__demo">' +
    labels.mock +
    '</span></div><section class="comandinha-dashboard__metrics"><article><span>' +
    labels.sales +
    '</span><strong>R$ 4.820,40</strong><small><i>+12,8%</i> ' +
    labels.compared +
    '</small></article><article><span>' +
    labels.orders +
    '</span><strong>86</strong><small><i>+8,2%</i> ' +
    labels.compared +
    '</small></article><article><span>' +
    labels.average +
    '</span><strong>R$ 56,05</strong><small><i>+4,1%</i> ' +
    labels.compared +
    '</small></article></section><div class="comandinha-dashboard__panels"><section class="comandinha-dashboard__panel comandinha-dashboard__sales"><header><div><span>' +
    labels.timeline +
    '</span><strong>R$ 4.820,40</strong></div><small>' +
    labels.hours +
    '</small></header><div class="comandinha-dashboard__chart"><div class="comandinha-dashboard__axis"><span>5k</span><span>3k</span><span>1k</span><span>0</span></div><div class="comandinha-dashboard__plot"><svg viewBox="0 0 520 150" preserveAspectRatio="none" aria-hidden="true"><path class="comandinha-dashboard__gridline" d="M0 12H520 M0 54H520 M0 96H520 M0 138H520"/><path class="comandinha-dashboard__area" d="M0 130 C34 126 42 111 78 116 S122 100 154 106 S196 86 232 99 S274 70 310 83 S350 65 386 75 S428 36 462 55 S492 25 520 30 V150H0Z"/><path class="comandinha-dashboard__line" d="M0 130 C34 126 42 111 78 116 S122 100 154 106 S196 86 232 99 S274 70 310 83 S350 65 386 75 S428 36 462 55 S492 25 520 30"/><circle cx="310" cy="83" r="5"/><circle cx="520" cy="30" r="5"/></svg><div class="comandinha-dashboard__time"><span>10h</span><span>12h</span><span>14h</span><span>16h</span><span>18h</span></div></div></div></section><section class="comandinha-dashboard__panel comandinha-dashboard__popular"><header><span>' +
    labels.popular +
    '</span><i>•••</i></header><div class="comandinha-dashboard__popular-list">' +
    popularItems
      .map(
        ([name, count, width]) =>
          '<div><span><strong>' +
          name +
          "</strong><small>" +
          count +
          " " +
          labels.units +
          '</small></span><i><b style="width:' +
          width +
          '"></b></i></div>',
      )
      .join("") +
    '</div></section></div><section class="comandinha-dashboard__panel comandinha-dashboard__orders"><header><span>' +
    labels.recent +
    '</span><a>' +
    labels.viewAll +
    '</a></header><div class="comandinha-dashboard__order-head"><span>#</span><span>' +
    labels.table +
    '</span><span>' +
    labels.total +
    '</span><span>' +
    labels.status +
    '</span></div>' +
    orders
      .map(
        ([number, table, total, status, state]) =>
          '<div class="comandinha-dashboard__order-row"><strong>' +
          number +
          "</strong><span>" +
          table +
          "</span><span>" +
          total +
          '</span><span><i class="comandinha-dashboard__order-status ' +
          state +
          '">' +
          status +
          "</i></span></div>",
      )
      .join("") +
    "</section></div></div>"
  );
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
        const intersectionMarker =
          index === 0
            ? '<span class="index-grid-cross index-grid-cross--half" aria-hidden="true"></span>'
            : "";
        return (
          '<article class="index-tool-row reveal" data-reveal="' +
          (index === 2 ? "scale" : index === 0 ? "left" : "right") +
          '" style="--reveal-delay:' +
          index * 95 +
          'ms">' +
          intersectionMarker +
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
