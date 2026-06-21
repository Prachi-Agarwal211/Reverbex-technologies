"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "DAILY AVAILABILITY",
    desc: "Need help? Message us on WhatsApp. We respond within hours, not days. No ticketing systems — direct access to the team that built your system.",
  },
  {
    title: "PROACTIVE OPTIMIZATION",
    desc: "We don't wait for you to tell us something is wrong. We monitor your performance weekly and suggest improvements before you ask.",
  },
  {
    title: "GROWTH PARTNERSHIP",
    desc: "As your business grows, your digital systems grow with it. New features, new pages, new campaigns — we're your long-term digital partner.",
  },
  {
    title: "FAST PROBLEM SOLVING",
    desc: "Website issue? Fixed within hours. Ad not performing? Optimized immediately. Need a change? Done. No 2-week turnaround.",
  },
];

export default function ReverbexBond() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Header entrance
    const header = containerRef.current.querySelector(".bond-header");
    if (header) {
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Big stat number scales in
    const bigStat = containerRef.current.querySelector(".bond-big-stat");
    if (bigStat) {
      gsap.fromTo(
        bigStat,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bigStat,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Pillars stagger in — alternating left/right on desktop
    const items = containerRef.current.querySelectorAll(".bond-pillar");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="reverbex-bond"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header — left-aligned */}
        <div className="bond-header text-left mb-16 md:mb-24 max-w-3xl">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            The Reverbex Bond
          </span>
          <h2 className="text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.04em] leading-[1.0] mb-6">
            We Don&apos;t Disappear
            <br />
            After <span className="text-[#EAB308]">Launch.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg font-normal leading-relaxed">
            Most agencies build your website and leave. We stay.
          </p>
        </div>

        {/* Big stat — editorial visual anchor */}
        <div className="bond-big-stat mb-16 md:mb-24">
          <span className="text-[#EAB308]/10 text-[clamp(4rem,15vw,14rem)] font-black tracking-[-0.05em] leading-none select-none">
            24/7
          </span>
          <p className="text-white/50 text-sm md:text-base font-medium tracking-wide uppercase mt-2 -mt-4 md:-mt-8 ml-2">
            Availability. Every project includes it.
          </p>
        </div>

        {/* Pillars — editorial list with alternating alignment */}
        <div className="flex flex-col gap-8 md:gap-12">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bond-pillar group flex flex-col md:flex-row items-start gap-4 md:gap-8 py-6 md:py-8 border-t border-[#1A1A1A]"
            >
              <span className="text-[#EAB308] text-sm font-bold tracking-[0.15em] shrink-0 md:w-12">
                0{index + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-[#EAB308] transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-[#A0A0A0] text-base leading-relaxed font-normal max-w-2xl">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust line — clean, no duplicate copy */}
        <div className="border-t border-[#1A1A1A] pt-8 mt-12">
          <p className="text-[#666666] text-sm md:text-base font-medium tracking-wide">
            <span className="text-white font-bold">Every project includes:</span>{" "}
            Daily availability{" "}
            <span className="text-[#EAB308]">&bull;</span> Proactive monitoring{" "}
            <span className="text-[#EAB308]">&bull;</span> Fast problem solving{" "}
            <span className="text-[#EAB308]">&bull;</span> Long-term partnership{" "}
            <span className="text-[#EAB308]">&bull;</span> No surprise charges
          </p>
        </div>
      </div>
    </section>
  );
}
