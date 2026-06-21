"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cases = [
  {
    title: "MAAC Animation",
    tagline: "Education • Web Design",
    problem: "No online lead generation",
    result: "500+ leads in weeks",
    image: "/maac animation jaipur.png",
    url: "https://maacanimationjaipur.com",
    stack: ["Next.js", "Meta Ads"]
  },
  {
    title: "Aarya Clothing",
    tagline: "E-Commerce • Full Stack",
    problem: "No scalable sales system",
    result: "₹3+ lakh revenue generated",
    image: "/aarya clothing.png",
    url: "https://aaryaclothing.in",
    stack: ["Custom Commerce", "Stripe API"]
  },
  {
    title: "Khemji Wire Co.",
    tagline: "Corporate • Rebranding",
    problem: "Outdated digital presence",
    result: "Complete transformation",
    image: "/khemji wire.png",
    url: "https://khemjiwire.in",
    stack: ["Next.js", "SEO Services"]
  },
  {
    title: "Shipbridge",
    tagline: "Logistics • Platform",
    problem: "Manual supply tracking",
    result: "Automated dispatch system",
    image: "/shipbridge.png",
    url: "https://shipbridge.in",
    stack: ["Next.js", "Node API"]
  }
];

export default function FeaturedArchitectures() {
  const containerRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || imagesRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;
      
      if (prefersReducedMotion || isMobile) {
        // Mobile: simple staggered reveal
        const cards = imagesRef.current.filter(Boolean) as HTMLDivElement[];
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
        return;
      }

      const images = imagesRef.current.filter(Boolean) as HTMLDivElement[];

      const initialRotations = [-5, 3, -4, 2]; 
      const phaseOneStartOffsets = [0, 0.1, 0.2, 0.3]; 

      const finalPositions = [
        [-105, -105],
        [5, -105],
        [-105, 5],
        [5, 5]
      ];

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000px", 
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          images.forEach((img, index) => {
            let x = -50; 
            let y = -50;
            let rotation = 0;
            let scale = 1;

            const phase1Start = phaseOneStartOffsets[index];
            const phase1End = phase1Start + 0.3; 
            const phase2Start = 0.55;
            const phase2End = 0.95;

            if (progress < phase1Start) {
              y = 200;
              scale = 0;
              rotation = initialRotations[index];
            } else if (progress >= phase1Start && progress < phase2Start) {
              let phase1Progress = (progress - phase1Start) / (phase1End - phase1Start);
              phase1Progress = Math.min(Math.max(phase1Progress, 0), 1); 
              const easedProgress = 1 - Math.pow(1 - phase1Progress, 3);
              y = 200 - (easedProgress * 250);
              scale = easedProgress;
              rotation = initialRotations[index];
            } else if (progress >= phase2Start && progress <= phase2End) {
              let phase2Progress = (progress - phase2Start) / (phase2End - phase2Start);
              const easedProgress = 1 - Math.pow(1 - phase2Progress, 3);
              const finalX = finalPositions[index][0];
              const finalY = finalPositions[index][1];
              x = gsap.utils.interpolate(-50, finalX, easedProgress);
              y = gsap.utils.interpolate(-50, finalY, easedProgress);
              rotation = gsap.utils.interpolate(initialRotations[index], 0, easedProgress);
            } else if (progress > phase2End) {
              x = finalPositions[index][0];
              y = finalPositions[index][1];
              rotation = 0;
            }

            gsap.set(img, {
              xPercent: x,
              yPercent: y,
              rotation: rotation,
              scale: scale,
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="architectures" className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col md:block">
      
      {/* Header */}
      <div className="absolute top-12 md:top-20 left-0 w-full z-10 pointer-events-none px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="display-text text-white mb-4">
            Real Results.
          </h2>
          <p className="text-[#A0A0A0] text-[clamp(0.75rem,2vw,1rem)] uppercase tracking-[0.2em] font-light">
            Scroll to scatter
          </p>
        </div>
      </div>

      {/* Images Container */}
      <div className="relative w-full flex-1 md:absolute md:inset-0 md:h-full md:pointer-events-none flex flex-col md:block items-center justify-center gap-6 mt-32 md:mt-0 pb-20 md:pb-0 overflow-y-auto md:overflow-hidden">
        {cases.map((item, i) => (
          <div 
            key={i} 
            ref={(el) => { imagesRef.current[i] = el; }}
            className="md:absolute md:top-1/2 md:left-1/2 w-[85vw] md:w-[clamp(280px,35vw,480px)] aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col group will-change-transform md:pointer-events-auto"
          >
            {/* Clickable link to client domain */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
              aria-label={`Visit ${item.title}`}
            >
              {/* Image */}
              <div className="relative w-full h-[65%] overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={item.image}
                  alt={`${item.title} - Reverbex project`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, 35vw"
                />
              </div>

              {/* Content Bottom */}
              <div className="relative w-full h-[35%] p-4 md:p-6 bg-gradient-to-b from-[#0a0a0a] to-[#050505] flex flex-col justify-center">
                <p className="text-[#EAB308] font-semibold tracking-[0.2em] uppercase text-[9px] md:text-[10px] mb-2">
                  {item.tagline}
                </p>
                <h3 className="text-xl md:text-2xl text-white font-bold tracking-tight mb-2 group-hover:text-[#EAB308] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#666666] text-[10px] md:text-xs mb-2">
                  {item.result}
                </p>
                <div className="flex gap-2">
                  {item.stack.map((tech, j) => (
                    <span key={j} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70 text-[9px] font-medium tracking-wide">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
