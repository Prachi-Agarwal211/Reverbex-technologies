"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const founders = [
  {
    name: "Anurag Singh",
    role: "Founder & Lead Architect",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800",
    bio: "Spearheading enterprise AI architecture, Model Context Protocol (MCP) integrations, and scalable autonomous systems.",
    socials: { linkedin: "#", twitter: "#", email: "mailto:15anuragsingh2003@gmail.com" }
  },
  {
    name: "Prachi Agarwal",
    role: "Co-Founder & Strategy Lead",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    bio: "Driving operational excellence, high-level workflow orchestration, and strategic enterprise partnerships.",
    socials: { linkedin: "#", twitter: "#", email: "mailto:prachiagarwal211@gmail.com" }
  }
];

export default function Founders() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const headerTitle = containerRef.current?.querySelector('.founders-header');
      if (headerTitle) {
        gsap.fromTo(headerTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      const cards = containerRef.current?.querySelectorAll('.founder-card');

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
         cards?.forEach((card, i) => {
            gsap.fromTo(card, 
               { opacity: 0, y: 50 },
               {
                  opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out",
                  scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" }
               }
            );

            // Hover effects for desktop
            const image = card.querySelector('.founder-image');
            
            const onEnter = () => {
               gsap.to(card, { scale: 1.02, duration: 0.5, ease: "power2.out", overwrite: "auto" });
               gsap.to(image, { scale: 1.05, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            };
            const onLeave = () => {
               gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
               gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            };
            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mouseleave', onLeave);
            
            return () => {
               card.removeEventListener('mouseenter', onEnter);
               card.removeEventListener('mouseleave', onLeave);
            }
         });
      });

      mm.add("(max-width: 767px)", () => {
         cards?.forEach((card) => {
            gsap.fromTo(card, 
               { opacity: 0, y: 30 },
               {
                  opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
                  scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
               }
            );
         });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="founders" className="relative w-full py-24 md:py-40 bg-[#020202] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full top-0 right-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="founders-header text-center mb-16 md:mb-24">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] text-white mb-4 tracking-tight leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Leadership
          </h2>
          <p className="text-white/50 text-[clamp(0.75rem,2vw,1rem)] uppercase tracking-[0.2em] font-light">
            The minds behind the machines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {founders.map((founder, i) => (
             <div 
               key={i} 
               className="founder-card group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hw-accelerated shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="p-6 md:p-8">
                   <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                      <Image 
                         src={founder.image}
                         alt={founder.name}
                         fill
                         className="founder-image object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hw-accelerated"
                      />
                   </div>

                   <div className="space-y-4">
                      <div>
                         <h3 className="text-2xl md:text-3xl text-white font-medium tracking-tight mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                            {founder.name}
                         </h3>
                         <p className="text-yellow-500 text-sm md:text-base font-medium tracking-wider uppercase">
                            {founder.role}
                         </p>
                      </div>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                         {founder.bio}
                      </p>

                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                         {Object.entries(founder.socials).map(([platform, link]) => {
                            const Icon = platform === 'linkedin' ? Linkedin : platform === 'twitter' ? Twitter : Mail;
                            return (
                               <a 
                                 key={platform}
                                 href={link}
                                 className="magnetic w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                               >
                                  <Icon className="w-4 h-4" />
                               </a>
                            )
                         })}
                      </div>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}
