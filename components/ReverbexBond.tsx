"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "DAILY AVAILABILITY",
    desc: "Message us on WhatsApp. We respond within hours, not days. Direct access to the team that built your system.",
    accent: "#EAB308",
  },
  {
    title: "PROACTIVE MONITORING",
    desc: "We monitor your performance weekly and suggest improvements before you ask. No waiting for things to break.",
    accent: "#3B82F6",
  },
  {
    title: "REAL PARTNERSHIP",
    desc: "New features, new pages, new campaigns — we're your long-term digital partner, not a one-and-done vendor.",
    accent: "#10B981",
  },
];

export default function ReverbexBond() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split-type heading reveal
    const headingEls = containerRef.current.querySelectorAll<HTMLElement>(".bond-heading-split");
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

    // Big stat — scale in with bounce
    const bigStat = containerRef.current.querySelector<HTMLElement>(".bond-big-stat");
    if (bigStat) {
      gsap.fromTo(
        bigStat,
        { scale: 0.7, opacity: 0, rotateX: 15 },
        {
          scale: 1, opacity: 1, rotateX: 0, duration: 1.2, ease: "back.out(1.4)",
          scrollTrigger: { trigger: bigStat, start: "top 85%", once: true },
        }
      );
    }

    // Pillars — 3D perspective entrance from alternating sides
    const items = containerRef.current.querySelectorAll<HTMLElement>(".bond-pillar");
    items.forEach((item, i) => {
      const isEven = i % 2 === 0;
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: isEven ? -50 : 50,
          rotateY: isEven ? -8 : 8,
          transformPerspective: 800,
          transformOrigin: isEven ? "left center" : "right center",
        },
        {
          opacity: 1, x: 0, rotateY: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        }
      );
    });

    // Accent lines — scale from center
    const accentLines = containerRef.current.querySelectorAll<HTMLElement>(".bond-accent-line");
    accentLines.forEach((line) => {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top 92%", once: true },
        }
      );
    });

    // Subtitle
    const subtitle = containerRef.current.querySelector<HTMLElement>(".bond-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle,
        { y: 15, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: subtitle, start: "top 88%", once: true },
        }
      );
    }

    // Trust line — fade in
    const trustLine = containerRef.current.querySelector<HTMLElement>(".bond-trust-line");
    if (trustLine) {
      gsap.fromTo(trustLine,
        { y: 10, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: trustLine, start: "top 92%", once: true },
        }
      );
    }

    return () => { splits.forEach(s => s.revert()); };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="reverbex-bond"
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background: "transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-4xl">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#EAB308]/50 mb-5">
            The Reverbex Bond
          </p>
          <div className="overflow-hidden">
            <h2
              className="bond-heading-split block leading-none tracking-tight text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
              }}
            >
              We Don&apos;t Disappear
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="bond-heading-split block leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "#EAB308",
              }}
            >
              After Launch.
            </h2>
          </div>
          <p className="bond-subtitle text-white/50 font-light mt-6 leading-relaxed max-w-lg text-shadow-body" style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}>
            Most agencies build your website and leave. We stay.
          </p>
        </div>

        {/* Big stat */}
        <div className="bond-big-stat mb-16 md:mb-20" style={{ perspective: "600px" }}>
          <span
            className="font-heading select-none block leading-[0.7] text-[clamp(6rem,20vw,14rem)] font-black tracking-[-0.06em]"
            style={{
              color: "rgba(234, 179, 8, 0.18)",
              textShadow: "0 0 80px rgba(234,179,8,0.12), 0 0 120px rgba(234,179,8,0.06)",
            }}
          >
            24/7
          </span>
          <p className="text-white/40 text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase -mt-2 md:-mt-6 ml-1 text-shadow-body">
            Availability. Every project includes it.
          </p>
        </div>

        {/* Pillars */}
        <div className="flex flex-col gap-0" style={{ perspective: "1000px" }}>
          {pillars.map((pillar, index) => (
            <div key={index}>
              <div
                className="bond-accent-line w-full h-[1px] origin-center"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${pillar.accent}30 20%, ${pillar.accent}15 60%, transparent 100%)`,
                  transform: "scaleX(0)",
                }}
              />
              <div
                className="bond-pillar group flex flex-col md:flex-row items-start gap-4 md:gap-8 py-7 md:py-9"
                style={{
                  opacity: 0,
                  transformStyle: "preserve-3d",
                }}
              >
                <span
                  className="text-white/25 text-sm font-bold tracking-[0.15em] shrink-0 md:w-12 md:pt-0.5 group-hover:text-[#EAB308]/50 transition-colors duration-500"
                >
                  0{index + 1}
                </span>
                <div className="flex-1 relative">
                  <h3
                    className="text-white text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-[#EAB308] transition-colors duration-500"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="text-white/55 font-normal leading-relaxed max-w-2xl text-shadow-body"
                    style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
                  >
                    {pillar.desc}
                  </p>
                </div>
                {/* Hover glow */}
                <div
                  className="hidden md:block absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 100% 50%, ${pillar.accent}06 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          ))}
          <div
            className="bond-accent-line w-full h-[1px] origin-center"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, transparent 100%)",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Trust line */}
        <div className="bond-trust-line pt-8 mt-8">
          <p className="text-white/40 text-[10px] md:text-[11px] tracking-[0.15em] uppercase font-semibold text-shadow-body">
            <span className="text-white/65">Every project includes:</span>{" "}
            Daily availability <span className="text-white/10">/</span>{" "}
            Proactive monitoring <span className="text-white/10">/</span>{" "}
            Fast problem solving <span className="text-white/10">/</span>{" "}
            Long-term partnership <span className="text-white/10">/</span>{" "}
            No surprise charges
          </p>
        </div>
      </div>
    </section>
  );
}
