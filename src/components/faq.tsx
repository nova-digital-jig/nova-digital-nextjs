"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "How do you build a website in 48 hours?",
    answer:
      "We use AI-powered development tools combined with battle-tested templates and frameworks. Our process is streamlined — we gather your requirements on Day 1, design and build on Day 1-2, and launch by end of Day 2. No fluff, no bloat, just speed and quality.",
  },
  {
    question: "What if I need changes after the website is launched?",
    answer:
      "Every plan includes revision rounds — 1 for Starter, 3 for Professional, and unlimited for Enterprise. After your revision rounds, we offer affordable maintenance packages. We're here for the long haul.",
  },
  {
    question: "Do I own the website code?",
    answer:
      "Absolutely. You own 100% of the code, design, and content. We build on open-source frameworks like Next.js and deploy to platforms you control. No vendor lock-in, ever.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We build with Next.js, React, Tailwind CSS, and deploy on Vercel for maximum speed and reliability. We use modern AI tools to accelerate development without sacrificing quality. Every site scores 95+ on Google Lighthouse.",
  },
  {
    question: "Can you add e-commerce or booking systems?",
    answer:
      "Yes! Our Professional and Enterprise plans include integrations like booking systems, payment processing, inventory management, and more. We can integrate with Stripe, Square, Calendly, and other popular platforms.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "We show you the design before writing any code. You approve wireframes and mockups first. If you're not happy, we iterate until you are. Our goal is a website you're proud to show off.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="mx-auto max-w-3xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4 border-violet-500/30 bg-violet-500/10 text-violet-400">
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Got{" "}
            <span className="text-gradient">questions?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="glass rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
