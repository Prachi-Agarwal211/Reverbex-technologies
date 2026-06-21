"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

const comparisons = [
  {
    title: "Blazing Fast Performance",
    desc: "Our custom Next.js sites load in under 1 second, compared to template builders that take 3-5 seconds. Google explicitly ranks faster websites higher.",
    metric: "100/100 PageSpeed",
  },
  {
    title: "AI-Ready SEO (AEO/GEO)",
    desc: "We optimize your brand not just for Google, but for ChatGPT, Gemini, and Perplexity. When people ask AI about your industry, it recommends you.",
    metric: "Answer Engine Ready",
  },
  {
    title: "Conversion-Obsessed Design",
    desc: "Every pixel serves a purpose. We use behavioral psychology and clean UI to guide visitors toward the 'Start Project' button without friction.",
    metric: "Built for Revenue",
  },
  {
    title: "Zero Platform Taxes",
    desc: "Platforms like Shopify take 2-5% of your revenue forever. We build custom commerce systems where you keep 100% of your sales.",
    metric: "Keep Your Margins",
  },
  {
    title: "Infinite Scalability",
    desc: "No plugin conflicts. No locked-in themes. Because we write custom code, your website can evolve into a full web-app whenever you need it.",
    metric: "Future-Proof Tech",
  },
];

export default function WhyReverbex() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      // Pin the left column while the right column scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });

      // Animate cards on the right as they scroll up
      const cards = rightColRef.current.querySelectorAll(".why-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.2, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      });
    } else {
      // Mobile standard fade-up
      const cards = rightColRef.current.querySelectorAll(".why-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="why-reverbex"
      className="relative w-full bg-[#030303] overflow-hidden"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAB308]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#EAB308]/5 blur-[120px] pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Column (Pinned on Desktop) */}
          <div className="w-full lg:w-[45%] shrink-0">
            <div ref={leftColRef} className="lg:h-screen lg:flex lg:flex-col lg:justify-center lg:-mt-32">
              <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
                The Reverbex Edge
              </span>
              <h2 className="text-white text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-[-0.03em] leading-[1.0] mb-8">
                Why We Outperform Templates.
              </h2>
              <p className="text-[#A0A0A0] text-lg font-normal leading-relaxed max-w-md">
                We don't sell websites. We engineer revenue-generating systems. Here is exactly why custom code beats templates every time.
              </p>
            </div>
          </div>

          {/* Right Column (Scrolling Cards) */}
          <div ref={rightColRef} className="w-full lg:w-[55%] flex flex-col gap-8 lg:pt-[50vh] lg:pb-[20vh]">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="why-card group relative p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#111] to-[#0A0A0A] border border-white/5 hover:border-[#EAB308]/30 transition-colors duration-500 overflow-hidden"
              >
                {/* Glow on hover inside card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#EAB308]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#EAB308]" />
                    </div>
                    <h3 className="text-white text-2xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-[#A0A0A0] text-base leading-relaxed mb-8">
                    {item.desc}
                  </p>
                  
                  <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-semibold tracking-wide">
                    {item.metric}
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
