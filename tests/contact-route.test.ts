import { beforeEach, describe, expect, it, vi } from 'vitest';

const h = vi.hoisted(() => {
  const order: string[] = [];
  const saved: Record<string, unknown>[] = [];
  const updates: unknown[][] = [];
  class FakeEnquiry {
    _id = 'lead-1';
    constructor(public doc: Record<string, unknown>) {}
    async save() {
      order.push('save');
      saved.push(this.doc);
    }
    static async findByIdAndUpdate(...args: unknown[]) {
      order.push('update');
      updates.push(args);
    }
  }
  return { order, saved, updates, FakeEnquiry, analyze: vi.fn(), sendEmail: vi.fn() };
});

vi.mock('@/lib/mongodb', () => ({ default: async () => ({}) }));
vi.mock('@/lib/models/Enquiry', () => ({ default: h.FakeEnquiry }));
vi.mock('@/lib/email', () => ({ sendEmail: h.sendEmail }));
vi.mock('@/lib/ai-spam-agent', () => ({
  analyzeSpamWithAi: (...args: unknown[]) => {
    h.order.push('classify');
    return h.analyze(...args);
  },
}));

import { POST } from '@/app/api/contact/route';

function req(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-nf-client-connection-ip': `192.0.2.${Math.floor(Math.random() * 200)}` },
    body: JSON.stringify(body),
  });
}

const VALID = {
  name: 'Priya Sharma',
  email: 'priya.sharma@gmail.com',
  phone: '+919820012345',
  message: 'Hello, we would like a quote for a family trip to Goa in December for four people.',
  _form_loaded_at: Date.now() - 10_000,
};

beforeEach(() => {
  h.order.length = 0;
  h.saved.length = 0;
  h.updates.length = 0;
  h.analyze.mockReset();
  h.sendEmail.mockReset();
});

describe('POST /api/contact', () => {
  it('saves the lead before classifying it', async () => {
    h.analyze.mockResolvedValue({ isSpam: false, confidence: 0, category: 'legitimate', reason: 'ok' });
    const res = await POST(req(VALID));
    expect(res.status).toBe(200);
    expect(h.order.slice(0, 2)).toEqual(['save', 'classify']);
    expect(h.sendEmail).toHaveBeenCalled();
  });

  it('tags the saved lead as spam and sends no email when the model flags it', async () => {
    h.analyze.mockResolvedValue({ isSpam: true, confidence: 0.9, category: 'phishing', reason: 'phish' });
    const res = await POST(req(VALID));
    expect(res.status).toBe(200);
    expect(h.order).toEqual(['save', 'classify', 'update']);
    expect(h.updates[0][1]).toMatchObject({ status: 'Spam', isSpam: true, spamCategory: 'phishing' });
    expect(h.sendEmail).not.toHaveBeenCalled();
  });

  it('builds the record from validated fields only', async () => {
    h.analyze.mockResolvedValue({ isSpam: false, confidence: 0, category: 'legitimate', reason: 'ok' });
    await POST(req({ ...VALID, status: 'Booked', isSpam: false, createdAt: '2001-01-01', spamScore: -1 }));
    expect(h.saved[0]).toMatchObject({ status: 'New', isSpam: false });
    expect(h.saved[0]).not.toHaveProperty('createdAt');
    expect(h.saved[0]).not.toHaveProperty('spamScore');
  });

  it('returns a generic 500 without internal details', async () => {
    const bad = new Request('http://localhost/api/contact', { method: 'POST', body: '{not json' });
    const res = await POST(bad);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(JSON.stringify(json)).not.toMatch(/JSON|position|Unexpected/i);
  });
});
