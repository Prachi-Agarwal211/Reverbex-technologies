"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Target, 
  Search, 
  Magnet, 
  Database, 
  MessageCircle, 
  BrainCircuit, 
  Sparkles, 
  PenTool, 
  RefreshCcw 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Globe, title: "Custom Websites", desc: "High-performance digital experiences engineered for scale." },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Conversion-optimized storefronts that drive revenue." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native & cross-platform applications for iOS and Android." },
  { icon: Target, title: "Meta Ads", desc: "Data-driven social campaigns with precision targeting." },
  { icon: Search, title: "Google Ads", desc: "High-intent search marketing capturing active demand." },
  { icon: Magnet, title: "Lead Generation", desc: "Automated funnels turning traffic into qualified prospects." },
  { icon: Database, title: "ERP & CRM", desc: "Custom operational software to manage your entire business." },
  { icon: MessageCircle, title: "WhatsApp AI", desc: "Automated conversational commerce and customer support." },
  { icon: BrainCircuit, title: "AI Solutions", desc: "Custom machine learning and workflow automation." },
  { icon: Sparkles, title: "SEO + AI", desc: "Next-gen search engine dominance powered by AI." },
  { icon: PenTool, title: "Branding", desc: "Striking visual identities that command market authority." },
  { icon: RefreshCcw, title: "Rebranding", desc: "Strategic brand evolution for the modern digital era." },
];

// Duplicate for seamless infinite scrolling
const marqueeItems = [...services, ...services];

export default function ServicesGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeAnimRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Fade in heading
    gsap.fromTo(
      ".gallery-heading",
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      }
    );

    if (marqueeRef.current) {
      marqueeAnimRef.current = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    }

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden z-20 py-24 md:py-32"
      style={{ background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-24">
        <p className="gallery-heading text-[#EAB308]/50 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
          Capabilities
        </p>
        <div className="overflow-hidden">
          <h2
            className="gallery-heading text-white leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
            }}
          >
            12 services.{" "}
            <span
              className="text-[#EAB308]"
              style={{
                fontWeight: 600,
                fontStyle: "normal",
                textShadow: "0 0 30px rgba(234,179,8,0.15)",
              }}
            >
              All engineered in-house.
            </span>
          </h2>
        </div>
      </div>

      {/* GSAP-based Infinite Marquee for extreme smoothness */}
      <div className="relative w-full overflow-hidden pb-12 pt-4">
        {/* Left/Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#03050F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#03050F] to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={marqueeRef}
          className="flex w-max"
          onMouseEnter={() => marqueeAnimRef.current?.pause()}
          onMouseLeave={() => marqueeAnimRef.current?.play()}
        >
          {marqueeItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={`${service.title}-${index}`}
                className="group relative flex-shrink-0 w-72 md:w-96 h-[400px] md:h-[480px] mx-4 md:mx-6 rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-transform duration-700 hover:-translate-y-4"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Glow Effect behind the card */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(234,179,8,0.15) 0%, transparent 70%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#EAB308]/10 group-hover:border-[#EAB308]/30 transition-all duration-500">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white/70 group-hover:text-[#EAB308] transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  
                  <h3 
                    className="text-2xl md:text-3xl text-white font-medium mb-4 tracking-tight leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  
                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">
                    {service.desc}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-[1px] bg-white/20 group-hover:bg-[#EAB308]/50 group-hover:w-16 transition-all duration-500" />
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-white/30 group-hover:text-[#EAB308] transition-colors duration-500">
                    Explore
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
