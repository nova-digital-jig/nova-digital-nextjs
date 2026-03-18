"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            width: `${40 + i * 30}px`,
            height: `${40 + i * 30}px`,
            background: i % 2 === 0
              ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20 - i * 5, 10, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

export function Hero() {
  const stats = [
    { value: 48, suffix: "hr", label: "Delivery" },
    { value: 50, suffix: "+", label: "Sites Built" },
    { value: 4.9, suffix: "★", label: "Rating", isDecimal: true },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            "linear-gradient(135deg, #0a0a2e 0%, #1a0533 25%, #0d0d2b 50%, #0a0a0f 75%, #12061f 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating shapes */}
      <FloatingShapes />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-10 pt-32 pb-20">
        <div className="mx-auto max-w-[1400px] w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-sm text-[#c4b5fd] animate-pulse-glow">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
              Now accepting clients
            </span>
          </motion.div>

          {/* Hero text */}
          <motion.h1
            className="text-hero gradient-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build
          </motion.h1>
          <motion.h1
            className="text-hero gradient-text mt-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What&apos;s Next
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-body-lg mt-8 max-w-xl text-[#a0a0b8]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We craft stunning, high-converting websites in 48 hours using
            AI-powered development. Premium quality starting at $500.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#pricing" className="btn-primary">
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 13L13 1M13 1H3M13 1V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#portfolio" className="btn-outline">
              View Our Work
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-16 flex flex-wrap gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-label text-xs text-[#666]">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-[#333] flex justify-center pt-1.5"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-[#8b5cf6]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatItem({
  value,
  suffix,
  label,
  isDecimal,
}: {
  value: number;
  suffix: string;
  label: string;
  isDecimal?: boolean;
}) {
  const { count, ref } = useCountUp(isDecimal ? value * 10 : value);
  const display = isDecimal ? (count / 10).toFixed(1) : count;

  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-3xl md:text-4xl font-bold text-white">
        {display}
        <span className="gradient-text">{suffix}</span>
      </span>
      <span className="text-sm text-[#888899] mt-1">{label}</span>
    </div>
  );
}
