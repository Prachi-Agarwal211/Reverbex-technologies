"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MessageSquare, Eye, TrendingUp, Zap } from "lucide-react";
import FractalGlassBackground from "./FractalGlassBackground";

const pillars = [
  {
    icon: MessageSquare,
    title: "Daily Availability",
    desc: "Need help? Message us on WhatsApp. We respond within hours, not days. No ticketing systems — direct access to the team that built your system."
  },
  {
    icon: Eye,
    title: "Proactive Optimization",
    desc: "We don't wait for you to tell us something is wrong. We monitor your performance weekly and suggest improvements before you ask."
  },
  {
    icon: TrendingUp,
    title: "Growth Partnership",
    desc: "As your business grows, your digital systems grow with it. New features, new pages, new campaigns — we're your long-term digital partner."
  },
  {
    icon: Zap,
    title: "Fast Problem Solving",
    desc: "Website issue? Fixed within hours. Ad not performing? Optimized immediately. Need a change? Done. No 2-week turnaround."
  }
];

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".bond-reveal",
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

    const cards = gridRef.current?.querySelectorAll(".bond-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
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
      id="reverbexbond"
      className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-b border-[#1A1A1A]"
    >
      <FractalGlassBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24 max-w-3xl">
          <span
            className="bond-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            The Reverbex Bond
          </span>
          <h2
            className="bond-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            We Don&apos;t Disappear After Launch.
          </h2>
          <p
            className="bond-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Most agencies build your website and leave. We build long-term relationships to support your business expansion every single day.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bond-card flex gap-6 p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300"
              >
                <div className="p-3 bg-[#050505] border border-[#1A1A1A] rounded-lg shrink-0 h-max">
                  <Icon className="w-6 h-6 text-[#EAB308]" />
                </div>
                <div>
                  <h3
                    className="text-white text-xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#A0A0A0] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body), sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Line footer */}
        <div className="bond-reveal w-full pt-8 border-t border-[#1A1A1A] text-center">
          <p
            className="text-[#666666] text-xs md:text-sm tracking-wider uppercase font-semibold"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            ✓ Daily availability • ✓ Proactive monitoring • ✓ Fast problem solving • ✓ Long-term partnership • ✓ No surprise charges
          </p>
        </div>

      </div>
    </section>
  );
}
