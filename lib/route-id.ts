/**
 * Parse the numeric `id` segment of a detail route (/events/12, /visas/100).
 * Returns null for anything that is not a plain positive integer, so the page
 * can call notFound() instead of sending NaN to Mongo.
 */
export function parseItemId(raw: string): number | null {
  if (!/^\d{1,9}$/.test(raw)) return null;
  return Number(raw);
}
