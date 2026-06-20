"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What does Reverbex do?",
    answer: "We help businesses grow through custom websites, Meta & Google Ads, lead generation, ERP systems, mobile apps, AI automation, WhatsApp integration, and complete branding solutions."
  },
  {
    question: "Why should I choose Reverbex over a template-based agency?",
    answer: "We build custom solutions, not templates. Our websites load 5x faster, rank higher on Google, and are built specifically for your business. You also own everything — no monthly fees, no vendor lock-in."
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
    question: "Do you work with businesses outside Jaipur?",
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
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '1000px' : '0px' }}
        role="region"
      >
        <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed pb-6">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".faq-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="faq"
      className="w-full py-24 bg-[#050505] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        <div className="text-left mb-16 md:mb-20">
          <h2 className="faq-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.0] mb-6">
            Frequently Asked Questions.
          </h2>
        </div>

        <div className="faq-reveal flex flex-col w-full border-t border-[#1A1A1A]">
          {faqs.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
