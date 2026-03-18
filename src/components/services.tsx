'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Website Design & Development',
    desc: 'Bespoke, high-converting websites built with Next.js. Stunning design that makes your business look like a million bucks.',
    price: 'From $500',
  },
  {
    num: '02',
    title: 'SEO Optimization',
    desc: 'Get found on Google. We optimize every page for search so local customers find you first.',
    price: 'Included',
  },
  {
    num: '03',
    title: 'E-Commerce Setup',
    desc: 'Start selling online. Full e-commerce integration with Stripe, inventory management, and order tracking.',
    price: 'Custom',
  },
  {
    num: '04',
    title: 'Monthly Maintenance',
    desc: 'Updates, security patches, performance monitoring, and content changes. We keep your site running flawlessly.',
    price: '$100/mo',
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
    <section ref={sectionRef} id="services" className="py-32 md:py-44">
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
                <div className="flex items-baseline gap-6 md:gap-10 flex-1">
                  <span className="text-sm font-mono text-[#8b5cf6] opacity-60">{s.num}</span>
                  <div>
                    <h3 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-tight leading-none group-hover:text-[#8b5cf6] transition-colors duration-500">
                      {s.title}
                    </h3>
                    <p className="text-[#555] text-base md:text-lg max-w-lg font-light leading-relaxed mt-3 md:mt-4">
                      {s.desc}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-mono text-[#8b5cf6] tracking-wider shrink-0">
                  {s.price}
                </span>
              </div>
            </div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  )
}
