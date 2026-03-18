'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Web Design',
    desc: 'Bespoke visual identities and interfaces that captivate and convert.',
  },
  {
    num: '02',
    title: 'Development',
    desc: 'Lightning-fast Next.js sites built with clean code, optimized for SEO.',
  },
  {
    num: '03',
    title: 'UI/UX Strategy',
    desc: 'Data-driven user experience design that turns visitors into customers.',
  },
  {
    num: '04',
    title: 'AI Integration',
    desc: 'Smart automation and AI-powered features for competitive edge.',
  },
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-eyebrow', start: 'top 85%' }
        }
      )

      gsap.fromTo('.services-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-heading', start: 'top 85%' }
        }
      )

      gsap.fromTo('.service-row-item',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.services-list', start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-28">
          <p
            className="services-eyebrow text-[0.75rem] tracking-[0.15em] uppercase font-medium text-[#FF4D00] mb-5"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            What We Do
          </p>
          <h2
            className="services-heading"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            Services<span className="text-[#FF4D00]">.</span>
          </h2>
        </div>

        <div className="services-list">
          {services.map((s) => (
            <div
              key={s.num}
              className="service-row-item group border-b border-white/[0.08] transition-colors duration-500 hover:bg-white/[0.03]"
            >
              <div className="flex items-start md:items-center justify-between py-10 md:py-14 gap-6 flex-col md:flex-row">
                <div className="flex items-baseline gap-6 md:gap-10 flex-1">
                  <span
                    className="text-sm font-medium text-[#FF4D00] opacity-70"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    {s.num}
                  </span>
                  <div>
                    <h3
                      className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight leading-none group-hover:text-[#FF4D00] transition-colors duration-500"
                      style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-[#888] text-sm md:text-base max-w-md leading-relaxed mt-3"
                      style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
                <span className="text-[#888] text-xl group-hover:translate-x-2.5 transition-transform duration-500">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
