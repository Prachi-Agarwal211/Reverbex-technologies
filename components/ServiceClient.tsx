"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReverbexBond from "./ReverbexBond";

gsap.registerPlugin(ScrollTrigger);

interface ServiceClientProps {
  service: {
    name: string;
    tagline: string;
    intro: string;
    problem: string;
    solution: string;
    comparison: {
      template: string[];
      custom: string[];
    };
    tech: string[];
    faqs: { q: string; a: string }[];
  };
  whatsappNumber: string;
  encodedMsg: string;
}

export default function ServiceClient({ service, whatsappNumber, encodedMsg }: ServiceClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header animation
    gsap.fromTo(
      ".service-header > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Fade up sections on scroll
    gsap.utils.toArray<HTMLElement>(".service-section").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full">
      {/* Intro Header */}
      <div className="service-header mb-20 border-b border-[#1A1A1A] pb-12">
        <h1
          className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6 max-w-5xl"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          {service.name}
        </h1>
        <p
          className="text-[#A0A0A0] text-xl md:text-2xl font-light leading-relaxed max-w-3xl"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          {service.tagline}
        </p>
      </div>

      {/* Narrative columns: Problem vs Solution */}
      <div className="service-section grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
        <div className="bg-[#0A0A0A] p-8 md:p-12 border border-[#1A1A1A]">
          <span className="text-[#666666] text-sm font-semibold tracking-wider uppercase block mb-6">
            The Industry Problem
          </span>
          <p className="text-[#A0A0A0] text-lg leading-relaxed" style={{ fontFamily: "var(--font-body), sans-serif" }}>
            {service.problem}
          </p>
        </div>
        <div className="bg-[#111111] p-8 md:p-12 border border-[#EAB308]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308]/5 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150"></div>
          <span className="text-[#EAB308] text-sm font-semibold tracking-wider uppercase block mb-6 relative z-10">
            The Reverbex Solution
          </span>
          <p className="text-white text-lg leading-relaxed font-medium relative z-10" style={{ fontFamily: "var(--font-body), sans-serif" }}>
            {service.solution}
          </p>
        </div>
      </div>

      {/* Comparison Details */}
      <div className="service-section mb-32 bg-black border border-[#1A1A1A] rounded-none p-8 md:p-16">
        <h3 className="text-white text-3xl font-bold mb-12 text-center" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          Why Custom Engineering Wins
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <span className="text-red-500/80 text-sm font-semibold tracking-widest uppercase block mb-6 border-b border-red-500/20 pb-4">
              Cheap Template Approach
            </span>
            <ul className="space-y-6">
              {service.comparison.template.map((item, idx) => (
                <li key={idx} className="text-[#666666] text-base flex items-start gap-4">
                  <span className="text-red-500/50 mt-1">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6 border-b border-[#EAB308]/20 pb-4">
              Reverbex Standard
            </span>
            <ul className="space-y-6">
              {service.comparison.custom.map((item, idx) => (
                <li key={idx} className="text-[#F5F5F0] text-base font-medium flex items-start gap-4">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="service-section mb-32">
        <h3 className="text-[#666666] text-sm font-semibold tracking-wider uppercase block mb-8 text-center">
          Technology Stack
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {service.tech.map((t, i) => (
            <span key={i} className="px-6 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-[#A0A0A0] text-sm tracking-wider uppercase">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="service-section mb-32">
        <h3 className="text-white text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          {service.faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 hover:border-[#EAB308]/30 transition-colors duration-300">
              <h4 className="text-white text-lg md:text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                {faq.q}
              </h4>
              <p className="text-[#A0A0A0] text-base leading-relaxed" style={{ fontFamily: "var(--font-body), sans-serif" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The Reverbex Bond */}
      <div className="service-section mb-32">
        <ReverbexBond />
      </div>

      {/* Support disclaimer and CTA */}
      <div className="service-section border-t border-[#1A1A1A] pt-20 text-center pb-12">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          Ready to scale?
        </h2>
        <p className="text-[#A0A0A0] text-lg mb-10 max-w-2xl mx-auto">
          Every project includes direct WhatsApp support, zero hidden fees, and full ownership of your digital assets.
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodedMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 bg-[#EAB308] text-black text-lg font-bold rounded-none hover:bg-white transition-colors duration-300"
        >
          Message Us on WhatsApp
        </a>
      </div>
    </div>
  );
}
