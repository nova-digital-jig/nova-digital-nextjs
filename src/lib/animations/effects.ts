import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// COUNTER — Numbers count up on scroll
// ============================================
export function animateCounter(element: HTMLElement, target: number, decimals: number = 0) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = target.toFixed(decimals);
    return;
  }

  const obj = { value: 0 };

  return gsap.to(obj, {
    value: target,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      element.textContent = decimals > 0
        ? obj.value.toFixed(decimals)
        : Math.round(obj.value).toString();
    },
  });
}

// ============================================
// MAGNETIC BUTTON — Follows cursor on hover
// ============================================
export function initMagneticButton(button: HTMLElement, strength: number = 0.3) {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
  };

  button.addEventListener("mousemove", handleMouseMove);
  button.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    button.removeEventListener("mousemove", handleMouseMove);
    button.removeEventListener("mouseleave", handleMouseLeave);
  };
}

// ============================================
// CUSTOM CURSOR — Dot + follower, desktop only
// ============================================
export function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  document.body.style.cursor = "none";

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const follower = document.createElement("div");
  follower.className = "cursor-follower";
  document.body.appendChild(dot);
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });
  };

  document.addEventListener("mousemove", onMouseMove);

  const tickerCallback = () => {
    const fx = parseFloat(gsap.getProperty(follower, "x") as string) || 0;
    const fy = parseFloat(gsap.getProperty(follower, "y") as string) || 0;
    const newX = fx + (mouseX - 20 - fx) * 0.15;
    const newY = fy + (mouseY - 20 - fy) * 0.15;
    gsap.set(follower, { x: newX, y: newY });
  };

  gsap.ticker.add(tickerCallback);

  // Hover states
  const addHoverListeners = () => {
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      });
    });
  };

  // Delay to catch dynamically rendered elements
  setTimeout(addHoverListeners, 1000);

  return () => {
    document.body.style.cursor = "";
    document.removeEventListener("mousemove", onMouseMove);
    gsap.ticker.remove(tickerCallback);
    dot.remove();
    follower.remove();
  };
}

// ============================================
// IMAGE REVEALS — Circle, wipe, scale+clip
// ============================================
export function initCircleReveal(image: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  return gsap.fromTo(image,
    { clipPath: "circle(0% at 50% 50%)" },
    {
      clipPath: "circle(75% at 50% 50%)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: image, start: "top 80%", toggleActions: "play none none none" },
    }
  );
}

export function initWipeReveal(image: HTMLElement, direction: "left" | "right" | "bottom" = "left") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const clipFrom = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    bottom: "inset(100% 0 0 0)",
  };

  return gsap.fromTo(image,
    { clipPath: clipFrom[direction] },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: { trigger: image, start: "top 80%", toggleActions: "play none none none" },
    }
  );
}

export function initScaleReveal(container: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const image = container.querySelector("img, video");
  if (!image) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: container, start: "top 80%", toggleActions: "play none none none" },
  });

  tl.fromTo(container,
    { clipPath: "inset(100% 0 0 0)" },
    { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.inOut" }
  ).fromTo(image,
    { scale: 1.3 },
    { scale: 1, duration: 1.2, ease: "power3.out" },
    0
  );

  return tl;
}

// ============================================
// TEXT SCRAMBLE — Characters shuffle before resolving
// ============================================
export function scrambleText(element: HTMLElement, finalText: string, speed: number = 30) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let iteration = 0;

  const interval = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (i < iteration) return finalText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= finalText.length) clearInterval(interval);
    iteration += 1 / 3;
  }, speed);

  return () => clearInterval(interval);
}
