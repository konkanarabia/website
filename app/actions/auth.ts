'use server'

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { endAdminSession, startAdminSession } from '@/lib/auth';
import { getAdminAuthConfig, safeEqual } from '@/lib/session-token';
import { clientIpFromHeaders, rateLimit } from '@/lib/rate-limit';

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function login(password: string) {
  const config = getAdminAuthConfig();
  if (!config) {
    console.error('Admin login disabled: ADMIN_PASSWORD and ADMIN_TOKEN_SECRET must both be set.');
    return { success: false, error: 'Admin login is not configured on this server.' };
  }

  const ip = clientIpFromHeaders(await headers());
  const limit = rateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60000));
    return { success: false, error: `Too many attempts. Try again in ${minutes} minute(s).` };
  }

  if (typeof password !== 'string' || password.length > 256 || !safeEqual(password, config.password)) {
    return { success: false, error: 'Invalid password' };
  }

  await startAdminSession();
  return { success: true };
}

export async function logout() {
  await endAdminSession();
  redirect('/admin/login');
}
