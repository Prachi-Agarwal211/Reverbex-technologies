"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Zap, Shield, Search, TrendingUp, Cpu, Database } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep to understand your target audience, existing bottleneck metrics, and product revenue opportunities."
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We architect a tailored execution roadmap specifying content hierarchy, campaign assets, and technology selection."
  },
  {
    num: "03",
    title: "Build",
    desc: "We write clean, lightweight Next.js code, design custom visuals, and configure advertising sequences."
  },
  {
    num: "04",
    title: "Launch",
    desc: "We deploy onto global edge networks, trigger Meta & Google campaigns, and track lead deliveries."
  },
  {
    num: "05",
    title: "Grow",
    desc: "We monitor results daily, run A/B copy tests, and continuously optimize campaigns for higher ROI."
  }
];

const benefits = [
  {
    icon: Zap,
    title: "Faster Loading",
    desc: "Our sites load in under 1 second. Template sites take 3-5 seconds. Every second of delay costs you 7% in conversions."
  },
  {
    icon: Search,
    title: "Better Google Rankings",
    desc: "Google ranks faster sites higher. Period. Our sites consistently outrank competitor sites built on WordPress and Shopify."
  },
  {
    icon: Cpu,
    title: "Better AI Visibility",
    desc: "Server-Side Rendering means AI search engines can read your content. Client-side rendered sites are invisible to many AI crawlers."
  },
  {
    icon: Shield,
    title: "Better Security",
    desc: "No plugins means no plugin vulnerabilities. 43% of WordPress hacks come through plugins. Our sites have zero plugin attack surface."
  },
  {
    icon: TrendingUp,
    title: "Higher Conversions",
    desc: "Every element is optimized for one goal: turning visitors into customers. No wasted space, no confusing navigation."
  },
  {
    icon: Database,
    title: "Lower Long-Term Cost",
    desc: "No monthly platform fees. No transaction fees. No plugin licenses. You own the code forever. Hosting costs ₹0-1500/month."
  }
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".method-reveal",
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

    const items = containerRef.current?.querySelectorAll(".method-item");
    items?.forEach((item) => {
      gsap.fromTo(
        item.querySelectorAll(".timeline-content-item"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const benefitCards = containerRef.current?.querySelectorAll(".benefit-card");
    if (benefitCards && benefitCards.length > 0) {
      gsap.fromTo(
        benefitCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".benefits-grid",
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
      id="methodology"
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-b border-[#1A1A1A]"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24 relative">
          <span
            className="method-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Process
          </span>
          <h2
            className="method-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            How We Work.
          </h2>
          <p
            className="method-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Our structured roadmap to take your business from discovery to scalable growth.
          </p>
        </div>

        {/* Process Steps Timeline */}
        <div className="timeline-container relative w-full md:pl-8 mb-32">
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-[#1A1A1A]" />

          <div className="flex flex-col gap-12 md:gap-20 w-full">
            {steps.map((item, i) => (
              <div
                key={i}
                className="method-item relative flex flex-col md:flex-row items-start bg-[#0A0A0A] md:bg-transparent p-6 rounded-xl border border-[#1A1A1A] md:border-transparent"
              >
                {/* Desktop timeline node */}
                <div className="hidden md:flex absolute left-0 -translate-x-1/2 w-6 h-6 items-center justify-center bg-[#050505] z-10 mt-[0.3em]">
                  <div className="w-3 h-3 rounded-full bg-[#1A1A1A] border border-[#666666] group-hover:bg-[#EAB308] transition-colors" />
                </div>

                <div className="md:ml-20 w-full relative">
                  <span
                    className="timeline-content-item text-[#EAB308] text-sm font-semibold tracking-[0.2em] uppercase mb-2 block"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Phase {item.num}
                  </span>
                  <h3
                    className="timeline-content-item text-white text-2xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="timeline-content-item text-[#A0A0A0] text-base font-light leading-relaxed max-w-2xl"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7B: Why We Build With Next.js */}
        <div className="w-full pt-16 border-t border-[#1A1A1A]">
          <div className="text-left mb-16 max-w-2xl">
            <span
              className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Technology Choice
            </span>
            <h2
              className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Why We Build With Next.js
            </h2>
            <p
              className="text-[#A0A0A0] text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Nobody cares about technology. People care about outcomes. Here&apos;s why our technology choice makes your business money.
            </p>
          </div>

          <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="benefit-card p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300"
                >
                  <div className="p-3 bg-[#050505] border border-[#1A1A1A] rounded-lg shrink-0 w-max mb-6">
                    <Icon className="w-6 h-6 text-[#EAB308]" />
                  </div>
                  <h3
                    className="text-white text-lg font-bold mb-3"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#A0A0A0] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
