const metadataByLanguage = {
  pt: {
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Enzo Bellussi | Software Engineer com foco em Front-end",
    description:
      "Software Engineer focado em front-end. Construo interfaces cuidadosas e sistemas preparados para evoluir com Angular, React e TypeScript. Experiência na MarketData e no Banco do Brasil.",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Enzo Bellussi | Front-end Software Engineer",
    description:
      "Enzo Bellussi is a Front-end Software Engineer building thoughtful interfaces and systems designed to evolve with Angular, React, and TypeScript. Experience at MarketData and Banco do Brasil.",
  },
};

export function syncPageMetadata(document, language) {
  const metadata = metadataByLanguage[language === "en" ? "en" : "pt"];
  document.documentElement.lang = metadata.htmlLang;
  document.title = metadata.title;

  const values = [
    ['meta[name="description"]', metadata.description],
    ['meta[property="og:title"]', metadata.title],
    ['meta[property="og:description"]', metadata.description],
    ['meta[property="og:locale"]', metadata.ogLocale],
    ['meta[name="twitter:title"]', metadata.title],
    ['meta[name="twitter:description"]', metadata.description],
  ];

  values.forEach(([selector, value]) => {
    document.querySelector(selector).content = value;
  });
}
