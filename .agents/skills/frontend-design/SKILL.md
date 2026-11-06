---
name: frontend-design
description: Direction for intentional, production-grade visual design and aesthetic choices to avoid generic AI-generated templates. Enforces strong typography hierarchies, tokenized colors, tactile micro-interactions, and responsive spatial compositions.
---

# Frontend Design Skill

Apply this skill when designing or refining user interfaces, landing pages, interactive components, or design systems.

## Core Principles

1. **Avoid Generic AI Tells ("AI Slop"):**
   - No cookie-cutter purple gradients or uninspired centered layouts.
   - Distinctive typography pairings: High-character serif headings (Playfair Display, Fraunces) paired with clean geometric sans (Inter, Plus Jakarta Sans).
   - Deep, cohesive brand palettes anchored in CSS variables or Tailwind tokens.

2. **Purposeful Motion & Tactile Physics:**
   - Motion must clarify hierarchy rather than merely decorate.
   - Use two primary curves:
     - `ease = [0.22, 1, 0.36, 1]` for entrances and structural reveals.
     - `spring` (stiffness 380, damping 30) for interactive elements (cards, buttons, tabs).
   - Respect `prefers-reduced-motion` at all times.

3. **Spatial Composition & Visual Depth:**
   - Asymmetric accents, layered elevation (`shadow-soft` vs `shadow-lift`), and subtle atmospheric glows.
   - Generous whitespace that breathes on desktop and compacts comfortably on mobile.

4. **Production Polish:**
   - Real semantic forms with accessible labels and states.
   - Touch targets meeting WCAG 2.1 AA (44px minimum).
   - Text balancing on headings (`text-balance`) and pretty wrapping on paragraphs (`text-pretty`).
