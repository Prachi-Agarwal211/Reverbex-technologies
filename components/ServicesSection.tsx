"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "AI Development",
    category: "01",
    desc: "Custom large language models, autonomous agents, and intelligent workflows tailored precisely to your enterprise requirements.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    tags: ["LLMs", "Neural Networks", "Computer Vision"]
  },
  {
    title: "System Architecture",
    category: "02",
    desc: "Scalable, high-performance distributed systems designed to handle immense data loads with zero downtime.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    tags: ["Microservices", "Cloud Native", "DevOps"]
  },
  {
    title: "Data Intelligence",
    category: "03",
    desc: "Advanced analytics and predictive modeling pipelines that transform raw data into actionable strategic insights.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    tags: ["Data Pipelines", "Machine Learning", "Analytics"]
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Card Stagger & Image Reveal
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
         // Desktop animations
         cards?.forEach((card) => {
           const image = card.querySelector('.service-image');
           const overlay = card.querySelector('.image-overlay');
           const textContent = card.querySelector('.service-text-content');
           const serviceIcon = card.querySelector('.service-icon');
           
           // Reveal Animation
           gsap.fromTo(overlay, 
             { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }, 
             {
               clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
               duration: 1.2, ease: "power3.inOut",
               scrollTrigger: { trigger: card, start: "top 75%", toggleActions: "play none none reverse" }
             }
           );
           
           gsap.fromTo(image, 
             { scale: 1.2 }, 
             {
               scale: 1, duration: 1.2, ease: "power3.out",
               scrollTrigger: { trigger: card, start: "top 75%", toggleActions: "play none none reverse" }
             }
           );

           gsap.fromTo(textContent,
             { opacity: 0, x: -40 },
             {
               opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
               scrollTrigger: { trigger: card, start: "top 75%", toggleActions: "play none none reverse" }
             }
           );

           // Hover Effects via standard event listeners since it's dynamic
           const onEnter = () => {
             gsap.to(image, { scale: 1.05, duration: 0.8, ease: "power2.out", overwrite: "auto" });
             gsap.to(serviceIcon, { x: 10, duration: 0.4, ease: "power2.out", overwrite: "auto" });
           };
           const onLeave = () => {
             gsap.to(image, { scale: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" });
             gsap.to(serviceIcon, { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
           };
           card.addEventListener("mouseenter", onEnter);
           card.addEventListener("mouseleave", onLeave);

           return () => {
             card.removeEventListener("mouseenter", onEnter);
             card.removeEventListener("mouseleave", onLeave);
           }
         });
      });

      mm.add("(max-width: 767px)", () => {
         // Mobile animations: simpler fade up
         cards?.forEach((card) => {
           gsap.fromTo(card, 
             { opacity: 0, y: 30 }, 
             {
               opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
               scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
             }
           );
           
           // Hide overlay immediately on mobile
           const overlay = card.querySelector('.image-overlay');
           if (overlay) gsap.set(overlay, { display: "none" });
         });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="relative w-full py-24 md:py-48 bg-[#020202] overflow-hidden">
      {/* Background static meshes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full top-[-20%] right-[-10%]" />
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full bottom-[-10%] left-[-10%]" />
        <div className="absolute inset-0 mesh-gradient-static opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="services-header text-center md:text-left mb-16 md:mb-32">
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] text-white mb-4 tracking-tight leading-tight max-w-4xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Uncompromising Digital Engineering
          </h2>
          <p className="text-white/50 text-[clamp(0.75rem,2vw,1rem)] uppercase tracking-[0.2em] font-light">
            Our specialized disciplines
          </p>
        </div>

        <div ref={cardsRef} className="flex flex-col gap-12 md:gap-24">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="service-card group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <div className={`order-2 ${i % 2 === 1 ? 'md:order-1' : 'md:order-2'} relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden hw-accelerated`}>
                <div className="image-overlay absolute inset-0 bg-[#050505] z-10" />
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="service-image object-cover hw-accelerated"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/80 via-transparent to-transparent z-0" />
              </div>

              <div className={`service-text-content order-1 ${i % 2 === 1 ? 'md:order-2' : 'md:order-1'} flex flex-col justify-center`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-yellow-500 font-semibold tracking-[0.2em] text-sm md:text-base">
                    {service.category}
                  </span>
                  <div className="h-[1px] w-12 bg-yellow-500/30" />
                </div>
                
                <h3 className="text-[clamp(2rem,4vw,3.5rem)] text-white mb-6 tracking-tight leading-tight group-hover:text-yellow-400 transition-colors duration-500" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {service.title}
                </h3>
                
                <p className="text-white/60 text-base md:text-xl font-light leading-relaxed mb-8 max-w-xl">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {service.tags.map((tag, j) => (
                    <span 
                      key={j}
                      className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm tracking-wide font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-white hover:text-yellow-400 transition-colors duration-300 w-max cursor-pointer magnetic">
                  <span className="uppercase tracking-[0.15em] font-semibold text-sm">Explore Expertise</span>
                  <ArrowRight className="service-icon w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
