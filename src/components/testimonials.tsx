"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, Lucas Hair Salon",
    content:
      "Nova Digital transformed our online presence. We went from zero online bookings to 40+ per week. The website paid for itself in the first month.",
    rating: 5,
    initials: "MS",
  },
  {
    name: "Raj Patel",
    role: "Owner, Edison Barbershop",
    content:
      "I was skeptical about a 48-hour turnaround, but they delivered a website that looks like it cost $10,000. Walk-ins increased 200% since launch.",
    rating: 5,
    initials: "RP",
  },
  {
    name: "Mike Thompson",
    role: "Owner, Ram's Garage",
    content:
      "Professional, fast, and the results speak for themselves. Our service requests tripled and we had to hire two more mechanics to keep up.",
    rating: 5,
    initials: "MT",
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

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <Quote className="mb-4 h-8 w-8 text-violet-500/20" />
              <StarRating rating={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-rose-500 text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
