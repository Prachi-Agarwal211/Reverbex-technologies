"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What does Reverbex do?",
    answer: "We help businesses grow through custom websites, Meta & Google Ads, lead generation, ERP systems, mobile apps, AI automation, WhatsApp integration, and complete branding solutions."
  },
  {
    question: "Why choose Reverbex over a template agency?",
    answer: "We build custom solutions, not templates. Our websites load 5x faster, rank higher on Google, and are built specifically for your business. You own everything — no monthly fees, no vendor lock-in."
  },
  {
    question: "How much does a website cost?",
    answer: "It depends on your requirements. Contact us for a free consultation and we'll provide a custom quote based on your needs."
  },
  {
    question: "Can you run ads for my business?",
    answer: "Yes. We manage Meta (Facebook/Instagram) and Google Ads campaigns. We've generated 500+ leads for businesses in weeks."
  },
  {
    question: "Do you provide WhatsApp automation?",
    answer: "Yes. We integrate WhatsApp Business API for automated messages, order confirmations, lead capture, and customer support."
  },
  {
    question: "Do you work outside Jaipur?",
    answer: "Yes. We're based in Jaipur but work with businesses across India and globally. We're remote-first."
  },
  {
    question: "How long does a project take?",
    answer: "A typical website takes 2-6 weeks. Ads campaigns can start generating leads within the first week."
  },
  {
    question: "What industries do you work with?",
    answer: "Education, manufacturing, e-commerce, logistics, retail, startups, and more. If your business needs a digital presence, we can help."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#1A1A1A]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-white text-base md:text-lg font-medium group-hover:text-[#EAB308] transition-colors duration-300 pr-8">
          {question}
        </span>
        <span className="p-2 shrink-0 text-[#666666] group-hover:text-white transition-colors duration-300">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        role="region"
      >
        <div className="overflow-hidden">
          <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed pb-6 max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Clip-path wipe on heading
    const headingMask = containerRef.current.querySelector(".faq-heading-mask");
    if (headingMask) {
      gsap.fromTo(
        headingMask,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.0,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Stagger items in from left
    const items = containerRef.current.querySelectorAll(".faq-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="faq"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-left mb-16 md:mb-20">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
            Questions
          </span>
          <div className="faq-heading-mask" style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
            <h2 className="display-text text-white mb-6">
              Before You Ask.
            </h2>
          </div>
        </div>

        <div className="flex flex-col w-full border-t border-[#1A1A1A]">
          {faqs.map((item, index) => (
            <div key={index} className="faq-item">
              <FAQItem
                question={item.question}
                answer={item.answer}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
