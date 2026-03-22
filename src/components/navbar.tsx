'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: 'power3.out' }
    )

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const direction = self.direction
        const scrollY = self.scroll()

        if (scrollY < 100) {
          setHidden(false)
          return
        }

        if (direction === 1 && scrollY > lastScroll.current) {
          setHidden(true)
        } else if (direction === -1) {
          setHidden(false)
        }

        lastScroll.current = scrollY
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.onUpdate) t.kill()
      })
    }
  }, [])

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-3 flex items-center justify-between opacity-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(5, 5, 5, 0.8)',
        borderBottom: '1px solid rgba(232, 228, 221, 0.04)',
      }}
      data-animate
    >
      <a
        href="#main-content"
        className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-[0.2em] uppercase text-foreground min-h-[44px] flex items-center"
      >
        vektor
      </a>

      <div className="hidden md:flex items-center gap-10">
        <a
          href="#process"
          className="text-xs tracking-[0.15em] uppercase text-muted hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center"
        >
          Process
        </a>
        <a
          href="#pricing"
          className="text-xs tracking-[0.15em] uppercase text-muted hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center"
        >
          Pricing
        </a>
        <a
          href="#contact"
          className="shimmer-btn text-xs tracking-[0.15em] uppercase text-accent hover:text-accent-hover transition-colors duration-300 min-h-[44px] flex items-center px-4 py-1.5 border border-accent/30 rounded-full"
        >
          Book a Call
        </a>
      </div>

      <a
        href="#contact"
        className="md:hidden text-xs tracking-[0.15em] uppercase text-accent min-h-[44px] flex items-center"
      >
        Contact
      </a>
    </nav>
  )
}
