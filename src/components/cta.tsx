"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(".cta-line", {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".cta-sub", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      gsap.from(".cta-buttons", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-52 px-6 md:px-10 border-t border-[#E8E4DC]"
    >
      <div className="mx-auto max-w-[1400px] text-center">
        <h2 className="text-hero cta-line">Ready to</h2>
        <h2 className="text-hero cta-line">Build?</h2>

        <p className="cta-sub text-body-lg mt-10 max-w-lg mx-auto">
          Let&apos;s talk about your project. Book a free 15-minute
          strategy call and get a custom proposal within 24 hours.
        </p>

        <div className="cta-buttons mt-12 flex flex-wrap items-center justify-center gap-5">
          <a href="tel:978-606-3386" className="btn-primary">
            (978) 606-3386
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="mailto:jigpatel01234@gmail.com?subject=Website%20Inquiry"
            className="btn-outline"
          >
            jigpatel01234@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
