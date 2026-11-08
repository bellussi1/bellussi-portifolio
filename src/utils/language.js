export function initialLanguage(search, saved) {
  const query = new URLSearchParams(search).get("lang");
  if (query === "pt" || query === "en") return query;
  return saved === "pt" ? "pt" : "en";
}
