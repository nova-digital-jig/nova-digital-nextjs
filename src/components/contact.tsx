'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = sectionRef.current?.querySelectorAll('.cta-line')
      if (lines) {
        lines.forEach((line, i) => {
          gsap.fromTo(line,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0 0% 0)', opacity: 1,
              duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: line, start: 'top 85%' },
              delay: i * 0.15,
            }
          )
        })
      }

      gsap.fromTo('.cta-sub',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-sub', start: 'top 85%' }
        }
      )

      gsap.fromTo('.cta-buttons',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-buttons', start: 'top 90%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(255,77,0,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <div className="overflow-hidden">
          <h2
            className="cta-line"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#F5F5F0',
            }}
          >
            LET&apos;S
          </h2>
        </div>
        <div className="overflow-hidden">
          <h2
            className="cta-line"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#FF4D00',
            }}
          >
            BUILD.
          </h2>
        </div>

        <p
          className="cta-sub mt-10 text-[#888] text-base md:text-lg max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          Ready to start? We&apos;ll have a proposal within 24 hours.
        </p>

        <div className="cta-buttons mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as="a"
            href="mailto:jigpatel01234@gmail.com"
            className="inline-flex items-center px-10 py-5 bg-[#FF4D00] text-[#0A0A0A] rounded-full text-base font-semibold tracking-wide hover:bg-[#FF6B2C] transition-colors duration-300"
          >
            Get in Touch
          </MagneticButton>
          <MagneticButton
            as="a"
            href="tel:978-606-3386"
            className="inline-flex items-center px-10 py-5 bg-transparent text-[#F5F5F0] rounded-full text-base font-medium tracking-wide border border-white/20 hover:border-white/60 transition-colors duration-300"
          >
            (978) 606-3386
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
