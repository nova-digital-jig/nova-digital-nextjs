'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Web Design',
    desc: 'Bespoke visual identities that captivate and convert.',
  },
  {
    num: '02',
    title: 'Development',
    desc: 'Lightning-fast Next.js sites, optimized for SEO.',
  },
  {
    num: '03',
    title: 'UI/UX Strategy',
    desc: 'User experience design that turns visitors into customers.',
  },
  {
    num: '04',
    title: 'AI Integration',
    desc: 'Smart automation for competitive edge.',
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
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.services-heading', start: 'top 85%' }
        }
      )

      const rows = sectionRef.current?.querySelectorAll('.service-row-item')
      rows?.forEach((row, i) => {
        gsap.fromTo(row,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
            delay: i * 0.08,
          }
        )

        const border = row.querySelector('.service-border')
        if (border) {
          gsap.fromTo(border,
            { scaleX: 0, transformOrigin: 'left' },
            {
              scaleX: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: row, start: 'top 88%' },
              delay: i * 0.08,
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <p
            className="services-eyebrow text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase font-medium text-[#FF4D00] mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            <span className="w-8 h-[1px] bg-[#FF4D00] inline-block" />
            What We Do
          </p>
          <div className="overflow-hidden">
            <h2
              className="services-heading"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              Services<span className="text-[#FF4D00]">.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          {services.map((s) => (
            <div
              key={s.num}
              className="service-row-item group"
              style={{ opacity: 0 }}
            >
              <a
                href="#contact"
                className="flex items-start md:items-center justify-between py-8 md:py-12 gap-4 md:gap-8 flex-col md:flex-row"
              >
                <div className="flex items-baseline gap-6 md:gap-10 flex-1">
                  <span
                    className="text-sm font-medium text-[#FF4D00] opacity-60 shrink-0"
                    style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                  >
                    {s.num}
                  </span>
                  <h3
                    className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-none group-hover:text-[#FF4D00] transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                  >
                    {s.title}
                  </h3>
                </div>

                <p
                  className="text-[#666] text-sm md:text-[15px] max-w-sm leading-relaxed flex-1 md:text-right"
                  style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                  {s.desc}
                </p>

                <span className="text-[#555] text-xl group-hover:text-[#FF4D00] group-hover:translate-x-3 transition-all duration-500 hidden md:block">
                  &rarr;
                </span>
              </a>

              <div className="service-border h-[1px] bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
