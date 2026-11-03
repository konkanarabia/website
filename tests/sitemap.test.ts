import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import sitemap from '@/app/sitemap';

const BASE = 'https://konkanarabiahospitalitygroup.com';

describe('sitemap', () => {
  const saved = process.env.MONGO_URI;

  beforeEach(() => {
    // No database: the sitemap must still list every static route.
    delete process.env.MONGO_URI;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    if (saved === undefined) delete process.env.MONGO_URI;
    else process.env.MONGO_URI = saved;
    vi.restoreAllMocks();
  });

  it('lists the public static routes', async () => {
    const urls = (await sitemap()).map((e) => e.url);
    for (const route of [
      '',
      '/about',
      '/contact',
      '/destinations',
      '/events',
      '/vehicles',
      '/visas',
      '/hospitality',
      '/restaurants',
      '/franchise',
      '/pednecar',
    ]) {
      expect(urls).toContain(`${BASE}${route}`);
    }
  });

  it('leaves out admin, api, thank-you, dynamic and removed routes', async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.some((u) => u.includes('/admin'))).toBe(false);
    expect(urls.some((u) => u.includes('/api'))).toBe(false);
    expect(urls).not.toContain(`${BASE}/thank-you`);
    expect(urls).not.toContain(`${BASE}/hotels`);
    expect(urls.some((u) => u.includes('['))).toBe(false);
  });

  it('has no duplicate URLs and gives the homepage top priority', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(entries.find((e) => e.url === BASE)?.priority).toBe(1);
  });
});
