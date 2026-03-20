"use client";

import React from "react";
import { motion } from "framer-motion";

const founders = [
  { name: "Anurag Singh", role: "Lead Architect", desc: "Building intelligent systems that transform businesses" },
  { name: "Prachi Agarwal", role: "Strategy Lead", desc: "Driving innovation through strategic AI solutions" },
];

export default function Founders() {
  return (
    <section id="founders" className="relative w-full py-24 md:py-40 overflow-hidden bg-[#050505]">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-yellow-950/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl text-white text-center mb-3 tracking-tight drop-shadow-md" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Leadership</h2>
          <p className="text-white/40 text-center text-sm md:text-base mb-20 font-light tracking-wide uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>The team behind Reverbex</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className="p-10 border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 text-center group rounded-3xl shadow-xl hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-24 h-24 mx-auto mb-6 rounded-full border border-white/10 flex items-center justify-center text-3xl text-white/50 group-hover:border-blue-400/40 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500 bg-gradient-to-br from-blue-500/5 to-yellow-500/5 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                {f.name.charAt(0)}
              </div>
              
              <h3 className="text-xl md:text-2xl text-white mb-2 tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{f.name}</h3>
              <p className="text-yellow-500/80 group-hover:text-yellow-400 transition-colors duration-300 text-sm mb-4 font-medium tracking-wide uppercase text-xs">{f.role}</p>
              <p className="text-white/50 text-sm font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
