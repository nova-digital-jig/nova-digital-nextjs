'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const text = 'DESIGN \u00B7 DEVELOP \u00B7 DEPLOY \u00B7 '
  const repeated = text.repeat(8)

  return (
    <section
      ref={sectionRef}
      className="py-6 border-t border-b border-white/[0.08] overflow-hidden opacity-0"
    >
      <div className="marquee-track">
        <span
          className="text-[1.1rem] font-medium uppercase tracking-[0.1em] text-white/[0.2] whitespace-nowrap"
          style={{ fontFamily: 'var(--font-syne), sans-serif' }}
        >
          {repeated}
        </span>
        <span
          className="text-[1.1rem] font-medium uppercase tracking-[0.1em] text-white/[0.2] whitespace-nowrap"
          style={{ fontFamily: 'var(--font-syne), sans-serif' }}
        >
          {repeated}
        </span>
      </div>
    </section>
  )
}
