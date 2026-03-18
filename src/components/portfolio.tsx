"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Lucas Hair Salon",
    category: "Beauty & Wellness",
    url: "https://lucas-hair-salon.vercel.app",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
    imageAlt: "Modern hair salon interior",
  },
  {
    title: "Edison Barbershop",
    category: "Local Business",
    url: "https://edison-barbershop.vercel.app",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80",
    imageAlt: "Classic barbershop setup",
  },
  {
    title: "Ram's Garage",
    category: "Automotive",
    url: "https://rams-garage.vercel.app",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80",
    imageAlt: "Auto repair garage",
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(".portfolio-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Horizontal scroll
      const horizontal = horizontalRef.current;
      const scrollContainer = scrollContainerRef.current;
      if (!horizontal || !scrollContainer) return;

      const getScrollWidth = () =>
        horizontal.scrollWidth - scrollContainer.offsetWidth;

      gsap.to(horizontal, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio">
      {/* Title section */}
      <div className="py-20 px-6 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-label mb-6 portfolio-title">Selected Work</p>
          <h2 className="text-display portfolio-title">
            Projects that<br />
            deliver results
          </h2>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div ref={scrollContainerRef} className="h-screen overflow-hidden">
        <div
          ref={horizontalRef}
          className="horizontal-scroll-wrapper h-full items-center gap-8 px-6 md:px-10"
        >
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[85vw] md:w-[60vw] lg:w-[45vw] h-[70vh] shrink-0"
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700" />

                {/* Arrow */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={20} className="text-[#1A1A1A]" />
                </div>
              </div>

              {/* Project info */}
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#8A8580] mt-1">
                    {project.category}
                  </p>
                </div>
                <span className="text-label mt-1">View</span>
              </div>
            </a>
          ))}

          {/* Extra padding at end */}
          <div className="w-20 shrink-0" />
        </div>
      </div>
    </section>
  );
}
