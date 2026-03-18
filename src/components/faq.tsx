"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How do you build a website in 48 hours?",
    answer:
      "We use AI-powered development tools combined with modern frameworks. Our process is streamlined — requirements on Day 1, design and build on Day 1–2, launch by end of Day 2. No fluff, no bloat, just speed and quality.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Every plan includes revision rounds — 1 for Starter, 3 for Professional, and unlimited for Enterprise. After your rounds, we offer affordable maintenance packages.",
  },
  {
    question: "Do I own the website code?",
    answer:
      "Absolutely. You own 100% of the code, design, and content. We build on open-source frameworks and deploy to platforms you control. No vendor lock-in.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Next.js, React, Tailwind CSS, deployed on Vercel. Every site scores 95+ on Google Lighthouse for performance, accessibility, and SEO.",
  },
  {
    question: "Can you add e-commerce or booking systems?",
    answer:
      "Yes. Our Professional and Enterprise plans include integrations like booking systems, payment processing, and inventory management with Stripe, Square, Calendly, and more.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "We show you the design before writing any code. You approve wireframes and mockups first. If you're not satisfied, we iterate until you are.",
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

    if (isOpen) {
      contentRef.current.style.height = innerRef.current.offsetHeight + "px";
    } else {
      contentRef.current.style.height = "0px";
    }
  }, [isOpen]);

  return (
    <div className="border-b border-[#E8E4DC]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-7 md:py-8 text-left group"
      >
        <span className="text-lg md:text-xl font-medium pr-8 group-hover:translate-x-1 transition-transform duration-400">
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full border border-[#E8E4DC] flex items-center justify-center shrink-0 transition-all duration-500 ${
            isOpen ? "rotate-45 bg-[#1A1A1A] border-[#1A1A1A]" : ""
          }`}
        >
          <Plus
            size={14}
            className={`transition-colors duration-300 ${
              isOpen ? "text-[#FAF9F6]" : "text-[#1A1A1A]"
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
          <p className="text-body-lg max-w-2xl text-base">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".faq-item", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-[900px]">
        <div className="text-center mb-16">
          <p className="text-label mb-6 faq-title">FAQ</p>
          <h2 className="text-display faq-title">
            Questions &<br />
            answers
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <AccordionItem
                item={faq}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
