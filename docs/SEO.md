# SEO & Search Engine Optimization

This document outlines the search engine optimization strategy, structured data implementations, and indexing rules for `tours-travel-website`.

---

## 1. Metadata Architecture

Metadata is defined using the Next.js Metadata API in `app/layout.tsx` and extended on individual route pages:

- **Canonical URL:** Base domain configured as `https://konkanarabiahospitalitygroup.com`.
- **Title Template:** `%s | KonkanArabia Hospitality Group` ensures unique, brand-aligned page titles across all domestic and international tour pages.
- **OpenGraph & Twitter Cards:** Complete metadata including `og:image`, `og:type="website"`, and `twitter:card="summary_large_image"`.
- **Favicons & Manifest:** Full PWA iconography set in `public/` (`favicon.ico`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `site.webmanifest`).

---

## 2. JSON-LD Structured Data

To provide rich search snippets and entity understanding for search engines, structured data schemas are dynamically injected via [`lib/structured-data.ts`](file:///c:/Users/manth/tours-travel-website/lib/structured-data.ts):

| Schema Type | Context / Route | Purpose |
| :--- | :--- | :--- |
| `TravelAgency` | Global root layout | Organization identity, legal name, contact phone, operating hours, and logo. |
| `TouristTrip` | Tour & Destination pages | Itinerary steps, destination geography, tour provider, and pricing. |
| `AutoRental` | PedneCar vehicle fleet (`/pednecar`) | Taxi and self-drive vehicle models, passenger capacity, and base rental rates. |
| `BreadcrumbList` | Category and detail pages | Hierarchical navigational trails for search result breadcrumbs. |
| `FAQPage` | FAQ sections and enquiry guides | Structured question-and-answer accordions for search result rich answers. |

---

## 3. Crawling & Indexing Rules

### Robots Configuration (`app/robots.ts`)
- Allows indexing of all public landing, tour, vehicle, and informational pages.
- Strictly disallows crawling of administrative routes (`/admin`, `/admin/*`) and API endpoints (`/api/*`).
- Points search bots directly to the dynamic sitemap:
  ```ts
  sitemap: 'https://konkanarabiahospitalitygroup.com/sitemap.xml'
  ```

### Dynamic Sitemap (`app/sitemap.ts`)
- Generates standard XML sitemap dynamically at runtime.
- Emits entries for static pages with appropriate `changeFrequency` and `priority`:
  - Homepage: `priority: 1.0`, `changeFrequency: 'weekly'`
  - Tour destinations & fleet: `priority: 0.9`, `changeFrequency: 'weekly'`
  - Hospitality & Franchises: `priority: 0.8`, `changeFrequency: 'monthly'`
  - Policy & legal pages: `priority: 0.5`, `changeFrequency: 'yearly'`

---

## 4. Performance & Core Web Vitals

- **Zero Layout Shift:** Image dimensions and hero elements reserve explicit spatial aspect ratios.
- **Font Optimization:** Next.js font loader (`next/font/google`) automatically self-hosts `Playfair Display` and `Inter`, preventing render-blocking external Google Fonts roundtrips.
- **Micro-Interactions:** Animations run on GPU-accelerated CSS properties (`transform`, `opacity`) via Framer Motion, avoiding expensive layout reflows during scroll.
