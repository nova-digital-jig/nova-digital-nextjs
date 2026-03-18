'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = sectionRef.current?.querySelectorAll('.cta-line')
      if (!lines) return

      gsap.fromTo(lines,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.cta-text', start: 'top 85%' }
        }
      )

      gsap.fromTo('.cta-sub',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-sub', start: 'top 90%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-32 md:py-44 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <div className="cta-text">
          <div className="overflow-hidden">
            <h2 className="cta-line text-massive text-white/95">LET&apos;S</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="cta-line text-massive gradient-text">BUILD.</h2>
          </div>
        </div>

        <div className="cta-sub mt-12 max-w-lg mx-auto">
          <p className="text-lg text-[#666] font-light leading-relaxed mb-10">
            Ready to start? Get in touch and we&apos;ll have a proposal
            for you within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:jigpatel01234@gmail.com?subject=Website%20Inquiry"
              className="btn-primary"
            >
              Get in Touch
            </a>
            <a
              href="tel:978-606-3386"
              className="btn-outline"
            >
              (978) 606-3386
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
