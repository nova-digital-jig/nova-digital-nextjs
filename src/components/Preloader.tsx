'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    document.body.classList.add('loading')

    if (prefersReducedMotion) {
      document.body.classList.remove('loading')
      if (preloaderRef.current) preloaderRef.current.style.display = 'none'
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('loading')
      },
    })

    // Logo clip-path reveal
    tl.fromTo(
      logoRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut' }
    )

    // Progress bar fill
    tl.to(
      barFillRef.current,
      { width: '100%', duration: 1.2, ease: 'power2.inOut' },
      0.3
    )

    // Slide preloader up
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.3,
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={preloaderRef} className="preloader">
      <div
        ref={logoRef}
        className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
        style={{ fontFamily: 'var(--font-syne), sans-serif', clipPath: 'inset(0 100% 0 0)' }}
      >
        <span className="text-[#F5F5F0]">NOVA</span>
        <span className="text-[#FF4D00]">.</span>
      </div>
      <div className="preloader-bar">
        <div ref={barFillRef} className="preloader-bar-fill" />
      </div>
    </div>
  )
}
