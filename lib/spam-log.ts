/**
 * Helpers for storing rejected (spam) submissions. The body is unvalidated
 * client input, so every field is coerced to a string and truncated before it
 * reaches the database.
 */

export const SPAM_LOG_LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  short: 200,
  message: 2000,
  reason: 300,
} as const;

export function clipField(value: unknown, max: number): string | undefined {
  if (value === undefined || value === null) return undefined;
  const s = typeof value === 'string' ? value : typeof value === 'number' || typeof value === 'boolean' ? String(value) : '';
  const trimmed = s.trim();
  if (!trimmed) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

export function spamLogFields(body: unknown): {
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  travelType?: string;
  destination?: string;
  message?: string;
  company?: string;
  country?: string;
  format?: string;
} {
  const b = body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : {};
  return {
    name: clipField(b.name ?? b.fname, SPAM_LOG_LIMITS.name) || 'Anonymous',
    email: clipField(b.email, SPAM_LOG_LIMITS.email) || 'unknown@example.com',
    phone: clipField(b.phone, SPAM_LOG_LIMITS.phone),
    preferredContact: clipField(b.preferredContact, 20),
    travelType: clipField(b.travelType, SPAM_LOG_LIMITS.short),
    destination: clipField(b.destination, SPAM_LOG_LIMITS.short),
    message: clipField(b.message, SPAM_LOG_LIMITS.message),
    company: clipField(b.company, SPAM_LOG_LIMITS.short),
    country: clipField(b.country, SPAM_LOG_LIMITS.short),
    format: clipField(b.format, 60),
  };
}

export function clipReason(reason: unknown): string | undefined {
  return clipField(reason, SPAM_LOG_LIMITS.reason);
}

/** Generic 500 body: never echo internal error messages to the client. */
export const GENERIC_SERVER_ERROR = { error: 'Something went wrong. Please try again later.' } as const;
