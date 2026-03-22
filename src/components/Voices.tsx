'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TESTIMONIALS = [
  {
    quote:
      "We were losing 30+ calls a week. Now every single one gets answered, booked, and followed up. It's like hiring three people for the price of one.",
    name: 'Sarah Chen',
    business: 'Bright Smile Dental',
  },
  {
    quote:
      "I was skeptical about AI handling my clients. But the responses are so natural, most people don't even realize they're talking to an agent.",
    name: 'Marcus Rivera',
    business: 'Rivera Home Services',
  },
  {
    quote:
      'Setup took less than a week. Within the first month, we booked 40% more appointments without changing anything else.',
    name: 'Jennifer Walsh',
    business: 'Pure Glow Med Spa',
  },
]

export default function Voices() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = '1'
      cardsRef.current.forEach((el) => {
        if (el) el.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      )

      // Each testimonial reveals
      cardsRef.current.forEach((card) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-16 lg:px-24 py-32 md:py-48"
    >
      <h2
        ref={headingRef}
        className="font-[family-name:var(--font-syne)] font-bold text-foreground opacity-0 mb-20 md:mb-32"
        style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
      >
        What they say.
      </h2>

      <div className="flex flex-col gap-16 md:gap-24 max-w-3xl">
        {TESTIMONIALS.map((testimonial, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            className="relative opacity-0"
            data-animate
          >
            {/* Large quote mark */}
            <span
              className="absolute -top-8 -left-2 font-[family-name:var(--font-syne)] font-bold text-foreground/[0.06] select-none pointer-events-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 10rem)', lineHeight: 1 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Quote */}
            <blockquote className="relative z-10">
              <p
                className="font-[family-name:var(--font-inter)] font-light italic text-foreground/80 leading-[1.8]"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-2">
                <span className="font-[family-name:var(--font-inter)] text-foreground text-sm font-medium">
                  {testimonial.name}
                </span>
                <span className="text-muted text-sm">/</span>
                <span className="font-[family-name:var(--font-inter)] text-muted text-sm">
                  {testimonial.business}
                </span>
              </footer>
            </blockquote>

            {/* Separator */}
            {i < TESTIMONIALS.length - 1 && (
              <div className="mt-16 md:mt-24 w-full h-px bg-foreground/[0.06]" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
