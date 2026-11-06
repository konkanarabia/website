# Accessibility (a11y) Specification

This document details the accessibility standards, WCAG 2.1 AA conformance, and inclusive design principles built into `tours-travel-website`.

---

## 1. Reduced Motion & Vestibular Safety

Animations and interactive motions strictly adhere to the operating system's `prefers-reduced-motion` settings:

1. **JavaScript Guard (`useReducedMotion`):**
   - Floating badges (such as `HeroFloatChip` in `app/components/hero.tsx`) and looping carousels check Framer Motion's `useReducedMotion()` hook.
   - When motion reduction is active, continuous floating, rotation, and translation loops are immediately disabled.
2. **CSS Killswitch (`app/globals.css`):**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
   This ensures tickers (such as `ServiceMarquee`), transitions, and entrance animations collapse to instant state updates without motion.

---

## 2. Keyboard Navigation & Focus Management

- **Logical Tab Order:** All interactive controls (links, buttons, form inputs, dialog dismiss buttons) follow natural DOM reading order.
- **Visible Focus Indicators:** Form controls, buttons, and navigation elements feature distinct focus outlines with high contrast:
  ```css
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
  ```
- **Modal Dialog Focus Trapping:** Dialogs and mobile slide-overs (built using Radix UI primitives) automatically trap keyboard focus within the dialog, restore focus to the trigger upon closing, and dismiss cleanly when pressing `Escape`.

---

## 3. Screen Reader Support & ARIA Attributes

- **Live Status Regions:** Form submission alerts, enquiry feedback banners, and error banners use `role="status"` or `aria-live="polite"` so screen reader users are notified when an action completes.
- **Decorative vs. Informative Icons:**
  - Informative icons carry accompanying descriptive labels or `aria-label` attributes.
  - Purely decorative Lucide icons are marked with `aria-hidden="true"`.
- **Form Association:** All input elements feature explicit `<label htmlFor="...">` associations and descriptive error announcements connected via `aria-describedby`.
- **Image Alternative Text:** All photography (destinations, fleet vehicles, team profiles) provides descriptive `alt` text reflecting the image subject rather than generic placeholders.

---

## 4. Color Contrast & Readability

- **Contrast Ratios:** Text colors adhere to WCAG 2.1 AA standards, maintaining at least a 4.5:1 contrast ratio against their respective light or dark backgrounds:
  - Deep Arabian Blue (`#004e7c`) on white: > 8.5:1 ratio.
  - Body Slate (`#334155` / `#1e293b`): > 9:1 ratio.
  - Amber Accent CTA (`#d97706`): Used with high-contrast text or as clear visual borders.
- **Fluid Typography:** Typography is scaled with relative units (`rem`), allowing users to zoom or configure browser font scaling up to 200% without horizontal overflow or clipped text.
