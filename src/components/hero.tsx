'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MagneticButton } from './MagneticButton'

const heroLines = ['WE BUILD', 'WEBSITES', 'THAT PRINT', 'MONEY.']

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show everything immediately
      const els = containerRef.current?.querySelectorAll('.hero-line-inner, .hero-eyebrow, .hero-sub, .hero-ctas, .hero-trust')
      els?.forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.clipPath = 'none'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }

    // Wait for preloader to finish
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // Eyebrow fade + slide
        tl.fromTo('.hero-eyebrow',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0
        )

        // Hero lines — clip-path reveal from below
        const lines = containerRef.current?.querySelectorAll('.hero-line-inner')
        if (lines) {
          lines.forEach((line, i) => {
            tl.fromTo(line,
              {
                clipPath: 'inset(100% 0 0 0)',
                y: 60,
              },
              {
                clipPath: 'inset(0% 0 0 0)',
                y: 0,
                duration: 1.4,
                ease: 'power4.out',
              },
              0.1 + i * 0.12
            )
          })
        }

        // Subheadline
        tl.fromTo('.hero-sub',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          0.7
        )

        // CTAs
        tl.fromTo('.hero-ctas',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.9
        )

        // Trust bar
        tl.fromTo('.hero-trust',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          1.1
        )

        // Scroll indicator
        tl.fromTo('.hero-scroll-indicator',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.4
        )
      }, containerRef)

      return () => ctx.revert()
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-[radial-gradient(circle,rgba(255,77,0,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-36 pb-20 md:pt-40 md:pb-24">
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-8 md:mb-10" style={{ opacity: 0 }}>
          <span
            className="inline-flex items-center gap-2 text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase font-medium text-[#FF4D00]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            <span className="w-8 h-[1px] bg-[#FF4D00] inline-block" />
            AI-Powered Web Agency
          </span>
        </div>

        {/* Headline — each line wrapped for clip-path reveal */}
        <div className="space-y-0">
          {heroLines.map((line, i) => (
            <div key={i} className="hero-line-wrapper overflow-hidden">
              <h1
                className="hero-line-inner"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: line === 'MONEY.' ? '#FF4D00' : '#F5F5F0',
                  clipPath: 'inset(100% 0 0 0)',
                }}
              >
                {line}
              </h1>
            </div>
          ))}
        </div>

        {/* Subheadline */}
        <p
          className="hero-sub mt-10 md:mt-14 max-w-[520px] text-[#888] text-base md:text-lg leading-[1.7]"
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            opacity: 0,
          }}
        >
          Premium websites delivered in 48 hours. Stunning design.
          Blazing fast. Real results.
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-8 md:mt-10 flex flex-wrap gap-4" style={{ opacity: 0 }}>
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center px-9 py-4.5 bg-[#FF4D00] text-[#0A0A0A] rounded-full text-sm font-semibold tracking-[0.05em] uppercase hover:bg-[#FF6B2C] transition-colors duration-300"
          >
            Start a Project
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#work"
            className="inline-flex items-center px-9 py-4.5 bg-transparent text-[#F5F5F0] rounded-full text-sm font-medium tracking-[0.05em] uppercase border border-white/15 hover:border-white/40 transition-all duration-300"
          >
            View Work
          </MagneticButton>
        </div>

        {/* Trust bar */}
        <div
          className="hero-trust mt-12 flex flex-wrap items-center gap-6 text-sm text-[#555]"
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            opacity: 0,
          }}
        >
          <span className="flex items-center gap-2">
            <span className="text-[#FF4D00] font-semibold">50+</span> Sites Built
          </span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span className="flex items-center gap-2">
            <span className="text-[#FF4D00] font-semibold">48hr</span> Delivery
          </span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span className="flex items-center gap-2">
            <span className="text-[#FF4D00] font-semibold">5.0&#9733;</span> Rating
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-[#555] rotate-0"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#FF4D00] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
