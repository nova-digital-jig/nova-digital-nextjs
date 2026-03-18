"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="relative py-32 md:py-44 px-6 md:px-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              left: `${i * 25}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 15, 0],
              x: [0, 15, -15, 0],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] text-center">
        <motion.h2
          className="text-display md:text-hero text-white leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to Build Your
          <br />
          Dream Website?
        </motion.h2>

        <motion.p
          className="mt-8 text-lg md:text-xl text-white/80 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Book a free 15-minute strategy call and get a custom proposal
          within 24 hours. Let&apos;s make it happen.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="tel:978-606-3386"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0f] rounded-full font-semibold text-sm hover:bg-white/90 hover:scale-105 transition-all duration-400"
          >
            (978) 606-3386
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
          <a
            href="mailto:jigpatel01234@gmail.com?subject=Website%20Inquiry"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white rounded-full font-medium text-sm border border-white/30 hover:bg-white/10 transition-all duration-400"
          >
            jigpatel01234@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
