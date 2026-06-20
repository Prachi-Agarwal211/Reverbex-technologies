"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MessageCircle, Activity, TrendingUp, Zap } from "lucide-react";

const pillars = [
  {
    icon: MessageCircle,
    title: "DAILY AVAILABILITY",
    desc: "Need help? Message us on WhatsApp. We respond within hours, not days. No ticketing systems — direct access to the team that built your system."
  },
  {
    icon: Activity,
    title: "PROACTIVE OPTIMIZATION",
    desc: "We don't wait for you to tell us something is wrong. We monitor your performance weekly and suggest improvements before you ask."
  },
  {
    icon: TrendingUp,
    title: "GROWTH PARTNERSHIP",
    desc: "As your business grows, your digital systems grow with it. New features, new pages, new campaigns — we're your long-term digital partner."
  },
  {
    icon: Zap,
    title: "FAST PROBLEM SOLVING",
    desc: "Website issue? Fixed within hours. Ad not performing? Optimized immediately. Need a change? Done. No 2-week turnaround. No bureaucratic delays."
  }
];

export default function ReverbexBond() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".bond-reveal",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
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
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="reverbex-bond"
      className="w-full py-24 md:py-32 bg-[#0A0A0A] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
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
            We Don't Disappear After Launch.
          </h2>
          <p
            className="bond-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Most agencies build your website and leave. We stay.
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="bond-card p-8 md:p-10 bg-[#111111] border border-[#1A1A1A] rounded-2xl flex flex-col items-start group hover:border-[#EAB308]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] group-hover:bg-[#EAB308]/10 group-hover:border-[#EAB308]/30 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                  </div>
                  <h3
                    className="text-white text-xl md:text-2xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {pillar.title}
                  </h3>
                </div>
                
                <p
                  className="text-[#A0A0A0] text-base leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Line */}
        <div className="bond-reveal border-t border-[#1A1A1A] pt-8 text-center md:text-left">
          <p className="text-[#666666] text-sm md:text-base font-medium tracking-wide uppercase">
            <span className="text-white font-bold">Every project includes the Reverbex Bond:</span> <br className="md:hidden" />
            <span className="hidden md:inline"> &nbsp;&bull;&nbsp; </span>
            Daily availability <span className="text-[#EAB308] px-2">&bull;</span>
            Proactive monitoring <span className="text-[#EAB308] px-2">&bull;</span>
            Fast problem solving <span className="hidden md:inline"><span className="text-[#EAB308] px-2">&bull;</span></span>
            <br className="md:hidden" />
            Long-term partnership <span className="text-[#EAB308] px-2">&bull;</span>
            No surprise charges
          </p>
        </div>
      </div>
    </section>
  );
}
