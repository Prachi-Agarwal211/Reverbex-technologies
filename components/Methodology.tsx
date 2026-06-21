"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep into your target audience, bottleneck metrics, and revenue opportunities.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "A tailored execution roadmap: content hierarchy, campaign assets, and technology selection.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Clean, lightweight Next.js code. Custom visuals. Configured advertising sequences.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deployed on global edge networks. Meta & Google campaigns triggered. Lead tracking live.",
  },
  {
    num: "05",
    title: "Grow",
    desc: "Daily monitoring. A/B testing. Continuous optimization for higher ROI.",
  },
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

    // Scroll-driven progress line
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }

    // Each step: clip-path reveal from left + number scale
    const items = containerRef.current.querySelectorAll(".method-step");
    items.forEach((item, i) => {
      const mask = item.querySelector(".step-mask");
      const number = item.querySelector(".step-number");

      if (mask) {
        gsap.fromTo(
          mask,
          { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (number) {
        gsap.fromTo(
          number,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="methodology"
      className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden border-b border-[#1A1A1A]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Header — left-aligned, MASSIVE */}
        <div className="method-header text-left mb-16 md:mb-24 relative">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
            Process
          </span>
          <h2 className="display-text text-white mb-6">
            From Idea to
            <br />
            <span className="text-[#EAB308]">Revenue.</span>
          </h2>
          <p className="text-[#A0A0A0] text-base md:text-lg font-normal leading-relaxed max-w-xl">
            Five phases. Each one moves a specific metric. No wasted steps.
          </p>
        </div>

        {/* Timeline with scroll-driven progress */}
        <div className="relative w-full md:pl-8">
          {/* Progress line — scroll-driven */}
          <div className="hidden md:block absolute left-[31px] top-0 bottom-0 w-[2px] bg-[#1A1A1A] overflow-hidden">
            <div
              ref={progressRef}
              className="w-full h-full bg-[#EAB308] origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="flex flex-col gap-10 md:gap-16 w-full">
            {steps.map((item, i) => (
              <div
                key={i}
                className="method-step relative flex flex-col md:flex-row items-start gap-4 md:gap-8"
              >
                {/* Number dot — MASSIVE */}
                <div className="hidden md:flex absolute left-0 -translate-x-1/2 w-10 h-10 items-center justify-center bg-[#050505] z-10">
                  <div className="step-number w-6 h-6 rounded-full bg-[#EAB308] flex items-center justify-center">
                    <span className="text-[#050505] text-[10px] font-black">
                      {item.num}
                    </span>
                  </div>
                </div>

                {/* Content — clip-path masked */}
                <div className="md:ml-20 w-full relative">
                  <div className="step-mask" style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}>
                    <span className="text-[#EAB308] text-sm font-bold tracking-[0.2em] uppercase mb-2 block md:hidden">
                      Phase {item.num}
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-base font-normal leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
