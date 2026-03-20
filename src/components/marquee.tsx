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

  const items = ['DESIGN', 'DEVELOP', 'DEPLOY', 'AUTOMATE']
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items]
  const track = repeated.map((item, i) => (
    <span key={i} className="flex items-center gap-6 md:gap-10">
      <span
        className="text-[1.2rem] md:text-[1.4rem] font-semibold uppercase tracking-[0.12em] text-white/[0.15] whitespace-nowrap"
        style={{ fontFamily: 'var(--font-syne), sans-serif' }}
      >
        {item}
      </span>
      <span className="text-[#FF4D00]/30 text-xs">&#9670;</span>
    </span>
  ))

  return (
    <section
      ref={sectionRef}
      className="py-5 md:py-6 border-t border-b border-white/[0.06] overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div className="marquee-track gap-6 md:gap-10">
        {track}
        {track}
      </div>
    </section>
  )
}
