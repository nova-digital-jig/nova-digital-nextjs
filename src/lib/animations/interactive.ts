import { gsap } from "gsap";

// ============================================
// HOVER IMAGE REVEAL — Floating preview follows cursor over list items
// ============================================
export function initHoverReveal(listContainer: HTMLElement) {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  const items = listContainer.querySelectorAll("[data-image]");
  if (!items.length) return () => {};

  // Create preview element
  const preview = document.createElement("div");
  preview.style.cssText = `
    position: fixed; pointer-events: none; z-index: 50; opacity: 0;
    width: 300px; height: 200px; overflow: hidden; border-radius: 12px;
    will-change: transform;
  `;
  const previewImg = document.createElement("img");
  previewImg.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
  preview.appendChild(previewImg);
  document.body.appendChild(preview);

  const onEnter = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    const imgSrc = target.dataset.image || "";
    if (!imgSrc) return;
    previewImg.src = imgSrc;
    gsap.to(preview, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(preview, { opacity: 0, scale: 0.9, duration: 0.2, ease: "power2.in" });
  };

  const onMove = (e: MouseEvent) => {
    gsap.to(preview, {
      x: e.clientX + 20,
      y: e.clientY - 100,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  items.forEach((item) => {
    item.addEventListener("mouseenter", onEnter);
    item.addEventListener("mouseleave", onLeave);
  });
  listContainer.addEventListener("mousemove", onMove);

  return () => {
    items.forEach((item) => {
      item.removeEventListener("mouseenter", onEnter);
      item.removeEventListener("mouseleave", onLeave);
    });
    listContainer.removeEventListener("mousemove", onMove);
    preview.remove();
  };
}

// ============================================
// CARD TILT — 3D tilt with cursor-tracking glow (Framer-style)
// ============================================
export function initCardTilt(card: HTMLElement, tiltDegrees: number = 8) {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  // Create glow element
  const glow = document.createElement("div");
  glow.className = "card-glow";
  card.style.position = "relative";
  card.style.overflow = "hidden";
  card.appendChild(glow);

  const onMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltDegrees;
    const rotateY = ((x - centerX) / centerX) * tiltDegrees;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(glow, {
      x: x - 150,
      y: y - 150,
      opacity: 1,
      duration: 0.3,
    });
  };

  const onLeave = () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    gsap.to(glow, { opacity: 0, duration: 0.3 });
  };

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", onLeave);

  return () => {
    card.removeEventListener("mousemove", onMove);
    card.removeEventListener("mouseleave", onLeave);
    glow.remove();
  };
}
