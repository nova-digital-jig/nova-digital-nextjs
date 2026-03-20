'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: '$500',
    description: 'Custom single-page website to get your business online fast.',
    features: [
      'Custom single-page website',
      'Mobile responsive design',
      'Basic SEO optimization',
      'Contact form integration',
      '48-hour delivery',
      '1 revision round',
    ],
    href: 'https://buy.stripe.com/test_9B68wIaSyaoJ4gWenZ6c000',
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$1,000',
    description: 'Multi-page site built to convert visitors into paying customers.',
    features: [
      'Up to 5 pages',
      'Advanced UI/UX design',
      'Full SEO package',
      'Booking & scheduling system',
      'Analytics dashboard',
      '3 revision rounds',
      '30 days of support',
    ],
    href: 'mailto:jigpatel01234@gmail.com?subject=Growth%20Plan%20Inquiry',
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Premium',
    price: '$2,500',
    description: 'Full custom solution for businesses ready to dominate online.',
    features: [
      'Unlimited pages',
      'Custom animations & interactions',
      'E-commerce integration',
      'CMS for easy content updates',
      'AI chatbot integration',
      '90-day priority support',
      'Unlimited revisions',
    ],
    href: 'mailto:jigpatel01234@gmail.com?subject=Premium%20Plan%20Inquiry',
    cta: 'Get Started',
    featured: false,
  },
]

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.fromTo('.pricing-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-eyebrow', start: 'top 85%' }
        }
      )

      // Heading clip-path
      gsap.fromTo('.pricing-heading',
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.pricing-heading', start: 'top 85%' }
        }
      )

      // Subtitle
      gsap.fromTo('.pricing-subtitle',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-subtitle', start: 'top 85%' }
        }
      )

      // Cards
      const cards = sectionRef.current?.querySelectorAll('.pricing-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p
            className="pricing-eyebrow text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase font-medium text-[#FF4D00] mb-6"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Pricing
          </p>
          <div className="overflow-hidden">
            <h2
              className="pricing-heading"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              Simple, transparent pricing<span className="text-[#FF4D00]">.</span>
            </h2>
          </div>
          <p
            className="pricing-subtitle text-[#888] text-base md:text-lg mt-6 max-w-lg mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-jakarta), sans-serif',
              opacity: 0,
            }}
          >
            No hidden fees. No monthly subscriptions. One-time investment in your business.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative rounded-2xl p-8 md:p-10 lg:p-12 ${
                plan.featured
                  ? 'border-[1.5px] border-[#FF4D00] bg-[rgba(255,77,0,0.03)]'
                  : 'bg-white/[0.02] border border-white/[0.06]'
              }`}
              style={{ opacity: 0 }}
            >
              {/* Popular badge */}
              {plan.featured && (
                <span
                  className="absolute -top-3 left-8 text-[10px] font-bold bg-[#FF4D00] text-[#0A0A0A] px-4 py-1.5 rounded-full tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  Popular
                </span>
              )}

              {/* Plan name */}
              <p
                className="text-[0.7rem] tracking-[0.2em] uppercase font-medium text-[#888] mb-8"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-3">
                <span
                  className="text-[clamp(3rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-none text-[#F5F5F0]"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {plan.price}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm text-[#888] mb-10 leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {plan.description}
              </p>

              {/* CTA button */}
              <MagneticButton
                as="a"
                href={plan.href}
                target={plan.href.startsWith('http') ? '_blank' : undefined}
                rel={plan.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`w-full flex items-center justify-center py-4 rounded-full text-sm font-semibold tracking-[0.05em] uppercase transition-all duration-300 mb-10 ${
                  plan.featured
                    ? 'bg-[#FF4D00] text-[#0A0A0A] hover:bg-[#FF6B2C]'
                    : 'bg-white/[0.03] text-[#F5F5F0] border border-white/[0.08] hover:border-[#FF4D00]/40 hover:bg-white/[0.05]'
                }`}
              >
                {plan.cta}
              </MagneticButton>

              {/* Features list */}
              <div className="space-y-0">
                {plan.features.map((feature, i) => (
                  <div
                    key={feature}
                    className={`flex items-center gap-3 py-3.5 text-sm ${
                      i < plan.features.length - 1 ? 'border-b border-white/[0.04]' : ''
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                  >
                    <span className="text-[#FF4D00] text-[10px]">&#9670;</span>
                    <span className="text-[#999]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
