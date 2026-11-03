/**
 * Admin session token helpers. Pure functions (no Next.js imports) so they can
 * be used from proxy.ts, server actions and unit tests.
 *
 * Token format: `<sid>.<expiresAtMs>.<hmac>` where hmac is
 * HMAC-SHA256(ADMIN_TOKEN_SECRET, "<sid>.<expiresAtMs>") in base64url.
 * The sid is also stored server-side (hashed), so logout can revoke it.
 */
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'admin_session';
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export type AdminAuthConfig = { password: string; secret: string };

/**
 * Returns the admin auth config, or null when ADMIN_PASSWORD or
 * ADMIN_TOKEN_SECRET is missing. There is deliberately no fallback value:
 * without both variables nobody can log in.
 */
export function getAdminAuthConfig(env: NodeJS.ProcessEnv = process.env): AdminAuthConfig | null {
  const password = env.ADMIN_PASSWORD;
  const secret = env.ADMIN_TOKEN_SECRET;
  if (!password || !secret) return null;
  return { password, secret };
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

/** Constant-time string comparison that does not leak length via early exit. */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a, 'utf8').digest();
  const hb = createHash('sha256').update(b, 'utf8').digest();
  return timingSafeEqual(ha, hb) && a.length === b.length;
}

export function newSessionId(): string {
  return randomBytes(32).toString('base64url');
}

/** Hash used as the server-side lookup key, so a DB leak doesn't expose live tokens. */
export function hashSessionId(sid: string): string {
  return createHash('sha256').update(sid).digest('hex');
}

export function createSessionToken(sid: string, expiresAt: number, secret: string): string {
  const payload = `${sid}.${expiresAt}`;
  return `${payload}.${sign(payload, secret)}`;
}

export type VerifiedToken = { sid: string; expiresAt: number };

/** Checks signature and expiry. Does not check server-side revocation. */
export function verifySessionToken(
  token: string | undefined | null,
  secret: string,
  now: number = Date.now(),
): VerifiedToken | null {
  if (!token || typeof token !== 'string' || token.length > 512) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [sid, expRaw, sig] = parts;
  if (!sid || !expRaw || !sig || !/^\d{1,16}$/.test(expRaw)) return null;
  const expected = sign(`${sid}.${expRaw}`, secret);
  if (!safeEqual(sig, expected)) return null;
  const expiresAt = Number(expRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return null;
  return { sid, expiresAt };
}
