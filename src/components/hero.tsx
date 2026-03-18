"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal — each word slides up
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(
        line1Ref.current!.querySelectorAll(".word > span"),
        {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.08,
        },
        0.3
      )
        .from(
          line2Ref.current!.querySelectorAll(".word > span"),
          {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.08,
          },
          0.5
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 1,
          },
          1.0
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          1.2
        )
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            duration: 0.8,
          },
          1.5
        );

      // Parallax on scroll
      gsap.to(line1Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(line2Ref.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(subtitleRef.current, {
        yPercent: -10,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block overflow-hidden mr-[0.25em]">
        <span className="inline-block">{word}</span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-20"
    >
      <div className="mx-auto max-w-[1400px] w-full">
        <div ref={line1Ref} className="text-hero">
          {renderWords("Build")}
        </div>
        <div ref={line2Ref} className="text-hero mt-2">
          {renderWords("What's Next")}
        </div>

        <p
          ref={subtitleRef}
          className="text-body-lg mt-10 max-w-xl"
        >
          We craft stunning, high-converting websites in 48 hours using
          AI-powered development. Starting at $500.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-5">
          <a href="#pricing" className="btn-primary">
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#portfolio" className="btn-outline">
            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-label text-xs">Scroll</span>
        <ArrowDown size={16} className="text-[#8A8580] animate-bounce" />
      </div>
    </section>
  );
}
