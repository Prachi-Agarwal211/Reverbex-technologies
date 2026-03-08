"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";

// Dynamically import heavy WebGL/Canvas backgrounds to speed up initial load and prevent SSR issues
const InteractiveFluidBackground = dynamic(() => import("../components/InteractiveFluid"), {
  ssr: false,
});
const FloatingOrbs = dynamic(() => import("../components/FloatingOrbs"), {
  ssr: false,
});
const TechStream = dynamic(() => import("../components/TechStream"), {
  ssr: false,
});

import ScrollProgress from "../components/ScrollProgress";
import ScrambleText from "../components/ScrambleText";
import MobileContactBar from "../components/MobileContactBar";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.5, delay, ease: "circOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Minimal Icon Components
const BrainIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /></svg>
);
const WorkflowIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="8" height="8" x="3" y="3" rx="2" /><path d="M7 11v4a2 2 0 0 0 2 2h4" /><rect width="8" height="8" x="13" y="13" rx="2" /></svg>
);
const DatabaseIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>
);
const LayoutIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></svg>
);
const WhatsAppIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);
const MailIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PhoneIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const BentoCard = memo(function BentoCard({ title, description, icon, colSpan = 1, delay = 0 }: { title: string, description: string, icon: React.ReactNode, colSpan?: number, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay, ease: "circOut" }}
      whileHover={{
        y: -10,
        scale: 1.02,
        backgroundColor: "rgba(255,255,255,0.08)",
        boxShadow: "0 15px 40px rgba(34, 211, 238, 0.25)",
        borderColor: "rgba(34, 211, 238, 0.4)"
      }}
      className={`bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl group transition-all duration-300 h-full flex flex-col ${colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}`}
    >
      <div className="h-1 w-12 pearl-bg mb-6 group-hover:w-full transition-all duration-500 rounded-full" />
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white/80 group-hover:text-white transition-colors mb-6 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-white tracking-tight group-hover:text-white transition-colors">{title}</h3>
      <p className="text-white/60 mb-6 font-light leading-relaxed flex-grow text-sm md:text-base">{description}</p>
    </motion.div>
  );
});

const ProcessStep = memo(function ProcessStep({ num, title, description, delay = 0 }: { num: string, title: string, description: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-all duration-500 overflow-hidden group"
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

      <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent mb-6 font-syne relative z-10">{num}</div>
      <h4 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight relative z-10">{title}</h4>
      <p className="text-white/60 text-sm md:text-base leading-relaxed relative z-10">{description}</p>
    </motion.div>
  );
});

