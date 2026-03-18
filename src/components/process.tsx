"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery",
    description:
      "A 15-minute call to understand your business, goals, and competition. We define the scope and timeline.",
  },
  {
    num: "02",
    title: "Design",
    description:
      "AI-assisted wireframes and conversion-optimized layouts. You approve the design before any code is written.",
  },
  {
    num: "03",
    title: "Develop",
    description:
      "We build your site with modern tech, bake in SEO, and optimize every pixel for performance. All in 48 hours.",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "Your site goes live with analytics, monitoring, and our support to ensure you see results from day one.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Each step: large number slides in, text fades up
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        const num = step.querySelector(".step-num");
        const text = step.querySelector(".step-text");

        gsap.from(num, {
          opacity: 0,
          x: -40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        });

        gsap.from(text, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-label mb-6 process-title">How It Works</p>
        <h2 className="text-display mb-20 md:mb-28 process-title">
          From idea to<br />
          launch, simplified
        </h2>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`process-step grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 ${
                i < steps.length - 1 ? "border-b border-[#E8E4DC]" : ""
              }`}
            >
              {/* Large number */}
              <div className="step-num md:col-span-3 lg:col-span-2">
                <span
                  className="text-[clamp(4rem,8vw,8rem)] font-medium leading-none tracking-tighter text-[#E8E4DC]"
                >
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <div className="step-text md:col-span-3 lg:col-span-4 flex items-center">
                <h3 className="text-heading text-2xl md:text-3xl lg:text-4xl">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <div className="step-text md:col-span-6 flex items-center">
                <p className="text-body-lg max-w-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
