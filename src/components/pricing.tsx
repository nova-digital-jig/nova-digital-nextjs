"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$500",
    description: "Perfect for getting started with a professional online presence.",
    features: [
      "Custom single-page website",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "48-hour delivery",
      "1 round of revisions",
    ],
    href: "https://buy.stripe.com/test_9B68wIaSyaoJ4gWenZ6c000",
    featured: false,
  },
  {
    name: "Growth",
    price: "$1,000",
    description: "Most popular — built to convert visitors into paying customers.",
    features: [
      "Up to 5-page website",
      "Advanced UI/UX design",
      "Full SEO package",
      "Booking/scheduling integration",
      "Analytics dashboard",
      "3 rounds of revisions",
      "30 days of support",
      "Performance optimization",
    ],
    href: "mailto:jigpatel01234@gmail.com?subject=Growth%20Plan%20Inquiry",
    featured: true,
  },
  {
    name: "Premium",
    price: "$2,500",
    description: "Full custom solution for businesses ready to dominate.",
    features: [
      "Unlimited pages",
      "Custom animations & interactions",
      "E-commerce integration",
      "CMS integration",
      "Advanced analytics & tracking",
      "Priority support for 90 days",
      "Performance optimization",
      "AI chatbot integration",
      "Unlimited revisions",
      "Dedicated project manager",
    ],
    href: "mailto:jigpatel01234@gmail.com?subject=Premium%20Plan%20Inquiry",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32 md:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-label mb-4">Pricing</p>
          <h2 className="text-display">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-8 md:p-10 min-h-[500px] transition-all duration-500 ${
                plan.featured
                  ? "bg-[#111118] lg:scale-[1.03]"
                  : "bg-[#111118] border border-[#1f1f3a]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Gradient border for featured */}
              {plan.featured && (
                <>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#f43f5e] -z-10 blur-[1px]" />
                  <div className="absolute inset-[1px] rounded-2xl bg-[#111118] -z-[5]" />
                </>
              )}

              <div className="flex items-center justify-between mb-8">
                <span className="text-label text-[#888899]">
                  {plan.name}
                </span>
                {plan.featured && (
                  <span className="text-xs font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <div className="mb-6">
                <span className="text-[clamp(3rem,5vw,4rem)] font-bold tracking-tight leading-none text-white">
                  {plan.price}
                </span>
                <span className="text-sm ml-2 text-[#888899]">/ project</span>
              </div>

              <p className="text-sm leading-relaxed mb-8 text-[#888899]">
                {plan.description}
              </p>

              <a
                href={plan.href}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-semibold transition-all duration-500 mb-8 ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white hover:shadow-lg hover:shadow-[#8b5cf6]/25"
                    : "bg-white/5 text-white border border-[#1f1f3a] hover:bg-white/10 hover:border-[#8b5cf6]/50"
                }`}
              >
                Get Started
                <ArrowUpRight size={16} />
              </a>

              <ul className="space-y-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[#8b5cf6]"
                    />
                    <span className="text-[#a0a0b8]">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
