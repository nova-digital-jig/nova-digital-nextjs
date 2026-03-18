'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll('.hero-line')
      if (!lines) return

      gsap.set(lines, { y: 120, opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      lines.forEach((line, i) => {
        tl.to(line, {
          y: 0,
          opacity: 1,
          duration: 1.2,
        }, 0.15 * i)
      })

      tl.fromTo('.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.7
      )
      tl.fromTo('.hero-trust',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.9
      )
      tl.fromTo('.hero-buttons',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.0
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden grain">
      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Eyebrow */}
        <div className="hero-sub mb-8">
          <span className="text-label text-[#555] tracking-[0.2em]">AI-Powered Web Agency</span>
        </div>

        <div className="overflow-hidden">
          <h1 className="hero-line text-massive text-white/95 will-change-transform">WE BUILD</h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-massive gradient-text will-change-transform">WEBSITES</h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-massive text-white/95 will-change-transform">THAT PRINT</h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-massive gradient-text will-change-transform">MONEY.</h1>
        </div>

        <div className="mt-12 md:mt-16 max-w-2xl">
          <p className="hero-sub text-lg md:text-xl text-[#888] font-light leading-relaxed">
            Premium websites delivered in 48 hours, not 48 days.
            Stunning design. Blazing performance. Real results for your business.
            <span className="text-white/90 font-medium"> Starting at $500.</span>
          </p>
        </div>

        {/* Trust signals */}
        <div className="hero-trust mt-8 flex flex-wrap items-center gap-6 text-sm text-[#666]">
          <span className="flex items-center gap-1.5">
            <span className="text-[#8b5cf6]">&#9733;</span> 4.9 Rating
          </span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span>50+ Sites Built</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span>48hr Delivery</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span>Edison, NJ &mdash; Serving Nationwide</span>
        </div>

        <div className="hero-buttons mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary">
            <span>Start a Project</span>
          </a>
          <a href="#work" className="btn-outline">View Our Work</a>
        </div>
      </div>
    </section>
  )
}
