"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const reasons = [
  {
    title: "Faster Websites",
    desc: "Our sites load in under 1 second. Template sites take 3-5 seconds. Google ranks faster sites higher.",
    tag: "100/100 PageSpeed Guaranteed"
  },
  {
    title: "Better SEO",
    desc: "Optimized for Google AND AI search engines. We don't just do traditional SEO — we optimize for ChatGPT, Gemini, and Perplexity too.",
    tag: "AEO + GEO Optimized"
  },
  {
    title: "Higher Conversions",
    desc: "Every page is designed around one goal: turning visitors into customers. No wasted space, no confusing navigation.",
    tag: "Built for Business Results"
  },
  {
    title: "No Template Limitations",
    desc: "Custom code means custom everything. Unlimited design, unlimited features, unlimited integrations.",
    tag: "Your Vision, Not a Theme"
  },
  {
    title: "Zero Transaction Fees",
    desc: "Unlike platforms that charge 2-5% on every sale, we build custom e-commerce with zero platform fees.",
    tag: "You Keep Your Revenue"
  },
  {
    title: "Long-Term Partner",
    desc: "We don't disappear after launch. We're your digital growth partner for the long term, available on WhatsApp.",
    tag: "Ongoing Support & Growth"
  }
];

export default function WhyReverbex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".why-reveal",
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

    const cards = gridRef.current?.querySelectorAll(".why-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="whyreverbex"
      className="w-full py-24 bg-[#050505] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20 max-w-2xl">
          <span
            className="why-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Philosophy
          </span>
          <h2
            className="why-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Why Businesses Choose Reverbex.
          </h2>
          <p
            className="why-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            We don&apos;t build cheap template websites. We engineer high-performance systems that grow your business.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((item, index) => (
            <div
              key={index}
              className="why-card p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300"
            >
              <span
                className="text-[#EAB308] text-xs font-semibold tracking-wider uppercase block mb-4"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {item.tag}
              </span>
              <h3
                className="text-white text-xl font-bold tracking-tight mb-3"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[#A0A0A0] text-sm leading-relaxed font-normal"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
