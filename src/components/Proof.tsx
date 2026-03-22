'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { value: '50+', label: 'businesses automated' },
  { value: '24/7', label: 'always online' },
  { value: '60s', label: 'average response time' },
]

export default function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      statsRef.current.forEach((el) => {
        if (el) el.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Each stat crossfades in sequence
      statsRef.current.forEach((stat, i) => {
        if (!stat) return

        const valueEl = stat.querySelector('.stat-value')
        const labelEl = stat.querySelector('.stat-label')
        const lineEl = stat.querySelector('.stat-line')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.5,
          },
        })

        tl.fromTo(
          lineEl,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: 'power3.out' }
        )
          .fromTo(
            valueEl,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.2'
          )
          .fromTo(
            labelEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.3'
          )

        // Stagger delay based on index
        if (i > 0) {
          tl.delay(i * 0.1)
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Proof: key performance metrics"
      className="relative min-h-screen px-6 md:px-16 lg:px-24 py-24 md:py-36 flex items-center"
      style={{ backgroundColor: '#0D0F1A' }}
    >
      {/* Subtle orb */}
      <div
        className="gradient-orb"
        style={{
          width: '500px',
          height: '500px',
          top: '10%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(255, 77, 0, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-3xl relative z-10">
        <div className="flex flex-col gap-14 md:gap-20">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { statsRef.current[i] = el }}
              className="opacity-0"
              data-animate
            >
              {/* Horizontal line */}
              <div
                className="stat-line w-full h-px bg-accent/20 mb-8 origin-left"
                style={{ transform: 'scaleX(0)' }}
              />

              <div className="flex flex-col md:flex-row md:items-end md:gap-8">
                <span
                  className="stat-value font-[family-name:var(--font-syne)] font-bold gradient-text-stat block"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span className="stat-label font-[family-name:var(--font-inter)] text-muted text-sm md:text-base tracking-wide mt-2 md:mt-0 md:mb-2">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
