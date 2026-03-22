'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CAPABILITIES =
  'ANSWERS CALLS \u00B7 BOOKS APPOINTMENTS \u00B7 FOLLOWS UP \u00B7 HANDLES EMAIL \u00B7 SENDS REPORTS \u00B7 NEVER CALLS IN SICK \u00B7 '

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      ;[line1Ref, line2Ref, line3Ref, marqueeRef].forEach((ref) => {
        if (ref.current) ref.current.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Line 1: "What if you had"
      gsap.fromTo(
        line1Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      )

      // Line 2: "an employee" - the hero text
      gsap.fromTo(
        line2Ref.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      )

      // Line 3: "who never sleeps?"
      gsap.fromTo(
        line3Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      )

      // Marquee fade in
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.5,
          },
        }
      )

      // Floating orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: '-=20',
          duration: 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-36"
    >
      {/* Subtle radial gradient behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center 40%, rgba(255, 77, 0, 0.04) 0%, transparent 60%)',
        }}
      />

      {/* Floating orb */}
      <div
        ref={orbRef}
        className="gradient-orb"
        style={{
          width: '350px',
          height: '350px',
          top: '30%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(255, 77, 0, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Text block */}
      <div className="text-center px-6 relative z-10">
        <div ref={line1Ref} className="opacity-0" data-animate>
          <span
            className="font-[family-name:var(--font-syne)] font-light text-foreground block"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
          >
            What if you had
          </span>
        </div>

        <div ref={line2Ref} className="opacity-0 my-2 md:my-4" data-animate>
          <span
            className="font-[family-name:var(--font-syne)] font-bold gradient-text-warm block"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1.1 }}
          >
            an employee
          </span>
        </div>

        <div ref={line3Ref} className="opacity-0" data-animate>
          <span
            className="font-[family-name:var(--font-syne)] font-light text-foreground block"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
          >
            who <span className="text-accent">never</span> sleeps?
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="w-full mt-16 md:mt-24 overflow-hidden opacity-0"
        aria-label="AI agent capabilities"
      >
        <div className="marquee-track">
          {/* Duplicate for seamless loop */}
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="font-[family-name:var(--font-inter)] text-muted text-xs md:text-sm tracking-[0.3em] uppercase whitespace-nowrap px-2"
            >
              {CAPABILITIES}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
