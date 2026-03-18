"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    description:
      "A 15-minute call to understand your business, goals, and competition. We define the scope and timeline so there are zero surprises.",
  },
  {
    num: "02",
    title: "Design",
    description:
      "AI-assisted wireframes and conversion-optimized layouts. You approve the design before any code is written. Your vision, perfected.",
  },
  {
    num: "03",
    title: "Develop",
    description:
      "We build your site with modern tech, bake in SEO, and optimize every pixel for performance. All delivered in 48 hours.",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "Your site goes live with analytics, monitoring, and our support to ensure you see real, measurable results from day one.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-36 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-label mb-4">How It Works</p>
          <h2 className="text-display">
            From idea to{" "}
            <span className="gradient-text">launch</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className={`py-12 md:py-16 ${
                i < steps.length - 1
                  ? "border-b border-[#1f1f3a]"
                  : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                {/* Large step number */}
                <div className="shrink-0">
                  <span className="text-[clamp(4rem,8vw,7rem)] font-bold leading-none tracking-tighter gradient-text-number">
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <div className="md:w-48 shrink-0">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <p className="text-[#888899] text-base md:text-lg leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
