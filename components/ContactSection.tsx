"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";
import { CONTACT } from "@/lib/config";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // IntersectionObserver for video - play when 10% visible, pause when not
  React.useEffect(() => {
    const video = videoRef.current;
    const element = containerRef.current;
    if (!video || !element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = 0.8;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  // Copy email functionality with toast
  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      // Silently fail - toast won't show but user can still copy manually
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo('.contact-title-word',
          { opacity: 0, yPercent: 120, rotateX: -15 },
          { opacity: 1, yPercent: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }
        )
        // Heading color shift animation
        .fromTo('.contact-heading',
          { color: "rgba(255,255,255,0.9)" },
          { color: "rgba(255,255,255,1)", duration: 0.8 },
          "-=0.8"
        )
        .fromTo('.contact-link-group',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo('.contact-footer',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.4"
        );
    });

    mm.add("(max-width: 767px)", () => {
      const reveals = containerRef.current?.querySelectorAll('.mobile-reveal');
      if (reveals) {
        gsap.fromTo(reveals,
           { opacity: 0, y: 30 },
           { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%", toggleActions: "play none none reverse" } }
        );
      }
    });
  }, { scope: containerRef });

  // Back to top with lenis.scrollTo
  const handleBackToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="contact" className="relative w-full min-h-[100dvh] overflow-hidden overflow-x-hidden bg-black flex flex-col justify-end">
      {/* Absolute Video Background - Desktop only, static image for mobile */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Desktop: Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-50 hidden md:block"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Mobile: Static Ken Burns image fallback */}
        <div
          className="absolute inset-0 w-full h-full md:hidden animate-ken-burns"
          style={{
            backgroundImage: 'url(/contact-fallback.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Yellow gradient bleed from MorphingMenu */}
        <div className="absolute top-0 left-0 w-full h-24 z-30 pointer-events-none bg-gradient-to-b from-[#FDE68A] via-[#EAB308]/30 to-transparent" />

        {/* Dark overlay for minimal readable look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[#050505]/30 z-10 pointer-events-none hidden md:block mix-blend-multiply" />
      </div>

      {/* Content strictly positioned at the bottom */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-28 md:pb-20 pb-safe flex flex-col items-start justify-end pointer-events-none pt-24 md:pt-0">

        {/* Massive Minimalist Heading */}
        <div className="w-full mb-16 md:mb-32 flex flex-col gap-6 pointer-events-auto">
          {/* Header lines with yellow accent */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
            <span className="text-[#EAB308] text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase tabular">
              Get In Touch
            </span>
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
          </div>
           <div className="flex flex-wrap gap-4 md:gap-8">
           {("Ready to scale?").split(" ").map((word, i) => (
             <div key={i} className="overflow-hidden mobile-reveal pb-2">
               <h2
                 className="contact-title-word text-[clamp(4.5rem,14vw,14rem)] text-white tracking-tighter leading-none inline-block pr-2 md:pr-4"
                 style={{ fontFamily: "var(--font-heading), sans-serif", perspective: "800px" }}
               >
                 {word}
               </h2>
             </div>
           ))}
           </div>
           <p className="hero-subtext text-white/70 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.15em] uppercase mt-1 drop-shadow-md pb-2 mobile-reveal max-w-2xl" style={{ fontFamily: "var(--font-body), sans-serif" }}>
              Partner with us to deploy high-performance custom websites, Meta/Google ads campaigns, and operational automations built to grow your business.
           </p>
        </div>

        {/* Clean CSS Grid for contact info and Form */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 border-t border-white/10 pt-10 md:pt-16 pointer-events-auto">

           {/* Left: WhatsApp CTA & Info */}
           <div className="contact-link-group mobile-reveal flex flex-col items-start gap-8">
              <div className="flex flex-col gap-4">
                 <p className="text-white/70 text-lg md:text-xl font-light">
                   Stop losing customers to slow websites and bad ads. Partner with us today.
                 </p>
                 <a 
                   href="https://wa.me/919929986743" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="mt-4 group relative inline-flex items-center justify-center gap-3 bg-[#EAB308] text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
                 >
                   <span className="relative z-10 flex items-center gap-2">
                     Message Us on WhatsApp
                     <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                   </span>
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                 </a>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-4 w-full">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Email</span>
                  <a href={`mailto:${CONTACT.email}`} className="text-white text-base md:text-lg font-light hover:text-[#EAB308] transition-colors">
                     {CONTACT.emailDisplay}
                  </a>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Location</span>
                  <p className="text-white text-base md:text-lg font-light">
                     {CONTACT.location}
                  </p>
                </div>
              </div>
           </div>

           {/* Right: Contact Form */}
           <div className="contact-link-group mobile-reveal flex flex-col items-start gap-6 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <span className="text-white/90 text-xl font-medium tracking-tight mb-2">Send us a message</span>
              <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors" />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors" />
                </div>
                <input type="url" placeholder="Business URL (Optional)" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors" />
                <textarea placeholder="Tell us about your needs..." rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors resize-none"></textarea>
                <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-[#EAB308] transition-colors mt-2">
                  Submit Inquiry
                </button>
              </form>
           </div>

        </div>

        {/* Bottom Footer Credits Line */}
        <div className="contact-footer mobile-reveal w-full mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between pointer-events-auto gap-4">
          <p className="text-white/50 text-[10px] md:text-xs tracking-[0.2em] uppercase flex flex-col md:flex-row gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} Reverbex Technologies</span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="text-[#EAB308]">Made in Jaipur, Built for the World.</span>
          </p>
          {/* Back to top with lenis.scrollTo */}
          <button
            onClick={handleBackToTop}
            className="text-white/50 hover:text-white text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer"
          >
            Back to Top
          </button>
        </div>
      </div>
    </section>
  );
}
