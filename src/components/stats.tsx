'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '50+', label: 'Sites Built', numericEnd: 50, suffix: '+' },
  { value: '48hr', label: 'Avg. Delivery', numericEnd: 48, suffix: 'hr' },
  { value: '5.0★', label: 'Client Rating', numericEnd: 5.0, suffix: '★', isDecimal: true },
]

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.stat-item')
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%' },
            delay: i * 0.12,
          }
        )
      })

      valueRefs.current.forEach((el, i) => {
        if (!el) return

        const st = stats[i]

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: st.numericEnd,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: () => {
                if (st.isDecimal) {
                  el.textContent = obj.val.toFixed(1) + st.suffix
                } else {
                  el.textContent = Math.floor(obj.val) + st.suffix
                }
              },
            })
          },
        })
      })

      const dividers = sectionRef.current?.querySelectorAll('.stat-divider')
      dividers?.forEach((div, i) => {
        gsap.fromTo(div,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: div, start: 'top 88%' },
            delay: i * 0.1 + 0.2,
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 bg-[#0D0D0D]">
      <div className="grain" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div className="stat-divider hidden md:block w-[1px] h-24 bg-white/[0.06] mr-auto" style={{ transform: 'scaleY(0)' }} />
              )}

              <div className="stat-item text-center flex-1" style={{ opacity: 0 }}>
                <span
                  ref={(el) => { valueRefs.current[i] = el }}
                  className="block text-[clamp(3.5rem,7vw,5rem)] font-bold tracking-[-0.03em] leading-none text-[#FF4D00]"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {stat.value}
                </span>
                <p
                  className="text-[#666] text-xs md:text-sm tracking-[0.25em] uppercase mt-5"
                  style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
