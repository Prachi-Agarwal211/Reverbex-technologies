"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discovery",    sub: "& Strategy",     line: "Audience, metrics, bottlenecks. Map the exact path to conversion.", accent: "#EAB308" },
  { num: "02", title: "Architecture", sub: "& Design",       line: "Wireframes, copy, roadmap. Built for your customer.", accent: "#3B82F6" },
  { num: "03", title: "Custom",       sub: "Development",    line: "Clean Next.js. Zero themes. Loads instantly.", accent: "#10B981" },
  { num: "04", title: "Campaign",     sub: "Configuration",  line: "Tracking, automation, Meta & Google — live from day one.", accent: "#A78BFA" },
  { num: "05", title: "Launch",       sub: "& Optimize",     line: "Edge-deployed. Monitored daily. Improved continuously.", accent: "#0EA5E9" },
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split-type heading reveal
    const headingEls = containerRef.current.querySelectorAll<HTMLElement>(".method-heading-split");
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

    // Cards — staggered clip-path reveal with pin
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".method-card");
    cards.forEach((card, i) => {
      // Inner content reveals
      const innerTitle = card.querySelector<HTMLElement>(".method-card-title");
      const innerLine = card.querySelector<HTMLElement>(".method-card-line");
      const innerNum = card.querySelector<HTMLElement>(".method-card-num");
      const ghostNum = card.querySelector<HTMLElement>(".method-card-ghost");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(card,
        { opacity: 0, y: 60, clipPath: "inset(20% 0% 0% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out" }
      );

      if (innerNum) {
        tl.fromTo(innerNum,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
          "-=0.6"
        );
      }

      if (innerTitle) {
        const split = new SplitType(innerTitle, { types: "chars,words" });
        tl.fromTo(split.chars,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.6, stagger: 0.015, ease: "power3.out" },
          "-=0.5"
        );
      }

      if (innerLine) {
        tl.fromTo(innerLine,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (ghostNum) {
        tl.fromTo(ghostNum,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=0.8"
        );
      }
    });

    // Accent rules
    const accentRules = containerRef.current.querySelectorAll<HTMLElement>(".method-accent-rule");
    accentRules.forEach((rule) => {
      gsap.fromTo(rule,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: rule, start: "top 88%", once: true },
        }
      );
    });

    // Subtitle
    const subtitle = containerRef.current.querySelector<HTMLElement>(".method-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: subtitle, start: "top 88%", once: true },
        }
      );
    }

    return () => { splits.forEach(s => s.revert()); };
  }, { scope: containerRef });

  return (
    <section
      className="relative w-full py-24 md:py-36 overflow-hidden z-30"
      style={{
        background: "transparent",
      }}
    >
      <div ref={containerRef} className="max-w-5xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header */}
        <div className="mb-16 md:mb-24">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#EAB308]/50 mb-5">
            Process
          </p>
          <div className="overflow-hidden">
            <h2
              className="method-heading-split block leading-none tracking-tight text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
              }}
            >
              Idea to revenue.
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="method-heading-split block leading-none tracking-tight text-heading-lift"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Five deliberate steps.
            </h2>
          </div>
          <p className="method-subtitle text-white/50 font-light mt-6 max-w-md leading-relaxed text-shadow-body" style={{ fontSize: "12px" }}>
            Every step is intentional. No filler. No shortcuts.
          </p>
        </div>

        {/* Sticky stacking cards */}
        <div className="flex flex-col gap-4 pb-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="method-card sticky overflow-hidden"
              style={{
                top: `${10 + i * 2.5}vh`,
                zIndex: i + 10,
                background: "#0A0A0F",
                border: `1px solid ${step.accent}12`,
                marginBottom: i === steps.length - 1 ? 0 : "28vh",
                opacity: 0,
              }}
            >
              {/* Top accent line */}
              <div
                className="method-accent-rule w-full h-[1px] origin-left"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${step.accent}60 40%, ${step.accent}20 70%, transparent 100%)`,
                  transform: "scaleX(0)",
                }}
              />

              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12 p-8 md:p-14 relative overflow-hidden">
                {/* Atmospheric gradient per card */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(ellipse 60% 80% at 85% 50%, ${step.accent}06 0%, transparent 70%)`,
                }} />

                {/* Ghost number */}
                <div
                  className="method-card-ghost absolute bottom-0 right-0 pointer-events-none select-none leading-none"
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(8rem, 22vw, 16rem)",
                    fontWeight: 300,
                    color: `${step.accent}06`,
                    letterSpacing: "-0.07em",
                    lineHeight: 0.8,
                    opacity: 0,
                  }}
                >
                  {step.num}
                </div>

                {/* Step number */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <span
                    className="method-card-num font-black leading-none tabular-nums select-none"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(3rem, 6vw, 5rem)",
                      letterSpacing: "-0.06em",
                      color: step.accent,
                      opacity: 0.3,
                      lineHeight: 0.85,
                      minWidth: "clamp(60px, 10vw, 100px)",
                      textShadow: `0 0 30px ${step.accent}20`,
                      transformOrigin: "center",
                    }}
                  >
                    {step.num}
                  </span>
                  <div
                    className="w-[1px] h-12"
                    style={{ background: `linear-gradient(to bottom, ${step.accent}40, transparent)` }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 z-10 pt-1">
                  <h3
                    className="method-card-title leading-none mb-0.5"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      letterSpacing: "-0.03em",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <h4
                    className="leading-none mb-6"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      color: step.accent,
                    }}
                  >
                    {step.sub}
                  </h4>
                  <p
                    className="method-card-line text-white/55 font-normal leading-relaxed max-w-lg text-shadow-body"
                    style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
                  >
                    {step.line}
                  </p>
                </div>

                {/* Right side accent glow */}
                <div
                  className="hidden md:block absolute top-0 right-0 w-1/3 h-full pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 100% 30%, ${step.accent}08 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
