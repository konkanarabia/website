import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const bucket = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 40;

function allow(ip: string): boolean {
  const now = Date.now();
  if (bucket.size > 3000) {
    for (const [key, entry] of bucket) {
      if (now > entry.reset) bucket.delete(key);
    }
  }
  const entry = bucket.get(ip);
  if (!entry || now > entry.reset) {
    bucket.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path !== '/api/contact' && path !== '/api/enquiry') {
    return NextResponse.next();
  }
  const xf = request.headers.get('x-forwarded-for');
  const ip = xf?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (!allow(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact', '/api/enquiry'],
};
