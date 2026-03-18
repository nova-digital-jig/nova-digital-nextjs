"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Lucas Hair Salon",
    category: "Beauty & Wellness",
    url: "https://lucas-hair-salon.vercel.app",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
    imageAlt: "Modern hair salon interior",
  },
  {
    title: "Edison Barbershop",
    category: "Local Business",
    url: "https://edison-barbershop.vercel.app",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80",
    imageAlt: "Classic barbershop setup",
  },
  {
    title: "Ram's Garage",
    category: "Automotive",
    url: "https://rams-garage.vercel.app",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80",
    imageAlt: "Auto repair garage",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-36 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-label mb-4">Selected Work</p>
          <h2 className="text-display">
            Our <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              {/* Image container */}
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />

                {/* Overlay that slides up */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm text-[#c4b5fd] font-medium uppercase tracking-wider mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                    View Live
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                {/* Arrow button */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
