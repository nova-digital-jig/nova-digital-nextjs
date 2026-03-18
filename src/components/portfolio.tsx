"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const projects = [
  {
    title: "Lucas Hair Salon",
    category: "Beauty & Wellness",
    description:
      "A premium salon website with online booking integration, service showcase, and a design that reflects their upscale brand.",
    url: "https://lucas-hair-salon.vercel.app",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    imageAlt: "Modern hair salon interior with elegant styling stations and warm lighting",
    gradient: "from-violet-600 via-violet-500 to-fuchsia-500",
    tags: ["Next.js", "Booking System", "SEO"],
  },
  {
    title: "Edison Barbershop",
    category: "Local Business",
    description:
      "A modern barbershop site with an appointment scheduler, team profiles, and gallery that increased walk-ins by 200%.",
    url: "https://edison-barbershop.vercel.app",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    imageAlt: "Classic barbershop with vintage chairs and professional grooming setup",
    gradient: "from-rose-600 via-rose-500 to-orange-500",
    tags: ["React", "Responsive", "Local SEO"],
  },
  {
    title: "Ram's Garage",
    category: "Automotive",
    description:
      "An automotive service website with service request forms, pricing transparency, and a professional image that built trust.",
    url: "https://rams-garage.vercel.app",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
    imageAlt: "Auto repair garage with professional mechanics working on vehicles",
    gradient: "from-violet-600 via-rose-500 to-rose-600",
    tags: ["Full Stack", "Forms", "Analytics"],
  },
];

export function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4 border-rose-500/30 bg-rose-500/10 text-rose-400">
            Portfolio
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Real results for{" "}
            <span className="text-gradient">real businesses</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every project is built to drive revenue. Here&apos;s proof.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-2xl glass transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10">
                {/* Image with zoom on hover */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-30 mix-blend-multiply`} />

                  {/* Slide-up overlay on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <div className="p-6 text-center">
                      <p className="text-sm text-white/80 mb-3">{project.description}</p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20">
                          Live Demo
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-violet-400">
                      {project.category}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-all hover:text-foreground hover:scale-110"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2 lg:hidden">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
