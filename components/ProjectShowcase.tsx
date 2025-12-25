"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
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
        thumbnail: '/pictures/no_dues_system/Screenshot 2025-12-22 030206.png',
        liveUrl: 'https://nodues.jecrcuniversity.edu.in/'
    },
    {
        id: 20,
        slug: 'nether-ai',
        title: 'Nether AI',
        subtitle: 'AI-Powered Presentation Generator',
        client: 'Tech Startup',
        impact: ['Auto Slide Generation', 'Smart Layouts', 'Content Suggestions'],
        tags: ['Python', 'OpenAI', 'React'],
        gradient: 'from-rose-500 via-pink-600 to-purple-700',
        icon: '🧠',
        thumbnail: '/pictures/nether ai/Frontpage.png',
    },
    {
        id: 21,
        slug: 'neora',
        title: 'Neora',
        subtitle: 'Trading Companion App',
        client: 'FinTech',
        impact: ['Real-time Market Data', 'Portfolio Tracking', 'Trade Analytics'],
        tags: ['Flutter', 'TimescaleDB', 'WebSocket'],
        gradient: 'from-blue-500 via-indigo-600 to-violet-700',
        icon: '📈',
        thumbnail: '/pictures/neora/Screenshot 2025-12-22 034701.png',
    },
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
    },
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
    },
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
    },
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
    },
    {
        id: 22,
        slug: 'modern-web-template',
        title: 'Modern Web Solution',
        subtitle: 'High-Performance Landing Page',
        client: 'Reverbex Internal',
        impact: ['High Conversion', 'SEO Optimized', 'Fast Loading'],
        tags: ['React', 'Tailwind', 'Framer Motion'],
        gradient: 'from-orange-500 via-amber-600 to-yellow-700',
        icon: '📄',
        thumbnail: '/pictures/template modern web solution/lading page.png',
    },
    {
        id: 23,
        slug: 'alive-web-design',
        title: 'Alive Web Design',
        subtitle: 'Next Level Animated Websites',
        client: 'Reverbex Internal',
        impact: ['Immersive Experience', 'High Performance', 'Modern UI'],
        tags: ['Next.js', 'Framer Motion', 'WebGL'],
        gradient: 'from-blue-400 via-indigo-500 to-violet-600',
        icon: '🤖',
        thumbnail: '/pictures/Screenshot_22-12-2025_34156_aistudio.google.com.jpeg',
    },
];

// Layout variation 1: Image Left, Text Right
const LayoutImageLeft = ({ project, index }: any) => (
    <section className="snap-start w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-12 bg-transparent overflow-hidden py-20 md:py-0">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image - Slides from left */}
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="relative rounded-2xl overflow-hidden border border-white/10"
            >
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-overlay pointer-events-none`} />
            </motion.div>

            {/* Text - Slides from right */}
            <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "circOut" }}
            >
                <div className="text-4xl md:text-6xl mb-4">{project.icon}</div>
                <h3 className="text-3xl md:text-5xl font-bold mb-3">{project.title}</h3>
                <p className="text-xl text-white/60 mb-6">{project.subtitle}</p>

                <div className="space-y-3 mb-6">
                    {project.impact.map((item: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.2 + (i * 0.05) }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span className="text-white/80">{item}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, i: number) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/60"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

// Layout variation 2: Image Right, Text Left
const LayoutImageRight = ({ project, index }: any) => (
    <section className="snap-start w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-12 bg-transparent overflow-hidden py-20 md:py-0">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text - Slides from left */}
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="order-2 lg:order-1"
            >
                <div className="text-4xl md:text-6xl mb-4">{project.icon}</div>
                <h3 className="text-3xl md:text-5xl font-bold mb-3">{project.title}</h3>
                <p className="text-xl text-white/60 mb-6">{project.subtitle}</p>

                <div className="space-y-3 mb-6">
                    {project.impact.map((item: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span className="text-white/80">{item}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, i: number) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.3 + (i * 0.05) }}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/60"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Image - Slides from right */}
            <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "circOut" }}
                className="relative rounded-2xl overflow-hidden border border-white/10 order-1 lg:order-2"
            >
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-overlay pointer-events-none`} />
            </motion.div>
        </div>
    </section>
);

// Layout variation 3: Centered with fade
const LayoutCentered = ({ project, index }: any) => (
    <section className="snap-start w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-12 bg-transparent overflow-hidden py-20 md:py-0">
        <div className="max-w-5xl w-full text-center">
            {/* Image - Fades and scales up */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="relative rounded-2xl overflow-hidden border border-white/10 mb-8"
            >
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-overlay pointer-events-none`} />
            </motion.div>

            {/* Text - Slides from bottom */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.2, ease: "circOut" }}
            >
                <div className="text-4xl md:text-6xl mb-4">{project.icon}</div>
                <h3 className="text-3xl md:text-5xl font-bold mb-3">{project.title}</h3>
                <p className="text-xl text-white/60 mb-6">{project.subtitle}</p>

                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {project.impact.map((item: string, i: number) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                            className="text-white/80"
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {project.tags.map((tag: string, i: number) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3, delay: 0.7 + (i * 0.05) }}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/60"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

// Export individual project slides for the ScrollManager to handle
export const ProjectSlides = projects.map((project, index) => {
    const layoutType = index % 3;
    if (layoutType === 0) return <LayoutImageLeft key={project.id} project={project} index={index} />;
    if (layoutType === 1) return <LayoutImageRight key={project.id} project={project} index={index} />;
    return <LayoutCentered key={project.id} project={project} index={index} />;
});

export default function ProjectShowcase() {
    return (
        <>
            {/* Intro Slide */}
            <section className="snap-start w-full min-h-screen md:h-screen flex items-center justify-center px-4 md:px-12 bg-transparent overflow-hidden">
                <motion.div
                    className="max-w-4xl text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                >
                    <h2 className="text-5xl md:text-8xl font-bold leading-tight mb-8">
                        Featured <br />
                        <span className="animate-pearl">Engagements</span>
                    </h2>
                    <div className="w-20 h-1 bg-white/20 mx-auto mb-6" />
                    <p className="text-xl md:text-2xl text-white/60 font-light">
                        Delivering scalable solutions for complex industry challenges
                    </p>
                </motion.div>
            </section>

            {/* Project Slides */}
            {ProjectSlides}
        </>
    );
}
