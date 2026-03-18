'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Maria Santos',
    role: 'Owner, Lucas Hair Salon',
    content:
      'Nova Digital transformed our online presence completely. We went from zero online bookings to over 40 per week. The website paid for itself in the first month.',
    stars: 5,
  },
  {
    name: 'Raj Patel',
    role: 'Owner, Edison Barbershop',
    content:
      'I was skeptical about a 48-hour turnaround, but they delivered a website that looks like it cost ten thousand dollars. Walk-ins increased 200% since launch.',
    stars: 5,
  },
  {
    name: 'Mike Thompson',
    role: "Owner, Ram's Garage",
    content:
      'Professional, fast, and the results speak for themselves. Our service requests tripled and we had to hire two more mechanics to keep up with demand.',
    stars: 5,
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-label',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-label', start: 'top 88%' }
        }
      )
      gsap.fromTo('.testimonials-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-heading', start: 'top 88%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!quoteRef.current) return
    gsap.fromTo(quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [active])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[active]

  return (
    <section ref={sectionRef} id="reviews" className="py-32 md:py-44 relative">
      {/* Decorative quote */}
      <div className="absolute top-32 left-12 text-[20rem] font-display leading-none text-white/[0.02] pointer-events-none select-none hidden lg:block">
        &ldquo;
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-28">
          <p className="testimonials-label text-label mb-5 text-[#555]">Testimonials</p>
          <h2 className="testimonials-heading text-display">
            What clients say<span className="gradient-text">.</span>
          </h2>
        </div>

        <div className="max-w-4xl">
          <div ref={quoteRef} key={active}>
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#8b5cf6" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            <blockquote
              className="text-[clamp(1.5rem,3.5vw,3rem)] font-light leading-[1.3] text-white/85 font-display"
            >
              &ldquo;{t.content}&rdquo;
            </blockquote>

            <div className="mt-10 flex items-center gap-3">
              <div>
                <p className="text-lg font-semibold text-white">{t.name}</p>
                <p className="text-sm text-[#555] mt-1">{t.role} <span className="text-[#444]">&middot; via Google</span></p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-14 flex items-center gap-6">
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === active
                      ? 'w-10 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]'
                      : 'w-2 bg-[#333] hover:bg-[#555]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-[#555] hover:text-white hover:border-[#8b5cf6] transition-all duration-400"
                aria-label="Previous testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center text-[#555] hover:text-white hover:border-[#8b5cf6] transition-all duration-400"
                aria-label="Next testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
