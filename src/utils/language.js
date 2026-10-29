export function initialLanguage(search, saved) {
  const query = new URLSearchParams(search).get("lang");
  return query === "pt" || query === "en" ? query : saved === "en" ? "en" : "pt";
}
