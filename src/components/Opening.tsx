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
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)

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

      // Floating orbs
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: '+=20',
          duration: 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: '-=20',
          duration: 8,
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
      className="relative h-[180vh]"
      aria-label="Vektor — AI that moves your business forward"
    >
      {/* Deep indigo-to-black gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0D0F2A 0%, #080A1A 30%, #050505 70%)',
        }}
      />

      {/* Gradient orbs for ambient depth */}
      <div
        ref={orb1Ref}
        className="gradient-orb"
        style={{
          width: '500px',
          height: '500px',
          top: '15%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(255, 77, 0, 0.05) 0%, transparent 70%)',
        }}
      />
      <div
        ref={orb2Ref}
        className="gradient-orb"
        style={{
          width: '400px',
          height: '400px',
          bottom: '25%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Grain overlay - opening only */}
      <div ref={grainRef} className="grain-overlay" />

      {/* Sticky container */}
      <div className="sticky top-0 h-[80vh] flex flex-col items-center justify-center px-6">
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
          className="mt-8 font-[family-name:var(--font-inter)] text-sm md:text-base tracking-[0.2em] uppercase opacity-0"
          style={{ color: 'rgba(255, 77, 0, 0.7)' }}
        >
          AI that moves your business forward.
        </p>
      </div>
    </section>
  )
}
