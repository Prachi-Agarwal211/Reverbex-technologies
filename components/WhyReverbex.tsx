"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { stat: "100", unit: "/100", label: "PageSpeed",        manifesto: "Sub-second load. Google rewards it.",                             color: "#EAB308" },
  { stat: "5",   unit: "×",    label: "Faster Rankings",  manifesto: "AEO + GEO. Cited by ChatGPT, Gemini, Perplexity.",              color: "#EAB308" },
  { stat: "3",   unit: "×",    label: "Conversions",      manifesto: "Every pixel built to turn visitors into customers.",             color: "#EAB308" },
  { stat: "0",   unit: "%",    label: "Platform Fees",    manifesto: "No WordPress. No Shopify. The codebase is yours.",              color: "#EAB308" },
  { stat: "0",   unit: "",     label: "Templates Used",   manifesto: "Custom code. Nothing templated. Nothing generic.",              color: "#EAB308" },
  { stat: "247", unit: "",     label: "Availability",     manifesto: "WhatsApp. Daily. We don't disappear after launch.",             color: "#EAB308" },
];

function CountStat({ target, unit, active }: { target: number; unit: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  const display = target === 247 ? "24/7" : count;

  return (
    <span>
      {display}
      {unit && (
        <span className="text-[55%] ml-0.5 text-[#EAB308]/50">{unit}</span>
      )}
    </span>
  );
}

export default function WhyReverbex() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split-type heading reveal — character by character
    const headingEls = sectionRef.current.querySelectorAll<HTMLElement>(".why-heading-split");
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

    // Rows — clip-path reveal from bottom
    const rows = sectionRef.current.querySelectorAll<HTMLElement>(".why-row");
    rows.forEach((row, i) => {
      gsap.fromTo(row,
        { opacity: 0, y: 40, clipPath: "inset(15% 0% 0% 0%)" },
        {
          opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)",
          duration: 1, ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        }
      );
    });

    // Horizontal rules — scale from left
    const rules = sectionRef.current.querySelectorAll<HTMLElement>(".why-rule");
    rules.forEach((rule) => {
      gsap.fromTo(rule,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        }
      );
    });

    // Glow lines — delayed scale
    const glowRules = sectionRef.current.querySelectorAll<HTMLElement>(".why-glow-rule");
    glowRules.forEach((rule) => {
      gsap.fromTo(rule,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1, duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        }
      );
    });

    // Subtitle — fade in from below
    const subtitle = sectionRef.current.querySelector<HTMLElement>(".why-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: subtitle, start: "top 88%", once: true },
        }
      );
    }

    // Index numbers — stagger scale
    const indices = sectionRef.current.querySelectorAll<HTMLElement>(".why-index");
    indices.forEach((idx, i) => {
      gsap.fromTo(idx,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)",
          delay: i * 0.04,
          scrollTrigger: { trigger: idx, start: "top 90%", once: true },
        }
      );
    });

    return () => { splits.forEach(s => s.revert()); };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="why-reverbex"
      className="relative w-full overflow-hidden py-24 md:py-36 z-20"
      style={{
        background: "transparent",
      }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(234,179,8,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 80% 30%, rgba(59,130,246,0.08) 0%, transparent 60%)",
      }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#EAB308]/50 mb-5">
              Why Reverbex
            </p>
            <div className="overflow-hidden">
              <h2
                className="why-heading-split block leading-none tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  letterSpacing: "-0.04em",
                }}
              >
                Built different.
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="why-heading-split block leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  fontWeight: 600,
                  fontStyle: "normal",
                  letterSpacing: "-0.04em",
                  color: "#EAB308",
                }}
              >
                Priced honest.
              </h2>
            </div>
          </div>
          <p className="why-subtitle text-white/50 font-light max-w-[220px] text-right leading-relaxed text-shadow-body" style={{ fontSize: "12px" }}>
            No BS. No hidden fees. No templates. Just results.
          </p>
        </div>

        {/* Manifesto rows */}
        <div>
          {reasons.map((r, i) => {
            const target = parseInt(r.stat) || 0;
            return (
              <div key={i}>
                {/* Rule */}
                <div className="relative">
                  <div
                    className="why-rule w-full h-[1px] origin-left"
                    style={{ background: "rgba(255,255,255,0.05)", transform: "scaleX(0)" }}
                  />
                  <div
                    className="why-glow-rule absolute top-0 left-0 w-full h-[1px] origin-left"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(234,179,8,0.2) 30%, rgba(234,179,8,0.4) 50%, rgba(234,179,8,0.2) 70%, transparent 100%)",
                      transform: "scaleX(0)",
                    }}
                  />
                </div>
                <div
                  className="why-row flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 py-7 md:py-8"
                  style={{ opacity: 0 }}
                >
                  {/* Giant stat — 40% width */}
                  <div
                    className="flex-shrink-0 font-black leading-none tabular-nums tracking-tight"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                      letterSpacing: "-0.06em",
                      color: "#EAB308",
                      minWidth: "clamp(140px, 28vw, 260px)",
                      textShadow: "0 0 40px rgba(234,179,8,0.15)",
                    }}
                  >
                    <CountStat target={target} unit={r.unit} active={visible} />
                  </div>

                  {/* Thin vertical rule */}
                  <div
                    className="hidden md:block w-[1px] h-8 self-center mx-8 flex-shrink-0"
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(234,179,8,0.25), transparent)" }}
                  />

                  {/* Label + manifesto */}
                  <div className="flex-1">
                    <p
                      className="font-black uppercase tracking-[0.3em] mb-1.5"
                      style={{ fontSize: "9px", color: "#EAB308", opacity: 0.7 }}
                    >
                      {r.label}
                    </p>
                    <p
                      className="text-white/60 font-medium leading-snug max-w-xl text-shadow-body"
                      style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
                    >
                      {r.manifesto}
                    </p>
                  </div>

                  {/* Index */}
                  <span
                    className="why-index hidden md:block flex-shrink-0 font-black tabular-nums text-white/[0.04]"
                    style={{ fontSize: "clamp(3rem, 5vw, 4rem)", fontFamily: "var(--font-heading)", letterSpacing: "-0.05em", transformOrigin: "center" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            );
          })}
          {/* Final rule */}
          <div className="relative">
            <div
              className="why-rule w-full h-[1px] origin-left"
              style={{ background: "rgba(255,255,255,0.05)", transform: "scaleX(0)" }}
            />
            <div
              className="why-glow-rule absolute top-0 left-0 w-full h-[1px] origin-left"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(234,179,8,0.2) 30%, rgba(234,179,8,0.4) 50%, rgba(234,179,8,0.2) 70%, transparent 100%)",
                transform: "scaleX(0)",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
