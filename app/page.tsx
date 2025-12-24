"use client";

import FluidBackground from "../components/FluidBackground";
import AudioReactiveFluidBackground, { setupAudioContext } from "../components/AudioReactiveFluid";
import AudioVisualizer from "../components/AudioVisualizer";
import FloatingOrbs from "../components/FloatingOrbs";
import TechStream from "../components/TechStream";
import ProjectShowcase, { ProjectSlides } from "../components/ProjectShowcase";
import ScrollProgress from "../components/ScrollProgress";
import ScrollManager from "../components/ScrollManager";
import ScrambleText from "../components/ScrambleText";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ duration: 0.5, delay, ease: "circOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated heading with word-by-word reveal
const AnimatedHeading = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "circOut"
      }
    }
  };

  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

const ServiceCard = ({ title, description, tags, impact, caseStudy, index }: { title: string, description: string, tags: string[], impact?: string[], caseStudy?: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ duration: 0.4, delay: index * 0.05, ease: "circOut" }}
    whileHover={{
      y: -10,
      scale: 1.02,
      backgroundColor: "rgba(255,255,255,0.1)",
      boxShadow: "0 15px 40px rgba(34, 211, 238, 0.25)",
      borderColor: "rgba(34, 211, 238, 0.4)"
    }}
    className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl group h-full flex flex-col"
  >
    <div className="h-1 w-12 pearl-bg mb-6 group-hover:w-full transition-all duration-500 rounded-full" />

    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-white transition-colors">{title}</h3>

    <p className="text-white/60 mb-6 font-light leading-relaxed flex-grow">{description}</p>

    {/* Real Impact Metrics */}
    {impact && (
      <div className="mb-6 space-y-2 border-l-2 border-white/10 pl-4">
        {impact.map((item, i) => (
          <div key={i} className="text-sm text-white/80 font-mono flex items-center gap-2">
            <span className="text-white">▹</span> {item}
          </div>
        ))}
      </div>
    )}

    {/* Case Study Badge */}
    {caseStudy && (
      <div className="mb-6 inline-block bg-white/10 border border-white/30 px-3 py-1 rounded text-xs text-white font-mono">
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

// Counter animation component for metrics
const CounterMetric = ({ metric, delay }: { metric: any; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(metric.val.replace(/[^0-9]/g, ''));
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
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, metric.val]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay, ease: "circOut" }}
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {metric.prefix}{count}{metric.suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/40">{metric.label}</div>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mouse parallax for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Setup audio context when component mounts
  useEffect(() => {
    if (audioRef.current) {
      setupAudioContext(audioRef.current);
    }
  }, []);

  // Define content sections for the ScrollManager
  const sections = [
    // Slide 1: Hero
    <section key="hero" id="home" className="w-full h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center relative"
      >
        <div className="absolute inset-0 bg-white/10 blur-[120px] rounded-full opacity-30" />
        <h1 className="relative text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter animate-pearl text-center leading-[0.9]">
          Reverbex <br className="md:hidden" /> Technologies
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 text-lg md:text-2xl text-white/80 font-light tracking-wide text-center max-w-xl"
      >
        Orchestrating the Future of Digital Reality
      </motion.p>
    </section>,

    // Slide 2: Projects Intro
    <section key="projects-intro" className="w-full h-screen flex items-center justify-center px-4 md:px-12 bg-transparent overflow-hidden">
      <motion.div
        className="max-w-4xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "circOut" }}
      >
        <ScrambleText
          text="Featured Engagements"
          className="text-5xl md:text-8xl font-bold leading-tight mb-8 animate-pearl"
        />
        <div className="w-20 h-1 bg-white/20 mx-auto mb-6" />
        <ScrambleText
          text="Delivering scalable solutions for complex industry challenges"
          className="text-xl md:text-2xl text-white/60 font-light"
          delay={0.5}
        />
      </motion.div>
    </section>,

    // Slide 3+: Project Slides
    ...ProjectSlides,

    // Slide 4: Mission Intro
    <section key="mission-intro" id="about-mission" className="w-full h-screen flex flex-col justify-center px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "circOut" }}
        >
          <span className="text-white/60 font-mono tracking-widest text-sm uppercase mb-4 block">Built for Business Impact</span>
          <ScrambleText
            text="Enterprise Software That Drives Real Results"
            className="text-5xl md:text-7xl font-bold leading-tight"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-lg md:text-xl text-white/70 font-light leading-relaxed space-y-6"
        >
          <p>
            Since 2020, we&apos;ve delivered <strong>20+ mission-critical systems</strong> across enterprise, finance, education, and gaming.
          </p>
          <p>
            Our clients choose us because we combine technical excellence with business acumen. We don&apos;t just write code; we solve revenue, cost, and efficiency equations.
          </p>
        </motion.div>
      </div>
    </section>,

    // Slide 5: Values
    <section key="values" id="about-values" className="w-full h-screen flex flex-col justify-center px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20 w-full">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {[
            {
              title: "Production-Ready",
              description: "We don't deliver prototypes. Every system is built for scale, security, and real-world production from Day One."
            },
            {
              title: "Business-First",
              description: "Technology serves your business. Our solutions directly address revenue goals, cost reductions, and efficiency targets."
            },
            {
              title: "Full-Stack Execution",
              description: "From architecture to deployment. One team, one vision, zero handoffs. We own the entire lifecycle."
            }
          ].map((pillar, i) => (
            <motion.div
              key={i}
              className="bg-white/5 border border-white/10 p-8 rounded-xl"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">{pillar.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics Banner */}
        <div className="border-t border-b border-white/10 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Data Processed Daily", val: "500M+", prefix: "", suffix: "M+" },
              { label: "Concurrent Users", val: "10k+", prefix: "", suffix: "k+" },
              { label: "System Uptime", val: "99.9%", prefix: "", suffix: "%" },
              { label: "Response Time", val: "<100ms", prefix: "<", suffix: "ms" }
            ].map((metric, i) => (
              <CounterMetric key={i} metric={metric} delay={0.2 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>,

    // Slide 6: Services - Featured
    <section key="features" className="w-full h-screen flex flex-col justify-center px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-2">Capabilities</h2>
          <h3 className="text-4xl font-bold animate-pearl">Featured Solutions</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Real-Time Trading",
              description: "High-frequency engines & market data pipelines.",
              tags: ["Flutter", "TimescaleDB"],
              caseStudy: "Neora"
            },
            {
              title: "University Mgmt",
              description: "End-to-end campus administration platforms.",
              tags: ["Next.js", "Supabase"],
              caseStudy: "No-Dues"
            },
            {
              title: "AI Content Bot",
              description: "Auto-captioning & scheduling for social growth.",
              tags: ["Python", "Gemini API"],
              caseStudy: "InstaBot"
            },
            {
              title: "Geospatial Intel",
              description: "Satellite imagery processing & 3D viz.",
              tags: ["CesiumJS", "PostGIS"],
              caseStudy: "GEOPIXEL"
            }
          ].map((service, i) => (
            <ServiceCard key={i} index={i} {...service} impact={[]} />
          ))}
        </div>
      </div>
    </section>,

    // Slide 7: Services - Enterprise
    <section key="enterprise" className="w-full h-screen flex flex-col justify-center px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="mb-12 text-right"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-2">Capabilities</h2>
          <h3 className="text-4xl font-bold animate-pearl">Enterprise & Data</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Analytics Dashboards",
              description: "Unified KPI tracking from multiple sources.",
              tags: ["React", "D3.js"],
            },
            {
              title: "Workflow Auto",
              description: "Eliminating manual tasks with smart pipelines.",
              tags: ["n8n", "Python"],
            },
            {
              title: "CRM & ERP",
              description: "Custom business process management systems.",
              tags: ["Odoo", "Custom"],
            },
            {
              title: "Legacy Modernization",
              description: "Migrating mainframes to cloud-native microservices.",
              tags: ["AWS", "Docker"],
            }
          ].map((service, i) => (
            <ServiceCard key={i} index={i} {...service} impact={[]} />
          ))}
        </div>
      </div>
    </section>,

    // Slide 8: Services - Advanced
    <section key="advanced" className="w-full h-screen flex flex-col justify-center px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-2">Capabilities</h2>
          <h3 className="text-4xl font-bold animate-pearl">Advanced Technologies</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Generative AI Agent",
              description: "Custom LLM solutions for customer support & internal tools.",
              tags: ["LangChain", "OpenAI"],
            },
            {
              title: "Blockchain Apps",
              description: "Smart contracts & dApps for transparent operations.",
              tags: ["Solidity", "Rust"],
            },
            {
              title: "IoT Systems",
              description: "Real-time device monitoring & control networks.",
              tags: ["MQTT", "Go"],
            },
            {
              title: "AR/VR Experiences",
              description: "Immersive training & product showcases.",
              tags: ["Unity", "Three.js"],
            }
          ].map((service, i) => (
            <ServiceCard key={i} index={i} {...service} impact={[]} />
          ))}
        </div>
      </div>
    </section>,

    // Slide 9: Services - Core
    <section key="core" className="w-full h-screen flex flex-col justify-center px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-2">Capabilities</h2>
          <h3 className="text-4xl font-bold animate-pearl">Core Engineering</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Full-Stack Web",
              description: "Scalable, secure, and SEO-optimized web applications.",
              tags: ["Next.js", "Node.js"],
            },
            {
              title: "Mobile Apps",
              description: "Cross-platform iOS & Android solutions.",
              tags: ["React Native", "Flutter"],
            },
            {
              title: "DevOps & CI/CD",
              description: "Automated deployment & infrastructure as code.",
              tags: ["Kubernetes", "Terraform"],
            },
            {
              title: "API Development",
              description: "Robust REST & GraphQL API architectures.",
              tags: ["FastAPI", "GraphQL"],
            }
          ].map((service, i) => (
            <ServiceCard key={i} index={i} {...service} impact={[]} />
          ))}
        </div>
      </div>
    </section>,

    // Slide 10: Tech Stream
    <div key="techstream" className="h-screen w-full relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <TechStream />
      </div>
    </div>,

    // Slide Last: Contact
    <section key="contact" id="contact" className="w-full h-screen flex flex-col justify-center py-24 px-4 md:px-12 border-t border-white/10 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-syne font-bold mb-8 animate-pearl">Let&apos;s Build the Future</h2>
          <p className="text-xl text-white/60 font-light mb-12 max-w-2xl mx-auto">
            Ready to transform your business requirements into production-grade reality?
            Let&apos;s talk about your next mission-critical project.
          </p>

          <a
            href="mailto:reverbextech@gmail.com"
            className="inline-flex items-center gap-3 pearl-bg text-black px-8 py-4 rounded-full text-lg font-bold hover:brightness-110 transition-all hover:scale-105"
          >
            <span>Start a Project</span>
            <span className="text-xl">→</span>
          </a>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-white/40 font-mono uppercase tracking-widest">
            <div>
              <div className="text-white mb-2">Email</div>
              reverbextech@gmail.com
            </div>
            <div>
              <div className="text-white mb-2">Phone</div>
              +91 99299 86743
            </div>
            <div>
              <div className="text-white mb-2">Location</div>
              Jaipur, Rajasthan, India
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  ];

  return (
    <main ref={containerRef} className="w-full h-screen relative text-white selection:bg-purple-500/30 bg-black overflow-hidden">

      {/* Global Scroll Connector */}
      <ScrollProgress />

      {/* Fixed background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingOrbs />
        <FluidBackground />
      </div>

      {/* Hijacked Scroll Container */}
      <ScrollManager>
        {sections}
      </ScrollManager>
    </main>
  );
}