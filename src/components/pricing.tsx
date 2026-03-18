'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: '$500',
    period: 'one-time',
    description: 'Perfect for getting online with a professional, conversion-ready website.',
    features: [
      'Custom single-page website',
      'Mobile responsive design',
      'Basic SEO optimization',
      'Contact form integration',
      '48-hour delivery',
      '1 round of revisions',
    ],
    href: 'https://buy.stripe.com/test_9B68wIaSyaoJ4gWenZ6c000',
    cta: 'Buy Now',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$1,000',
    period: 'one-time',
    description: 'Built to convert visitors into paying customers with advanced features.',
    features: [
      'Up to 5-page website',
      'Advanced UI/UX design',
      'Full SEO package',
      'Booking & scheduling system',
      'Analytics dashboard',
      '3 rounds of revisions',
      '30 days of support',
      'Performance optimization',
    ],
    href: '#contact',
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Premium',
    price: '$2,500',
    period: 'one-time',
    description: 'Full custom solution for businesses ready to dominate their market.',
    features: [
      'Unlimited pages',
      'Custom animations & interactions',
      'E-commerce integration',
      'CMS for easy content updates',
      'AI chatbot integration',
      'Priority support for 90 days',
      'Unlimited revisions',
      'Dedicated project manager',
    ],
    href: '#contact',
    cta: 'Get Started',
    featured: false,
  },
]

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-label',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-label', start: 'top 88%' }
        }
      )

      gsap.fromTo('.pricing-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-title', start: 'top 88%' }
        }
      )

      gsap.fromTo('.pricing-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 82%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20 md:mb-28">
          <p className="pricing-label text-label mb-5 text-[#555]">Pricing</p>
          <h2 className="pricing-title text-display">
            Simple, transparent<span className="gradient-text">.</span>
          </h2>
          <p className="text-[#555] text-lg mt-6 max-w-lg mx-auto font-light">
            No hidden fees. No monthly surprises. Just premium websites at honest prices.
          </p>
        </div>

        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative rounded-2xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 ${
                plan.featured
                  ? 'bg-[#111] lg:scale-[1.03]'
                  : 'bg-[#111] border border-white/[0.06]'
              }`}
            >
              {plan.featured && (
                <>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#8b5cf6] to-[#ec4899] -z-10 blur-[1px]" />
                  <div className="absolute inset-[1px] rounded-2xl bg-[#111] -z-[5]" />
                </>
              )}

              <div className="flex items-center justify-between mb-10">
                <span className="text-label text-[#666]">{plan.name}</span>
                {plan.featured && (
                  <span className="text-[10px] font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white px-3 py-1 rounded-full tracking-widest uppercase">
                    Popular
                  </span>
                )}
              </div>

              <div className="mb-3">
                <span className="text-[clamp(3.5rem,6vw,5rem)] font-bold tracking-tight leading-none text-white">
                  {plan.price}
                </span>
              </div>

              <p className="text-sm text-[#555] mb-10 leading-relaxed">
                {plan.description}
              </p>

              <a
                href={plan.href}
                target={plan.href.startsWith('http') ? '_blank' : undefined}
                rel={plan.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`w-full flex items-center justify-center py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-500 mb-10 ${
                  plan.featured
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white hover:shadow-lg hover:shadow-[#8b5cf6]/25'
                    : 'bg-white/[0.03] text-white border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#8b5cf6]/40'
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <path d="M3 8l3.5 3.5L13 5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#888]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#444] mt-10">
          All plans include hosting setup assistance. Monthly maintenance available for $100/mo.
        </p>
      </div>
    </section>
  )
}
