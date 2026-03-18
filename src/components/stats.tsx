'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target: number, suffix: string) {
  const [display, setDisplay] = useState('0')
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

    // Special case for "48hr" - just fade it in
    if (suffix === 'hr') {
      setDisplay('48')
      return
    }

    // Special case for "5.0★"
    if (suffix === '★') {
      let frame = 0
      const totalFrames = 40
      const animate = () => {
        frame++
        const progress = frame / totalFrames
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = eased * target
        setDisplay(current.toFixed(1))
        if (frame < totalFrames) requestAnimationFrame(animate)
        else setDisplay(target.toFixed(1))
      }
      requestAnimationFrame(animate)
      return
    }

    // Numeric count-up
    let frame = 0
    const totalFrames = 60
    const animate = () => {
      frame++
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * target).toString())
      if (frame < totalFrames) requestAnimationFrame(animate)
      else setDisplay(target.toString())
    }
    requestAnimationFrame(animate)
  }, [started, target, suffix])

  return { display, ref }
}

const stats = [
  { value: 50, suffix: '+', label: 'Sites Built', countTarget: 50 },
  { value: 48, suffix: 'hr', label: 'Avg. Delivery', countTarget: 48 },
  { value: 5.0, suffix: '★', label: 'Client Rating', countTarget: 5.0 },
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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#0D0D0D]">
      <div className="grain" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-white/[0.06]">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, suffix, label, countTarget }: {
  value: number; suffix: string; label: string; countTarget: number
}) {
  const { display, ref } = useCountUp(countTarget, suffix)
  return (
    <div ref={ref} className="stat-item text-center py-4 md:py-0">
      <div
        className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tight leading-none"
        style={{ fontFamily: 'var(--font-syne), sans-serif' }}
      >
        <span className="text-[#FF4D00]">{display}</span>
        <span className="text-[#FF4D00]">{suffix}</span>
      </div>
      <p
        className="text-[#888] text-sm tracking-[0.2em] uppercase mt-4"
        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        {label}
      </p>
    </div>
  )
}
