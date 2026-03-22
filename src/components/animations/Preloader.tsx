"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  brandName?: string;
  accentChar?: string;
  onComplete?: () => void;
}

export function Preloader({ brandName = "NOVA", accentChar = ".", onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!overlayRef.current || !logoRef.current || !barRef.current) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
        onComplete?.();
      },
    });

    tl.from(logoRef.current, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.8,
      ease: "power3.inOut",
    })
    .to(barRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut",
    }, "-=0.3")
    .to(overlayRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    }, "+=0.2");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        ref={logoRef}
        className="text-4xl md:text-6xl font-bold"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
      >
        {brandName}<span style={{ color: "var(--accent)" }}>{accentChar}</span>
      </div>
      <div className="w-48 h-[2px] mt-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{ background: "var(--accent)", transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
