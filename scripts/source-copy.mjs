// Source tags carrying data-i18n have no nested tag of the same name.
// Preserve their trusted local markup, including <br> and emphasis, verbatim.
export function extractPortuguese(html) {
  return Object.fromEntries(
    [
      ...html.matchAll(
        /<([a-z][\w-]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1\s*>/gi,
      ),
    ].map(([, , key, content]) => [key, content.trim()]),
  );
}
