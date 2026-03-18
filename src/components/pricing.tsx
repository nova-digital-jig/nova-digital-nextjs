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
      gsap.fromTo('.pricing-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-eyebrow', start: 'top 85%' }
        }
      )

      gsap.fromTo('.pricing-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-heading', start: 'top 85%' }
        }
      )

      gsap.fromTo('.pricing-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20 md:mb-28">
          <p
            className="pricing-eyebrow text-[0.75rem] tracking-[0.15em] uppercase font-medium text-[#FF4D00] mb-5"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Pricing
          </p>
          <h2
            className="pricing-heading"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            Simple, transparent pricing<span className="text-[#FF4D00]">.</span>
          </h2>
          <p
            className="text-[#888] text-base md:text-lg mt-6 max-w-lg mx-auto"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            No hidden fees. No monthly subscriptions. One-time investment in your business.
          </p>
        </div>

        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative rounded-2xl p-10 md:p-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] ${
                plan.featured
                  ? 'border-[1.5px] border-[#FF4D00]'
                  : 'bg-white/[0.03] border border-white/[0.08]'
              }`}
              style={plan.featured ? { background: 'rgba(255,77,0,0.03)' } : {}}
            >
              {plan.featured && (
                <span
                  className="absolute -top-3 left-8 text-[10px] font-bold bg-[#FF4D00] text-[#0A0A0A] px-4 py-1.5 rounded-full tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  Popular
                </span>
              )}

              <p
                className="text-[0.75rem] tracking-[0.15em] uppercase font-medium text-[#888] mb-8"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {plan.name}
              </p>

              <div className="mb-3">
                <span
                  className="text-[clamp(3rem,5vw,4rem)] font-bold tracking-tight leading-none text-[#F5F5F0]"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {plan.price}
                </span>
              </div>

              <p
                className="text-sm text-[#888] mb-10 leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {plan.description}
              </p>

              <MagneticButton
                as="a"
                href={plan.href}
                target={plan.href.startsWith('http') ? '_blank' : undefined}
                rel={plan.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`w-full flex items-center justify-center py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 mb-10 ${
                  plan.featured
                    ? 'bg-[#FF4D00] text-[#0A0A0A] hover:bg-[#FF6B2C]'
                    : 'bg-white/[0.03] text-[#F5F5F0] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#FF4D00]/40'
                }`}
              >
                {plan.cta}
              </MagneticButton>

              <div className="space-y-0">
                {plan.features.map((feature, i) => (
                  <div
                    key={feature}
                    className={`py-3.5 text-sm text-[#888] ${
                      i < plan.features.length - 1 ? 'border-b border-white/[0.06]' : ''
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                  >
                    {feature}
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
