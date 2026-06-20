"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Zap, Search, Target, Unlock, Percent, Users } from "lucide-react";

const comparisons = [
  {
    icon: Zap,
    title: "FASTER WEBSITES",
    desc: "Our sites load in under 1 second. Template sites take 3-5 seconds. Google ranks faster sites higher.",
    metric: "100/100 PageSpeed guaranteed"
  },
  {
    icon: Search,
    title: "BETTER SEO",
    desc: "Optimized for Google AND AI search engines. We don't just do traditional SEO — we optimize for ChatGPT, Gemini, and Perplexity too.",
    metric: "AEO + GEO optimized"
  },
  {
    icon: Target,
    title: "HIGHER CONVERSIONS",
    desc: "Every page is designed around one goal: turning visitors into customers. No wasted space, no confusing navigation.",
    metric: "Built for business results"
  },
  {
    icon: Unlock,
    title: "NO TEMPLATE LIMITATIONS",
    desc: "Custom code means custom everything. Unlimited design, unlimited features, unlimited integrations.",
    metric: "Your vision, not a theme"
  },
  {
    icon: Percent,
    title: "ZERO TRANSACTION FEES",
    desc: "Unlike platforms that charge 2-5% on every sale, we build custom e-commerce with zero platform fees.",
    metric: "You keep more of your revenue"
  },
  {
    icon: Users,
    title: "LONG-TERM PARTNER",
    desc: "We don't disappear after launch. We're your digital growth partner for the long term.",
    metric: "Ongoing support and growth"
  }
];

export default function WhyReverbex() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".why-reveal",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const cards = gridRef.current?.querySelectorAll(".comparison-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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
      id="why-reverbex"
      className="w-full py-24 md:py-32 bg-[#0A0A0A] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24 max-w-3xl">
          <span
            className="why-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            The Difference
          </span>
          <h2
            className="why-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Why Businesses Choose Reverbex.
          </h2>
          <p
            className="why-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            We don't build template websites. We build systems that grow your business.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {comparisons.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="comparison-card flex flex-col p-8 bg-[#050505] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/50 transition-all duration-300 relative group"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#EAB308] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="mb-6 inline-flex p-3 bg-[#111111] rounded-lg border border-[#1A1A1A] group-hover:bg-[#EAB308]/10 group-hover:border-[#EAB308]/30 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                </div>

                <h3
                  className="text-white text-xl font-bold tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {item.title}
                </h3>
                
                <p
                  className="text-[#A0A0A0] text-sm leading-relaxed font-normal mb-6 flex-grow"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {item.desc}
                </p>

                <div className="pt-4 border-t border-[#1A1A1A]">
                  <span className="text-[#EAB308] text-sm font-semibold tracking-wide">
                    → {item.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
