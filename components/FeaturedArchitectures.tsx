"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { caseStudiesData } from "../lib/caseStudiesData";
import { GlowingEffect } from "@/components/ui/glowing-effect";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { slug: "aarya-clothing", image: "/aarya clothing.png" },
  { slug: "maac-animation-jaipur", image: "/maac animation jaipur.png" },
  { slug: "khemji-wire-company", image: "/khemji wire.png" },
  { slug: "shipbridge", image: "/shipbridge.png" },
];

export default function FeaturedArchitectures() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;
    if (reducedMotion.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".feat-heading",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".feat-label",
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".feat-link",
        { opacity: 0, x: 10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            once: true,
          },
        }
      );

      const track = trackRef.current!;
      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 75%",
              once: true,
            },
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        ".feat-heading",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 85%",
            once: true,
          },
        }
      );

      const track = trackRef.current!;
      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-screen overflow-hidden"
      aria-label="Featured work"
    >
      {/* Heading */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-10 pt-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="feat-label text-[#EAB308]/50 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 text-emboss">
              Featured Work
            </p>
            <div className="overflow-hidden">
              <h2
                className="feat-heading block text-heading-lift"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "#F5F5F0",
                }}
              >
                Real projects.
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="feat-heading block text-heading-lift"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "#EAB308",
                  textShadow:
                    "0 0 30px rgba(234,179,8,0.25), 0 0 60px rgba(234,179,8,0.08), 0 2px 4px rgba(0,0,0,0.4)",
                }}
              >
                Real results.
              </h2>
            </div>
          </div>
          <Link
            href="/work"
            className="feat-link hidden md:flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors duration-300 group text-emboss mb-2"
          >
            View all work
            <span className="w-8 h-[1px] bg-current group-hover:w-14 transition-all duration-500 inline-block" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="absolute left-0 flex items-center gap-8 pl-6 md:pl-10 pr-24"
        style={{ top: "140px", height: "calc(100% - 140px)" }}
      >
        {projects.map((proj) => {
          const study = caseStudiesData[proj.slug];
          if (!study) return null;
          const color = study.accentColor || "#EAB308";
          const primaryMetric = study.metrics[0];
          const metricDisplay = `${primaryMetric.prefix || ""}${primaryMetric.value}${primaryMetric.suffix || ""}`;

          return (
            <Link
              key={proj.slug}
              href={`/work/${proj.slug}`}
              className="work-card group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
              style={{ width: "min(80vw, 750px)" }}
            >
              <GlowingEffect
                blur={0}
                borderWidth={2}
                spread={60}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
                variant="default"
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(8,8,16,0.9)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Screenshot */}
                <div className="relative w-full aspect-video bg-[#080810] overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={`${study.client} — Reverbex project`}
                    fill
                    className="object-cover md:object-contain md:object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    style={{ filter: "brightness(0.95) saturate(1.05)" }}
                    sizes="750px"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(8,8,16,1) 0%, rgba(8,8,16,0.4) 25%, transparent 50%)",
                    }}
                  />
                </div>

                {/* Info strip below screenshot */}
                <div className="relative px-6 pb-6 pt-2">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3
                        className="text-white leading-none mb-1 text-heading-lift"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                          fontWeight: 300,
                          fontStyle: "italic",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {study.client}
                      </h3>
                      <div className="flex items-baseline gap-3">
                        <span
                          className="font-black leading-none tabular-nums text-emboss-deep"
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(1.5rem, 3vw, 2rem)",
                            color,
                            letterSpacing: "-0.05em",
                          }}
                        >
                          {metricDisplay}
                        </span>
                        <span
                          className="font-bold uppercase tracking-[0.12em] text-shadow-body"
                          style={{ fontSize: "8px", color: `${color}70` }}
                        >
                          {primaryMetric.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {study.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] rounded text-letterpress"
                          style={{
                            background: `${color}08`,
                            color: `${color}80`,
                            border: `1px solid ${color}15`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* End card */}
        <div className="flex-shrink-0 w-[200px] flex items-center justify-center">
          <Link
            href="/work"
            className="flex flex-col items-center gap-4 text-white/20 hover:text-[#EAB308] transition-colors duration-500"
          >
            <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center text-emboss">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emboss">View All</span>
          </Link>
        </div>
      </div>

      {/* Bottom count */}
      <div className="absolute bottom-8 left-6 md:left-10 z-10 flex items-center gap-3 text-emboss">
        <div className="w-10 h-[1px] bg-white/10" />
        <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-semibold">
          {projects.length} Projects
        </span>
      </div>
    </section>
  );
}
