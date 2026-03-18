'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
        0.8
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
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
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

        <div className="mt-12 md:mt-16 max-w-xl">
          <p className="hero-sub text-lg md:text-xl text-[#777] font-light leading-relaxed">
            Premium AI-powered websites delivered in 48 hours.
            Stunning design. Blazing performance. Real results.
          </p>
        </div>

        <div className="hero-buttons mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary">Start a Project</a>
          <a href="#work" className="btn-outline">View Work</a>
        </div>
      </div>
    </section>
  )
}
