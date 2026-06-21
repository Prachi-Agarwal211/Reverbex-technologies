"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`border-b transition-colors duration-500 ${isOpen ? 'border-[#EAB308]/50' : 'border-[#1A1A1A] hover:border-[#333]'}`}>
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 pr-8 ${isOpen ? 'text-[#EAB308]' : 'text-white group-hover:text-white/80'}`}>
          {question}
        </span>
        <span className={`p-3 shrink-0 rounded-full border transition-all duration-300 ${isOpen ? 'border-[#EAB308] text-[#EAB308] bg-[#EAB308]/10 rotate-180' : 'border-[#1A1A1A] text-[#666666] group-hover:border-[#333] group-hover:text-white rotate-0'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        role="region"
      >
        <div className="overflow-hidden">
          <p className="text-[#A0A0A0] text-lg leading-relaxed pb-8 max-w-2xl font-light">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Pinned Header entrance
    const leftCol = containerRef.current.querySelector(".faq-left-col");
    if (leftCol) {
      gsap.fromTo(
        leftCol,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // Stagger FAQ items
    const items = containerRef.current.querySelectorAll(".faq-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-right-col",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="faq"
      className="w-full py-24 md:py-32 bg-[#050505] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Pinned Header */}
          <div className="faq-left-col lg:col-span-5 relative">
            <div className="lg:sticky lg:top-40">
              <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
                The Details
              </span>
              <h2 className="text-[clamp(3.5rem,6vw,6rem)] font-black tracking-tighter leading-[0.95] text-white mb-8">
                Before You Ask.
              </h2>
              <p className="text-[#A0A0A0] text-lg font-light leading-relaxed max-w-sm">
                Everything you need to know about how we build, deploy, and scale high-performance engineering systems.
              </p>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="faq-right-col lg:col-span-7 border-t border-[#1A1A1A]">
            {faqs.map((item, index) => (
              <div key={index} className="faq-item">
                <FAQItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
