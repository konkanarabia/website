import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language adapted from freshcart-landing.
 *
 * Two easing curves only, so every surface in the page decelerates the same way:
 *  - `ease` for entrances and layout (soft, confident stop)
 *  - `spring` for anything the user touches (buttons, cards, badges)
 */
export const ease = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 22,
};

/** Parent that releases its children one after another. */
export const stagger = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

/** Words fly up from behind a clipping mask — used for the hero headline. */
export const maskWord: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.75, ease },
  },
};

/**
 * Standard `whileInView` config: fires once, slightly before the block lands.
 *
 * `amount` is deliberately low so tall blocks on mobile devices trigger reliably.
 */
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.1, margin: "0px 0px -60px 0px" },
} as const;
