/**
 * Bounds page/limit arguments. Server actions can be called by direct POST
 * with any JSON value, so a public list action must not trust them: a huge
 * limit would dump the collection in one response and NaN would reach Mongo.
 */
export const MAX_PAGE_SIZE = 50;

export function clampPagination(page: unknown, limit: unknown, defaultLimit = 9): { page: number; limit: number } {
  const p = Number(page);
  const l = Number(limit);
  return {
    page: Number.isInteger(p) && p > 0 && p <= 100_000 ? p : 1,
    limit: Number.isInteger(l) && l > 0 ? Math.min(l, MAX_PAGE_SIZE) : defaultLimit,
  };
}
