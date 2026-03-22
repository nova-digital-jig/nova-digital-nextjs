import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Simple parallax — element moves at different speed than scroll */
export function animateParallax(imageRef: HTMLElement, speed: number = -20) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return; // skip on mobile

  return gsap.to(imageRef, {
    yPercent: speed,
    ease: "none",
    scrollTrigger: {
      trigger: imageRef.parentElement || imageRef,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/** Multi-layer depth parallax — different elements move at different speeds */
export function initDepthParallax(section: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const layers = [
    { selector: ".depth-bg", speed: -10 },
    { selector: ".depth-mid", speed: -25 },
    { selector: ".depth-fg", speed: -40 },
  ];

  layers.forEach(({ selector, speed }) => {
    const el = section.querySelector(selector);
    if (!el) return;

    gsap.to(el, {
      yPercent: speed,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}
