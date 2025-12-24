"use client";

import { motion } from "framer-motion";
import React from "react";
// Import Icons
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiSvelte, SiAngular, SiTypescript, SiJavascript, SiThreedotjs,
  SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiNestjs,
  SiDocker, SiKubernetes, SiPostgresql, SiMongodb, SiRedis, SiTensorflow, SiPytorch,
  SiOpenai, SiAmazon, SiGooglecloud, SiVercel, SiGit, SiGithub, SiPython, SiGo,
  SiRust, SiGraphql, SiSocketdotio, SiElasticsearch,
  SiPrisma, SiSupabase, SiFirebase, SiRedux, SiWebrtc
} from "react-icons/si";

const techCategories = [
  {
    row: 1,
    direction: -1,
    speed: 40,
    items: [
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Framer", icon: <SiFramer className="text-white" /> },
      { name: "Vue", icon: <SiVuedotjs className="text-[#4FC08D]" /> },
      { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
      { name: "Svelte", icon: <SiSvelte className="text-[#FF3E00]" /> },
      { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-[#EE4C2C]" /> },
    ]
  },
  {
    row: 2,
    direction: 1,
    speed: 35,
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "Go", icon: <SiGo className="text-[#00ADD8]" /> },
      { name: "Rust", icon: <SiRust className="text-white" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
      { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
      { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
      { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
      { name: "OpenAI", icon: <SiOpenai className="text-white" /> },
      { name: "Prisma", icon: <SiPrisma className="text-white" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
    ]
  },
  {
    row: 3,
    direction: -1,
    speed: 30,
    items: [
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Kubernetes", icon: <SiKubernetes className="text-[#326CE5]" /> },
      { name: "AWS", icon: <SiAmazon className="text-[#FF9900]" /> },
      { name: "GCP", icon: <SiGooglecloud className="text-[#4285F4]" /> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "WebRTC", icon: <SiWebrtc className="text-[#333333]" /> },
      { name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> },
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
      { name: "Socket.IO", icon: <SiSocketdotio className="text-white" /> },
    ]
  }
];

const TechCard = ({ item, isBackground = false }: { item: any; isBackground?: boolean }) => (
  <div className={`flex flex-col items-center justify-center 
    ${isBackground ? 'min-w-[200px] md:min-w-[280px] opacity-10 blur-[1px]' : 'min-w-[100px] md:min-w-[140px] hover:scale-110 active:scale-95'}
    p-4 mx-2 transition-all duration-300 group cursor-default`}
  >
    <div className={`${isBackground ? 'text-8xl md:text-9xl' : 'text-5xl md:text-6xl'} mb-4 transition-transform duration-300`}>
      {item.icon}
    </div>
    {!isBackground && (
      <span className="text-xs font-mono text-white/40 group-hover:text-white transition-colors">
        {item.name}
      </span>
    )}
  </div>
);

const MarqueeRow = ({ row, isBackground = false }: { row: any; isBackground?: boolean }) => {
  return (
    <div className={`flex overflow-hidden relative w-full ${isBackground ? 'py-0 absolute top-0 left-0 h-full items-center opacity-30 pointer-events-none' : 'py-2'} mask-gradient`}>
      <motion.div
        className="flex"
        animate={{
          x: row.direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isBackground ? row.speed * 2 : row.speed,
            ease: "linear",
          },
        }}
      >
        {/* Repeat 4 times for smoother loop */}
        {[...row.items, ...row.items, ...row.items, ...row.items].map((item, i) => (
          <TechCard key={`${item.name}-${i}-${isBackground}`} item={item} isBackground={isBackground} />
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStream() {
  return (
    <section className="snap-start w-full h-screen flex flex-col justify-center items-center bg-transparent relative overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto z-10 flex flex-col justify-center h-full py-20 pb-0">

        {/* Header - Added padding to prevent clipping */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-8 px-4 relative z-20"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            Powering <span className="animate-pearl">Innovation</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A comprehensive arsenal of cutting-edge technologies
          </p>
        </motion.div>

        {/* Dense Marquee Grid */}
        <div className="relative w-full flex-grow flex flex-col justify-center space-y-4 md:space-y-6">
          {/* Background "Tunnel" Layers */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-20 pointer-events-none mix-blend-overlay scale-125">
            <MarqueeRow row={{ ...techCategories[0], direction: 1 }} isBackground={true} />
            <MarqueeRow row={{ ...techCategories[2], direction: -1 }} isBackground={true} />
          </div>

          {/* Foreground Active Layers */}
          {techCategories.map((cat, i) => (
            <MarqueeRow key={i} row={cat} />
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/05 rounded-full blur-[120px]" />
      </div>

      <style jsx global>{`
                .mask-gradient {
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
            `}</style>
    </section>
  );
}
