"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Lucas Hair Salon",
    category: "Beauty & Wellness",
    description:
      "A premium salon website with online booking integration, service showcase, and a design that reflects their upscale brand.",
    url: "https://lucas-hair-salon.vercel.app",
    gradient: "from-violet-600 via-violet-500 to-fuchsia-500",
    tags: ["Next.js", "Booking System", "SEO"],
  },
  {
    title: "Edison Barbershop",
    category: "Local Business",
    description:
      "A modern barbershop site with an appointment scheduler, team profiles, and gallery that increased walk-ins by 200%.",
    url: "https://edison-barbershop.vercel.app",
    gradient: "from-rose-600 via-rose-500 to-orange-500",
    tags: ["React", "Responsive", "Local SEO"],
  },
  {
    title: "Ram's Garage",
    category: "Automotive",
    description:
      "An automotive service website with service request forms, pricing transparency, and a professional image that built trust.",
    url: "https://rams-garage.vercel.app",
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
                {/* Gradient placeholder for screenshot */}
                <div
                  className={`relative h-56 w-full bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass rounded-xl p-6 text-center">
                      <Globe className="mx-auto mb-2 h-8 w-8 text-white/80" />
                      <p className="text-sm font-medium text-white/90">{project.title}</p>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-violet-400">
                      {project.category}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground"
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

function Globe({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
