"use client";

import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";

const founders = [
  {
    name: "Anurag Singh",
    role: "Founder & Architect",
    email: "15anuragsingh2003@gmail.com",
    whatsapp: "9929986743",
    theme: "from-blue-500/20 to-transparent"
  },
  {
    name: "Prachi Agarwal",
    role: "Founder & Strategist",
    email: "prachiagarwal211@gmail.com",
    whatsapp: "9155804490",
    theme: "from-yellow-500/20 to-transparent"
  }
];

export default function Founders() {
  return (
    <section id="founders" className="w-full bg-transparent py-32 md:py-64 px-6 md:px-24 border-t border-white/05 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/05 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/05 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 md:mb-48"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            <span className="text-[14px] font-mono font-bold tracking-[0.5em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">The Leadership</span>
          </div>
          <h2 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase text-white leading-none drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            The <span className="text-white/60 italic">Founders</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {founders.map((founder, idx) => (
            <motion.div 
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * idx, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Glass Card */}
              <div className="relative overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl p-8 md:p-16 transition-all duration-700 group-hover:border-white/40 group-hover:bg-white/20 shadow-xl">
                
                {/* Accent Glow */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${founder.theme} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`} />

                <div className="relative z-10">
                  <span className="text-[12px] font-mono font-bold tracking-[0.4em] text-white/80 uppercase mb-4 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">0{idx + 1} / Leadership</span>
                  <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase mb-2 leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    {founder.name.split(' ')[0]}<br/>
                    <span className="text-white/80 group-hover:text-white transition-colors duration-700">{founder.name.split(' ')[1]}</span>
                  </h3>
                  <p className="text-white/80 font-mono font-bold text-[14px] tracking-[0.5em] uppercase mb-16 mt-4 group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {founder.role}
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <a 
                      href={`mailto:${founder.email}`}
                      aria-label={`Email ${founder.name}`}
                      className="group/link flex items-center gap-4 py-4 border-b border-white/20 text-white hover:text-blue-400 transition-all text-[12px] font-mono font-bold tracking-widest uppercase active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-2 -ml-2"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all duration-500 shadow-md" aria-hidden="true">
                        <HiOutlineMail className="text-xl" />
                      </div>
                      <span className="break-all">{founder.email}</span>
                    </a>
                    
                    {founder.whatsapp && (
                      <a 
                        href={`https://wa.me/${founder.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${founder.name}`}
                        className="group/link flex items-center gap-4 py-4 border-b border-white/20 text-white hover:text-green-400 transition-all text-[12px] font-mono font-bold tracking-widest uppercase active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-2 -ml-2"
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover/link:bg-[#25D366] group-hover/link:border-[#25D366] group-hover/link:text-white transition-all duration-500 shadow-md" aria-hidden="true">
                          <SiWhatsapp className="text-xl" />
                        </div>
                        <span>+{founder.whatsapp}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
