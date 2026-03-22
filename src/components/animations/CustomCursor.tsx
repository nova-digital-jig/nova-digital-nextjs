"use client";

import { useEffect } from "react";
import { initCustomCursor } from "@/lib/animations";

export function CustomCursor() {
  useEffect(() => {
    const cleanup = initCustomCursor();
    return cleanup;
  }, []);

  return null; // cursor elements are created in the DOM by initCustomCursor
}
