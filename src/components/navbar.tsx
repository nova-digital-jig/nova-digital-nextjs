'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MagneticButton } from './MagneticButton'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
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
      gsap.fromTo(overlayRef.current,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.6, ease: 'power4.inOut' }
      )
      linkRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(el,
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.3 + i * 0.1 }
          )
        }
      })
    } else {
      gsap.to(overlayRef.current, { yPercent: -100, duration: 0.5, ease: 'power4.inOut' })
    }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/85 backdrop-blur-[16px] backdrop-saturate-[1.8] border-b border-white/[0.06] py-4'
            : 'bg-transparent py-8'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
          >
            <span className="text-[#F5F5F0]">NOVA</span>
            <span className="text-[#FF4D00]">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[13px] font-medium tracking-[0.15em] uppercase text-[#888] hover:text-[#F5F5F0] transition-colors duration-300"
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
              className="inline-flex items-center px-7 py-3.5 bg-[#FF4D00] text-[#0A0A0A] rounded-full text-sm font-semibold tracking-wide hover:bg-[#FF6B2C] transition-colors duration-300"
            >
              Start a Project
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-[1000] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#F5F5F0] transition-all duration-500 ${
                menuOpen ? 'rotate-45 translate-y-[3.75px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#F5F5F0] transition-all duration-500 ${
                menuOpen ? '-rotate-45 -translate-y-[3.75px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[998] bg-[#0A0A0A] lg:hidden flex flex-col items-center justify-center gap-8"
        style={{ transform: 'translateY(-100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            ref={(el) => { linkRefs.current[i] = el }}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-[clamp(2.5rem,10vw,5rem)] font-bold text-[#F5F5F0] tracking-tight hover:text-[#FF4D00] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-syne), sans-serif', opacity: 0 }}
          >
            {link.label}
          </a>
        ))}
        <MagneticButton
          as="a"
          href="tel:978-606-3386"
          className="mt-6 inline-flex items-center px-8 py-4 bg-[#FF4D00] text-[#0A0A0A] rounded-full text-sm font-semibold tracking-wide"
        >
          (978) 606-3386
        </MagneticButton>
      </div>
    </>
  )
}
