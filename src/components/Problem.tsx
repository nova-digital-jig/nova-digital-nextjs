'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { number: '62%', text: 'of calls go unanswered' },
  { number: '80%', text: 'of leads never get a follow-up' },
  { number: '$200–500', text: 'lost per missed call' },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingLinesRef = useRef<(HTMLDivElement | null)[]>([])
  const statsRef = useRef<(HTMLDivElement | null)[]>([])
  const orbRef = useRef<HTMLDivElement>(null)

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
      statsRef.current.forEach((stat) => {
        if (!stat) return
        gsap.fromTo(
          stat,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.5,
            },
          }
        )
      })

      // Floating orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: '+=20',
          duration: 7,
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
      aria-label="The problem: missed calls cost your business"
      className="relative min-h-screen px-6 md:px-16 lg:px-24 py-24 md:py-36 flex flex-col justify-center"
      style={{
        background: 'linear-gradient(180deg, rgba(20, 10, 5, 1) 0%, #0A0A0A 100%)',
      }}
    >
      {/* Ambient orb */}
      <div
        ref={orbRef}
        className="gradient-orb"
        style={{
          width: '450px',
          height: '450px',
          top: '20%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(255, 77, 0, 0.04) 0%, transparent 70%)',
        }}
      />

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
            data-animate
          >
            <span
              className={`font-[family-name:var(--font-syne)] font-bold block leading-[1.15] ${
                line.accent ? 'gradient-text-warm' : 'text-foreground'
              }`}
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {line.text}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-16 md:mt-24 max-w-xl flex flex-col gap-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            ref={(el) => { statsRef.current[i] = el }}
            className="opacity-0"
            data-animate
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block flex-shrink-0" />
              <div className="w-12 h-px bg-foreground/10" />
            </div>
            <p className="font-[family-name:var(--font-inter)] text-sm md:text-base tracking-wide leading-relaxed">
              <span className="text-accent font-medium">{stat.number}</span>{' '}
              <span className="text-muted">{stat.text}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
