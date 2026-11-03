import 'server-only';

import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import AdminSession from '@/lib/models/AdminSession';
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createSessionToken,
  getAdminAuthConfig,
  hashSessionId,
  newSessionId,
  verifySessionToken,
} from '@/lib/session-token';

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

/**
 * Throws UnauthorizedError unless the request carries a valid, unexpired,
 * unrevoked admin session. Call it first in every admin server action:
 * server actions are reachable by direct POST, so proxy.ts alone isn't enough.
 */
export async function requireAdmin(): Promise<void> {
  const config = getAdminAuthConfig();
  if (!config) throw new UnauthorizedError();

  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const verified = verifySessionToken(token, config.secret);
  if (!verified) throw new UnauthorizedError();

  await dbConnect();
  const session = await AdminSession.findOne({ sidHash: hashSessionId(verified.sid) }).lean<{
    expiresAt: Date;
  }>();
  if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
    throw new UnauthorizedError();
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}

/** Creates a server-side session and sets the cookie. */
export async function startAdminSession(): Promise<void> {
  const config = getAdminAuthConfig();
  if (!config) throw new UnauthorizedError();

  const sid = newSessionId();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  await dbConnect();
  await AdminSession.create({ sidHash: hashSessionId(sid), expiresAt: new Date(expiresAt) });

  (await cookies()).set(SESSION_COOKIE, createSessionToken(sid, expiresAt, config.secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}

/** Revokes the current session server-side and clears the cookie. */
export async function endAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const config = getAdminAuthConfig();
  if (token && config) {
    const verified = verifySessionToken(token, config.secret, 0);
    if (verified) {
      try {
        await dbConnect();
        await AdminSession.deleteOne({ sidHash: hashSessionId(verified.sid) });
      } catch (e) {
        console.error('Failed to revoke admin session:', e);
      }
    }
  }
  cookieStore.delete(SESSION_COOKIE);
  // Old static-token cookie from before this change.
  cookieStore.delete('admin_token');
}
