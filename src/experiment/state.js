export function readVariant(pathname) {
  if (/^\/v2(?:\/index\.html|\/)?$/.test(pathname)) return "b";
  if (/^\/v3(?:\/index\.html|\/)?$/.test(pathname)) return "c";
  return "a";
}
export function initialLanguage(search, saved) {
  const query = new URLSearchParams(search).get("lang");
  return query === "pt" || query === "en"
    ? query
    : saved === "en"
      ? "en"
      : "pt";
}
export function comparisonLinks(href, language) {
  return ["/", "/v2", "/v3"].map((path) => {
    const url = new URL(href);
    url.pathname = path;
    url.searchParams.set("lang", language === "en" ? "en" : "pt");
    return url;
  });
}

export function normalizeVariantRequest(url) {
  return url.replace(/^\/(v[23])\/?(?=\?|$)/, "/$1/index.html");
}
