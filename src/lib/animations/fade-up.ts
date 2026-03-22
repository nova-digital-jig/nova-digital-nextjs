import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fade element up from below on scroll */
export function animateFadeUp(
  element: HTMLElement,
  options?: { delay?: number; duration?: number; y?: number }
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const { delay = 0, duration = 0.8, y = 40 } = options || {};

  return gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

/** Stagger a list of child elements into view */
export function animateStaggerList(
  container: HTMLElement,
  itemSelector: string,
  options?: { stagger?: number; duration?: number; y?: number }
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const { stagger = 0.1, duration = 0.8, y = 60 } = options || {};
  const items = container.querySelectorAll(itemSelector);
  if (!items.length) return;

  return gsap.from(items, {
    y,
    opacity: 0,
    duration,
    ease: "power3.out",
    stagger,
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}
