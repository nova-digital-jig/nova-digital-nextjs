'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Web Design',
    desc: 'Bespoke visual identities and interfaces that captivate users and drive conversions.',
  },
  {
    num: '02',
    title: 'Development',
    desc: 'Lightning-fast Next.js sites built with clean code, optimized for performance and SEO.',
  },
  {
    num: '03',
    title: 'UI/UX Strategy',
    desc: 'Data-driven user experience design that turns visitors into paying customers.',
  },
  {
    num: '04',
    title: 'AI Integration',
    desc: 'Smart automation and AI-powered features that give your business a competitive edge.',
  },
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-label',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-label', start: 'top 88%' }
        }
      )

      gsap.fromTo('.services-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-title', start: 'top 88%' }
        }
      )

      gsap.fromTo('.service-row-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.services-list', start: 'top 82%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-28">
          <p className="services-label text-label mb-5 text-[#555]">What We Do</p>
          <h2 className="services-title text-display">
            Services<span className="gradient-text">.</span>
          </h2>
        </div>

        <div className="services-list">
          {services.map((s) => (
            <div key={s.num} className="service-row service-row-item group">
              <div className="flex items-start md:items-center justify-between py-10 md:py-16 gap-6 flex-col md:flex-row">
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="text-sm font-mono text-[#8b5cf6] opacity-60">{s.num}</span>
                  <h3 className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold tracking-tight leading-none group-hover:text-[#8b5cf6] transition-colors duration-500">
                    {s.title}
                  </h3>
                </div>
                <p className="text-[#555] text-base md:text-lg max-w-md md:text-right font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  )
}
