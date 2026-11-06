# System Architecture

This document describes the architectural principles, component structure, security boundaries, and data flow of `tours-travel-website`.

---

## 1. High-Level Architecture

The platform is built on **Next.js 16 App Router** and **React 19**, combining Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and Next.js Server Actions for secure backend execution.

```
                    Internet / Browser
                           │
                           ▼
                  [ proxy.ts (Edge Proxy) ]
                  ├─ Rate Limiting (Forms & Auth)
                  └─ HMAC Admin Session Guard
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
    [ Server Pages ]              [ Server Actions & API ]
    ├─ ISR (300s revalidation)    ├─ requireAdmin() DB check
    ├─ Dynamic Metadata & JSON-LD ├─ Zod Validation & Sanitization
    └─ Server Components Data Fetch├─ AI Spam Classification
           │                      └─ Resend Email Dispatch
           ▼                               │
    [ Client Motion Layer ]                ▼
    ├─ Framer Motion 12            [ Database & External APIs ]
    ├─ layoutId Pill Indicators    ├─ MongoDB / Mongoose
    └─ I18nProvider Context        ├─ Google Gemini 2.0 API
                                   ├─ Resend Email API
                                   └─ Cloudinary Media CDN
```

---

## 2. Server vs. Client Component Boundaries

To maximize performance and SEO while delivering rich interactions, the application cleanly divides responsibilities between React Server Components (RSC) and Client Components:

1. **Server Components (Default):**
   - Page roots (`app/page.tsx`, `app/destinations/page.tsx`, `app/pednecar/page.tsx`).
   - Direct database access through Mongoose without exposing credentials or internal schemas to the browser.
   - Generation of OpenGraph metadata and JSON-LD structured schemas.
2. **Client Component Wrappers:**
   - Isolated in `app/components/*-client.tsx` or marked with `'use client'`.
   - Handle Framer Motion animations (`stagger`, `fadeUp`, `inView`), tab switching (`layoutId="skills-tab-pill"`), interactive sliders, and dialog modals.
   - Pure UI consumers that receive serialized data props from Server Components.

---

## 3. Security Boundary & Request Pipeline

Security is enforced in depth at multiple layers:

### A. Edge Proxy (`proxy.ts`)
- **Login Throttling:** Restricts `/admin/login` POST attempts to 20 requests per 15-minute sliding window per client IP.
- **Form Submission Rate Limiting:** Enforces a maximum of 10 requests per 15-minute window on public submission endpoints (`/api/contact`, `/api/enquiry`, `/api/franchise-enquiry`).
- **Session Cookie Pre-Validation:** Rejects unauthenticated visits to `/admin/*` before executing route handlers.

### B. Constant-Time Authentication & HMAC Sessions
- `lib/auth.ts` validates administrative passwords using `crypto.timingSafeEqual` to eliminate side-channel timing attacks.
- Session tokens are signed using HMAC-SHA256 (`ADMIN_TOKEN_SECRET`) with a 12-hour expiration.
- Every administrative action calls `requireAdmin()`, which cross-references the session token against active entries in the `AdminSession` MongoDB collection, ensuring immediate revocation upon logout.

### C. Input Sanitization & Type Safety
- All form inputs pass through strict Zod schemas (`lib/validations.ts`) ensuring regex conformity for international phone numbers, email formats, and dates.
- String fields are sanitized via `sanitize-html` to neutralize XSS payloads prior to persistence.

---

## 4. Intelligent Spam Protection Pipeline

Public contact and tour booking forms are defended by a two-stage hybrid anti-spam engine:

```
 Incoming Submission
         │
         ▼
[ Stage 1: Deterministic Heuristic Engine (lib/antispam.ts) ]
 ├─ Honeypot field inspection
 ├─ Submission velocity check
 ├─ Disposable email domain blocklist
 ├─ URL / hyperlinked count limits
 └─ Character entropy & gibberish scoring
         │
         ├─ [Clear Spam] ──────► Quarantine (SpamLog) & Reject
         ├─ [Clear Ham] ───────► Process Booking & Send Email
         │
         ▼
[ Stage 2: Autonomous AI Spam Agent (lib/ai-spam-agent.ts) ]
 ├─ Triggered on borderline / suspicious scores
 ├─ Google Gemini 2.0 evaluation with structured prompt
 └─ Automatic fallback across configured model chain
         │
         ├─ [AI Verdict: SPAM] ──► Quarantine (SpamLog)
         └─ [AI Verdict: HAM] ───► Proceed to Fulfillment
```

---

## 5. Motion System Architecture

Defined centrally in [`lib/motion.ts`](file:///c:/Users/manth/tours-travel-website/lib/motion.ts):

- **Shared Motion Curves:** A standardized cubic bezier `ease` curve `[0.22, 1, 0.36, 1]` governs all entrances.
- **Spring Dynamics:** High-rigidity spring (`stiffness: 380, damping: 30`) for interactive clicks; soft spring (`stiffness: 160, damping: 22`) for ambient floats.
- **Shared Layout Pill Transitions:** Using Framer Motion's `layoutId`, active pills glide between navigation targets without rerendering or layout jumping.
- **Accessibility Safeguard:** Respects `prefers-reduced-motion` at the component level (`useReducedMotion()`) and in `app/globals.css`, immediately neutralizing animation overhead for motion-sensitive users.

---

## 6. Internationalization & Multi-Currency

- Managed through `I18nProvider` wrapped around the root layout in `app/layout.tsx`.
- Supports real-time conversion across INR, AED, USD, EUR, and GBP with offline fallback rates.
- Formats dates, numbers, and currencies according to the active locale without hydration mismatch.

---

## 7. Testing Strategy

- Tests reside in `tests/` and execute via Vitest 3.
- Test suites validate:
  - Password comparison and timing safety (`admin-auth.test.ts`)
  - Form validation schemas (`validations.test.ts`)
  - HTML sanitization against XSS payloads (`sanitize.test.ts`)
  - AI spam classification heuristics (`spam-agent.test.ts`)
  - Dynamic XML sitemap generation (`sitemap.test.ts`)
  - Pagination utilities (`pagination.test.ts`)
