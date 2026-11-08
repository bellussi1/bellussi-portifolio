const metadataByLanguage = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    ogLocaleAlternate: "pt_BR",
    title: "Enzo Bellussi — Software Engineer",
    description:
      "Software engineer with 3+ years building enterprise web products. TypeScript, React, Angular and Node.js — performance, accessibility and maintainable systems.",
  },
  pt: {
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    ogLocaleAlternate: "en_US",
    title: "Enzo Bellussi — Engenheiro de Software",
    description:
      "Engenheiro de software com 3+ anos construindo produtos web corporativos. TypeScript, React, Angular e Node.js — performance, acessibilidade e sistemas sustentáveis.",
  },
};

export function syncPageMetadata(document, language) {
  const metadata = metadataByLanguage[language === "pt" ? "pt" : "en"];
  document.documentElement.lang = metadata.htmlLang;
  document.title = metadata.title;

  const values = [
    ['meta[name="description"]', metadata.description],
    ['meta[property="og:title"]', metadata.title],
    ['meta[property="og:description"]', metadata.description],
    ['meta[property="og:locale"]', metadata.ogLocale],
    ['meta[property="og:locale:alternate"]', metadata.ogLocaleAlternate],
    ['meta[name="twitter:title"]', metadata.title],
    ['meta[name="twitter:description"]', metadata.description],
  ];

  values.forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) element.content = value;
  });
}
