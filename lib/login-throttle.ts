import 'server-only';

import dbConnect from '@/lib/mongodb';
import LoginAttempt from '@/lib/models/LoginAttempt';

export const LOGIN_WINDOW_MS = 15 * 60 * 1000;
/** Attempts per IP per window, counted across all server instances. */
export const LOGIN_PER_IP_LIMIT = 10;
/**
 * Attempts from all IPs together per window. Stops a brute force spread over
 * many addresses; the cost is that such an attack can also lock the real
 * admin out until the window ends.
 */
export const LOGIN_GLOBAL_LIMIT = 100;

async function bump(key: string, windowStart: number): Promise<number> {
  const filter = { key };
  const update = {
    $inc: { count: 1 },
    $setOnInsert: { expiresAt: new Date(windowStart + LOGIN_WINDOW_MS) },
  };
  const opts = { upsert: true, returnDocument: 'after' as const };
  try {
    const doc = await LoginAttempt.findOneAndUpdate(filter, update, opts).lean<{ count: number }>();
    return doc?.count ?? 1;
  } catch (e) {
    // Two concurrent first attempts can race on the unique key; retry once.
    if ((e as { code?: number })?.code === 11000) {
      const doc = await LoginAttempt.findOneAndUpdate(filter, update, opts).lean<{ count: number }>();
      return doc?.count ?? 1;
    }
    throw e;
  }
}

/**
 * Counts this login attempt in MongoDB and returns false once the per-IP or
 * global limit for the current window is exceeded. If the database can't be
 * reached it returns true: the in-memory limiter still applies, and a login
 * can't succeed without the database anyway.
 */
export async function allowLoginAttempt(ip: string, now: number = Date.now()): Promise<boolean> {
  const windowStart = Math.floor(now / LOGIN_WINDOW_MS) * LOGIN_WINDOW_MS;
  try {
    await dbConnect();
    const [ipCount, globalCount] = await Promise.all([
      bump(`ip:${ip}:${windowStart}`, windowStart),
      bump(`all:${windowStart}`, windowStart),
    ]);
    return ipCount <= LOGIN_PER_IP_LIMIT && globalCount <= LOGIN_GLOBAL_LIMIT;
  } catch (e) {
    console.error('Login throttle unavailable, using in-memory limit only:', e);
    return true;
  }
}
