"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Pencil, Code, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery Call",
    description:
      "We learn your business, goals, and competition. Our AI receptionist Isabella schedules a 15-min strategy call.",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Pencil,
    step: "02",
    title: "Design & Strategy",
    description:
      "AI-assisted wireframes and conversion-optimized layouts. You approve the design before a single line of code is written.",
    color: "from-violet-500 to-rose-500",
  },
  {
    icon: Code,
    step: "03",
    title: "Build & Optimize",
    description:
      "We build your site with modern tech, bake in SEO, and optimize every pixel for conversions. All in 48 hours.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Grow",
    description:
      "Your site goes live with analytics, performance monitoring, and our support to ensure you start seeing results fast.",
    color: "from-rose-500 to-violet-500",
  },
];

function AnimatedProgressLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={lineRef} className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block">
      {/* Background line */}
      <div className="absolute inset-0 bg-white/5" />
      {/* Animated fill */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-gradient-to-b from-violet-500 via-rose-500 to-violet-500"
      />
      {/* Glow */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-gradient-to-b from-violet-500 via-rose-500 to-violet-500 blur-sm opacity-50"
      />
    </div>
  );
}

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4 border-violet-500/30 bg-violet-500/10 text-violet-400">
            Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            From idea to launch in{" "}
            <span className="text-gradient">4 simple steps</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            No endless meetings. No scope creep. Just results.
          </p>
        </motion.div>

        <div className="relative mt-20">
          {/* Animated progress line */}
          <AnimatedProgressLine />

          <div className="grid gap-12 lg:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex flex-col items-center gap-6 lg:flex-row ${
                  i % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className={`glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 ${
                      i % 2 === 0 ? "lg:ml-auto lg:mr-12" : "lg:mr-auto lg:ml-12"
                    } lg:max-w-md`}
                  >
                    <span className="text-xs font-bold text-gradient">
                      STEP {step.step}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Icon node with pulse */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg relative`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                    {/* Pulse ring */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} animate-ping opacity-20`} />
                  </motion.div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
