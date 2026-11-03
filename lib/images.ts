/**
 * Image shown when a record has no picture of its own, or still points at the
 * old /placeholder.* paths (those files were never in /public, so they 404).
 */
export const FALLBACK_IMAGE = '/hero/about-hero.webp';

const LEGACY_PLACEHOLDERS = new Set(['/placeholder.svg', '/placeholder.jpg']);

/** True when the record has no real image (empty, the fallback, or a legacy placeholder path). */
export function isPlaceholderImage(src?: string | null): boolean {
  if (!src) return true;
  const path = src.split('?')[0];
  return path === FALLBACK_IMAGE || LEGACY_PLACEHOLDERS.has(path);
}

/** The image to render: the record's own image, or FALLBACK_IMAGE if it has none. */
export function imageOrFallback(src?: string | null): string {
  if (!src || LEGACY_PLACEHOLDERS.has(src.split('?')[0])) return FALLBACK_IMAGE;
  return src;
}
