"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "./scroll-animations";

const faqs = [
  {
    question: "How do you build a website in 48 hours?",
    answer:
      "We use AI-powered development tools combined with modern frameworks like Next.js. Our process is streamlined — requirements on Day 1, design and build on Day 1–2, launch by end of Day 2. No fluff, no bloat, just speed and quality.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Every plan includes revision rounds — 1 for Starter, 3 for Growth, and unlimited for Premium. After your rounds, we offer affordable maintenance packages starting at $100/month.",
  },
  {
    question: "Do I own the website code?",
    answer:
      "Absolutely. You own 100% of the code, design, and content. We build on open-source frameworks and deploy to platforms you control. No vendor lock-in, ever.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Next.js, React, Tailwind CSS, deployed on Vercel. Every site scores 95+ on Google Lighthouse for performance, accessibility, and SEO out of the box.",
  },
  {
    question: "Can you add e-commerce or booking systems?",
    answer:
      "Yes. Our Growth and Premium plans include integrations like booking systems, payment processing, and inventory management with Stripe, Square, Calendly, and more.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "We show you the design before writing any code. You approve wireframes and mockups first. If you're not satisfied, we iterate until you are — your satisfaction is guaranteed.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !innerRef.current) return;
    contentRef.current.style.height = isOpen
      ? innerRef.current.offsetHeight + "px"
      : "0px";
  }, [isOpen]);

  return (
    <div className="border-b border-[#1f1f3a]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-7 md:py-8 text-left group"
      >
        <span className="text-lg md:text-xl font-medium pr-8 text-white group-hover:text-[#c4b5fd] transition-colors duration-300">
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
            isOpen
              ? "rotate-45 bg-[#8b5cf6] border-[#8b5cf6]"
              : "border-[#1f1f3a] hover:border-[#8b5cf6]/50"
          }`}
        >
          <Plus
            size={14}
            className={`transition-colors duration-300 ${
              isOpen ? "text-white" : "text-[#888899]"
            }`}
          />
        </div>
      </button>
      <div
        ref={contentRef}
        className="accordion-content"
        style={{ height: 0 }}
      >
        <div ref={innerRef} className="pb-8">
          <p className="text-[#888899] text-base leading-relaxed max-w-2xl">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useScrollReveal();
  const listRef = useStaggerReveal();

  return (
    <section id="faq" className="py-24 md:py-32 lg:py-40 px-6 md:px-10">
      <div className="mx-auto max-w-[900px]">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-label mb-4">FAQ</p>
          <h2 className="text-display">
            Questions & <span className="gradient-text">Answers</span>
          </h2>
        </div>

        <div ref={listRef}>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
