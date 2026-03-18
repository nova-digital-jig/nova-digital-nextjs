"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, Lucas Hair Salon",
    content:
      "Nova Digital transformed our online presence completely. We went from zero online bookings to over 40 per week. The website paid for itself in the first month.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Raj Patel",
    role: "Owner, Edison Barbershop",
    content:
      "I was skeptical about a 48-hour turnaround, but they delivered a website that looks like it cost ten thousand dollars. Walk-ins increased 200% since launch.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Mike Thompson",
    role: "Owner, Ram's Garage",
    content:
      "Professional, fast, and the results speak for themselves. Our service requests tripled and we had to hire two more mechanics to keep up with demand.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="py-24 md:py-36 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-label mb-4">Testimonials</p>
          <h2 className="text-display">
            What our clients <span className="gradient-text">say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Quote */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p
                  className="text-2xl md:text-3xl lg:text-4xl leading-snug font-light text-white/90"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  &ldquo;{t.content}&rdquo;
                </p>
                <footer className="mt-10 flex items-center gap-5">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#8b5cf6]/30">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-[#888899]">{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-8">
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-[#1f1f3a] flex items-center justify-center hover:bg-[#8b5cf6] hover:border-[#8b5cf6] text-[#888899] hover:text-white transition-all duration-400"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-[#1f1f3a] flex items-center justify-center hover:bg-[#8b5cf6] hover:border-[#8b5cf6] text-[#888899] hover:text-white transition-all duration-400"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-8 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]"
                      : "w-2 bg-[#1f1f3a] hover:bg-[#3a3a5a]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <p className="text-label">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
