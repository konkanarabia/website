import 'server-only';

import { headers } from 'next/headers';
import { clientIpFromHeaders, rateLimit } from '@/lib/rate-limit';

/** Max characters of visitor text sent to Gemini from public features. */
export const PUBLIC_AI_INPUT_LIMIT = 500;

/** Trims and caps visitor input before it goes into a model prompt. */
export function capInput(value: unknown, max: number = PUBLIC_AI_INPUT_LIMIT): string {
  if (typeof value !== 'string') return '';
  const t = value.trim();
  return t.length > max ? t.slice(0, max) : t;
}

/**
 * Per-IP limit for public server actions that call Gemini, so one client
 * can't drain the shared quota (which would also switch off spam filtering).
 */
export async function allowPublicAiCall(feature: string, limit: number, windowMs: number): Promise<boolean> {
  const ip = clientIpFromHeaders(await headers());
  return rateLimit(`ai:${feature}:${ip}`, limit, windowMs).allowed;
}
