"use client";

import React from "react";
import { 
  Cpu, Cloud, Box, Zap, Database, Eye,
  GitBranch, Network, Code, Layers, Hexagon, Shield,
  Link, Sparkles, Smartphone, Settings, Layout, Monitor
} from "lucide-react";

export default function TechStream() {
  const techRows = [
    [
      { name: "Machine Learning", icon: <Cpu className="w-6 h-6 text-blue-400" /> },
      { name: "Cloud Solutions", icon: <Cloud className="w-6 h-6 text-sky-400" /> },
      { name: "Custom Software", icon: <Box className="w-6 h-6 text-indigo-400" /> },
      { name: "Digital Transformation", icon: <Zap className="w-6 h-6 text-yellow-400" /> },
      { name: "Data Analytics", icon: <Database className="w-6 h-6 text-cyan-400" /> },
      { name: "Computer Vision", icon: <Eye className="w-6 h-6 text-teal-400" /> }
    ],
    [
      { name: "AI Integration", icon: <GitBranch className="w-6 h-6 text-purple-400" /> },
      { name: "Neural Networks", icon: <Network className="w-6 h-6 text-pink-400" /> },
      { name: "API Development", icon: <Code className="w-6 h-6 text-blue-500" /> },
      { name: "System Architecture", icon: <Layers className="w-6 h-6 text-sky-500" /> },
      { name: "Web3 Infrastructure", icon: <Hexagon className="w-6 h-6 text-indigo-500" /> },
      { name: "Cybersecurity", icon: <Shield className="w-6 h-6 text-red-400" /> }
    ],
    [
      { name: "Blockchain", icon: <Link className="w-6 h-6 text-yellow-500" /> },
      { name: "Generative AI", icon: <Sparkles className="w-6 h-6 text-amber-400" /> },
      { name: "Mobile Development", icon: <Smartphone className="w-6 h-6 text-green-400" /> },
      { name: "Process Automation", icon: <Settings className="w-6 h-6 text-gray-300" /> },
      { name: "UI/UX Design", icon: <Layout className="w-6 h-6 text-fuchsia-400" /> },
      { name: "Edge Computing", icon: <Monitor className="w-6 h-6 text-orange-400" /> }
    ]
  ];

  return (
    <section className="relative w-full py-32 overflow-hidden bg-[#050505]">
      {/* Glow Edges */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20">
        <h2 className="text-4xl md:text-5xl text-white text-center mb-4 tracking-tight drop-shadow-md" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          The Tech Stream
        </h2>
        <p className="text-white/40 text-center text-sm md:text-base font-light tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Engineered for peak performance
        </p>
      </div>

      {/* 3 Infinite Scrolling Ticker Layers */}
      <div className="relative flex flex-col gap-6 overflow-hidden w-full group py-4">
        {/* Left/Right Fade Out masks across all rows */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {techRows.map((row, rowIndex) => (
          <div key={rowIndex} className={`flex items-center gap-6 whitespace-nowrap pl-6 ${rowIndex % 2 === 0 ? 'animate-scrolling-pills-left' : 'animate-scrolling-pills-right'}`} style={{ animationDuration: `${15 + rowIndex * 4}s` }}>
            {[...row, ...row, ...row, ...row].map((tech, i) => (
              <div 
                key={`${rowIndex}-${i}`} 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md text-white/80 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 font-sans shadow-[0_0_20px_rgba(0,0,0,0.3)] cursor-default"
              >
                <div className="drop-shadow-[0_0_8px_currentColor] opacity-90">{tech.icon}</div>
                <span className="text-sm md:text-base font-medium tracking-wide drop-shadow-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scroll-pills-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 4)); }
        }
        @keyframes scroll-pills-right {
          0% { transform: translateX(calc(-100% / 4)); }
          100% { transform: translateX(0); }
        }
        .animate-scrolling-pills-left {
          animation-name: scroll-pills-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-scrolling-pills-right {
          animation-name: scroll-pills-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .group:hover .animate-scrolling-pills-left,
        .group:hover .animate-scrolling-pills-right {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
