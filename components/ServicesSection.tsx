"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  { 
    title: "AI Automations", 
    desc: "Streamline operations with intelligent workflows that learn and adapt to your business needs.", 
    icon: "✧",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop"
  },
  { 
    title: "Premium Websites", 
    desc: "Convert visitors into customers with stunning, high-performance digital experiences.", 
    icon: "✦",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
  },
  { 
    title: "Mobile Apps", 
    desc: "Reach users on every platform with seamless, intuitive mobile experiences built for scale.", 
    icon: "📱",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop"
  },
  { 
    title: "AI Agents", 
    desc: "Autonomous systems that handle complex business processes intelligently 24/7.", 
    icon: "🤖",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop"
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section id="services" ref={containerRef} className="relative w-full py-32 overflow-hidden bg-[#050505]">
      {/* Dynamic Scroll-Linked Background Glows */}
      <motion.div 
        style={{ y: yBg1 }}
        className="absolute top-1/4 left-0 md:left-1/4 w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: yBg2 }}
        className="absolute bottom-1/4 right-0 md:right-1/4 w-[25rem] h-[25rem] md:w-[30rem] md:h-[30rem] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="text-center"
        >
          <h2 className="text-4xl md:text-6xl text-white text-center mb-4 tracking-tight drop-shadow-md" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Our Offerings
          </h2>
          <p className="text-white/50 text-center text-sm md:text-lg mb-20 max-w-xl mx-auto font-light tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Premium Solutions For Modern Enterprises
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
          {services.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className="group relative rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/10 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Internal subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
              
              {/* Card Image Header */}
              <div className="relative w-full h-64 md:h-72 overflow-hidden z-10">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
                
                {/* Floating Icon over the image */}
                <div className="absolute bottom-4 left-6 z-20 w-12 h-12 rounded-xl bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg group-hover:-translate-y-2 group-hover:border-yellow-500/50 transition-all duration-500">
                  <span className="text-xl text-yellow-500">{service.icon}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 p-8 md:p-10 flex-1 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl text-white mb-4 tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {service.title}
                </h3>
                <p className="text-white/60 text-base leading-relaxed font-light font-sans">
                  {service.desc}
                </p>
                
                {/* Learn More link appearance */}
                <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-yellow-500/80 group-hover:text-yellow-400 transition-colors uppercase tracking-widest cursor-pointer w-max">
                  <span className="group-hover:translate-x-1 transition-transform">Explore</span>
                  <span className="text-lg leading-none group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
