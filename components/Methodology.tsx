"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We dive deep into your target audience, bottleneck metrics, and revenue opportunities. We map out the exact user journey needed to turn visitors into buyers.",
    gradient: "from-[#111] to-[#1A1A1A]",
  },
  {
    num: "02",
    title: "Architecture Design",
    desc: "A tailored execution roadmap. We design high-converting wireframes and write direct-response copy that speaks directly to your ideal customer profile.",
    gradient: "from-[#151515] to-[#222]",
  },
  {
    num: "03",
    title: "Custom Development",
    desc: "Clean, lightweight Next.js code. No bloated WordPress themes. We build custom components that load instantly and perform flawlessly across all devices.",
    gradient: "from-[#1A1A1A] to-[#2A2A2A]",
  },
  {
    num: "04",
    title: "Campaign Configuration",
    desc: "We configure tracking pixels, set up automated email flows, and structure Meta & Google campaigns designed to drive targeted traffic to your new system.",
    gradient: "from-[#222] to-[#333]",
  },
  {
    num: "05",
    title: "Launch & Optimize",
    desc: "Deployed on global edge networks. Once live, we monitor user behavior, A/B test variations, and continuously optimize for higher ROI.",
    gradient: "from-[#0A0A0A] to-[#EAB308]/10", // Special highlight for the last step
  },
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Header entrance
    const header = containerRef.current.querySelector(".method-header");
    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

    // GSAP Card Stacking Effect
    const cards = containerRef.current.querySelectorAll(".method-card");
    const totalCards = cards.length;

    cards.forEach((card, index) => {
      // We don't animate the last card because nothing stacks on top of it
      if (index === totalCards - 1) return;

      // As we scroll past this card, scale it down slightly and fade it out
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.3,
        scrollTrigger: {
          trigger: card,
          start: "top 15%", // When it reaches the sticky top position
          end: "bottom top", // As the next card covers it
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="methodology"
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Header */}
        <div className="method-header text-center mb-16 md:mb-24 relative">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
            The Methodology
          </span>
          <h2 className="text-white text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-[-0.03em] leading-[1.0] mb-6">
            From Idea to Revenue.
          </h2>
          <p className="text-[#A0A0A0] text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Five deliberate phases. No wasted steps. We build digital assets designed strictly to increase your bottom line.
          </p>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="relative w-full flex flex-col gap-6 pb-24">
          {steps.map((item, i) => (
            <div
              key={i}
              className="method-card sticky top-[15vh] w-full min-h-[40vh] md:min-h-[50vh] rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl origin-top"
              style={{
                // Fallback background, but we use Tailwind gradients
                backgroundColor: "#0A0A0A",
                // Z-index increases so cards stack properly on top of each other
                zIndex: i + 10,
              }}
            >
              {/* Beautiful gradient background applied to the card */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 rounded-3xl`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <span className="text-[#EAB308] text-5xl md:text-7xl font-black opacity-30 tracking-tighter leading-none">
                    {item.num}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#EAB308]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-6">
                    {item.title}
                  </h3>
                  <p className="text-[#A0A0A0] text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
