/**
 * Serialises a JSON-LD object for a <script type="application/ld+json"> tag.
 * JSON.stringify doesn't escape "</script>", so DB-sourced strings could break
 * out of the tag. Escaping "<" (plus ">" and "&") as unicode keeps it valid JSON.
 * See node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
