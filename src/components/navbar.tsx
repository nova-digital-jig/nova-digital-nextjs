'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MagneticButton } from './MagneticButton'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const overlayCtaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    if (menuOpen) {
      const tl = gsap.timeline()

      tl.fromTo(overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' }
      )

      linkRefs.current.forEach((el, i) => {
        if (el) {
          tl.fromTo(el,
            { y: 80, opacity: 0, rotateX: -15 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.6, ease: 'power3.out' },
            0.3 + i * 0.08
          )
        }
      })

      if (overlayCtaRef.current) {
        tl.fromTo(overlayCtaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          0.7
        )
      }
    } else if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power4.inOut',
      })
    }
  }, [menuOpen])

  // Animate nav in after preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) {
        gsap.fromTo(navRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
      }
    }, 2600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/80 backdrop-blur-[20px] backdrop-saturate-[1.8] border-b border-white/[0.06] py-4'
            : 'bg-transparent py-6 md:py-8'
        }`}
        style={{ opacity: 0 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-[-0.03em] relative z-[1001]"
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
          >
            <span className="text-[#F5F5F0]">NOVA</span>
            <span className="text-[#FF4D00]">.</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[13px] font-medium tracking-[0.15em] uppercase text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 bg-[#FF4D00] text-[#0A0A0A] rounded-full text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-[#FF6B2C] transition-colors duration-300"
            >
              Start a Project
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-[1001] w-10 h-10 flex flex-col items-center justify-center gap-[7px]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-7 h-[1.5px] bg-[#F5F5F0] transition-all duration-500 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[4.25px]' : ''
              }`}
            />
            <span
              className={`block w-7 h-[1.5px] bg-[#F5F5F0] transition-all duration-500 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[4.25px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[998] bg-[#0A0A0A] lg:hidden flex flex-col items-start justify-center px-8 md:px-16"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="space-y-2">
          {navLinks.map((link, i) => (
            <div key={link.label} className="overflow-hidden">
              <a
                ref={(el) => { linkRefs.current[i] = el }}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-[clamp(3rem,12vw,6rem)] font-bold text-[#F5F5F0] tracking-[-0.04em] leading-[1.1] hover:text-[#FF4D00] transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  opacity: 0,
                }}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        <div ref={overlayCtaRef} className="mt-12 opacity-0">
          <div
            className="text-sm text-[#888] mb-4"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Get in touch
          </div>
          <a
            href="mailto:jigpatel01234@gmail.com"
            className="block text-[#F5F5F0] text-lg hover:text-[#FF4D00] transition-colors duration-300 mb-2"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            jigpatel01234@gmail.com
          </a>
          <a
            href="tel:978-606-3386"
            className="block text-[#888] text-lg hover:text-[#F5F5F0] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            (978) 606-3386
          </a>
        </div>
      </div>
    </>
  )
}
