'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Preloader } from '@/components/Preloader'
import { CustomCursor } from '@/components/CustomCursor'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { Services } from '@/components/services'
import { Portfolio } from '@/components/portfolio'
import { Stats } from '@/components/stats'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/contact'
import { Footer } from '@/components/footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Stats />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
