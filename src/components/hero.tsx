"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, DollarSign, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Clock, label: "Delivery", value: "48hrs", delay: 0.6 },
  { icon: DollarSign, label: "Starting at", value: "$500", delay: 0.8 },
  { icon: Zap, label: "AI-Powered", value: "100%", delay: 1.0 },
  { icon: TrendingUp, label: "Conversion", value: "+300%", delay: 1.2 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden gradient-mesh grid-pattern">
      {/* Grain texture */}
      <div className="grain absolute inset-0" />

      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-8 gap-2 border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-violet-400">
            <Zap className="h-3 w-3" />
            AI-Powered Web Development
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Websites That{" "}
          <span className="text-gradient">Print Money</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          We build stunning, high-converting websites in{" "}
          <span className="text-foreground font-medium">48 hours</span> using
          AI-powered development. Stop losing customers to bad design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a href="#pricing">
            <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-violet-500 to-rose-500 text-white border-0 hover:opacity-90 transition-opacity gap-2">
              See Pricing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="#portfolio">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10">
              View Our Work
            </Button>
          </a>
        </motion.div>

        {/* Floating stat cards */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-4 text-center"
            >
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-violet-400" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
