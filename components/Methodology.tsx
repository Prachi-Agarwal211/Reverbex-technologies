"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep to understand your target audience, existing bottleneck metrics, and product revenue opportunities."
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We architect a tailored execution roadmap specifying content hierarchy, campaign assets, and technology selection."
  },
  {
    num: "03",
    title: "Build",
    desc: "We write clean, lightweight Next.js code, design custom visuals, and configure advertising sequences."
  },
  {
    num: "04",
    title: "Launch",
    desc: "We deploy onto global edge networks, trigger Meta & Google campaigns, and track lead deliveries."
  },
  {
    num: "05",
    title: "Grow",
    desc: "We monitor results daily, run A/B copy tests, and continuously optimize campaigns for higher ROI."
  }
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".method-reveal",
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

    const items = containerRef.current?.querySelectorAll(".method-item");
    items?.forEach((item) => {
      gsap.fromTo(
        item.querySelectorAll(".timeline-content-item"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="methodology"
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-b border-[#1A1A1A]"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        
        <div className="text-left mb-16 md:mb-24 relative">
          <span
            className="method-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Process
          </span>
          <h2
            className="method-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.0] mb-6"
          >
            How We Work.
          </h2>
          <p className="method-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed max-w-2xl">
            Our structured roadmap to take your business from discovery to scalable growth.
          </p>
        </div>

        <div className="relative w-full md:pl-8">
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-[#1A1A1A]" />

          <div className="flex flex-col gap-12 md:gap-20 w-full">
            {steps.map((item, i) => (
              <div
                key={i}
                className="method-item relative flex flex-col md:flex-row items-start bg-[#0A0A0A] md:bg-transparent p-6 rounded-xl border border-[#1A1A1A] md:border-transparent"
              >
                <div className="hidden md:flex absolute left-0 -translate-x-1/2 w-6 h-6 items-center justify-center bg-[#050505] z-10 mt-[0.3em]">
                  <div className="w-3 h-3 rounded-full bg-[#1A1A1A] border border-[#666666] transition-colors" />
                </div>

                <div className="md:ml-20 w-full relative">
                  <span className="timeline-content-item text-[#EAB308] text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">
                    Phase {item.num}
                  </span>
                  <h3 className="timeline-content-item text-white text-2xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="timeline-content-item text-[#A0A0A0] text-base font-normal leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
