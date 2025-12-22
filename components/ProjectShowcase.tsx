"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import DiagonalPosterCard from "./DiagonalPosterCard";

// 13 Projects (Updated)
const projects = [
    // --- PROJECTS WITH IMAGES (First) ---

    // 1. JECRC NO-DUES SYSTEM
    {
        id: 1,
        slug: 'jecrc-no-dues',
        title: 'JECRC No-Dues',
        subtitle: 'Zero-Paper Clearance',
        client: 'JECRC University',
        impact: ['5,000+ students', '80% faster', 'Real-time sync'],
        tags: ['Next.js', 'Supabase', 'PostgreSQL'],
        gradient: 'from-green-500 via-emerald-600 to-teal-700',
        icon: '🏫',
        images: ['/pictures/no_dues_system/Screenshot 2025-12-22 030206.png'],
        thumbnail: '/pictures/no_dues_system/Screenshot 2025-12-22 030206.png',
        liveUrl: 'https://nodues.jecrcuniversity.edu.in/'
    },
    // NEW: AudioForge AI
    {
        id: 16,
        slug: 'audioforge-ai',
        title: 'AudioForge AI',
        subtitle: 'Music Companion App',
        client: 'Creative Tool',
        impact: ['AI Music Gen', 'Real-time Audio', 'VST Plugin'],
        tags: ['Python', 'TorchAudio', 'React'],
        gradient: 'from-pink-500 via-rose-600 to-red-700',
        icon: '🎵',
        thumbnail: '/pictures/AudioForge AI/Screenshot 2025-12-22 035810.png',
        images: ['/pictures/AudioForge AI/Screenshot 2025-12-22 035810.png']
    },
    // NEW: Realtime Virtual Token Card Game
    {
        id: 17,
        title: 'Realtime Virtual Token Game of Cards',
        subtitle: 'Multiplayer Card Gaming Platform',
        client: 'Gaming Enterprise',
        impact: ['10k+ concurrents', '<50ms latency', 'Live Dealer'],
        tags: ['Node.js', 'Socket.IO', 'Canvas'],
        gradient: 'from-amber-500 via-orange-600 to-red-700',
        icon: '🃏',
        thumbnail: '/pictures/AudioForge AI/Screenshot 2025-12-22 035911.png',
        images: ['/pictures/AudioForge AI/Screenshot 2025-12-22 035911.png']
    },
    // UPDATED: FLURRY AI (Was Perry AI)
    {
        id: 9,
        slug: 'flurry-ai',
        title: 'Reverbex Flurry AI',
        subtitle: '4K Image Upscaler',
        client: 'Creative Tool',
        impact: ['4K/8K upscale', 'Local Privacy', 'WebGPU accel'],
        tags: ['React', 'ONNX', 'WebGPU'],
        gradient: 'from-violet-500 via-purple-600 to-fuchsia-700',
        icon: '🎨',
        thumbnail: '/pictures/Screenshot 2025-12-22 040024.png',
        images: ['/pictures/Screenshot 2025-12-22 040024.png']
    },
    // 2. GEOPIXEL
    {
        id: 2,
        slug: 'geopixel',
        title: 'GEOPIXEL',
        subtitle: 'Real-Time Sat Monitoring',
        client: 'ISRO-NRSC',
        impact: ['500GB+ daily data', '3D Visualization', '99.5% uptime'],
        tags: ['Django', 'CesiumJS', 'Python'],
        gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
        icon: '🛰️',
        thumbnail: '/pictures/GEOpixel/Screenshot from 2025-06-30 17-16-27.png',
        images: ['/pictures/GEOpixel/Screenshot from 2025-06-30 17-16-27.png']
    },
    // 3. GIST
    {
        id: 3,
        slug: 'gist',
        title: 'GIST',
        subtitle: 'Geophysical Info Portal',
        client: 'ISRO-NRSC',
        impact: ['Data validation', 'Quality Control', 'Automation'],
        tags: ['Django', 'Postgres', 'Data'],
        gradient: 'from-indigo-500 via-purple-600 to-pink-700',
        icon: '🌍',
        thumbnail: '/pictures/GEOpixel/Screenshot from 2025-06-23 15-46-43.png',
        images: ['/pictures/GEOpixel/Screenshot from 2025-06-23 15-46-43.png']
    },
    // 4. NADIR
    {
        id: 4,
        slug: 'nadir',
        title: 'NADIR',
        subtitle: 'Atmospheric Data Pipeline',
        client: 'ISRO-NRSC',
        impact: ['Ozonometer analysis', 'Sun photometer', 'Real-time plot'],
        tags: ['Python', 'SciPy', 'Django'],
        gradient: 'from-blue-500 via-cyan-600 to-teal-700',
        icon: '🌦️',
        thumbnail: '/pictures/nadir/nadir.jpg',
        images: ['/pictures/nadir/nadir.jpg']
    },
    // 7. AI STUDIO
    {
        id: 15,
        slug: 'ai-studio',
        title: 'AI Studio Workspace',
        subtitle: 'Next-Gen ML Prototyping',
        client: 'Internal Tool',
        impact: ['Rapid Prototyping', 'Model Evaluation', 'Collaborative'],
        tags: ['React', 'TensorFlow.js', 'Google Cloud'],
        gradient: 'from-orange-500 via-amber-600 to-yellow-700',
        icon: '🧪',
        thumbnail: '/pictures/Screenshot_22-12-2025_34156_aistudio.google.com.jpeg',
        images: ['/pictures/Screenshot_22-12-2025_34156_aistudio.google.com.jpeg']
    },
    // 9. NEORA
    {
        id: 7,
        slug: 'neora',
        title: 'Reverbex Neora',
        subtitle: 'AI Stock Companion',
        client: 'FinTech',
        impact: ['Real-time ticks', 'Sentiment Analysis', 'Auto-trade'],
        tags: ['Flutter', 'FastAPI', 'n8n'],
        gradient: 'from-green-500 via-emerald-600 to-teal-700',
        icon: '📈',
        images: ['/pictures/neora/Screenshot 2025-12-22 034701.png'],
        thumbnail: '/pictures/neora/Screenshot 2025-12-22 034701.png'
    },
    // 12. NETHER AI
    {
        id: 13,
        slug: 'nether-ai',
        title: 'Nether AI Gateway',
        subtitle: 'LLM Orchestrator',
        client: 'Internal Infra',
        impact: ['Model routing', 'Cost opt', 'Failover'],
        tags: ['Node.js', 'Ollama', 'Docker'],
        gradient: 'from-fuchsia-500 via-pink-600 to-rose-700',
        icon: '🧠',
        images: ['/pictures/nether ai/Frontpage.png'],
        thumbnail: '/pictures/nether ai/Frontpage.png'
    },
    // 6. CORPORATE WEB
    {
        id: 11,
        slug: 'corporate-web',
        title: 'Enterprise Web',
        subtitle: 'Modern Corp Identity',
        client: 'Enterprise',
        impact: ['High conversion', 'SEO Perfect', 'Fast Load'],
        tags: ['Next.js', 'Tailwind', 'Framer'],
        gradient: 'from-sky-500 via-blue-600 to-indigo-700',
        icon: '💼',
        thumbnail: '/pictures/template modern web solution/lading page.png',
        images: ['/pictures/template modern web solution/lading page.png']
    },

];

