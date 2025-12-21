"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import DiagonalPosterCard from "./DiagonalPosterCard";
import { SiReact, SiNextdotjs } from "react-icons/si";

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
    // NEW: Andar Bahar
    {
        id: 17,
        title: 'Andar Bahar',
        subtitle: 'Virtual Money Card Game',
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

export default function ProjectShowcase() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Smooth progress for cleaner movement
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 25,
        restDelta: 0.001
    });

    // Main horizontal transform
    // We want to scroll from 0 to -(TotalWidth - ViewportWidth)
    // We'll give it plenty of runway (e.g., 400vh or 500vh container)
    // and map [0,1] to [0%, -X%]
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);

    return (
        // Height controls how fast the scroll feels. More height = slower, easier to control.
        <section ref={targetRef} className="relative h-[600vh] bg-transparent">

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Horizontal Container */}
                <motion.div
                    style={{ x }}
                    className="flex gap-16 px-[5vw] w-max items-center"
                >
                    {/* Intro text Card (Optional, or just start projects) */}
                    <div className="w-[80vw] md:w-[600px] shrink-0 flex flex-col justify-center">
                        <h2 className="text-5xl md:text-8xl font-syne font-bold leading-tight">
                            Selected <br /> <span className="animate-pearl">Works</span>
                        </h2>
                        <div className="w-20 h-1 bg-white/20 mt-8 mb-4" />
                        <p className="text-xl md:text-2xl text-white/60 font-light max-w-md">
                            A curated selection of enterprise systems, AI tools, and digital experiences.
                        </p>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project) => (
                        <div key={project.id} className="items-center flex">
                            <DiagonalPosterCard project={project} />
                        </div>
                    ))}

                    {/* Outro / Call to Action at the end of the scroll */}
                    <div className="w-[80vw] md:w-[500px] shrink-0 flex flex-col justify-center items-start pl-20">
                        <h3 className="text-4xl font-syne font-bold mb-6">See More on GitHub</h3>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xl hover:text-white transition-colors">
                            <div className="p-4 bg-white/10 rounded-full">
                                <SiNextdotjs className="text-2xl" />
                            </div>
                            <span>View All Repos</span>
                        </a>
                    </div>
                </motion.div>

                {/* Progress Bar (Bottom) */}
                <motion.div className="absolute bottom-10 left-10 right-10 h-[1px] bg-white/10 overflow-hidden">
                    <motion.div
                        style={{ scaleX: smoothProgress }}
                        className="h-full pearl-bg origin-left"
                    />
                </motion.div>

            </div>
        </section>
    );
}
