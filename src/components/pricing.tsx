"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "$500",
    description: "Perfect for small businesses that need a professional online presence.",
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
    name: "Professional",
    price: "$1,000",
    description: "For growing businesses that want a site built to convert visitors into customers.",
    features: [
      "Up to 5-page website",
      "Advanced UI/UX design",
      "Full SEO package",
      "Booking/scheduling integration",
      "Analytics dashboard",
      "3 rounds of revisions",
      "30 days of support",
    ],
    href: "mailto:jigpatel01234@gmail.com?subject=Professional%20Plan%20Inquiry",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$2,500",
    description: "Full-service web solution for businesses ready to dominate their market.",
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
    href: "mailto:jigpatel01234@gmail.com?subject=Enterprise%20Plan%20Inquiry",
    featured: false,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".pricing-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-20">
          <p className="text-label mb-6 pricing-title">Pricing</p>
          <h2 className="text-display pricing-title">
            Simple, transparent<br />
            pricing
          </h2>
        </div>

        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card rounded-2xl p-8 md:p-10 transition-all duration-500 ${
                plan.featured
                  ? "bg-[#1A1A1A] text-[#FAF9F6] lg:scale-[1.03]"
                  : "border border-[#E8E4DC] hover:border-[#1A1A1A]/20"
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  className={`text-label ${
                    plan.featured ? "text-[#8A8580]" : ""
                  }`}
                >
                  {plan.name}
                </span>
                {plan.featured && (
                  <span className="text-xs font-medium bg-[#C8FF00] text-[#1A1A1A] px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <div className="mb-6">
                <span className="text-[clamp(3rem,5vw,4.5rem)] font-medium tracking-tight leading-none">
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-2 ${
                    plan.featured ? "text-[#8A8580]" : "text-[#8A8580]"
                  }`}
                >
                  / project
                </span>
              </div>

              <p
                className={`text-sm leading-relaxed mb-8 ${
                  plan.featured ? "text-[#8A8580]" : "text-[#8A8580]"
                }`}
              >
                {plan.description}
              </p>

              <a
                href={plan.href}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-medium transition-all duration-500 mb-8 ${
                  plan.featured
                    ? "bg-[#C8FF00] text-[#1A1A1A] hover:bg-[#b8ef00]"
                    : "bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#333]"
                }`}
              >
                Get Started
                <ArrowUpRight size={16} />
              </a>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        plan.featured ? "text-[#C8FF00]" : "text-[#1A1A1A]"
                      }`}
                    />
                    <span
                      className={
                        plan.featured ? "text-[#C0BDB8]" : "text-[#8A8580]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
