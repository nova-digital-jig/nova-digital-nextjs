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
      // Each massive text line — clip-path reveal from below
      const lines = sectionRef.current?.querySelectorAll('.cta-line-inner')
      lines?.forEach((line, i) => {
        gsap.fromTo(line,
          {
            clipPath: 'inset(100% 0 0 0)',
            y: 80,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: { trigger: line, start: 'top 85%' },
            delay: i * 0.15,
          }
        )
      })

      // Subtitle
      gsap.fromTo('.cta-sub',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-sub', start: 'top 88%' }
        }
      )

      // Buttons
      gsap.fromTo('.cta-buttons',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-buttons', start: 'top 90%' }
        }
      )

      // Decorative line
      gsap.fromTo('.cta-divider',
        { scaleX: 0, transformOrigin: 'center' },
        {
          scaleX: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-divider', start: 'top 90%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-36 md:py-52 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle,rgba(255,77,0,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        {/* Massive headline — Felix Nieto style */}
        <div className="space-y-0">
          <div className="overflow-hidden">
            <h2
              className="cta-line-inner"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(5rem, 15vw, 14rem)',
                fontWeight: 800,
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                color: '#F5F5F0',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              LET&apos;S
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="cta-line-inner"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(5rem, 15vw, 14rem)',
                fontWeight: 800,
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                color: '#FF4D00',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              BUILD.
            </h2>
          </div>
        </div>

        {/* Decorative divider */}
        <div
          className="cta-divider w-24 h-[1px] bg-[#FF4D00]/30 mx-auto mt-12"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Subtitle */}
        <p
          className="cta-sub mt-8 text-[#888] text-base md:text-lg max-w-md mx-auto leading-relaxed"
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            opacity: 0,
          }}
        >
          Ready to start? We&apos;ll have a proposal within 24 hours.
        </p>

        {/* CTA buttons */}
        <div
          className="cta-buttons mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <MagneticButton
            as="a"
            href="mailto:jigpatel01234@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#FF4D00] text-[#0A0A0A] rounded-full text-base font-semibold tracking-[0.03em] hover:bg-[#FF6B2C] transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Get in Touch
          </MagneticButton>
          <MagneticButton
            as="a"
            href="tel:978-606-3386"
            className="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-[#F5F5F0] rounded-full text-base font-medium tracking-[0.03em] border border-white/15 hover:border-white/40 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            (978) 606-3386
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
