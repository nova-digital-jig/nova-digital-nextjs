'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <a href="#" className="text-xl font-bold tracking-tight text-white">
            NOVA<span className="gradient-text">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[13px] font-medium tracking-[0.15em] uppercase text-[#777] hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:978-606-3386"
              className="text-sm text-[#777] hover:text-white transition-colors duration-300 tracking-wide"
            >
              (978) 606-3386
            </a>
            <a href="#contact" className="btn-primary text-xs py-3 px-6">
              <span>Get a Quote</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-[1.5px] bg-white transition-all duration-400 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-white transition-all duration-400 ${menuOpen ? '-rotate-45 -translate-y-[1.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0F] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[clamp(2rem,8vw,4rem)] font-bold text-white tracking-tight transition-all duration-500"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              {link.label}
            </a>
          ))}

          <div
            className="mt-6 flex flex-col items-center gap-4 transition-all duration-500"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <a href="tel:978-606-3386" className="btn-primary">
              <span>(978) 606-3386</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
