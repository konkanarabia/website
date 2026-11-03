import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const h = vi.hoisted(() => {
  const cookieJar = new Map<string, string>();
  const setCookie = vi.fn((name: string, value: string) => cookieJar.set(name, value));
  const deleteCookie = vi.fn((name: string) => cookieJar.delete(name));
  return {
    cookieJar,
    setCookie,
    deleteCookie,
    requestHeaders: new Headers(),
    dbAllowed: { value: false },
    dbConnect: vi.fn(),
    sessionFindOne: vi.fn(),
    sessionCreate: vi.fn(),
    sessionDeleteOne: vi.fn(),
    attemptCounts: new Map<string, number>(),
  };
});

vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => (h.cookieJar.has(name) ? { name, value: h.cookieJar.get(name) } : undefined),
    set: h.setCookie,
    delete: h.deleteCookie,
  }),
  headers: async () => h.requestHeaders,
}));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));
vi.mock('next/navigation', () => ({ redirect: vi.fn(), notFound: vi.fn() }));
vi.mock('@/lib/mongodb', () => ({
  default: (...args: unknown[]) => {
    h.dbConnect(...args);
    if (!h.dbAllowed.value) throw new Error('DB reached before the auth check');
    return Promise.resolve({});
  },
}));
vi.mock('@/lib/models/AdminSession', () => ({
  default: {
    findOne: (...args: unknown[]) => ({ lean: () => h.sessionFindOne(...args) }),
    create: h.sessionCreate,
    deleteOne: h.sessionDeleteOne,
  },
}));
vi.mock('@/lib/models/LoginAttempt', () => ({
  default: {
    findOneAndUpdate: (filter: { key: string }) => ({
      lean: async () => {
        const count = (h.attemptCounts.get(filter.key) ?? 0) + 1;
        h.attemptCounts.set(filter.key, count);
        return { count };
      },
    }),
  },
}));
vi.mock('@/lib/email', () => ({ sendEmail: vi.fn() }));
vi.mock('@/lib/gemini-generate', () => ({
  geminiGenerateText: vi.fn(async () => ({ ok: false, error: 'disabled in tests' })),
  getGeminiClient: () => null,
}));
vi.mock('cloudinary', () => ({
  v2: { config: vi.fn(), uploader: { upload: vi.fn(), upload_stream: vi.fn() } },
}));

import { requireAdmin } from '@/lib/auth';
import { createSessionToken, hashSessionId, SESSION_COOKIE, SESSION_TTL_MS } from '@/lib/session-token';
import { resetRateLimits } from '@/lib/rate-limit';

const SECRET = 'unit-test-secret-0123456789abcdef';

/**
 * Exports that are meant to be callable by anonymous visitors. Every other
 * export of app/actions/* must reject without an admin session, so a new
 * admin action that forgets requireAdmin() fails this test.
 */
const PUBLIC_ACTIONS = new Set([
  'login',
  'logout',
  'getDestinations',
  'getPaginatedDestinations',
  'getEvents',
  'getPaginatedEvents',
  'getHospitality',
  'getPaginatedHospitality',
  'getRestaurants',
  'getPaginatedRestaurants',
  'getVehicles',
  'getPaginatedVehicles',
  'getVisas',
  'getPaginatedVisas',
  'submitReview',
  'getReviewSummary',
  'getReviews',
  'translateTextAction',
  'getTravelAdvice',
  'getTravelWeatherAndPacking',
]);

type AnyFn = (...args: unknown[]) => Promise<unknown>;
const actionModules = import.meta.glob('../app/actions/*.ts');
let adminActions: Array<[string, AnyFn]> = [];

beforeAll(async () => {
  for (const [file, load] of Object.entries(actionModules)) {
    const mod = (await load()) as Record<string, unknown>;
    for (const [name, value] of Object.entries(mod)) {
      if (typeof value !== 'function' || PUBLIC_ACTIONS.has(name)) continue;
      adminActions.push([`${file.replace('../app/actions/', '')}#${name}`, value as AnyFn]);
    }
  }
  adminActions = adminActions.sort(([a], [b]) => a.localeCompare(b));
}, 180_000); // importing every action module (mongoose, cloudinary, genai) is slow on cold start

