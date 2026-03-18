"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Web Design & Development",
    description:
      "Custom-built, responsive websites using Next.js and modern frameworks. Optimized for speed, SEO, and conversions.",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description:
      "Pixel-perfect interfaces designed to captivate your audience. Every interaction is deliberate, every choice drives results.",
  },
  {
    num: "03",
    title: "SEO & Performance",
    description:
      "Technical SEO baked into every build. Schema markup, Core Web Vitals optimization, and 95+ Lighthouse scores guaranteed.",
  },
  {
    num: "04",
    title: "AI Integration",
    description:
      "AI-powered chatbots, booking systems, and automation tools that work while you sleep. Future-proof your business.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(".services-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Stagger service items
      gsap.from(".service-item", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-list",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - title */}
          <div>
            <p className="text-label mb-6 services-title">What We Do</p>
            <h2 className="text-display services-title">
              Services built for growth
            </h2>
          </div>

          {/* Right side - service list */}
          <div className="service-list">
            {services.map((service, i) => (
              <div
                key={service.num}
                className={`service-item group py-8 ${
                  i < services.length - 1 ? "border-b border-[#E8E4DC]" : ""
                }`}
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="text-label mt-1 shrink-0">
                    {service.num}
                  </span>
                  <div>
                    <h3 className="text-heading text-xl md:text-2xl mb-3 group-hover:translate-x-2 transition-transform duration-500">
                      {service.title}
                    </h3>
                    <p className="text-body-lg text-base max-w-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
