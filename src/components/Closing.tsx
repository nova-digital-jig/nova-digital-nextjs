'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null)
  const readyRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      ;[readyRef, descRef, linksRef, noteRef].forEach((ref) => {
        if (ref.current) ref.current.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // "Ready?" — massive text
      gsap.fromTo(
        readyRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      )

      // Description
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      )

      // Links
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.5,
          },
        }
      )

      // Note
      gsap.fromTo(
        noteRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: noteRef.current,
            start: 'top 85%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 md:py-36"
    >
      {/* Radial gradient glow behind Ready? */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 77, 0, 0.08) 0%, transparent 55%)',
        }}
      />

      {/* Ready? */}
      <h2
        ref={readyRef}
        className="font-[family-name:var(--font-syne)] font-bold gradient-text-warm opacity-0 relative z-10"
        data-animate
        style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', lineHeight: 1 }}
      >
        Ready?
      </h2>

      {/* Description */}
      <p
        ref={descRef}
        className="mt-8 md:mt-12 font-[family-name:var(--font-inter)] text-foreground/70 max-w-md leading-relaxed opacity-0 relative z-10"
        style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}
      >
        Book a free demo. We&apos;ll show you exactly how it works.
      </p>

      {/* Links */}
      <div
        ref={linksRef}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 opacity-0 relative z-10"
      >
        <a
          href="https://calendly.com/jigpatel01234"
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer-btn inline-flex items-center px-8 py-3 border border-accent/40 rounded-full font-[family-name:var(--font-inter)] text-accent text-base md:text-lg hover:border-accent/60 transition-all duration-300 hover:text-accent-hover min-h-[44px]"
        >
          book a call
        </a>
        <span className="hidden sm:block text-muted">/</span>
        <a
          href="tel:+19786063386"
          className="font-[family-name:var(--font-inter)] text-foreground text-base md:text-lg hover:text-foreground/70 transition-colors duration-300 min-h-[44px] flex items-center"
        >
          (978) 606-3386
        </a>
      </div>

      {/* Note */}
      <p
        ref={noteRef}
        className="mt-10 font-[family-name:var(--font-inter)] text-muted text-xs tracking-[0.15em] uppercase opacity-0 relative z-10"
      >
        No contracts. Cancel anytime.
      </p>
    </section>
  )
}
