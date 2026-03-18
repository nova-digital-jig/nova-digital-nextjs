'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 95%' }
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/[0.06] bg-[#050505] opacity-0"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Logo */}
        <div className="mb-12">
          <a
            href="#"
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
          >
            <span className="text-[#F5F5F0]">NOVA</span>
            <span className="text-[#FF4D00]">.</span>
          </a>
        </div>

        {/* Contact row */}
        <div
          className="flex flex-wrap gap-8 text-sm text-[#888] mb-12"
          style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          <a
            href="mailto:jigpatel01234@gmail.com"
            className="hover:text-[#F5F5F0] transition-colors duration-300"
          >
            jigpatel01234@gmail.com
          </a>
          <a
            href="tel:978-606-3386"
            className="hover:text-[#F5F5F0] transition-colors duration-300"
          >
            (978) 606-3386
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-8">
          <p
            className="text-xs text-[#555]"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            &copy; 2026 Nova Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
