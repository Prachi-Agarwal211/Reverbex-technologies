"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Discovery",
    sub: "& Strategy",
    desc: "We audit your audience, bottleneck metrics, and revenue opportunities. We map the exact user journey to convert visitors into buyers — before writing a single line of code.",
    accent: "#3B82F6",
  },
  {
    num: "02",
    title: "Architecture",
    sub: "& Design",
    desc: "Tailored wireframes, direct-response copy, and a precise execution roadmap. We design for your ideal customer — not for a generic audience.",
    accent: "#EAB308",
  },
  {
    num: "03",
    title: "Custom",
    sub: "Development",
    desc: "Clean Next.js code. Zero bloated themes. Custom components that load instantly and perform across all devices — owned by you, forever.",
    accent: "#10B981",
  },
  {
    num: "04",
    title: "Campaign",
    sub: "Configuration",
    desc: "Tracking setup, automated flows, and Meta & Google campaigns structured to drive targeted traffic from day one.",
    accent: "#A78BFA",
  },
  {
    num: "05",
    title: "Launch",
    sub: "& Optimize",
    desc: "Deployed on global edge networks. We monitor behavior, A/B test, and continuously optimize for higher ROI long after launch.",
    accent: "#0EA5E9",
  },
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Remove GSAP pinning completely. Just simple parallax entrance for the cards.
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".method-card");
    cards.forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { 
            trigger: card, 
            start: "top 80%",
          },
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="methodology"
      className="relative w-full py-24 md:py-32 overflow-hidden z-30"
      style={{
        background: "#040610",
        backgroundImage: `
          radial-gradient(ellipse 60% 50% at 20% 20%, rgba(29,78,216,0.10) 0%, transparent 50%),
          radial-gradient(ellipse 50% 60% at 80% 70%, rgba(234,179,8,0.06) 0%, transparent 50%)
        `,
      }}
    >
      <div className="max-w-4xl mx-auto px-5 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-4 h-[1px] bg-blue-400/50" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400/60">How We Work</span>
          </div>
          <h2
            className="font-black text-white leading-[0.9] mb-3"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}
          >
            Idea → Revenue.<br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>Five deliberate steps.</span>
          </h2>
        </div>

        {/* Stacking cards using native CSS sticky, NOT GSAP pin! */}
        <div className="relative flex flex-col gap-6 pb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="method-card sticky overflow-hidden"
              style={{
                top: `${12 + i * 2}vh`, // Native CSS stacking
                zIndex: i + 10,
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${step.accent}08 0%, #050810 55%)`,
                border: `1px solid ${step.accent}15`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 ${step.accent}15`,
                marginBottom: i === steps.length - 1 ? 0 : "40vh", // Force spacing so we actually scroll past them
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 inset-x-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent 0%, ${step.accent}50 40%, transparent 100%)` }}
              />

              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12 p-8 md:p-12">
                {/* Step number — large, left editorial anchor */}
                <div
                  className="shrink-0 font-black leading-none tabular-nums select-none"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 7rem)",
                    letterSpacing: "-0.05em",
                    color: `${step.accent}25`,
                    fontFamily: "var(--font-heading)",
                    lineHeight: 0.8,
                  }}
                >
                  {step.num}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3
                    className="font-black leading-none mb-1"
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
                      letterSpacing: "-0.03em",
                      color: "rgba(255,255,255,0.9)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <h4
                    className="font-black leading-none mb-5"
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
                      letterSpacing: "-0.03em",
                      color: step.accent,
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {step.sub}
                  </h4>
                  <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-lg">
                    {step.desc}
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
