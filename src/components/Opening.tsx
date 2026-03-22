'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LETTERS = ['v', 'e', 'k', 't', 'o', 'r']

export default function Opening() {
  const sectionRef = useRef<HTMLElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      lettersRef.current.forEach((el) => {
        if (el) el.style.opacity = '1'
      })
      if (taglineRef.current) taglineRef.current.style.opacity = '1'
      return
    }

    const ctx = gsap.context(() => {
      // Letters fade in one by one on scroll
      lettersRef.current.forEach((letter, i) => {
        if (!letter) return
        gsap.fromTo(
          letter,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `${5 + i * 8}% top`,
              end: `${15 + i * 8}% top`,
              scrub: 0.5,
            },
          }
        )
      })

      // Tagline fades in after all letters
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: '60% top',
            end: '75% top',
            scrub: 0.5,
          },
        }
      )

      // Grain fades out as we leave opening
      gsap.to(grainRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: '80% top',
          end: '100% top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
      aria-label="Vektor — AI that moves your business forward"
    >
      {/* Grain overlay - opening only */}
      <div ref={grainRef} className="grain-overlay" />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Logo letters */}
        <div className="flex items-center justify-center" aria-hidden="true">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el }}
              className="font-[family-name:var(--font-syne)] font-bold text-foreground opacity-0 select-none"
              data-animate
              style={{
                fontSize: 'clamp(3rem, 15vw, 12rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-8 font-[family-name:var(--font-inter)] text-muted text-sm md:text-base tracking-[0.2em] uppercase opacity-0"
        >
          AI that moves your business forward.
        </p>
      </div>
    </section>
  )
}
