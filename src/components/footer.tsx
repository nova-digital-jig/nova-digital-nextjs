'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll('.footer-animate')
      items?.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
            delay: i * 0.08,
          }
        )
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/[0.06] bg-[#050505]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          <div className="footer-animate" style={{ opacity: 0 }}>
            <a
              href="#"
              className="text-2xl font-bold tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            >
              <span className="text-[#F0EDE6]">NOVA</span>
              <span className="text-[#FF4D00]">.</span>
            </a>
            <p
              className="text-[#555] text-sm mt-3 max-w-xs leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              AI-powered web agency delivering premium websites that drive real results.
            </p>
          </div>

          <div className="footer-animate flex flex-col gap-3" style={{ opacity: 0 }}>
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-[#555] mb-1"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              Contact
            </span>
            <a
              href="mailto:jigpatel01234@gmail.com"
              className="text-sm text-[#666] hover:text-[#F0EDE6] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              jigpatel01234@gmail.com
            </a>
            <a
              href="tel:978-606-3386"
              className="text-sm text-[#666] hover:text-[#F0EDE6] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              (978) 606-3386
            </a>
          </div>
        </div>

        <div className="footer-animate border-t border-white/[0.04] pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ opacity: 0 }}>
          <p
            className="text-[11px] text-[#444] tracking-wide"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            &copy; 2026 Nova Digital. All rights reserved.
          </p>
          <p
            className="text-[11px] text-[#333]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Designed & built with precision
          </p>
        </div>
      </div>
    </footer>
  )
}
