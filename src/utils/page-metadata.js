const metadataByLanguage = {
  pt: {
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Enzo Bellussi | Software Engineer com foco em Front-end",
    description:
      "Enzo Bellussi, Software Engineer com foco em front-end. Experiência na MarketData e no Banco do Brasil, com Angular, React e TypeScript.",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Enzo Bellussi | Front-end Software Engineer",
    description:
      "Enzo Bellussi is a Software Engineer focused on front-end, with experience at MarketData and Banco do Brasil.",
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
