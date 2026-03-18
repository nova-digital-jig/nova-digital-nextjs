'use client'

import { useState, useEffect } from 'react'

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
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <a href="#" className="text-xl font-bold tracking-tight text-white">
            NOVA<span className="gradient-text">.</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-12">
            <a href="#work" className="nav-link text-[13px] font-medium tracking-[0.2em] uppercase text-[#777] hover:text-white transition-colors duration-300">
              Work
            </a>
            <a href="#about" className="nav-link text-[13px] font-medium tracking-[0.2em] uppercase text-[#777] hover:text-white transition-colors duration-300">
              About
            </a>
            <a href="#contact" className="nav-link text-[13px] font-medium tracking-[0.2em] uppercase text-[#777] hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-white transition-all duration-400 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-white transition-all duration-400 ${menuOpen ? '-rotate-45 -translate-y-[1.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-10">
          {['Work', 'About', 'Contact'].map((label, i) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-[clamp(2rem,8vw,4rem)] font-bold text-white tracking-tight transition-all duration-500"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
