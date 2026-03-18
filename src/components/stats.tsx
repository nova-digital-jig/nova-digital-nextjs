'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target: number, isDecimal?: boolean) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const actualTarget = isDecimal ? target * 10 : target
    const steps = 60
    const increment = actualTarget / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= actualTarget) {
        setCount(actualTarget)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(interval)
  }, [started, target, isDecimal])

  const display = isDecimal ? (count / 10).toFixed(1) : count
  return { display, ref }
}

const stats = [
  { value: 50, suffix: '+', label: 'Sites Built', isDecimal: false },
  { value: 48, suffix: 'hr', label: 'Delivery', isDecimal: false },
  { value: 4.9, suffix: '★', label: 'Rating', isDecimal: true },
]

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-white/[0.06]">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, suffix, label, isDecimal }: {
  value: number; suffix: string; label: string; isDecimal: boolean
}) {
  const { display, ref } = useCountUp(value, isDecimal)
  return (
    <div ref={ref} className="stat-item text-center py-4 md:py-0">
      <div className="text-[clamp(3rem,7vw,6rem)] font-bold tracking-tight leading-none">
        {display}
        <span className="gradient-text">{suffix}</span>
      </div>
      <p className="text-[#555] text-sm tracking-[0.2em] uppercase mt-4">{label}</p>
    </div>
  )
}
