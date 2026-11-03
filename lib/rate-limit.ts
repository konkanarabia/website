/**
 * Small fixed-window rate limiter.
 *
 * NOTE: state lives in memory, so on Netlify each function instance has its
 * own counters and they reset on cold start. That still blunts bursts from a
 * single client, but a shared store (Netlify Blobs or Upstash Redis) is needed
 * for a hard global limit.
 */

type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export type RateLimitResult = { allowed: boolean; retryAfterMs: number };

export function rateLimit(key: string, limit: number, windowMs: number, now: number = Date.now()): RateLimitResult {
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) {
      if (now > b.reset) buckets.delete(k);
    }
    if (buckets.size > MAX_KEYS) buckets.clear();
  }
  const entry = buckets.get(key);
  if (!entry || now > entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }
  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: entry.reset - now };
  }
  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

/** Test helper. */
export function resetRateLimits(): void {
  buckets.clear();
}

/**
 * Client IP for rate limiting. Netlify sets x-nf-client-connection-ip to the
 * real connecting address (clients can't spoof it), so prefer it. The other
 * headers are fallbacks for local dev and other hosts.
 */
export function clientIpFromHeaders(h: Pick<Headers, 'get'>): string {
  const nf = h.get('x-nf-client-connection-ip')?.trim();
  if (nf) return nf;
  const real = h.get('x-real-ip')?.trim();
  if (real) return real;
  const xf = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (xf) return xf;
  return 'unknown';
}
