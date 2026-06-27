"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What does Reverbex do?",
    answer: "Custom websites, Meta & Google Ads, lead generation, ERP systems, mobile apps, AI automation, WhatsApp integration, and branding — all engineered in-house.",
  },
  {
    question: "Why choose Reverbex over a template agency?",
    answer: "Custom solutions. 5× faster load times, higher Google rankings, built for your business. You own everything — no monthly fees, no vendor lock-in.",
  },
  {
    question: "How much does a website cost?",
    answer: "Depends on your requirements. Contact us for a free consultation — custom quote based on your exact needs. No one-size-fits-all.",
  },
  {
    question: "Can you run ads for my business?",
    answer: "Yes. Meta & Google Ads end-to-end — creative, targeting, tracking, optimization. 500+ leads for clients in under two weeks.",
  },
  {
    question: "Do you provide WhatsApp automation?",
    answer: "Yes. Official WhatsApp Business API — automated messages, order confirmations, OTP, lead capture, full support flows.",
  },
  {
    question: "How long does a project take?",
    answer: "Custom website: 2–6 weeks. Ads: leads within 7 days. ERP/complex systems: 8–16 weeks.",
  },
  {
    question: "Do you work outside Jaipur?",
    answer: "Yes. Remote-first. Businesses across India and globally — from Rajasthan education institutes to Mumbai e-commerce brands.",
  },
  {
    question: "What makes you different from a freelancer?",
    answer: "Accountability, systems, continuity. Freelancers disappear. The Reverbex Bond — daily availability, proactive monitoring, long-term partnership.",
  },
];

function FAQItem({
  question, answer, isOpen, onClick, index, accent,
}: {
  question: string; answer: string;
  isOpen: boolean; onClick: () => void; index: number; accent: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    gsap.to(contentRef.current, {
      height: isOpen ? "auto" : 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
  }, { scope: contentRef, dependencies: [isOpen] });

  return (
    <div
      className="faq-item border-b relative"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Active glow line */}
      <div
        className="absolute top-0 left-0 h-[1px]"
        style={{
          width: isOpen ? "100%" : "0%",
          background: `linear-gradient(90deg, transparent 0%, ${accent}40 20%, ${accent}60 50%, ${accent}40 80%, transparent 100%)`,
          transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <button
        onClick={onClick}
        className="w-full py-7 md:py-9 flex items-start justify-between text-left gap-6 outline-none group"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className="flex-shrink-0 tabular-nums font-black leading-none mt-1"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
            color: isOpen ? accent : "rgba(255,255,255,0.15)",
            letterSpacing: "-0.02em",
            textShadow: isOpen ? `0 0 15px ${accent}30` : "none",
            transition: "color 0.5s, text-shadow 0.5s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          className="flex-1 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
            fontWeight: isOpen ? 400 : 300,
            fontStyle: isOpen ? "normal" : "italic",
            letterSpacing: "-0.02em",
            color: isOpen ? "#F5F5F0" : "rgba(255,255,255,0.50)",
            transition: "color 0.5s, font-weight 0.5s",
          }}
        >
          {question}
        </span>

        {/* Toggle icon */}
        <div
          className="flex-shrink-0 mt-2"
          style={{ color: isOpen ? accent : "rgba(255,255,255,0.2)", transition: "color 0.5s" }}
        >
          <svg
            width="16" height="16"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5"
            style={{
              transform: isOpen ? "rotate(45deg)" : "none",
              transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
              filter: isOpen ? `drop-shadow(0 0 6px ${accent}40)` : "none",
            }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      {/* Answer — GSAP-animated height */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div className="pb-8 pl-9 md:pl-12">
          {/* Accent line */}
          <div
            className="mb-5 h-[1px] origin-left"
            style={{
              background: accent,
              width: isOpen ? "3rem" : "0",
              opacity: 0.5,
              boxShadow: `0 0 10px ${accent}30`,
              transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          <p
            className="text-white/55 font-normal leading-relaxed max-w-2xl text-shadow-body"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split-type heading reveal
    const headingEls = sectionRef.current.querySelectorAll<HTMLElement>(".faq-heading-split");
    const splits: InstanceType<typeof SplitType>[] = [];
    headingEls.forEach((el) => {
      const split = new SplitType(el, { types: "chars,words" });
      splits.push(split);
      gsap.fromTo(
        split.chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1, duration: 0.8, stagger: 0.02, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    // FAQ items — staggered entrance with clip-path
    const items = sectionRef.current.querySelectorAll(".faq-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20, clipPath: "inset(5% 0% 0% 0%)" },
      {
        opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );

    // Subtitle
    const subtitle = sectionRef.current.querySelector<HTMLElement>(".faq-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle,
        { y: 15, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: subtitle, start: "top 88%", once: true },
        }
      );
    }

    return () => { splits.forEach(s => s.revert()); };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-full py-24 md:py-36 relative z-50 overflow-hidden"
      style={{
        background: "transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#EAB308]/50 mb-5">FAQ</p>
            <div className="overflow-hidden">
              <h2
                className="faq-heading-split block leading-none tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  letterSpacing: "-0.04em",
                }}
              >
                Questions,{" "}
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="faq-heading-split block leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  color: "#EAB308",
                }}
              >
                answered.
              </h2>
            </div>
          </div>
          <p className="faq-subtitle text-white/50 font-light max-w-[200px] text-right leading-relaxed text-shadow-body" style={{ fontSize: "12px" }}>
            Still have questions? WhatsApp us directly.
          </p>
        </div>

        {/* Accordion */}
        <div className="border-t relative" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div
            className="absolute top-0 left-1/4 right-1/4 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(234,179,8,0.3) 50%, transparent 100%)",
            }}
          />
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              accent="#EAB308"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
