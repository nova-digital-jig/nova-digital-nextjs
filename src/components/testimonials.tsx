"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  // Animate quote text on change
  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-label mb-6 testimonial-title">Testimonials</p>
        <h2 className="text-display mb-20 testimonial-title">
          What our clients say
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Quote */}
          <div className="lg:col-span-8">
            <blockquote ref={quoteRef}>
              <p className="text-heading text-2xl md:text-3xl lg:text-4xl leading-snug font-normal">
                &ldquo;{t.content}&rdquo;
              </p>
              <footer className="mt-10 flex items-center gap-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-base font-medium">{t.name}</p>
                  <p className="text-sm text-[#8A8580]">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Controls + indicators */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-8">
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-[#E8E4DC] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#FAF9F6] hover:border-[#1A1A1A] transition-all duration-400"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-[#E8E4DC] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#FAF9F6] hover:border-[#1A1A1A] transition-all duration-400"
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
                      ? "w-8 bg-[#1A1A1A]"
                      : "w-2 bg-[#E8E4DC] hover:bg-[#8A8580]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="text-label">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
