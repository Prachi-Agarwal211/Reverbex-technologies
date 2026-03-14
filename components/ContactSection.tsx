"use client";

import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";

export default function ContactSection() {
  return (
    <footer id="contact" className="w-full bg-transparent py-32 md:py-64 px-6 md:px-24 border-t border-white/05 relative overflow-hidden">
      
      {/* HUD Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/10 m-8 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/10 m-8 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left - Narrative */}
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <img src="/logo.PNG" alt="Reverbex" className="h-20 w-auto brightness-0 invert drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <h2 className="text-5xl font-bold tracking-tighter uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Reverbex</h2>
            </div>
            
            <p className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white/90 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              We architect <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">autonomous systems</span> that transform how modern enterprises operate.
            </p>

            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-mono font-bold tracking-[0.5em] text-white/80 uppercase">Global Headquarters</span>
              <span className="text-lg text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">India / Remote-First Operations</span>
            </div>
          </div>

          {/* Right - Control HUD */}
          <div className="flex flex-col gap-12">
            <div className="border-2 border-white/20 bg-white/10 backdrop-blur-3xl p-8 md:p-12 hover:bg-white/20 transition-colors duration-500 shadow-2xl">
              <h3 className="text-[12px] font-mono font-bold tracking-[0.5em] text-white uppercase mb-12 flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_15px_#4ade80]" />
                Connectivity Hub
              </h3>

              <div className="flex flex-col gap-12">
                {/* Anurag Singh */}
                <div className="flex flex-col gap-6">
                  <span className="text-[14px] font-mono font-bold text-white/80 uppercase tracking-[0.3em]">Lead Architect / Anurag Singh</span>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <motion.a 
                      href="mailto:15anuragsingh2003@gmail.com"
                      aria-label="Email Anurag Singh"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-4 text-white hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-2 -ml-2"
                      style={{ willChange: "transform" }}
                    >
                      <div className="w-12 h-12 shrink-0 rounded-full border-2 border-white/30 flex items-center justify-center group hover:bg-white hover:text-black transition-all duration-500 shadow-lg" aria-hidden="true">
                        <HiOutlineMail className="text-xl" />
                      </div>
                      <span className="text-sm font-mono font-bold tracking-widest uppercase">Email Channel</span>
                    </motion.a>
                    <motion.a 
                      href="https://wa.me/9929986743"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp Anurag Singh"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-4 text-white hover:text-green-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-2 -ml-2"
                      style={{ willChange: "transform" }}
                    >
                      <div className="w-12 h-12 shrink-0 rounded-full border-2 border-white/30 flex items-center justify-center group hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-500 shadow-lg" aria-hidden="true">
                        <SiWhatsapp className="text-xl" />
                      </div>
                      <span className="text-sm font-mono font-bold tracking-widest uppercase">WhatsApp Sync</span>
                    </motion.a>
                  </div>
                </div>

                {/* Prachi Agarwal */}
                <div className="flex flex-col gap-6">
                  <span className="text-[14px] font-mono font-bold text-white/80 uppercase tracking-[0.3em] mt-4">Strategy Lead / Prachi Agarwal</span>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <motion.a 
                      href="mailto:prachiagarwal211@gmail.com"
                      aria-label="Email Prachi Agarwal"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-4 text-white hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-2 -ml-2"
                      style={{ willChange: "transform" }}
                    >
                      <div className="w-12 h-12 shrink-0 rounded-full border-2 border-white/30 flex items-center justify-center group hover:bg-white hover:text-black transition-all duration-500 shadow-lg" aria-hidden="true">
                        <HiOutlineMail className="text-xl" />
                      </div>
                      <span className="text-sm font-mono font-bold tracking-widest uppercase">Email Channel</span>
                    </motion.a>
                    <motion.a 
                      href="https://wa.me/9155804490"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp Prachi Agarwal"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-4 text-white hover:text-green-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-2 -ml-2"
                      style={{ willChange: "transform" }}
                    >
                      <div className="w-12 h-12 shrink-0 rounded-full border-2 border-white/30 flex items-center justify-center group hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-500 shadow-lg" aria-hidden="true">
                        <SiWhatsapp className="text-xl" />
                      </div>
                      <span className="text-sm font-mono font-bold tracking-widest uppercase">WhatsApp Sync</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-32 md:mt-64 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase">
            © 2026 Reverbex Technologies / Neural Systems Division
          </p>
          <div className="flex gap-12">
            <a href="#" className="text-[10px] font-mono tracking-[0.5em] text-white/40 hover:text-white transition-colors uppercase underline-offset-4 hover:underline">Privacy Protocol</a>
            <a href="#" className="text-[10px] font-mono tracking-[0.5em] text-white/40 hover:text-white transition-colors uppercase underline-offset-4 hover:underline">Terms of Access</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
