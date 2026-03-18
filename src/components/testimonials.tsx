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
      'The best investment we\'ve made for our business. Professional, fast, and the design is incredible. Our customers constantly compliment the new site.',
    name: 'Marco R.',
    title: 'Owner, Edison Barbershop',
  },
  {
    quote:
      'We finally have a website that matches the quality of our work. Ram\'s Garage has never looked this good online. Highly recommend Nova Digital.',
    name: 'Ram P.',
    title: 'Owner, Ram\'s Garage',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-eyebrow', start: 'top 85%' }
        }
      )

      gsap.fromTo('.testimonials-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-heading', start: 'top 85%' }
        }
      )

      gsap.fromTo('.testimonial-card',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.testimonial-scroll', start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="reviews" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20">
          <p
            className="testimonials-eyebrow text-[0.75rem] tracking-[0.15em] uppercase font-medium text-[#FF4D00] mb-5"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Testimonials
          </p>
          <h2
            className="testimonials-heading"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            What clients say<span className="text-[#FF4D00]">.</span>
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="testimonial-scroll flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex-shrink-0 w-[85vw] md:w-[420px] rounded-2xl p-10 md:p-12 bg-white/[0.03] border border-white/[0.08] snap-start relative"
            >
              {/* Decorative quote mark */}
              <svg
                className="absolute top-6 left-8 opacity-[0.08]"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="#FF4D00"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p
                className="text-[#F5F5F0] text-base md:text-[1.1rem] leading-relaxed italic mb-8 relative z-10"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="relative z-10">
                <p
                  className="text-[#F5F5F0] text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[#888] text-sm mt-1"
                  style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                  {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
