"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Clock, DollarSign, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const stats = [
  { icon: Clock, label: "Delivery", value: 48, suffix: "hrs", delay: 0.6 },
  { icon: DollarSign, label: "Starting at", value: 500, prefix: "$", delay: 0.8 },
  { icon: Zap, label: "AI-Powered", value: 100, suffix: "%", delay: 1.0 },
  { icon: TrendingUp, label: "Conversion", value: 300, prefix: "+", suffix: "%", delay: 1.2 },
];

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-2xl font-bold">
      {prefix}{count}{suffix}
    </div>
  );
}

function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spacing = 50;
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        particles.push({
          x: x + Math.random() * 10,
          y: y + Math.random() * 10,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        const dx = p.x - p.baseX;
        const dy = p.y - p.baseY;
        if (Math.abs(dx) > 20) p.vx *= -1;
        if (Math.abs(dy) > 20) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

function MouseOrb() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="mouse-orb hidden lg:block" style={{ left: pos.x, top: pos.y }} />;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="Abstract technology background with glowing blue network connections"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 gradient-mesh" />
      </motion.div>

      {/* Particle grid */}
      <ParticleGrid />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern z-[2]" />

      {/* Grain texture */}
      <div className="grain absolute inset-0 z-[2]" />

      {/* Mouse-following orb */}
      <MouseOrb />

      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px] z-[2]"
      />
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[120px] z-[2]"
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center min-h-screen"
      >
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
            <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-violet-500 to-rose-500 text-white border-0 hover:opacity-90 transition-opacity gap-2 group">
              See Pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <a href="#portfolio">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10">
              View Our Work
            </Button>
          </a>
        </motion.div>

        {/* Floating stat cards with count-up */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-4 text-center relative group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-rose-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <stat.icon className="mx-auto mb-2 h-5 w-5 text-violet-400" />
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
