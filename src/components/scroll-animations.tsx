'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    )
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])
  return ref
}

export function useStaggerReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const children = el.children
    if (!children.length) return
    gsap.fromTo(children,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    )
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])
  return ref
}

export function useHeroReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    const children = el.querySelectorAll('[data-hero-anim]')
    children.forEach((child, i) => {
      tl.fromTo(child,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2 + i * 0.2
      )
    })
    return () => { tl.kill() }
  }, [])
  return ref
}
