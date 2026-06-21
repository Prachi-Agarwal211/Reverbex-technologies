"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Gauge, TrendingUp, Bot, ShieldCheck, DollarSign, Target } from "lucide-react";

const benefits = [
  {
    icon: Gauge,
    title: "FASTER LOADING",
    desc: "Our sites load in under 1 second. Template sites take 3-5 seconds. Every second of delay costs you 7% in conversions.",
    metric: "100/100 PageSpeed guaranteed"
  },
  {
    icon: TrendingUp,
    title: "BETTER GOOGLE RANKINGS",
    desc: "Google ranks faster sites higher. Period. Our sites consistently outrank competitor sites built on WordPress and Shopify.",
    metric: "SEO advantage built-in"
  },
  {
    icon: Bot,
    title: "BETTER AI VISIBILITY",
    desc: "Server-Side Rendering means AI search engines can read your content. Client-side rendered sites are invisible to many AI crawlers.",
    metric: "Optimized for ChatGPT, Gemini, Perplexity"
  },
  {
    icon: ShieldCheck,
    title: "BETTER SECURITY",
    desc: "No plugins means no plugin vulnerabilities. 43% of WordPress hacks come through plugins. Our sites have zero plugin attack surface.",
    metric: "Zero vulnerabilities"
  },
  {
    icon: Target,
    title: "HIGHER CONVERSIONS",
    desc: "Every element is optimized for one goal: turning visitors into customers. No wasted space, no confusing navigation.",
    metric: "Built for business results"
  },
  {
    icon: DollarSign,
    title: "LOWER LONG-TERM COST",
    desc: "No monthly platform fees. No transaction fees. No plugin licenses. You own the code forever. Hosting costs ₹0-1500/month.",
    metric: "Save ₹50,000-1,00,000/year vs templates"
  }
];

export default function WhyNextJs() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".nextjs-reveal",
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

    const cards = gridRef.current?.querySelectorAll(".nextjs-card");
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
      id="why-nextjs"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 max-w-4xl mx-auto md:mx-0">
          <span
            className="nextjs-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Technology
          </span>
          <h2
            className="nextjs-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Why We Build With Next.js.
          </h2>
          <p
            className="nextjs-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed max-w-3xl mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Nobody cares about technology. People care about outcomes. Here's why our technology choice makes your business money.
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="nextjs-card p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl flex flex-col items-start group hover:bg-[#111111] hover:border-[#EAB308]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#111111] rounded-lg border border-[#1A1A1A] mb-6 group-hover:bg-[#EAB308]/10 group-hover:border-[#EAB308]/30 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                </div>
                <h3
                  className="text-white text-xl font-bold tracking-tight mb-4 group-hover:text-[#EAB308] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {benefit.title}
                </h3>
                
                <p
                  className="text-[#A0A0A0] text-sm leading-relaxed font-normal mb-6 flex-grow"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {benefit.desc}
                </p>

                <div className="w-full pt-4 border-t border-[#1A1A1A]">
                  <span className="text-[#EAB308] text-sm font-semibold tracking-wide">
                    → {benefit.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation Block */}
        <div className="nextjs-reveal bg-[#111111] p-8 md:p-12 rounded-2xl border border-[#1A1A1A] flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
           {/* Code accent bg */}
           <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#EAB308]/5 to-transparent pointer-events-none" />
           
           <div className="flex-1 relative z-10">
              <h4 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                 For those who want to know:
              </h4>
              <p className="text-[#A0A0A0] leading-relaxed mb-4">
                 Next.js uses <strong>Server-Side Rendering (SSR)</strong> — your website's HTML is generated on the server and sent to the browser fully formed. This means:
              </p>
              <ul className="space-y-2 mb-6">
                 {["Search engines see complete content immediately", "AI crawlers can read and index your pages", "Pages load instantly without waiting for JavaScript", "Performance is consistent across all devices"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                       <span className="text-[#EAB308] mt-1 text-sm">✔</span>
                       <span className="text-white/80">{item}</span>
                    </li>
                 ))}
              </ul>
              <p className="text-[#A0A0A0] leading-relaxed">
                 Compare this to WordPress: every page load triggers PHP execution, database queries, and 20-30 plugin operations before a single byte reaches the visitor. That's why WordPress sites are slow.
              </p>
           </div>
           
           <div className="w-full md:w-auto md:min-w-[300px] bg-[#000000] rounded-xl border border-[#1A1A1A] p-6 font-mono text-sm relative z-10">
              <div className="flex gap-2 mb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                 <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-[#A0A0A0]">
                 <span className="text-pink-500">export default function</span> <span className="text-blue-400">Page</span>() {'{'}
                 <br />
                 &nbsp;&nbsp;<span className="text-pink-500">return</span> (
                 <br />
                 &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">&lt;main&gt;</span>
                 <br />
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">&lt;h1&gt;</span><span className="text-green-400">100/100 PageSpeed</span><span className="text-yellow-300">&lt;/h1&gt;</span>
                 <br />
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">&lt;p&gt;</span><span className="text-white">Built for business.</span><span className="text-yellow-300">&lt;/p&gt;</span>
                 <br />
                 &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">&lt;/main&gt;</span>
                 <br />
                 &nbsp;&nbsp;);
                 <br />
                 {'}'}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
