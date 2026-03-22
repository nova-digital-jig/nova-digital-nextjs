'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We spend 20 minutes learning your business.',
  },
  {
    number: '02',
    title: 'Build',
    description: 'In 5–7 days, your AI agent is configured and trained.',
  },
  {
    number: '03',
    title: 'Launch',
    description: 'Go live. Your agent works 24/7 from day one.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = '1'
      if (lineRef.current) lineRef.current.style.clipPath = 'inset(0 0 0% 0)'
      stepsRef.current.forEach((el) => {
        if (el) el.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      )

      // Timeline line draws itself
      gsap.fromTo(
        lineRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            end: 'bottom 70%',
            scrub: 0.3,
          },
        }
      )

      // Steps reveal as line reaches them
      stepsRef.current.forEach((step) => {
        if (!step) return
        gsap.fromTo(
          step,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
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
      id="process"
      className="relative min-h-screen px-6 md:px-16 lg:px-24 py-24 md:py-36"
    >
      {/* Grid pattern overlay */}
      <div className="grid-pattern" />

      <h2
        ref={headingRef}
        className="font-[family-name:var(--font-syne)] font-bold text-foreground opacity-0 mb-16 md:mb-24 relative z-10"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
      >
        <span className="text-accent mr-2">&mdash;</span>
        How it works.
      </h2>

      {/* Timeline */}
      <div className="relative max-w-2xl ml-0 md:ml-16 z-10">
        {/* Vertical line */}
        <div
          ref={lineRef}
          className="absolute left-0 top-0 bottom-0 w-px bg-accent/30"
          style={{ clipPath: 'inset(0 0 100% 0)' }}
        />

        {/* Steps */}
        <div className="flex flex-col gap-16 md:gap-24">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el }}
              className="relative pl-10 md:pl-16 opacity-0"
              data-animate
            >
              {/* Dot on the line */}
              <div className="absolute left-0 top-1 w-2.5 h-2.5 -translate-x-[4.5px] rounded-full bg-accent/60" />

              <span className="font-[family-name:var(--font-inter)] text-accent/70 text-xs tracking-[0.2em] uppercase">
                {step.number} — {step.title}
              </span>
              <p
                className="mt-3 font-[family-name:var(--font-inter)] text-foreground/80 leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
