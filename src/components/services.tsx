"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Palette, Search, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Globe,
    title: "Custom Websites",
    description:
      "Hand-crafted, responsive websites built with modern frameworks. Optimized for speed, SEO, and conversions from day one.",
    gradient: "from-violet-500 to-violet-600",
    glow: "group-hover:shadow-violet-500/20",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Pixel-perfect designs that captivate your audience. Every interaction is deliberate, every visual choice drives results.",
    gradient: "from-rose-500 to-rose-600",
    glow: "group-hover:shadow-rose-500/20",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Dominate search results with technical SEO baked into every build. Schema markup, Core Web Vitals, and local SEO included.",
    gradient: "from-violet-500 to-rose-500",
    glow: "group-hover:shadow-violet-500/20",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Lightning-fast load times with 95+ Lighthouse scores. Edge-deployed, image-optimized, and built to handle any traffic.",
    gradient: "from-rose-500 to-violet-500",
    glow: "group-hover:shadow-rose-500/20",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
];

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 px-6">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4 border-violet-500/30 bg-violet-500/10 text-violet-400">
            Services
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need to{" "}
            <span className="text-gradient">dominate online</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We don&apos;t just build websites — we build revenue machines that work 24/7.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.04,
                y: -6,
                transition: { duration: 0.3 },
              }}
              className={`group relative rounded-2xl glass p-6 transition-all duration-500 hover:shadow-2xl ${service.glow} glow-pulse-hover cursor-default`}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${service.gradient} p-3 shadow-lg`}
              >
                <service.icon className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              {/* Glow pulse background */}
              <div
                className={`glow-bg absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-10`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