function validToken(sid = 'session-id-1', expiresAt = Date.now() + SESSION_TTL_MS) {
  return createSessionToken(sid, expiresAt, SECRET);
}

function dummyArgs(): unknown[] {
  const fd = new FormData();
  fd.set('payload', JSON.stringify({ name: 'x', details: '<p>x</p>' }));
  return ['1', fd, { to: 'a@example.com', subject: 's', body: 'b' }];
}

beforeEach(() => {
  process.env.ADMIN_PASSWORD = 'test';
  process.env.ADMIN_TOKEN_SECRET = SECRET;
  h.cookieJar.clear();
  h.dbAllowed.value = false;
  h.dbConnect.mockClear();
  h.sessionFindOne.mockReset();
  h.sessionCreate.mockReset();
  h.sessionDeleteOne.mockReset();
  h.setCookie.mockClear();
  h.attemptCounts.clear();
  resetRateLimits();
});

describe('admin server actions', () => {
  it('finds the admin actions to check', () => {
    const names = adminActions.map(([n]) => n);
    expect(names.length).toBeGreaterThanOrEqual(35);
    for (const expected of [
      'destinations.ts#addDestination',
      'enquiries.ts#exportEnquiriesCsv',
      'enquiries.ts#purgeSpamEnquiries',
      'reviews.ts#deleteReview',
      'translate.ts#clearTranslationCache',
      'gemini.ts#generateDestinationData',
      'admin-email.ts#sendAdminLeadEmail',
      'analytics.ts#getAnalytics',
    ]) {
      expect(names).toContain(expected);
    }
  });

  it('every admin action rejects without a session cookie, before touching the DB', async () => {
    for (const [name, fn] of adminActions) {
      await expect(fn(...dummyArgs()), name).rejects.toThrow('Unauthorized');
    }
    expect(h.dbConnect).not.toHaveBeenCalled();
  });

  it('every admin action rejects a forged token', async () => {
    h.cookieJar.set(SESSION_COOKIE, createSessionToken('sid', Date.now() + 60_000, 'some-other-secret'));
    for (const [name, fn] of adminActions) {
      await expect(fn(...dummyArgs()), name).rejects.toThrow('Unauthorized');
    }
    expect(h.dbConnect).not.toHaveBeenCalled();
  });

  it('every admin action rejects the old static admin_token cookie', async () => {
    h.cookieJar.set('admin_token', SECRET);
    for (const [name, fn] of adminActions) {
      await expect(fn(...dummyArgs()), name).rejects.toThrow('Unauthorized');
    }
  });
});

describe('requireAdmin', () => {
  it('accepts a signed, unexpired session that exists server-side', async () => {
    h.dbAllowed.value = true;
    h.cookieJar.set(SESSION_COOKIE, validToken('abc'));
    h.sessionFindOne.mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
    await expect(requireAdmin()).resolves.toBeUndefined();
    expect(h.sessionFindOne).toHaveBeenCalledWith({ sidHash: hashSessionId('abc') });
  });

  it('rejects a revoked session (logged out)', async () => {
    h.dbAllowed.value = true;
    h.cookieJar.set(SESSION_COOKIE, validToken('abc'));
    h.sessionFindOne.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toThrow('Unauthorized');
  });

  it('rejects an expired token', async () => {
    h.dbAllowed.value = true;
    h.cookieJar.set(SESSION_COOKIE, validToken('abc', Date.now() - 1000));
    h.sessionFindOne.mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
    await expect(requireAdmin()).rejects.toThrow('Unauthorized');
    expect(h.sessionFindOne).not.toHaveBeenCalled();
  });

  it('rejects everything when ADMIN_TOKEN_SECRET is missing', async () => {
    h.cookieJar.set(SESSION_COOKIE, validToken());
    delete process.env.ADMIN_TOKEN_SECRET;
    await expect(requireAdmin()).rejects.toThrow('Unauthorized');
  });

  it('a valid session lets an admin action through to the DB', async () => {
    h.dbAllowed.value = true;
    h.cookieJar.set(SESSION_COOKIE, validToken());
    h.sessionFindOne.mockResolvedValue({ expiresAt: new Date(Date.now() + 60_000) });
    const { updateEnquiryStatus } = await import('@/app/actions/enquiries');
    // Invalid status is refused after auth, without any DB write.
    await expect(updateEnquiryStatus('id', 'Hacked')).resolves.toEqual({ success: false, error: 'Invalid status' });
  });
});

