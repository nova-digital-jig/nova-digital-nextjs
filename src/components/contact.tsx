'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = sectionRef.current?.querySelectorAll('.contact-line')
      if (!lines) return

      gsap.fromTo(lines,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.contact-text', start: 'top 85%' }
        }
      )

      gsap.fromTo('.contact-content',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-content', start: 'top 88%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const phone = data.get('phone') as string
    const message = data.get('message') as string

    const subject = encodeURIComponent(`Website Inquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    )

    window.location.href = `mailto:jigpatel01234@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-32 md:py-44 relative overflow-hidden grain">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="contact-text text-center mb-16 md:mb-24">
          <div className="overflow-hidden">
            <h2 className="contact-line text-massive text-white/95">LET&apos;S</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="contact-line text-massive gradient-text">BUILD.</h2>
          </div>
        </div>

        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info + Map */}
          <div>
            <p className="text-lg text-[#888] font-light leading-relaxed mb-10">
              Ready to transform your online presence? Get in touch and Isabella will
              have a proposal for you within 24 hours.
            </p>

            {/* Contact details */}
            <div className="space-y-6 mb-10">
              <a
                href="tel:978-606-3386"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#8b5cf6]/40 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">(978) 606-3386</p>
                  <p className="text-sm text-[#555]">Call or text anytime</p>
                </div>
              </a>

              <a
                href="mailto:jigpatel01234@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#8b5cf6]/40 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">jigpatel01234@gmail.com</p>
                  <p className="text-sm text-[#555]">We respond within 2 hours</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Mon &ndash; Fri, 9am &ndash; 6pm EST</p>
                  <p className="text-sm text-[#555]">Edison, NJ &mdash; Serving Nationwide</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-[220px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48564.25599887747!2d-74.4547!3d40.5187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b62f8c1c4f55%3A0x9d9a0e9b2e1a3e3!2sEdison%2C%20NJ!5e0!3m2!1sen!2sus!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nova Digital location - Edison, NJ"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="text-label text-[#555] mb-2 block">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Smith"
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="text-label text-[#555] mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@business.com"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-label text-[#555] mb-2 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="text-label text-[#555] mb-2 block">
                  What do you need?
                </label>
                <select
                  id="service"
                  name="service"
                  className="form-input appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Select a service</option>
                  <option value="starter">Website Design — Starter ($500)</option>
                  <option value="growth">Website Design — Growth ($1,000)</option>
                  <option value="premium">Website Design — Premium ($2,500)</option>
                  <option value="seo">SEO Optimization</option>
                  <option value="ecommerce">E-Commerce Setup</option>
                  <option value="maintenance">Monthly Maintenance ($100/mo)</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-label text-[#555] mb-2 block">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="What does your business do? What are your goals for the website?"
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center py-4 text-base"
                disabled={submitted}
              >
                <span>{submitted ? 'Opening Email...' : 'Send Message'}</span>
                {!submitted && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>

              <p className="text-center text-sm text-[#444] mt-4">
                Or call directly: <a href="tel:978-606-3386" className="text-[#8b5cf6] hover:underline">(978) 606-3386</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
