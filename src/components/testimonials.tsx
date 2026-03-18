"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, Lucas Hair Salon",
    content:
      "Nova Digital transformed our online presence. We went from zero online bookings to 40+ per week. The website paid for itself in the first month.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    imageAlt: "Professional headshot of a male business owner",
  },
  {
    name: "Raj Patel",
    role: "Owner, Edison Barbershop",
    content:
      "I was skeptical about a 48-hour turnaround, but they delivered a website that looks like it cost $10,000. Walk-ins increased 200% since launch.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    imageAlt: "Professional headshot of a female business professional",
  },
  {
    name: "Mike Thompson",
    role: "Owner, Ram's Garage",
    content:
      "Professional, fast, and the results speak for themselves. Our service requests tripled and we had to hire two more mechanics to keep up.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    imageAlt: "Professional headshot of a male entrepreneur",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-500 text-yellow-500"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4 border-violet-500/30 bg-violet-500/10 text-violet-400">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Loved by{" "}
            <span className="text-gradient">business owners</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Don&apos;t take our word for it. Here&apos;s what our clients say.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="mt-16 hidden md:grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <Quote className="mb-4 h-8 w-8 text-violet-500/20" />
              <StarRating rating={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-violet-500/20">
                  <Image
                    src={t.image}
                    alt={t.imageAlt}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-16 md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass rounded-2xl p-6"
              >
                <Quote className="mb-4 h-8 w-8 text-violet-500/20" />
                <StarRating rating={testimonials[active].rating} />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonials[active].content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-violet-500/20">
                    <Image
                      src={testimonials[active].image}
                      alt={testimonials[active].imageAlt}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{testimonials[active].name}</div>
                    <div className="text-xs text-muted-foreground">{testimonials[active].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} className="rounded-full p-2 glass hover:bg-white/10 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-violet-500" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="rounded-full p-2 glass hover:bg-white/10 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
