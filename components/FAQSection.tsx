"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What does Reverbex do?",
    answer: "We help businesses grow through custom websites, Meta & Google Ads, lead generation, ERP systems, mobile apps, AI automation, WhatsApp integration, and complete branding solutions.",
    color: "#3B82F6",
  },
  {
    question: "Why choose Reverbex over a template agency?",
    answer: "We build custom solutions, not templates. Our websites load 5× faster, rank higher on Google, and are built specifically for your business. You own everything — no monthly fees, no vendor lock-in.",
    color: "#EAB308",
  },
  {
    question: "How much does a website cost?",
    answer: "It depends on your requirements. Contact us for a free consultation and we'll provide a custom quote based on your exact needs and business goals.",
    color: "#10B981",
  },
  {
    question: "Can you run ads for my business?",
    answer: "Yes. We manage Meta (Facebook/Instagram) and Google Ads campaigns. We've generated 500+ leads for clients in under two weeks.",
    color: "#A78BFA",
  },
  {
    question: "Do you provide WhatsApp automation?",
    answer: "Yes. We integrate WhatsApp Business API for automated messages, order confirmations, OTP delivery, lead capture, and customer support flows.",
    color: "#F472B6",
  },
  {
    question: "How long does a project take?",
    answer: "A typical website: 2–6 weeks. Ad campaigns can generate leads within the first 7 days of launch.",
    color: "#EAB308",
  },
];

function FAQItem({
  question, answer, color, isOpen, onClick, index,
}: {
  question: string; answer: string; color: string;
  isOpen: boolean; onClick: () => void; index: number;
}) {
  return (
    <div
      className="faq-item overflow-hidden transition-all duration-400 border-b border-white/5"
    >
      <button
        onClick={onClick}
        className="w-full py-6 md:py-8 flex items-start justify-between text-left gap-6 group outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-5 flex-1">
          <span
            className="text-[10px] font-mono font-bold shrink-0 mt-2 tabular-nums transition-colors duration-300"
            style={{ color: isOpen ? color : "rgba(255,255,255,0.2)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-black tracking-tight leading-none transition-colors duration-300"
            style={{ 
              fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
              color: isOpen ? "#ffffff" : "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-heading)" 
            }}
          >
            {question}
          </span>
        </div>

        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? `${color}15` : "transparent",
            color: isOpen ? color : "rgba(255,255,255,0.2)",
          }}
        >
          <svg
            width="14" height="14"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="3"
            style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pl-[2.8rem] md:pl-[3.5rem] max-w-2xl">
            <div className="w-12 h-[2px] mb-4 rounded" style={{ background: color }} />
            <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium">{answer}</p>
          </div>
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Standard fade-in, NO pinning.
    const items = containerRef.current.querySelectorAll(".faq-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="faq"
      className="w-full py-24 md:py-32 relative z-50"
      style={{
        background: "#050515",
        backgroundImage: `
          radial-gradient(ellipse 65% 55% at 50% 5%,   rgba(59,130,246,0.10) 0%, transparent 55%),
          radial-gradient(ellipse 50% 55% at 15% 80%,  rgba(234,179,8,0.06)  0%, transparent 50%)
        `,
      }}
    >
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 md:px-10 relative z-10">
        {/* Editorial Heading */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-4 h-[1px] rounded bg-blue-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400/60">FAQ</span>
          </div>
          <h2
            className="font-black text-white leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}
          >
            Questions,{" "}
            <span style={{ color: "#3B82F6" }}>answered.</span>
          </h2>
        </div>

        {/* Minimalist raw list (Not a grid of cards) */}
        <div className="flex flex-col border-t border-white/5">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              color={item.color}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
