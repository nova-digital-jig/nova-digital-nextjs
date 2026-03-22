import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate heading lines from below with clip-path reveal.
 * Requires: parent divs with overflow-hidden, child divs with class "reveal-line"
 */
export function animateTextReveal(
  container: HTMLElement,
  options?: {
    stagger?: number;
    duration?: number;
    delay?: number;
    useScrollTrigger?: boolean;
  }
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const {
    stagger = 0.12,
    duration = 1,
    delay = 0,
    useScrollTrigger = true,
  } = options || {};

  const lines = container.querySelectorAll(".reveal-line");
  if (!lines.length) return;

  gsap.set(lines, {
    y: "100%",
    clipPath: "inset(100% 0 0 0)",
  });

  const animConfig: gsap.TweenVars = {
    y: "0%",
    clipPath: "inset(0% 0 0 0)",
    duration,
    ease: "power3.out",
    stagger,
    delay,
  };

  if (useScrollTrigger) {
    animConfig.scrollTrigger = {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none none",
    };
  }

  return gsap.to(lines, animConfig);
}

/**
 * Scroll-linked word highlight — each word lights up as user scrolls.
 * Splits paragraph text into individual spans.
 */
export function animateWordHighlight(paragraph: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const text = paragraph.textContent || "";
  paragraph.innerHTML = text
    .split(" ")
    .map((word) => `<span class="highlight-word">${word}</span>`)
    .join(" ");

  const words = paragraph.querySelectorAll(".highlight-word");

  words.forEach((word, i) => {
    gsap.to(word, {
      color: "var(--text-primary)",
      scrollTrigger: {
        trigger: paragraph,
        start: () => `top+=${(i / words.length) * 100}% 80%`,
        end: () => `top+=${((i + 1) / words.length) * 100}% 80%`,
        scrub: true,
      },
    });
  });
}
