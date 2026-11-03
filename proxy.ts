import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, getAdminAuthConfig, verifySessionToken } from '@/lib/session-token';
import { clientIpFromHeaders, rateLimit } from '@/lib/rate-limit';

// In-memory limits reset per serverless instance; see lib/rate-limit.ts.
const FORM_WINDOW_MS = 15 * 60 * 1000;
const FORM_MAX_REQUESTS = 10;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_POSTS = 20;

const FORM_PATHS = new Set(['/api/contact', '/api/enquiry', '/api/franchise-enquiry']);

/**
 * First line of defence only. Every admin server action also calls
 * requireAdmin() (lib/auth.ts), which additionally checks the session is
 * still live in the database.
 */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const ip = clientIpFromHeaders(request.headers);

  if (path.startsWith('/admin')) {
    if (path === '/admin/login') {
      // The login server action posts to this page.
      if (request.method === 'POST' && !rateLimit(`login-page:${ip}`, LOGIN_MAX_POSTS, LOGIN_WINDOW_MS).allowed) {
        return new NextResponse('Too many login attempts. Please wait and try again.', { status: 429 });
      }
      return NextResponse.next();
    }
    const config = getAdminAuthConfig();
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!config || !verifySessionToken(token, config.secret)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  if (!FORM_PATHS.has(path)) {
    return NextResponse.next();
  }
  if (!rateLimit(`form:${ip}`, FORM_MAX_REQUESTS, FORM_WINDOW_MS).allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait before submitting again.' }, { status: 429 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact', '/api/enquiry', '/api/franchise-enquiry', '/admin/:path*'],
};