// New: Experience Timeline Component
const ExperienceHighlight = memo(function ExperienceHighlight() {
  return (
    <div className="w-full relative py-20">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 hidden md:block" />

      <div className="space-y-24 md:space-y-32">
        {[
          { year: "20+", title: "Mission-Critical Systems", desc: "Successfully architects and deployed across global enterprise environments." },
          { year: "500M+", title: "Data Points Processed", desc: "Daily volume managed through our high-performance TimescaleDB & Python pipelines." },
          { year: "0", title: "Compromises on Security", desc: "Military-grade encryption and strict access controls built into every layer." },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="w-full md:w-5/12 p-8" />
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/30 z-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            <div className={`w-full md:w-5/12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-500 ${i % 2 === 0 ? 'text-left md:text-right' : 'text-left'}`}>
              <h3 className="text-5xl md:text-7xl font-bold animate-pearl text-emboss mb-4 tracking-tighter">{item.year}</h3>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h4>
              <p className="text-white/50 leading-relaxed font-light">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

// New: Founder Profile Component utilizing the brand logo instead of portraits
const FeaturedPartners = memo(function FeaturedPartners() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
              🏫
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-1">JECRC University</h3>
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Educational Partner</p>
            </div>
          </div>
          <h4 className="text-xl text-white/90 mb-4 font-semibold">Zero-Paper Clearance & No-Dues System</h4>
          <p className="text-white/60 font-light leading-relaxed flex-grow">
            We completely digitized their clearance process, delivering a real-time No-Dues System serving over 20,000+ students. This eliminated paper trails and reduced processing time by 80%.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
              🛍️
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-1">Aarya Clothing</h3>
              <p className="text-rose-400 font-mono text-xs uppercase tracking-widest">Retail & Ecommerce</p>
            </div>
          </div>
          <h4 className="text-xl text-white/90 mb-4 font-semibold">India's 1st AI CRM & Ecommerce Platform</h4>
          <p className="text-white/60 font-light leading-relaxed flex-grow">
            We architected a custom e-commerce solution integrating an advanced CRM. It features autonomous AI operations and a virtual AI salesperson that handles customer inquiries and drives conversions around the clock.
          </p>
        </div>
      </motion.div>
    </div>
  );
});

// New: Founders Profile Component utilizing the brand logo instead of portraits
const FounderProfile = ({ name, role, delay }: { name: string, role: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group relative rounded-3xl overflow-hidden aspect-[3/4] md:aspect-square bg-black border border-white/10 isolation-isolate flex flex-col items-center justify-center p-8"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/5 opacity-50 group-hover:scale-105 transition-transform duration-700" />

    <div className="relative z-10 w-3/4 flex items-center justify-center mb-6 group-hover:-translate-y-4 transition-transform duration-500">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.PNG" alt="Reverbex Technologies Logo" className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" />
    </div>

    <div className="relative z-10 text-center transform translate-y-2 group-hover:-translate-y-2 transition-transform duration-500">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">{name}</h3>
      <p className="text-teal-400 font-mono text-xs md:text-sm uppercase tracking-widest">{role}</p>
      <div className="w-12 h-px bg-white/20 mt-6 mb-0 mx-auto group-hover:w-full transition-all duration-700" />
    </div>
  </motion.div>
);

// Counter animation component for metrics
const CounterMetric = ({ metric, delay }: { metric: any; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseFloat(metric.val.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        // preserve 1 decimal place if the original string had one
        if (metric.val.includes('.')) {
          setCount(parseFloat(current.toFixed(1)));
        } else {
          setCount(Math.floor(current));
        }
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, metric.val]);

  return (
    <motion.div
      ref={ref}
      className="text-center md:text-left"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay, ease: "circOut" }}
    >
      <div className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
        {metric.prefix}{count}{metric.suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/40 font-mono">{metric.label}</div>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="w-full relative text-white selection:bg-purple-500/30 bg-black min-h-screen">
      {/* Global Scroll Connector */}
      <ScrollProgress />

      {/* Fixed background elements (Pearl fluid & orbs) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrbs />
        <div className="w-full h-full">
          <InteractiveFluidBackground />
        </div>
      </div>

      {/* Main Content Area - Native Scroll */}
      <div className="relative z-10 w-full overflow-hidden flex flex-col">

        {/* HERO SECTION */}
        <section id="home" className="w-full min-h-[90vh] flex flex-col items-center justify-center p-4 md:p-8 pt-32 pb-16 bg-transparent">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10 max-w-5xl mx-auto flex flex-col items-center"
          >
            <div className="absolute inset-0 bg-white/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />

            <ScrambleText
              text="Intelligent Automation."
              className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 mb-2 leading-[1.1] md:leading-[1]"
            />
            <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight animate-pearl text-emboss text-center leading-[1.1] md:leading-[1] mb-12">
              Enterprise SaaS.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl xl:text-2xl text-white/50 font-light tracking-wide text-center max-w-4xl mx-auto px-4 mb-16 leading-relaxed"
            >
              We build high-performance AI agents and custom software systems that reduce manual work, accelerate response times, and scale your operations without adding headcount.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 relative z-20 mb-8 w-full sm:w-auto px-4"
            >
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center pearl-bg text-black px-8 py-4 rounded-full text-base font-bold hover:brightness-110 hover:scale-105 transition-all"
              >
                Book a Consultation
              </a>
              <a
                href="https://wa.me/919929986743?text=Hi%20Anurag,%20I%20want%20to%20discuss%20AI%20automation%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-teal-500/10 border border-teal-500/30 text-teal-400 backdrop-blur-md px-8 py-4 rounded-full text-base font-bold hover:bg-teal-500/20 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-white/50 font-mono tracking-wider relative z-20"
            >
              <a href="mailto:15anuragsingh2003@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                <MailIcon className="w-4 h-4" /> 15anuragsingh2003@gmail.com
              </a>
              <span className="hidden sm:inline opacity-30">|</span>
              <a href="tel:+919929986743" className="hover:text-white transition-colors flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" /> +91 99299 86743
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* METRICS BANNER */}
        <section className="w-full py-16 px-4 md:px-12 bg-transparent relative z-10 border-y border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-sm font-mono tracking-widest uppercase text-white/40 md:w-1/4 text-center md:text-left">
              Proven Scale <br /> & Reliability
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full md:w-3/4">
              {[
                { label: "Data Evaluated Daily", val: "50M+", prefix: "", suffix: "M+" },
                { label: "Active Deployments", val: "20+", prefix: "", suffix: "+" },
                { label: "Core System Uptime", val: "99.9%", prefix: "", suffix: "%" },
                { label: "P99 Avg Latency", val: "<100ms", prefix: "<", suffix: "ms" }
              ].map((metric, i) => (
                <CounterMetric key={i} metric={metric} delay={0.2 + i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION / READY TO DEPLOY SOFWARE */}
        <section id="products" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block">Ready-To-Deploy Software</h2>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Turnkey Solutions</h2>
              <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto">
                In addition to custom engineering, we offer battle-tested platforms available for immediate deployment and licensing.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
              {/* Product 1: AI E-commerce */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="bg-gradient-to-br from-rose-500/10 to-orange-900/10 backdrop-blur-md border border-rose-500/20 p-8 md:p-12 rounded-3xl relative overflow-hidden group flex flex-col h-full"
              >
                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                  <div className="bg-rose-500/20 text-rose-300 font-mono text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest border border-rose-500/30 font-bold shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                    Available for Licensing
                  </div>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-3xl md:text-4xl mb-6">
                  🛍️
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">AI CRM & Ecommerce Platform</h3>
                <p className="text-base md:text-lg text-rose-100/70 mb-8 leading-relaxed font-light flex-grow">
                  India's 1st custom AI-powered e-commerce ecosystem. Features autonomous AI operations and a virtual AI salesperson to automate your sales funnel and handle customer inquiries around the clock. First deployed for Aarya Clothing.
                </p>

                <div className="grid grid-cols-1 gap-3 mb-10">
                  {[
                    "Virtual AI Salesperson (24/7)",
                    "Autonomous Customer Inquiries",
                    "Advanced Integrated CRM",
                    "Automated Sales Funnel & Conversions"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="w-full text-center bg-rose-500 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-rose-400 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] mt-auto"
                >
                  Request a Demo
                </a>
              </motion.div>

              {/* Product 2: No Dues */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
                className="bg-gradient-to-br from-emerald-500/10 to-teal-900/10 backdrop-blur-md border border-emerald-500/20 p-8 md:p-12 rounded-3xl relative overflow-hidden group flex flex-col h-full"
              >
                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                  <div className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest border border-emerald-500/30 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    Available for Licensing
                  </div>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl md:text-4xl mb-6">
                  🏫
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Digital No-Dues System</h3>
                <p className="text-base md:text-lg text-emerald-100/70 mb-8 leading-relaxed font-light flex-grow">
                  A zero-paper clearance platform designed for educational institutions. Handle thousands of students, track department approvals in real-time, and eliminate bottlenecks. Successfully serving 20,000+ students at JECRC University.
                </p>

                <div className="grid grid-cols-1 gap-3 mb-10">
                  {[
                    "Real-time Dashboard & Analytics",
                    "Multi-Department Workflows",
                    "Automated Email & SMS Alerts",
                    "Student Portal & Status Tracking"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="w-full text-center bg-emerald-500 text-black px-8 py-4 rounded-full text-base font-bold hover:bg-emerald-400 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-auto"
                >
                  Request a Demo
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES / WHAT WE DO BENTO GRID */}
        <section id="services" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block">Capabilities</h2>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-pearl text-emboss pb-2">Core Solutions</h2>
              <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mb-16">
                From autonomous AI agents to complex data pipelines, we engineer robust solutions that become the backbone of your business operations.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BentoCard
                title="Generative AI & LLM Agents"
                description="Custom RAG pipelines, autonomous customer support agents, and internal knowledge bases built on state-of-the-art frontier models (OpenAI, Gemini, Anthropic)."
                icon={<BrainIcon className="w-6 h-6" />}
                colSpan={2}
                delay={0.1}
              />
              <BentoCard
                title="Workflow Automation"
                description="Eliminate repetitive tasks. We design robust n8n and custom Python pipelines that integrate with your existing CRM, ERP, and internal systems."
                icon={<WorkflowIcon className="w-6 h-6" />}
                colSpan={1}
                delay={0.2}
              />
              <BentoCard
                title="SaaS & Web Architecture"
                description="High-performance, secure, and globally distributed web applications using Next.js, React, Node.js, and serverless infrastructure."
                icon={<LayoutIcon className="w-6 h-6" />}
                colSpan={1}
                delay={0.3}
              />
              <BentoCard
                title="Intelligent Data Dashboards"
                description="Turn fragmented enterprise data into actionable intelligence. Custom analytics portals with real-time syncing, TimescaleDB, and interactive React visualizations."
                icon={<DatabaseIcon className="w-6 h-6" />}
                colSpan={2}
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* WHO WE HELP SECTION */}

        {/* USE CASES SECTION */}

        {/* HOW WE WORK / PROCESS SECTION */}
        <section id="process" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="flex flex-col items-center">
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block text-center">Process</h2>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 text-center animate-pearl text-emboss pb-2">Engineering Philosophy</h2>

              <div className="relative w-full max-w-3xl aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] mb-20 p-4 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                <video
                  src="/Reverbex_logo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 w-full h-full object-contain mix-blend-screen opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep
                num="01"
                title="Discovery & Audit"
                description="We analyze your existing workflows, identify bottlenecks, and define clear, measurable ROI targets before writing a single line of code."
                delay={0.1}
              />
              <ProcessStep
                num="02"
                title="Architecture Design"
                description="Designing resilient, scalable systems. We choose the right tools—from LLMs to databases—to guarantee long-term performance."
                delay={0.2}
              />
              <ProcessStep
                num="03"
                title="Agile Deployment"
                description="Rapid iterations and strict QA. We build in production-ready environments from day one, ensuring zero downtime during rollout."
                delay={0.3}
              />
              <ProcessStep
                num="04"
                title="Scale & Monitor"
                description="Post-launch, we enforce rigorous APM (Application Performance Monitoring) and infrastructure scaling to support your growth."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* EXPERIENCE HIGHLIGHT SECTION */}
        <section id="experience" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-20">
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block">Proven Track Record</h2>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Delivering at Scale</h2>
              <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto">
                We&apos;ve partnered with industry leaders and disruptive startups to architect systems that refuse to fail.
              </p>
            </FadeIn>

            <ExperienceHighlight />
          </div>
        </section>

        {/* FEATURED PARTNERS SECTION */}
        <section id="partners" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block">Trusted By Inovators</h2>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Featured Partners</h2>
              <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto">
                From universities to modern e-commerce, we build transformative technical foundations across industries.
              </p>
            </FadeIn>

            <FeaturedPartners />
          </div>
        </section>

        {/* WHO WE HELP SECTION */}
        <section id="who-we-help" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block">Target Audience</h2>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Who We Help</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: "Operations-Heavy Businesses", desc: "Scaling manual processes into intelligent automated pipelines." },
                { title: "Service Companies", desc: "Eliminating repetitive workflows, data entry, and slow response times." },
                { title: "SaaS Founders", desc: "Accelerating product development with robust enterprise-grade architectures." },
                { title: "Data-Driven Teams", desc: "Stopping the chaos of manual reporting by building custom real-time dashboards." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES SECTION */}
        <section id="use-cases" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block">Practical Applications</h2>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Proven Use Cases</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "AI Customer Support", desc: "WhatsApp, chat, and email automation handling 80% of L1 inquiries instantly." },
                { title: "Internal Workflow Automation", desc: "Multi-step approvals, automated report generation, and system handoffs via n8n & Python." },
                { title: "Custom SaaS Platforms", desc: "Client data portals and admin dashboards with secure, role-based access." },
                { title: "Document & Ops Automation", desc: "AI-driven extraction, analysis, and routing of invoices, contracts, and unstructured data." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col sm:flex-row gap-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all group hover:bg-white/5" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0)" }}
                >
                  <div className="w-12 h-12 shrink-0 rounded-full pearl-bg flex items-center justify-center text-black group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP / FOUNDERS SECTION */}
        <section id="founders" className="w-full py-24 md:py-32 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-center">

              <FadeIn className="lg:col-span-1">
                <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4 block">Leadership</h2>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">The Visionaries</h2>
                <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
                  Founded by a team obsessed with technical perfection and business optimization. We believe AI is not a buzzword—it&apos;s the fundamental architecture of the next decade of enterprise.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-white font-mono uppercase tracking-widest text-sm hover:text-teal-400 transition-colors group"
                >
                  <span className="w-8 h-px bg-white/30 group-hover:bg-teal-400 group-hover:w-12 transition-all" />
                  Connect with Leadership
                </a>
              </FadeIn>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <FounderProfile
                  name="Anurag Singh"
                  role="Co-Founder & Tech Lead"
                  delay={0.2}
                />
                <FounderProfile
                  name="Prachi Agarwal"
                  role="Co-Founder & Operations"
                  delay={0.4}
                />
              </div>

            </div>
          </div>
        </section>

        {/* TECH STREAM SECTION */}
        <section className="w-full py-24 md:py-32 bg-transparent relative z-10 overflow-hidden">
          <FadeIn className="max-w-7xl mx-auto px-4 md:px-12 mb-12">
            <h3 className="text-sm font-mono tracking-widest uppercase text-white/40 text-center">Powered By Premium Technologies</h3>
          </FadeIn>
          <TechStream />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full min-h-screen flex flex-col justify-center py-24 px-4 md:px-12 bg-transparent relative z-10 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center w-full">
            <FadeIn>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-syne font-bold mb-6 md:mb-8 animate-pearl text-emboss tracking-tight pb-2">Ready to Automate?</h2>
              <p className="text-lg md:text-2xl text-white/80 font-light mb-12 md:mb-16 max-w-2xl mx-auto px-4">
                Partner with us to build intelligent systems that drive real business outcomes. Reach out instantly or schedule a call.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-2xl mx-auto px-4">
                <a
                  href="https://wa.me/919929986743?text=Hi%20Anurag,%20I%20want%20to%20discuss%20AI%20automation%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 pearl-bg text-black px-8 py-5 rounded-full text-lg font-bold hover:brightness-110 transition-all hover:scale-105"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="mailto:15anuragsingh2003@gmail.com"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md text-white px-8 py-5 rounded-full text-lg font-bold hover:bg-white/10 transition-all hover:scale-105"
                >
                  <MailIcon className="w-6 h-6" />
                  <span>Send an Email</span>
                </a>
              </div>

              <div className="mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 text-sm text-white/40 font-mono uppercase tracking-widest px-4 border-t border-white/10 pt-16">
                <div className="flex flex-col items-center">
                  <MailIcon className="w-6 h-6 mb-4 text-white/60" />
                  <div className="text-white mb-2">Email</div>
                  <a href="mailto:15anuragsingh2003@gmail.com" className="hover:text-white transition-colors">15anuragsingh2003@gmail.com</a>
                </div>
                <div className="flex flex-col items-center">
                  <PhoneIcon className="w-6 h-6 mb-4 text-white/60" />
                  <div className="text-white mb-2">Phone / WhatsApp</div>
                  <a href="tel:+919929986743" className="hover:text-white transition-colors">+91 99299 86743</a>
                </div>
                <div className="flex flex-col items-center sm:col-span-2 md:col-span-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mb-4 text-white/60"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  <div className="text-white mb-2">Engineering HQ</div>
                  Jaipur, Rajasthan, India
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CLOSING SPACING */}
        <div className="h-20" />

        {/* MOBILE CONTACT BAR */}
        <MobileContactBar />


      </div>
    </main>
  );
}