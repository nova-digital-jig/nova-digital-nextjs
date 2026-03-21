'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

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
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none'
        }
      },
    })

    const counter = { val: 0 }
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.val).toString()
        }
      },
    }, 0)

    tl.fromTo(
      logoRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
      0
    )

    tl.to(
      barFillRef.current,
      { width: '100%', duration: 1.8, ease: 'power2.inOut' },
      0
    )

    tl.to({}, { duration: 0.4 })

    tl.to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.in',
    })

    tl.to(preloaderRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power4.inOut',
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={preloaderRef}
      className="preloader"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div
        ref={logoRef}
        className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-none"
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          clipPath: 'inset(0 100% 0 0)',
        }}
      >
        <span className="text-[#F0EDE6]">VEKTOR</span>
        <span className="text-[#FF4D00]">.</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="preloader-bar">
          <div ref={barFillRef} className="preloader-bar-fill" />
        </div>
        <span
          ref={counterRef}
          className="text-xs text-[#666] tracking-[0.2em] tabular-nums w-8 text-right"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          0
        </span>
      </div>
    </div>
  )
}
