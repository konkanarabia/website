# Design System & Motion Specification

This document details the visual tokens, typography scale, motion language, and accessibility rules implemented in `tours-travel-website`, aligned with the patterns established in `freshcart-landing`.

---

## 1. Motion Language

All animations across the application adhere to a unified motion language defined in [`@/lib/motion`](file:///c:/Users/manth/tours-travel-website/lib/motion.ts).

| Preset | Configuration | Primary Application |
| :--- | :--- | :--- |
| `ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, modal reveals, and page structure reveals |
| `spring` | `stiffness: 380, damping: 30, mass: 0.8` | Buttons, cards, tags, and interactive taps |
| `softSpring` | `stiffness: 160, damping: 22` | Floating ambient badges and larger floating cards |
| `fadeUp` | `opacity 0→1, y 24→0, 0.6s ease` | Standard reveal variant for sections and cards |
| `maskWord` | `y 110%→0%` inside overflow-hidden inline span | Hero headline word-by-word reveal |
| `stagger()` | Factory for `staggerChildren` / `delayChildren` | Grids (Destinations, Vehicles, Skills, Partners) |
| `inView` | `once: true, amount: 0.1, margin: "0px 0px -60px 0px"` | Scroll-triggered reveals |

### Shared Layout Transitions (`layoutId`)
- **Desktop Navigation:** Active indicator pill (`layoutId="nav-pill"`) glides between navigation links upon hover.
- **Skills & Capabilities Showcase:** Tab switcher indicator (`layoutId="skills-tab-pill"`) smoothly moves between categories without jarring cross-fades.

### Accessibility (`prefers-reduced-motion`)
- Components with continuous motion or floating drifts (such as `HeroFloatChip`) read `useReducedMotion()`.
- Global CSS override in `globals.css` collapses transition and animation durations to `0.01ms` for users with motion sensitivity.

---

## 2. Color Palette & Elevation

### Elevation
Two layered shadow systems derived from slate undertones:
- **`.shadow-soft`**: Subtle elevation for resting cards and clean borders (`0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.12)`).
- **`.shadow-lift`**: Elevated hover state for cards, dropdown menus, and interactive items (`0 2px 4px rgba(15, 23, 42, 0.05), 0 24px 48px -20px rgba(15, 23, 42, 0.22)`).

### Tonal Accents
- **Deep Arabian Blue (`#004e7c` / `#0066a1`):** Corporate trust, primary buttons, logo accents, and top bar.
- **Warm Konkan Amber (`#f59e0b` / `#d97706`):** Highlights, ratings, CTAs, PedneCar vehicle badges, and active accents.
- **Slate Canvas (`#f8fafc` / `#ffffff`):** Alternating background sections that establish visual rhythm.

---

## 3. Typography Hierarchy

- **Headings & Display (`font-serif`):** `Playfair Display` — Warm, editorial elegance suitable for luxury travel, heritage tours, and authentic regional hospitality.
- **Body & Controls (`font-sans`):** `Inter` — High-legibility sans-serif for UI controls, body prose, specs, and form inputs.
- **Text Wrapping:** `text-balance` on hero and section titles; `text-pretty` on descriptive paragraphs.

---

## 4. Components & Interactive Sections

1. **Header Navigation:** Motion header with slide-in entrance, sliding `layoutId="nav-pill"` indicator, and animated mobile drawer.
2. **Hero:** Masked headline typography, floating orbital badges (`HeroFloatChip`), and spring-animated CTA buttons.
3. **Service Marquee:** Compositor-driven infinite scrolling ticker showcasing core trust pillars with edge fade masks.
4. **Skills & Capabilities Showcase (`SkillsShowcase`):** Interactive tabbed category filter (`layoutId="skills-tab-pill"`), staggered capability cards with hover elevation, icon rotation springs, and key performance metric counters.
5. **Featured Destinations & Vehicle Rentals:** Staggered card reveals (`inView`), image hover zooms, and micro-interactive buttons.
6. **Certificate & Credentials Showcase:** Animated modal popups and multi-page credential carousels.
7. **Testimonials:** Verified traveler reviews with staggered reveals and rating star animations.
