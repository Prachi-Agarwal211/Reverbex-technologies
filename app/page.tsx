"use client";

import FluidBackground from "../components/FluidBackground";
import FloatingOrbs from "../components/FloatingOrbs";
import TechStream from "../components/TechStream";
import ProjectShowcase from "../components/ProjectShowcase";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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
      y: 20,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
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
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{
      y: -15,
      scale: 1.02,
      backgroundColor: "rgba(255,255,255,0.12)",
      boxShadow: "0 20px 60px rgba(34, 211, 238, 0.3)",
      borderColor: "rgba(34, 211, 238, 0.5)"
    }}
    className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl transition-all group h-full flex flex-col"
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
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
  const { scrollY } = useScroll();

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

  return (
    <main ref={containerRef} className="w-full min-h-screen relative text-white selection:bg-purple-500/30 bg-black">
      <FloatingOrbs />
      <FluidBackground />

      <div className="relative z-10 pointer-events-none">

        <section id="home" className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden pointer-events-auto">
          <motion.div
            style={{ x: smoothX, y: smoothY }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative"
          >
            <div className="absolute inset-0 bg-white/10 blur-[120px] rounded-full opacity-30 animate-pulse" />
            <h1 className="relative text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter animate-pearl text-center leading-[0.9]">
              Reverbex <br className="md:hidden" /> Technologies
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg md:text-2xl text-white/80 font-light tracking-wide text-center max-w-xl"
          >
            Orchestrating the Future of Digital Reality
          </motion.p>

        </section>

        {/* 3D PROJECT SHOWCASE (SPIRAL) */}
        <section id="projects" className="pointer-events-auto">
          <ProjectShowcase />
        </section>

        {/* MISSION SECTION */}
        <section id="about" className="min-h-screen flex flex-col justify-center py-24 px-4 md:px-12 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-20">

            {/* Header & Opening */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <span className="text-white/60 font-mono tracking-widest text-sm uppercase mb-4 block">Built for Business Impact</span>
                <AnimatedHeading
                  text="Enterprise Software That drives Real Results"
                  className="text-5xl md:text-7xl font-bold leading-tight"
                />
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
                  <h3 className="text-xl font-bold mb-4 text-white">{pillar.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{pillar.desc}</p>
                </FadeIn>
              ))}
            </div>

            {/* Metrics Banner with Counter Animation */}
            <FadeIn delay={0.6}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-white/10 py-12">
                {[
                  { label: "Data Processed Daily", val: "500M+", prefix: "", suffix: "M+" },
                  { label: "Concurrent Users", val: "10k+", prefix: "", suffix: "k+" },
                  { label: "System Uptime", val: "99.9%", prefix: "", suffix: "%" },
                  { label: "Response Time", val: "<100ms", prefix: "<", suffix: "ms" }
                ].map((metric, i) => (
                  <CounterMetric key={i} metric={metric} delay={0.8 + i * 0.1} />
                ))}
              </div>
            </FadeIn>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="min-h-screen py-24 px-4 md:px-12 pointer-events-auto">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-20 text-center">
              <h2 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-4">Enterprise-Grade Solutions</h2>
              <AnimatedHeading
                text="Built on proven architectures. Deployed at scale."
                className="text-4xl md:text-6xl font-bold"
              />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Real-Time Trading Platforms",
                  desc: "High-frequency trading engines, portfolio management systems, and market data pipelines processing millions of transactions daily.",
                  impact: ["₹10Cr+ daily trading volume", "<50ms order execution", "100+ institutional users"],
                  caseStudy: "Reverbex Neora",
                  tags: ["Flutter", "TimescaleDB", "FastAPI", "KiteAPI"]
                },
                {
                  title: "University Management Systems",
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
                  title: "Custom Analytics Dashboards",
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
                  title: "Cross-Platform Apps",
                  desc: "Native mobile and web applications with offline-first architectures and modern interfaces.",
                  impact: ["iOS/Android/Web single codebase", "<2s load times", "Offline-capable"],
                  tags: ["React", "Next.js", "Flutter", "PWA"]
                },
                {
                  title: "API Development",
                  desc: "Scalable REST/GraphQL APIs and WebSocket servers ensuring seamless integration between disparate systems.",
                  impact: ["1M+ API calls/day", "Auto-failover", "Real-time sync"],
                  tags: ["FastAPI", "Django", "Express", "GraphQL"]
                },
                {
                  title: "Cloud Infrastructure",
                  desc: "AWS/GCP/Azure deployment, Kubernetes orchestration, and CI/CD pipelines for scalable cloud-native applications.",
                  impact: ["99.9% uptime SLA", "Auto-scaling", "Multi-region"],
                  tags: ["AWS", "Docker", "K8s", "Terraform"]
                },
                {
                  title: "E-Commerce Solutions",
                  desc: "Full-stack e-commerce platforms with payment gateways, inventory management, and advanced analytics.",
                  impact: ["10k+ products", "Multi-currency", "Real-time stock sync"],
                  tags: ["Shopify", "Stripe", "Node.js", "MongoDB"]
                },
                {
                  title: "DevOps & Monitoring",
                  desc: "Complete DevOps setup with automated deployments, monitoring, logging, and incident management systems.",
                  impact: ["<5min deployment", "24/7 monitoring", "Auto-recovery"],
                  tags: ["Jenkins", "Prometheus", "Grafana", "ELK"]
                },
                {
                  title: "Blockchain Development",
                  desc: "Smart contract development, DApp creation, and blockchain integration for Web3 applications.",
                  impact: ["Gas-optimized contracts", "Multi-chain support", "Secure wallets"],
                  tags: ["Solidity", "Web3.js", "Ethereum", "IPFS"]
                },
                {
                  title: "CRM & ERP Systems",
                  desc: "Custom CRM and ERP solutions tailored to business processes with comprehensive reporting and automation.",
                  impact: ["360° customer view", "Process automation", "Role-based access"],
                  tags: ["Salesforce", "SAP", "Odoo", "Custom"]
                },
                {
                  title: "Cybersecurity Solutions",
                  desc: "Penetration testing, security audits, vulnerability assessments, and implementation of security best practices.",
                  impact: ["ISO 27001 compliance", "Zero-day protection", "Threat detection"],
                  tags: ["OWASP", "Penetration Testing", "WAF", "SOC"]
                },
                {
                  title: "IoT Solutions",
                  desc: "End-to-end IoT systems with sensor integration, real-time data processing, and predictive analytics.",
                  impact: ["1000+ devices", "Real-time telemetry", "Predictive maintenance"],
                  tags: ["MQTT", "InfluxDB", "Edge Computing", "AWS IoT"]
                },
                {
                  title: "Data Engineering",
                  desc: "Big data pipelines, ETL processes, data warehousing, and advanced analytics for data-driven decision making.",
                  impact: ["PB-scale processing", "Real-time ETL", "ML-ready data"],
                  tags: ["Spark", "Airflow", "Snowflake", "dbt"]
                },
                {
                  title: "Legacy System Modernization",
                  desc: "Migration from legacy systems to modern architectures with zero downtime and data integrity guarantees.",
                  impact: ["Zero data loss", "Phased migration", "Training included"],
                  tags: ["Migration", "Refactoring", "Microservices", "API Gateway"]
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
        <section id="tech" className="pointer-events-auto">
          <div className="text-center mb-10 pt-20">
            <AnimatedHeading
              text="Our Technology Stack"
              className="text-4xl md:text-6xl font-syne font-bold text-white mb-4"
            />
            <div className="w-20 h-1 pearl-bg mx-auto rounded-full" />
          </div>
          <TechStream />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-[50vh] flex flex-col justify-center py-24 px-4 md:px-12 pointer-events-auto border-t border-white/10 bg-black/40">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-5xl md:text-7xl font-syne font-bold mb-8">Let&apos;s Build the Future</h2>
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

      </div>
    </main >
  );
}