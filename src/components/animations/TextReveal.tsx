// ============================================
// TextReveal.tsx — Reusable line-by-line heading reveal
// ============================================
// Usage: <TextReveal lines={["WE BUILD", "WEBSITES", "THAT PRINT", "MONEY."]} className="heading-hero" />

"use client";

import { useEffect, useRef } from "react";
import { animateTextReveal } from "@/lib/animations";

interface TextRevealProps {
  lines: string[];
  className?: string;
  delay?: number;
  useScrollTrigger?: boolean;
}

export function TextReveal({ lines, className = "heading-hero", delay = 0, useScrollTrigger = true }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    animateTextReveal(containerRef.current, { delay, useScrollTrigger });
  }, [delay, useScrollTrigger]);

  return (
    <div ref={containerRef}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div className={`reveal-line ${className}`}>{line}</div>
        </div>
      ))}
    </div>
  );
}
