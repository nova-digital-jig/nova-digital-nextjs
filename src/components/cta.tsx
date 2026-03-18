"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
              alt="Team collaboration in a modern office environment"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-violet-500/85 to-rose-500/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative px-8 py-20 text-center sm:px-16 md:py-28">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Ready to stop losing
              <br />
              customers to bad websites?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-6 max-w-xl text-lg text-white/80"
            >
              Book a free 15-minute strategy call with Isabella, our AI receptionist, and
              get a custom proposal within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a href="tel:978-606-3386">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base gap-2 bg-white text-violet-600 border-0 hover:bg-white/90 font-semibold transition-all hover:shadow-xl hover:shadow-black/20 hover:scale-105"
                >
                  <Phone className="h-4 w-4" />
                  (978) 606-3386
                </Button>
              </a>
              <a href="mailto:jigpatel01234@gmail.com?subject=Website%20Inquiry">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 group"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
