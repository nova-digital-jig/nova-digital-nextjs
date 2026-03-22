// ============================================
// MagneticButton.tsx
// Usage: <MagneticButton>Start a Project</MagneticButton>
// ============================================
"use client";

import { useEffect, useRef } from "react";
import { initMagneticButton } from "@/lib/animations";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({ children, className = "", href, onClick, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = initMagneticButton(ref.current, strength);
    return cleanup;
  }, [strength]);

  const baseClass = `inline-block ${className}`;

  if (href) {
    return <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={baseClass}>{children}</a>;
  }

  return <button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} className={baseClass}>{children}</button>;
}
