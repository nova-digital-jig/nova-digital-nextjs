import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// HORIZONTAL SCROLL — Vertical scroll moves content horizontally
// ============================================
export function initHorizontalScroll(section: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const track = section.querySelector(".horizontal-track") as HTMLElement;
  if (!track) return;

  return gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${track.scrollWidth - window.innerWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

// ============================================
// PINNED SWAP — Section pins, inner panels fade in/out
// ============================================
export function initPinnedSwap(section: HTMLElement, panelSelector: string = ".swap-panel") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const panels = section.querySelectorAll(panelSelector);
  if (!panels.length) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${panels.length * 100}vh`,
    pin: true,
  });

  panels.forEach((panel, i) => {
    if (i === 0) return;

    gsap.fromTo(panel,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: () => `top+=${i * 100}vh top`,
          end: () => `top+=${(i + 0.5) * 100}vh top`,
          scrub: true,
        },
      }
    );
  });
}

// ============================================
// STACKED CARDS — Cards overlap as user scrolls
// ============================================
export function initStackedCards(section: HTMLElement, cardSelector: string = ".stacked-card") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cards = section.querySelectorAll(cardSelector);
  if (!cards.length) return;

  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: `top-=${i * 40} center`,
      end: "bottom center",
      pin: i < cards.length - 1,
      pinSpacing: false,
    });

    if (i < cards.length - 1) {
      gsap.to(card, {
        scale: 0.95 - i * 0.02,
        opacity: 0.8,
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });
    }
  });
}

// ============================================
// SPLIT SCROLL — Left side pinned, right side scrolls
// ============================================
export function initSplitScroll(section: HTMLElement, leftSelector: string = ".split-left") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 768) return; // stack on mobile

  const leftSide = section.querySelector(leftSelector) as HTMLElement;
  if (!leftSide) return;

  return ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    pin: leftSide,
    pinSpacing: false,
  });
}

// ============================================
// COLOR TRANSITIONS — Background morphs between sections
// ============================================
export function initColorTransitions() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const sections = document.querySelectorAll("[data-bg-color]");

  sections.forEach((section) => {
    const color = (section as HTMLElement).dataset.bgColor;
    if (!color) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => gsap.to("body", { backgroundColor: color, duration: 0.6, ease: "power2.out" }),
      onEnterBack: () => gsap.to("body", { backgroundColor: color, duration: 0.6, ease: "power2.out" }),
    });
  });
}

// ============================================
// SCROLL PROGRESS — Thin bar at top of page
// ============================================
export function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  return () => bar.remove();
}