// Individual project card with smooth scroll-based animations only
const AnimatedProjectCard = ({ project, index, totalProjects }: { project: any; index: number; totalProjects: number }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Smooth opacity transition
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.5, 0.7, 1],
        [0, 1, 1, 1, 0]
    );

    // Subtle scale for depth
    const scale = useTransform(
        scrollYProgress,
        [0, 0.3, 0.5, 0.7, 1],
        [0.9, 1, 1, 1, 0.9]
    );

    // Y position for smooth entry
    const y = useTransform(
        scrollYProgress,
        [0, 0.3, 0.5],
        [50, 0, 0]
    );

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, scale, y }}
            className="shrink-0"
        >
            <DiagonalPosterCard project={project} />
        </motion.div>
    );
};

export default function ProjectShowcase() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 25,
        restDelta: 0.001
    });

    const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[600vh] bg-transparent">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                
                <motion.div
                    style={{ x }}
                    className="flex gap-16 px-[5vw] w-max items-center"
                >
                    {/* Intro */}
                    <motion.div
                        className="w-[80vw] md:w-[600px] shrink-0 flex flex-col justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-5xl md:text-8xl font-bold leading-tight">
                            Selected <br /> <span className="animate-pearl">Works</span>
                        </h2>
                        <div className="w-20 h-1 bg-white/20 mt-8 mb-4" />
                        <p className="text-xl md:text-2xl text-white/60 font-light max-w-md">
                            A curated selection of enterprise systems, AI tools, and digital experiences.
                        </p>
                    </motion.div>

                    {/* Project Cards with Individual Animations */}
                    {projects.map((project, index) => (
                        <AnimatedProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            totalProjects={projects.length}
                        />
                    ))}

                    {/* Outro */}
                    <motion.div
                        className="w-[80vw] md:w-[500px] shrink-0 flex flex-col justify-center items-start pl-20"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h3 className="text-4xl font-bold mb-6">Explore More</h3>
                        <p className="text-white/60 mb-8 text-lg">View our complete portfolio and case studies</p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(34, 211, 238, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="pearl-bg text-black px-8 py-4 rounded-full font-bold text-lg"
                        >
                            View All Projects →
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Progress Bar */}
                <div className="absolute bottom-10 left-10 right-10">
                    <div className="h-[1px] bg-white/10 overflow-hidden rounded-full">
                        <motion.div
                            style={{ scaleX: smoothProgress }}
                            className="h-full pearl-bg origin-left"
                        />
                    </div>
                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {projects.map((_, index) => (
                            <motion.div
                                key={index}
                                className="w-2 h-2 rounded-full bg-white/20"
                                animate={{
                                    scale: smoothProgress.get() * projects.length >= index &&
                                           smoothProgress.get() * projects.length < index + 1 ? 1.5 : 1,
                                    backgroundColor: smoothProgress.get() * projects.length >= index &&
                                                    smoothProgress.get() * projects.length < index + 1
                                                    ? "rgba(34, 211, 238, 1)"
                                                    : "rgba(255, 255, 255, 0.2)"
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
