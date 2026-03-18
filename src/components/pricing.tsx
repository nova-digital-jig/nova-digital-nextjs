"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$500",
    description: "Perfect for small businesses and startups that need a professional online presence fast.",
    features: [
      "Custom single-page website",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "48-hour delivery",
      "1 round of revisions",
    ],
    cta: "Get Started",
    href: "https://buy.stripe.com/test_9B68wIaSyaoJ4gWenZ6c000",
    featured: false,
    gradient: "from-violet-500/10 to-transparent",
  },
  {
    name: "Professional",
    price: "$1,000",
    description: "For growing businesses that want a multi-page site built to convert visitors into customers.",
    features: [
      "Up to 5-page website",
      "Advanced UI/UX design",
      "Full SEO package",
      "Booking/scheduling integration",
      "Analytics dashboard",
      "3 rounds of revisions",
      "30 days of support",
    ],
    cta: "Most Popular",
    href: "mailto:jigpatel01234@gmail.com?subject=Professional%20Plan%20Inquiry",
    featured: true,
    gradient: "from-violet-500 to-rose-500",
  },
  {
    name: "Enterprise",
    price: "$2,500",
    description: "Full-service web solution for established businesses ready to dominate their market online.",
    features: [
      "Unlimited pages",
      "Custom animations & interactions",
      "E-commerce integration",
      "CMS integration",
      "Advanced analytics & tracking",
      "Priority support for 90 days",
      "Performance optimization",
      "Unlimited revisions",
    ],
    cta: "Contact Us",
    href: "mailto:jigpatel01234@gmail.com?subject=Enterprise%20Plan%20Inquiry",
    featured: false,
    gradient: "from-rose-500/10 to-transparent",
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4 border-rose-500/30 bg-rose-500/10 text-rose-400">
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Invest in your{" "}
            <span className="text-gradient">growth</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Transparent pricing. No hidden fees. No surprises. Just results that pay for themselves.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl ${
                plan.featured
                  ? "glass-strong gradient-border lg:scale-105 lg:-my-4 shadow-2xl shadow-violet-500/10"
                  : "glass"
              } overflow-hidden`}
            >
              {plan.featured && (
                <div className="flex items-center justify-center gap-1 bg-gradient-to-r from-violet-500 to-rose-500 py-2 text-xs font-semibold text-white">
                  <Star className="h-3 w-3" />
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/project</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>

                <a href={plan.href} target={plan.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className={`mt-8 w-full gap-2 ${
                      plan.featured
                        ? "bg-gradient-to-r from-violet-500 to-rose-500 text-white border-0 hover:opacity-90"
                        : "bg-white/5 hover:bg-white/10 border-white/10"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-violet-400" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
