"use client";

import FluidBackground from "../components/FluidBackground";
import TechStream from "../components/TechStream";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ServiceCard = ({ title, description, tags, impact, caseStudy, index }: { title: string, description: string, tags: string[], impact?: string[], caseStudy?: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.05 }}
    whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
    className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-cyan-500/30 transition-all group h-full flex flex-col"
  >
    <div className="h-1 w-12 pearl-bg mb-6 group-hover:w-full transition-all duration-500 rounded-full" />

    <h3 className="text-2xl font-syne font-semibold mb-3 text-white group-hover:text-cyan-200 transition-colors">{title}</h3>

    <p className="text-white/60 mb-6 font-light leading-relaxed flex-grow">{description}</p>

    {/* Real Impact Metrics */}
    {impact && (
      <div className="mb-6 space-y-2 border-l-2 border-white/10 pl-4">
        {impact.map((item, i) => (
          <div key={i} className="text-sm text-white/80 font-mono flex items-center gap-2">
            <span className="text-cyan-400">▹</span> {item}
          </div>
        ))}
      </div>
    )}

    {/* Case Study Badge */}
    {caseStudy && (
      <div className="mb-6 inline-block bg-cyan-950/30 border border-cyan-500/20 px-3 py-1 rounded text-xs text-cyan-300 font-mono">
        CASE STUDY: {caseStudy}
      </div>
    )}

    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag) => (
        <span key={tag} className="text-xs font-mono uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-white/40 border border-white/5 group-hover:border-white/20 transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function Home() {
  const containerRef = useRef(null);


  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // Output motion values for high-performance updates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for fluid feel
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position directly
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      // Update motion values directly (no re-renders)
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main ref={containerRef} className="w-full min-h-screen relative text-white selection:bg-purple-500/30">
      <FluidBackground />

      <div className="relative z-10 pointer-events-none">

        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden pointer-events-auto">
          <motion.div
            style={{ x: smoothX, y: smoothY }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center relative"
          >
            <div className="absolute inset-0 bg-white/10 blur-[120px] rounded-full opacity-30 animate-pulse" />
            <h1 className="relative font-syne text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter animate-pearl text-center leading-[0.9]">
              Reverbex <br className="md:hidden" /> Technologies
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-lg md:text-2xl text-white/80 font-light tracking-wide text-center max-w-xl"
          >
            Orchestrating the Future of Digital Reality
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">Explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
            />
          </motion.div>
        </section>

        {/* MISSION SECTION */}
        <section className="min-h-screen flex flex-col justify-center py-24 px-4 md:px-12 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-20">

            {/* Header & Opening */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <span className="text-cyan-400 font-mono tracking-widest text-sm uppercase mb-4 block">Built for Business Impact</span>
                <h2 className="text-5xl md:text-7xl font-syne font-bold leading-tight">
                  Enterprise Software That drives <span className="animate-pearl">Real Results</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2} className="text-lg md:text-xl text-white/70 font-light leading-relaxed space-y-6">
                <p>
                  Since 2020, we&apos;ve delivered <strong>20+ mission-critical systems</strong> across enterprise, finance, education, and gaming.
                </p>
                <p>
                  Our clients choose us because we combine technical excellence with business acumen. We don&apos;t just write code; we solve revenue, cost, and efficiency equations.
                </p>
              </FadeIn>
            </div>

            {/* Three Value Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Production-Ready",
                  desc: "We don't deliver prototypes. Every system is built for scale, security, and real-world production from Day One."
                },
                {
                  title: "Business-First",
                  desc: "Technology serves your business. Our solutions directly address revenue goals, cost reductions, and efficiency targets."
                },
                {
                  title: "Full-Stack Execution",
                  desc: "From architecture to deployment. One team, one vision, zero handoffs. We own the entire lifecycle."
                }
              ].map((pillar, i) => (
                <FadeIn key={i} delay={0.3 + (i * 0.1)} className="bg-white/5 border border-white/10 p-8 rounded-xl">
                  <h3 className="text-xl font-bold font-syne mb-4 text-white">{pillar.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{pillar.desc}</p>
                </FadeIn>
              ))}
            </div>

            {/* Metrics Banner */}
            <FadeIn delay={0.6}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-white/10 py-12">
                {[
                  { label: "Data Processed Daily", val: "500M+" },
                  { label: "Concurrent Users", val: "10k+" },
                  { label: "System Uptime", val: "99.9%" },
                  { label: "Response Time", val: "<100ms" }
                ].map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold font-syne text-cyan-400 mb-2">{metric.val}</div>
                    <div className="text-xs uppercase tracking-widest text-white/40">{metric.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="min-h-screen py-24 px-4 md:px-12 pointer-events-auto">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-20 text-center">
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4">Enterprise-Grade Solutions</h2>
              <h3 className="text-4xl md:text-6xl font-syne font-bold">Built on proven architectures.<br />Deployed at scale.</h3>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Real-Time Trading Platforms",
                  desc: "High-frequency trading engines, portfolio management systems, and market data pipelines processing millions of transactions daily.",
                  impact: ["₹10Cr+ daily trading volume", "<50ms order execution", "100+ institutional users"],
                  caseStudy: "AlgoTrader T1 (MPass Finance)",
                  tags: ["Flutter", "TimescaleDB", "FastAPI", "KiteAPI"]
                },
                {
                  title: "Multiplayer Gaming Systems",
                  desc: "Server-authoritative engines and secure wallet systems handling 10k+ concurrents with live streaming integration.",
                  impact: ["10k+ concurrent players", "₹5L+ daily txs", "2-tier commission engine"],
                  caseStudy: "Reddy Anna Gaming",
                  tags: ["Node.js", "Socket.IO", "Postgres", "OvenMedia"]
                },
                {
                  title: "University Mgmt Systems",
                  desc: "Complete administrative platforms for student lifecycle, no-dues clearance, and multi-stakeholder workflows.",
                  impact: ["5,000+ students managed", "80% clearance time cut", "12 depts integrated"],
                  caseStudy: "JECRC No-Dues",
                  tags: ["Next.js", "Supabase", "Real-time"]
                },
                {
                  title: "AI Content Automation",
                  desc: "Automated content creation, scheduling, and publishing systems with AI-generated captions and optimal timing.",
                  impact: ["100+ posts/mo auto-published", "40hrs/mo saved", "3x engagement rate"],
                  caseStudy: "Instagram Bot",
                  tags: ["Python", "Gemini API", "Graph API"]
                },
                {
                  title: "Geospatial Intelligence",
                  desc: "Satellite imagery processing and 3D visualization portals handling terabytes of data with sub-pixel precision.",
                  impact: ["500GB+ daily sat data", "85% latency reduction", "Sub-pixel alignment"],
                  caseStudy: "GEOPIXEL & NADIR (ISRO)",
                  tags: ["Python", "GDAL", "CesiumJS", "PostGIS"]
                },
                {
                  title: "Custom Dashboards",
                  desc: "Real-time KPI tracking and executive data visualization connecting multiple sources into unified interfaces.",
                  impact: ["15+ data sources", "<3s refresh rate", "Mobile-responsive"],
                  tags: ["React", "D3.js", "FastAPI", "Redis"]
                },
                {
                  title: "Workflow Automation",
                  desc: "Intelligent task scheduling and n8n workflow automation to eliminate repetitive manual processes.",
                  impact: ["60% man-hour savings", "95% error reduction", "Zero-touch validation"],
                  tags: ["n8n", "Python", "Celery", "Cron"]
                },
                {
                  title: "AI/ML Integration",
                  desc: "Client-side and cloud-based AI solutions for image enhancement, LLM orchestration, and computer vision.",
                  impact: ["4K in-browser upscaling", "Multi-LLM routing", "Local-first privacy"],
                  caseStudy: "4K AI Enhancer",
                  tags: ["ONNX", "WebGPU", "Python"]
                },
                {
                  title: "Enterprise Apps",
                  desc: "Cross-platform web and mobile applications with offline-first architectures and modern interfaces.",
                  impact: ["iOS/Android/Web single codebase", "<2s load times", "Offline-capable"],
                  tags: ["React", "Next.js", "Flutter", "PWA"]
                },
                {
                  title: "API Ecosystems",
                  desc: "Scalable REST/GraphQL APIs and WebSocket servers ensuring seamless integration between disparate systems.",
                  impact: ["1M+ API calls/day", "Auto-failover", "Real-time sync"],
                  tags: ["FastAPI", "Django", "Express", "GraphQL"]
                }
              ].map((service, i) => (
                <ServiceCard
                  key={i}
                  index={i}
                  title={service.title}
                  description={service.desc}
                  tags={service.tags}
                  impact={service.impact}
                  caseStudy={service.caseStudy}
                />
              ))}
            </div>
          </div>
        </section>

        {/* HORIZONTAL TECH STEAM */}
        <TechStream />



      </div>
    </main>
  );
}