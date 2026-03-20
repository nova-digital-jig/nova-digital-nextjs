'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Nova Digital transformed our online presence completely. We went from zero bookings to over 40 per week. The website paid for itself in the first month.',
    name: 'Maria Santos',
    title: 'Owner, Lucas Hair Salon',
  },
  {
    quote:
      "The best investment we've made for our business. Professional, fast, and the design is incredible. Our customers constantly compliment the new site.",
    name: 'Marco R.',
    title: 'Owner, Edison Barbershop',
  },
  {
    quote:
      "We finally have a website that matches the quality of our work. Ram's Garage has never looked this good online. Highly recommend Nova Digital.",
    name: 'Ram P.',
    title: "Owner, Ram's Garage",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.fromTo('.testimonials-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-eyebrow', start: 'top 85%' }
        }
      )

      // Heading clip-path
      gsap.fromTo('.testimonials-heading',
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.testimonials-heading', start: 'top 85%' }
        }
      )

      // Cards staggered entrance
      const cards = sectionRef.current?.querySelectorAll('.testimonial-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0, rotateY: -5 },
          {
            y: 0, opacity: 1, rotateY: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.testimonial-scroll', start: 'top 85%' },
            delay: i * 0.12,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="reviews" className="py-32 md:py-44 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p
            className="testimonials-eyebrow text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase font-medium text-[#FF4D00] mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            <span className="w-8 h-[1px] bg-[#FF4D00] inline-block" />
            Testimonials
          </p>
          <div className="overflow-hidden">
            <h2
              className="testimonials-heading"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              What clients say<span className="text-[#FF4D00]">.</span>
            </h2>
          </div>
        </div>

        {/* Horizontal scrolling testimonial cards */}
        <div
          className="testimonial-scroll flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:-mx-0 md:px-0"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex-shrink-0 w-[85vw] md:w-[420px] rounded-2xl p-8 md:p-10 bg-white/[0.02] border border-white/[0.06] snap-start relative"
              style={{ opacity: 0 }}
            >
              {/* Large decorative quote mark */}
              <div className="mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#FF4D00] opacity-30"
                >
                  <path
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Quote */}
              <p
                className="text-[#E0E0E0] text-[15px] md:text-base leading-[1.7] mb-8"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder — initials */}
                <div
                  className="w-10 h-10 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] text-xs font-bold"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p
                    className="text-[#F5F5F0] text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[#888] text-xs mt-0.5"
                    style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                  >
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
