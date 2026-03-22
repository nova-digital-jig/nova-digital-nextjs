'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PLANS = [
  {
    name: 'Starter',
    price: '$2,000 + $500/mo',
    features:
      'Email management, calendar, lead follow-up, daily reports',
    highlighted: false,
  },
  {
    name: 'Business',
    price: '$3,500 + $750/mo',
    features:
      'Everything in Starter, plus CRM, lead scoring, social monitoring, weekly reports, 3 custom skills',
    highlighted: true,
    badge: 'Popular',
  },
  {
    name: 'Full Stack',
    price: '$5,000 + $1,000/mo',
    features:
      'Everything in Business, plus website chatbot, multi-channel, voice agent, custom dashboard, priority support',
    highlighted: false,
  },
]

export default function Investment() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const plansRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = '1'
      plansRef.current.forEach((el) => {
        if (el) el.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      )

      // Plans stagger in
      plansRef.current.forEach((plan) => {
        if (!plan) return
        gsap.fromTo(
          plan,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: plan,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative min-h-screen px-6 md:px-16 lg:px-24 py-32 md:py-48"
    >
      <h2
        ref={headingRef}
        className="font-[family-name:var(--font-syne)] font-bold text-foreground opacity-0 mb-20 md:mb-32"
        style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
      >
        Simple pricing.
      </h2>

      <div className="flex flex-col gap-16 md:gap-20 max-w-3xl">
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            ref={(el) => { plansRef.current[i] = el }}
            className={`relative opacity-0 py-10 ${
              plan.highlighted
                ? 'border-l-2 border-accent pl-8 md:pl-12'
                : 'pl-0 md:pl-12'
            }`}
          >
            {/* Plan name + badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`font-[family-name:var(--font-syne)] text-foreground/70 ${
                  plan.highlighted ? 'font-medium' : 'font-light'
                }`}
                style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}
              >
                {plan.name}
              </span>
              {plan.badge && (
                <span className="text-[10px] tracking-[0.15em] uppercase bg-accent/15 text-accent px-2.5 py-1 rounded-full font-medium">
                  {plan.badge}
                </span>
              )}
            </div>

            {/* Price */}
            <span
              className="font-[family-name:var(--font-syne)] font-bold text-foreground block mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
            >
              {plan.price}
            </span>

            {/* Features */}
            <p className="font-[family-name:var(--font-inter)] text-muted text-sm md:text-base leading-relaxed mb-6 max-w-xl">
              {plan.features}
            </p>

            {/* CTA */}
            <a
              href="https://calendly.com/jigpatel01234"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] font-[family-name:var(--font-inter)] text-accent text-sm tracking-wide hover:text-accent-hover transition-colors duration-300 group"
            >
              Get Started{' '}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
