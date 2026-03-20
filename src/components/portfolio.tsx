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
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
  },
  {
    name: 'Edison Barbershop',
    url: 'https://edison-barbershop.vercel.app',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80',
  },
  {
    name: "Ram's Garage",
    url: 'https://rams-garage.vercel.app',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80',
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
        { clipPath: 'inset(100% 0 0 0)', y: 40 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.portfolio-heading', start: 'top 85%' }
        }
      )

      const cards = sectionRef.current?.querySelectorAll('.portfolio-card')
      cards?.forEach((card) => {
        const img = card.querySelector('.portfolio-img')
        const info = card.querySelector('.portfolio-info')

        gsap.fromTo(card,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        )

        if (info) {
          gsap.fromTo(info,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%' },
              delay: 0.4,
            }
          )
        }

        if (img) {
          gsap.fromTo(img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              }
            }
          )
        }
      })

      gsap.fromTo('.portfolio-more',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-more', start: 'top 90%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <p
            className="portfolio-eyebrow text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase font-medium text-[#FF4D00] mb-6 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            <span className="w-8 h-[1px] bg-[#FF4D00] inline-block" />
            Selected Work
          </p>
          <div className="overflow-hidden">
            <h2
              className="portfolio-heading"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              Portfolio<span className="text-[#FF4D00]">.</span>
            </h2>
          </div>
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
              style={{
                aspectRatio: '16/9',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              <div className="portfolio-img absolute inset-[-12%] will-change-transform">
                <Image
                  src={project.image}
                  alt={`${project.name} website`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1400px"
                />
              </div>

              <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 transition-opacity duration-500 group-hover:from-black/70" />

              <div className="portfolio-info absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 flex items-end justify-between" style={{ opacity: 0 }}>
                <h3
                  className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white tracking-[-0.03em] leading-none"
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {project.name}
                </h3>
                <span className="text-[#FF4D00] text-sm font-medium flex items-center gap-2 group-hover:gap-4 transition-all duration-500 shrink-0">
                  View Site
                  <span className="text-lg">&rarr;</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="portfolio-more mt-20 text-center" style={{ opacity: 0 }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-[#666] text-sm font-medium hover:text-[#FF4D00] transition-colors duration-300 group"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Want to see more? Let&apos;s talk
            <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
