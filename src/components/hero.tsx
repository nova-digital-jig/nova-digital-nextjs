'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MagneticButton } from './MagneticButton'

const heroLines = ['WE BUILD', 'WEBSITES', 'THAT PRINT', 'MONEY.']

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Wait for preloader to finish (~2.5s)
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // Eyebrow
        tl.fromTo('.hero-eyebrow',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0
        )

        // Hero lines with clip-path reveal
        const lines = containerRef.current?.querySelectorAll('.hero-line-inner')
        if (lines) {
          lines.forEach((line, i) => {
            tl.fromTo(line,
              { y: '100%', opacity: 0 },
              { y: '0%', opacity: 1, duration: 1.2 },
              0.15 + i * 0.1
            )
          })
        }

        // Subheadline
        tl.fromTo('.hero-sub',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.7
        )

        // CTAs
        tl.fromTo('.hero-ctas',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.9
        )

        // Trust bar
        tl.fromTo('.hero-trust',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.1
        )
      }, containerRef)

      return () => ctx.revert()
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle,rgba(255,77,0,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-8 opacity-0">
          <span
            className="text-[0.75rem] tracking-[0.15em] uppercase font-medium text-[#FF4D00]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            AI-Powered Web Agency
          </span>
        </div>

        {/* Headline */}
        {heroLines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <h1
              className="hero-line-inner will-change-transform"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: '#F5F5F0',
                opacity: 0,
              }}
            >
              {line}
            </h1>
          </div>
        ))}

        {/* Subheadline */}
        <p
          className="hero-sub mt-10 md:mt-14 max-w-[500px] text-[#888] text-base md:text-lg leading-[1.6] opacity-0"
          style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          Premium websites delivered in 48 hours. Stunning design.
          Blazing fast. Real results.
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-8 flex flex-wrap gap-4 opacity-0">
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-[#FF4D00] text-[#0A0A0A] rounded-full text-sm font-semibold tracking-wide hover:bg-[#FF6B2C] transition-colors duration-300"
          >
            Start a Project
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#work"
            className="inline-flex items-center px-8 py-4 bg-transparent text-[#F5F5F0] rounded-full text-sm font-medium tracking-wide border border-white/20 hover:border-white/60 transition-colors duration-300"
          >
            View Work
          </MagneticButton>
        </div>

        {/* Trust bar */}
        <div
          className="hero-trust mt-10 flex flex-wrap items-center gap-4 text-sm text-[#888] opacity-0"
          style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          <span>50+ Sites Built</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span>48hr Delivery</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span>5.0&#9733; Rating</span>
        </div>
      </div>
    </section>
  )
}
