'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  '62% of calls go unanswered',
  '80% of leads never get a follow-up',
  '$200–500 lost per missed call',
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingLinesRef = useRef<(HTMLDivElement | null)[]>([])
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      headingLinesRef.current.forEach((el) => {
        if (el) el.style.opacity = '1'
      })
      statsRef.current.forEach((el) => {
        if (el) el.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Heading lines reveal
      headingLinesRef.current.forEach((line, i) => {
        if (!line) return
        gsap.fromTo(
          line,
          { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.6,
            },
          }
        )

        // Slight delay between lines
        if (i > 0) {
          gsap.set(line, { delay: i * 0.1 })
        }
      })

      // Stats fade in one at a time
      statsRef.current.forEach((stat, i) => {
        if (!stat) return
        gsap.fromTo(
          stat,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              end: 'top 65%',
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
      className="relative min-h-screen px-6 md:px-16 lg:px-24 py-32 md:py-48 flex flex-col justify-center"
    >
      {/* Heading */}
      <div className="max-w-4xl">
        {[
          { text: 'Every day,', accent: false },
          { text: 'your business loses money', accent: false },
          { text: 'while you sleep.', accent: true },
        ].map((line, i) => (
          <div
            key={i}
            ref={(el) => { headingLinesRef.current[i] = el }}
            className="opacity-0"
          >
            <span
              className={`font-[family-name:var(--font-syne)] font-bold block leading-[1.15] ${
                line.accent ? 'text-accent' : 'text-foreground'
              }`}
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {line.text}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-20 md:mt-32 max-w-xl flex flex-col gap-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            ref={(el) => { statsRef.current[i] = el }}
            className="opacity-0"
          >
            <div className="w-16 h-px bg-foreground/10 mb-4" />
            <p className="font-[family-name:var(--font-inter)] text-muted text-sm md:text-base tracking-wide leading-relaxed">
              {stat}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
