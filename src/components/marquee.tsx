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
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const text = 'DESIGN \u00B7 DEVELOP \u00B7 DEPLOY \u00B7 '
  const repeated = Array(8).fill(text).join('')
  const trackContent = (
    <span
      className="text-[1.1rem] font-medium uppercase tracking-[0.12em] text-white/[0.15] whitespace-nowrap"
      style={{ fontFamily: 'var(--font-syne), sans-serif' }}
    >
      {repeated}
    </span>
  )

  return (
    <section
      ref={sectionRef}
      className="py-5 md:py-6 border-t border-b border-white/[0.06] overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div className="marquee-track">
        {trackContent}
        {trackContent}
      </div>
    </section>
  )
}
