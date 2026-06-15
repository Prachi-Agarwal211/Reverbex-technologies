"use client";

import React, { useState, useEffect } from "react";

export default function SectionCounter() {
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 14; 

  useEffect(() => {
    // Array of section IDs in order
    const sections = [
      "hero",
      "trustedby",
      "capabilities",
      "results",
      "architectures",
      "whyreverbex",
      "premiumpositioning",
      "reverbexbond",
      "methodology",
      "industries",
      "testimonials",
      "faq",
      "founders",
      "contact"
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) {
              setCurrentSection(index + 1);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    // Wait a brief moment for DOM to paint
    setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4 mix-blend-difference text-white pointer-events-none">
      <div className="h-24 w-[1px] bg-white/20 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full bg-white transition-all duration-700 ease-out"
          style={{ height: `${(currentSection / totalSections) * 100}%` }}
        />
      </div>
      <div className="text-xs font-light tabular-nums tracking-widest flex flex-col items-center">
        <span>{String(currentSection).padStart(2, '0')}</span>
        <span className="text-white/30 my-1">/</span>
        <span className="text-white/50">{String(totalSections).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
