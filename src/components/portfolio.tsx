'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: 'Lucas Hair Salon',
    url: 'https://lucas-hair-salon.vercel.app',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80',
  },
  {
    name: 'Edison Barbershop',
    url: 'https://edison-barbershop.vercel.app',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=80',
  },
  {
    name: "Ram's Garage",
    url: 'https://rams-garage.vercel.app',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1400&q=80',
  },
]

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-eyebrow', start: 'top 85%' }
        }
      )

      gsap.fromTo('.portfolio-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-heading', start: 'top 85%' }
        }
      )

      // Each project: clip-path reveal + parallax
      document.querySelectorAll('.portfolio-card').forEach((card) => {
        const img = card.querySelector('.portfolio-img')

        // Clip-path reveal from bottom
        gsap.fromTo(card,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        )

        // Parallax on image
        if (img) {
          gsap.fromTo(img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              }
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-28">
          <p
            className="portfolio-eyebrow text-[0.75rem] tracking-[0.15em] uppercase font-medium text-[#FF4D00] mb-5"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Selected Work
          </p>
          <h2
            className="portfolio-heading"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            Portfolio<span className="text-[#FF4D00]">.</span>
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card block relative rounded-xl overflow-hidden group"
              data-cursor-image
              style={{ aspectRatio: '16/9' }}
            >
              <div className="portfolio-img absolute inset-[-10%] will-change-transform">
                <Image
                  src={project.image}
                  alt={`${project.name} website`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 1400px"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />

              {/* Project info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 flex items-end justify-between">
                <h3
                  className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {project.name}
                </h3>
                <span className="text-[#FF4D00] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  View Site
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-16 text-center">
          <a
            href="#contact"
            className="text-[#FF4D00] text-sm font-medium hover:underline underline-offset-4"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Want to see more? Let&apos;s talk &rarr;
          </a>
        </p>
      </div>
    </section>
  )
}
