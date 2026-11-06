# Deployment Guide

This guide covers building, configuring, and deploying `tours-travel-website` to production.

---

## 1. Hosting Platforms

The platform is designed for **Netlify** using the official `@netlify/plugin-nextjs` runtime, but can also run on any Node.js container or serverless provider supporting Next.js 16 App Router.

---

## 2. Environment Variables

Configure the following environment variables in your hosting provider's dashboard:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `MONGO_URI` | **Yes (Prod)** | MongoDB connection URI (e.g. MongoDB Atlas cluster). *Optional for CI builds.* |
| `ADMIN_PASSWORD` | **Yes** | Strong secret string used for `/admin` login. |
| `ADMIN_TOKEN_SECRET` | **Yes** | 32+ character random string for HMAC-SHA256 session signing. |
| `GEMINI_API_KEY` | Optional | Google Gemini API key for Aura AI assistant & automated spam detection. |
| `RESEND_API_KEY` | Optional | Resend API key for transactional emails and enquiry notifications. |
| `EMAIL_FROM` | Optional | Sender address (must be on a verified domain in Resend). |
| `EMAIL_TO` | Optional | Primary recipient email for booking leads and enquiries. |
| `CLOUDINARY_CLOUD_NAME` | Optional | Cloudinary cloud identifier for destination photo uploads. |
| `CLOUDINARY_API_KEY` | Optional | Cloudinary API access key. |
| `CLOUDINARY_API_SECRET` | Optional | Cloudinary API secret. |
| `NEXT_PUBLIC_LOGO_DEV_TOKEN` | Optional | Logo.dev token for partner brand emblems. |

> [!TIP]
> Generate a cryptographically secure `ADMIN_TOKEN_SECRET` using Node.js:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
> ```

---

## 3. Netlify Deployment

1. **Connect Repository:** Link the GitHub repository (`https://github.com/konkanarabia/website.git`) in Netlify.
2. **Build Settings:**
   - **Base directory:** Leave empty (root)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
3. **Netlify Plugin:**
   - The project includes `@netlify/plugin-nextjs` in `package.json`, which automatically configures edge functions, SSR rendering, and Server Actions.
4. **Environment Variables:**
   - Paste the production variables from the table above into Netlify's *Site configuration > Environment variables*.

---

## 4. Local Build & Pre-Flight Verification

Before pushing to production, verify all stages locally:

```bash
# 1. Strict TypeScript typecheck
npm run typecheck

# 2. Linting
npm run lint

# 3. Unit & integration tests
npm test

# 4. Production build compilation
npm run build
```

---

## 5. Continuous Integration (CI)

The repository uses GitHub Actions (`.github/workflows/ci.yml`) to automatically test every commit on `master` and every pull request:
1. `npx tsc --noEmit` — Type validation.
2. `npm run lint` — Code quality checks.
3. `npm test` — 88 Vitest tests.
4. `npm run build` — Prerendering with isolated placeholder secrets.
5. `npm audit --omit=dev --audit-level=high` — Dependency vulnerability scan.

---

## 6. Post-Deployment Checklist

- [ ] Confirm the custom domain resolves to `https://konkanarabiahospitalitygroup.com` with active SSL.
- [ ] Test the `/admin/login` flow using `ADMIN_PASSWORD`.
- [ ] Submit a test booking on `/pednecar` and `/enquiry` to verify Resend email delivery.
- [ ] Verify Google Analytics 4 tags fire and Content Security Policy allows required scripts.
- [ ] Confirm XML sitemap resolves at `/sitemap.xml`.