describe('login', () => {
  it('refuses to log in when ADMIN_PASSWORD or ADMIN_TOKEN_SECRET is missing', async () => {
    const { login } = await import('@/app/actions/auth');
    delete process.env.ADMIN_PASSWORD;
    const r1 = await login('');
    expect(r1.success).toBe(false);
    process.env.ADMIN_PASSWORD = 'test';
    delete process.env.ADMIN_TOKEN_SECRET;
    const r2 = await login('test');
    expect(r2.success).toBe(false);
    expect(h.sessionCreate).not.toHaveBeenCalled();
  });

  it('rejects a wrong password and sets no cookie', async () => {
    const { login } = await import('@/app/actions/auth');
    const r = await login('wrong');
    expect(r).toEqual({ success: false, error: 'Invalid password' });
    expect(h.setCookie).not.toHaveBeenCalled();
  });

  it('issues a strict, httpOnly, server-side session on the right password', async () => {
    h.dbAllowed.value = true;
    const { login } = await import('@/app/actions/auth');
    const r = await login('test');
    expect(r).toEqual({ success: true });
    expect(h.sessionCreate).toHaveBeenCalledTimes(1);
    const [name, value, opts] = h.setCookie.mock.calls[0] as unknown as [string, string, Record<string, unknown>];
    expect(name).toBe(SESSION_COOKIE);
    expect(value).not.toContain(SECRET);
    expect(value.split('.')).toHaveLength(3);
    expect(opts).toMatchObject({ httpOnly: true, sameSite: 'strict', path: '/' });
    const created = h.sessionCreate.mock.calls[0][0] as { sidHash: string };
    expect(created.sidHash).toBe(hashSessionId(value.split('.')[0]));
  });

  it('rate-limits repeated attempts from one IP', async () => {
    const { login } = await import('@/app/actions/auth');
    h.requestHeaders.set('x-nf-client-connection-ip', '203.0.113.9');
    for (let i = 0; i < 5; i++) await login('wrong');
    const r = await login('test');
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/Too many attempts/);
    h.requestHeaders.delete('x-nf-client-connection-ip');
  });

  it('shares the limit across server instances through the database', async () => {
    h.dbAllowed.value = true;
    const { login } = await import('@/app/actions/auth');
    h.requestHeaders.set('x-nf-client-connection-ip', '203.0.113.10');
    // 10 earlier attempts recorded by other instances; this instance's own
    // in-memory counter is still empty.
    const windowStart = Math.floor(Date.now() / (15 * 60 * 1000)) * 15 * 60 * 1000;
    h.attemptCounts.set(`ip:203.0.113.10:${windowStart}`, 10);
    const r = await login('test');
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/Too many attempts/);
    expect(h.sessionCreate).not.toHaveBeenCalled();
    h.requestHeaders.delete('x-nf-client-connection-ip');
  });

  it('caps attempts from all IPs together', async () => {
    h.dbAllowed.value = true;
    const { login } = await import('@/app/actions/auth');
    const windowStart = Math.floor(Date.now() / (15 * 60 * 1000)) * 15 * 60 * 1000;
    h.attemptCounts.set(`all:${windowStart}`, 100);
    h.requestHeaders.set('x-nf-client-connection-ip', '198.51.100.77');
    const r = await login('test');
    expect(r.success).toBe(false);
    expect(h.sessionCreate).not.toHaveBeenCalled();
    h.requestHeaders.delete('x-nf-client-connection-ip');
  });

  it('logout deletes the server-side session', async () => {
    h.dbAllowed.value = true;
    h.cookieJar.set(SESSION_COOKIE, validToken('to-revoke'));
    const { logout } = await import('@/app/actions/auth');
    await logout();
    expect(h.sessionDeleteOne).toHaveBeenCalledWith({ sidHash: hashSessionId('to-revoke') });
    expect(h.cookieJar.has(SESSION_COOKIE)).toBe(false);
  });
});
