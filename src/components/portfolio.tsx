'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: 'Lucas Hair Salon',
    type: 'Hair Salon',
    url: 'https://lucas-hair-salon.vercel.app',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
  },
  {
    name: 'Edison Barbershop',
    type: 'Barbershop',
    url: 'https://edison-barbershop.vercel.app',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80',
  },
  {
    name: "Ram's Garage",
    type: 'Auto Shop',
    url: 'https://rams-garage.vercel.app',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80',
  },
]

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-label',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-label', start: 'top 88%' }
        }
      )

      gsap.fromTo('.portfolio-title-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-title-heading', start: 'top 88%' }
        }
      )

      gsap.fromTo('.portfolio-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.portfolio-list', start: 'top 82%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    gsap.to(imageRef.current, {
      x: e.clientX - rect.left - 200,
      y: e.clientY - rect.top - 130,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-32 md:py-44 relative"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-28">
          <p className="portfolio-label text-label mb-5 text-[#555]">Selected Work</p>
          <h2 className="portfolio-title-heading text-display">
            Portfolio<span className="gradient-text">.</span>
          </h2>
        </div>

        <div className="portfolio-list relative">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-item block py-10 md:py-16 group"
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="portfolio-title text-[clamp(2rem,6vw,5.5rem)] font-bold tracking-tight leading-none transition-all duration-500">
                    {project.name}
                  </h3>
                  <span className="text-sm text-[#444] mt-2 block md:hidden">{project.type}</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <span className="text-sm text-[#444] font-mono">{project.type}</span>
                  <span className="flex items-center gap-2 text-sm text-[#444] group-hover:text-[#8b5cf6] transition-colors duration-400 font-mono">
                    View Site
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating image that follows cursor */}
      <div
        ref={imageRef}
        className="pointer-events-none absolute z-20 w-[400px] h-[250px] rounded-2xl overflow-hidden hidden md:block will-change-transform"
        style={{
          opacity: activeProject !== null ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: activeProject === i ? 1 : 0 }}
          >
            <Image
              src={project.image}
              alt={`${project.name} website screenshot`}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
