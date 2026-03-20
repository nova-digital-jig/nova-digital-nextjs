'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Went from zero bookings to 40/week. Paid for itself month one.',
    name: 'Maria Santos',
    business: 'Lucas Hair Salon',
  },
  {
    quote:
      'Best investment. Customers constantly compliment the site.',
    name: 'Marco R.',
    business: 'Edison Barbershop',
  },
  {
    quote:
      'Finally a website that matches our work quality.',
    name: 'Ram P.',
    business: "Ram's Garage",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

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
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.testimonials-heading', start: 'top 85%' }
        }
      )

      const cards = sectionRef.current?.querySelectorAll('.testimonial-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { x: 80, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
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

        <div
          className="testimonial-scroll flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:-mx-0 md:px-0"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex-shrink-0 w-[85vw] md:w-[420px] rounded-2xl p-10 md:p-12 bg-white/[0.02] border border-white/[0.06] snap-start relative"
              style={{ opacity: 0 }}
            >
              {/* Large decorative quote SVG */}
              <div className="absolute top-8 left-8">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#FF4D00] opacity-15"
                >
                  <path
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <p
                className="text-[#E0E0E0] text-[15px] md:text-base leading-[1.7] mb-8 mt-12 italic"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <p
                  className="text-[#F0EDE6] text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[#666] text-xs mt-1"
                  style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                  {t.business}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
