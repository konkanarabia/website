---
name: motion-design
description: Taste and implementation rules for performant, accessible UI animation with Framer Motion and Tailwind CSS. Mandates easing curves, spring physics, layoutId transitions, and reduced-motion compliance.
---

# Motion Design Skill

Enforces purposeful, stutter-free animations across interactive React and Next.js applications.

## Motion Guidelines

### 1. Unified Motion Curves
Never use arbitrary transition timings. Rely on two predictable curves:
- **Entrances & Structural Layout (`ease`):**
  `cubic-bezier(0.22, 1, 0.36, 1)`
- **User Interactions (`spring`):**
  `{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }`
- **Larger Floating Elements (`softSpring`):**
  `{ type: "spring", stiffness: 160, damping: 22 }`

### 2. Framer Motion Presets
Import from `@/lib/motion`:
- `fadeUp`: Smooth opacity and 24px vertical lift.
- `maskWord`: Overflow-hidden container with inline span reveal for prominent hero headlines.
- `stagger(staggerChildren, delayChildren)`: Cascading reveals for card grids and navigation menus.
- `inView`: Viewport trigger configured with a low amount (0.1) and negative bottom margin (-60px) to fire naturally without stalling on mobile viewports.

### 3. Shared Layout Pills
For filter tabs and navigation bars, use `layoutId` (e.g., `layoutId="nav-pill"` or `layoutId="skills-tab-pill"`). The active pill slides between items with spring physics rather than flickering.

### 4. Accessibility
Always suppress motion under `prefers-reduced-motion`:
- Use `useReducedMotion()` in React for looping or floating elements.
- Maintain CSS fallback in `globals.css` setting animation and transition duration to `0.01ms`.
