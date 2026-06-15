"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What does Reverbex Technologies do?",
    answer: "We help businesses grow through custom Next.js websites, Meta (Facebook/Instagram) advertising, Google advertising, CRM/ERP lead integration systems, mobile apps, and automated digital operations."
  },
  {
    question: "Why should I choose Reverbex over a cheap template-based agency?",
    answer: "Template sites are bloated, load in 3-5 seconds, have security holes from plugins, and are hard to customize. Reverbex builds custom code tailored to your exact business. You own the code forever, it loads under 1 second, and it is built strictly around conversions and lead capture."
  },
  {
    question: "Are there transaction fees or monthly platform fees for custom e-commerce?",
    answer: "No. Unlike platforms like Shopify that take 2-3% on every sale on top of subscription fees, our custom e-commerce platforms charge 0% in platform fees. You only pay standard payment gateway charges (like Razorpay or Stripe)."
  },
  {
    question: "How do you guarantee 100/100 PageSpeed scores?",
    answer: "We develop websites using Next.js and React with Server-Side Rendering (SSR) and advanced asset loading. There are no heavy plugins, useless scripts, or unoptimized images slowing down our build architectures."
  },
  {
    question: "Do you disappear after the website is launched?",
    answer: "No. The 'Reverbex Bond' guarantees direct daily availability via WhatsApp, weekly performance reviews, proactive optimization of your ad campaigns, and quick troubleshooting support. We act as your ongoing digital growth partner."
  },
  {
    question: "Do I own the source code of my website or ERP?",
    answer: "Yes, 100%. Once project milestones are complete, the entire source code repository is handed over to you. There is no vendor lock-in or forced licenses."
  },
  {
    question: "Do you run ad campaigns and design ad creatives?",
    answer: "Yes. We manage both Meta Ads and Google Ads campaigns. This includes audience research, campaign setups, performance monitoring, copywriting, and ad creative designing."
  },
  {
    question: "How much does a custom project cost?",
    answer: "Custom websites generally range from ₹1,00,000 to ₹5,00,000 depending on features and scope. While this is more expensive than standard templates upfront, our speed and conversion optimization means the system pays for itself quickly through increased sales and leads."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-[#1A1A1A]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span
          className="text-white text-base md:text-lg font-bold group-hover:text-[#EAB308] transition-colors duration-300"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {question}
        </span>
        <span className="p-2 ml-4 shrink-0 text-[#666666] group-hover:text-white transition-colors duration-300">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p
          className="text-[#A0A0A0] text-sm md:text-base leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
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
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20">
          <span
            className="faq-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            FAQ
          </span>
          <h2
            className="faq-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Frequently Asked Questions.
          </h2>
        </div>

        {/* FAQ List */}
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
