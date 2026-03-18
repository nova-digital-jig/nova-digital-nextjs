"use client";

import { Code, Palette, BarChart3, Bot } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "./scroll-animations";

const services = [
  {
    icon: Code,
    title: "Web Design & Development",
    description:
      "Custom-built, responsive websites using Next.js and modern frameworks. Optimized for speed, SEO, and conversions that drive real business results.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Pixel-perfect interfaces designed to captivate your audience. Every interaction is deliberate, every design choice drives engagement and results.",
  },
  {
    icon: BarChart3,
    title: "SEO & Performance",
    description:
      "Technical SEO baked into every build. Schema markup, Core Web Vitals optimization, and 95+ Lighthouse scores guaranteed for every project.",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description:
      "AI-powered chatbots, booking systems, and automation tools that work while you sleep. Future-proof your business with intelligent solutions.",
  },
];

export function Services() {
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal();

  return (
    <section id="services" className="py-24 md:py-32 lg:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-label mb-4">What We Do</p>
          <h2 className="text-display">
            Services built for{" "}
            <span className="gradient-text">growth</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl bg-[#111118] border border-[#1f1f3a] p-8 md:p-10 min-h-[280px] transition-all duration-500 hover:border-transparent"
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#f43f5e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[1px]" />
                <div className="absolute inset-[1px] rounded-2xl bg-[#111118] -z-[5]" />

                <div className="w-14 h-14 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-6">
                  <Icon size={28} className="text-[#8b5cf6]" />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-[#888899] leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
