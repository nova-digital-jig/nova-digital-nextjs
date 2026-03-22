'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from '@/components/Navbar'
import Opening from '@/components/Opening'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Process from '@/components/Process'
import Proof from '@/components/Proof'
import Voices from '@/components/Voices'
import Investment from '@/components/Investment'
import Closing from '@/components/Closing'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

function SectionDivider() {
  return <div className="section-divider mx-6 md:mx-16 lg:mx-24" />
}

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.globalTimeline.clear()
      return
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Opening />
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <Solution />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Proof />
        <SectionDivider />
        <Voices />
        <SectionDivider />
        <Investment />
        <SectionDivider />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
