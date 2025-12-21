"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// Import Icons
import {
    SiReact, SiNextdotjs, SiVuedotjs, SiSvelte, SiAngular, SiTypescript, SiJavascript, SiThreedotjs, SiWebgl,
    SiTailwindcss, SiFramer, SiGreensock, SiRedux, SiVite, SiWebpack, SiBabel, SiD3Dotjs, SiLeaflet, SiMapbox,
    SiMui, SiChakraui, SiRadixui, SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiNestjs, SiSpring, SiLaravel,
    SiGo, SiRust, SiDocker, SiKubernetes, SiNginx, SiApache, SiGraphql, SiApollographql, SiSocketdotio,
    SiJsonwebtokens, SiAuth0, SiFirebase, SiBun, SiDeno, SiPython, SiCplusplus, SiSharp, SiPhp, SiPostgresql,
    SiMysql, SiMongodb, SiRedis, SiApachecassandra, SiNeo4J, SiElasticsearch, SiTensorflow, SiPytorch, SiKeras,
    SiScikitlearn, SiOpencv, SiOpenai, SiLangchain, SiHuggingface, SiGooglecloud, SiAmazon,
    SiVercel, SiCelery, SiApachespark, SiPandas, SiNumpy, SiRubyonrails, SiPrettier, SiEslint, SiStorybook,
    SiCypress, SiJest, SiGit, SiGithub, SiRabbitmq, SiApachekafka, SiPrometheus, SiGrafana, SiDatadog,
    SiSolid, SiAstro, SiHtmx, SiAlpinedotjs, SiRecoil,
    SiTerraform, SiAnsible, SiLinux, SiJenkins, SiGitlab, SiConsul, SiVault,
    SiSnowflake, SiDatabricks, SiApacheairflow, SiMlflow, SiJulia, SiR, SiKibana, SiGnubash
} from "react-icons/si";
import { FaJava, FaDatabase, FaCloud, FaCode, FaServer, FaRobot, FaBrain, FaLayerGroup, FaCube, FaNetworkWired } from "react-icons/fa";

// --- Tech Data (Flattened but ordered for lanes) ---
const techLanes = {
    top: [ // Frontend / UI / Design
        { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
        { name: "Vue", icon: <SiVuedotjs className="text-[#4FC08D]" /> },
        { name: "SolidJS", icon: <SiSolid className="text-[#2C4F7C]" /> },
        { name: "Svelte", icon: <SiSvelte className="text-[#FF3E00]" /> },
        { name: "Astro", icon: <SiAstro className="text-[#BC52EE]" /> },
        { name: "Qwik", icon: <FaCode className="text-[#18B6F6]" /> }, // Fallback icon
        { name: "Angular", icon: <SiAngular className="text-[#DD0031]" /> },
        { name: "HTMX", icon: <SiHtmx className="text-[#3D72D7]" /> },
        { name: "Alpine", icon: <SiAlpinedotjs className="text-[#8BC0D0]" /> },
        { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
        { name: "Babylon", icon: <FaCube className="text-[#BB3300]" /> }, // Fallback
        { name: "PixiJS", icon: <FaLayerGroup className="text-[#E72264]" /> }, // Fallback
        { name: "WebGL", icon: <SiWebgl className="text-[#990000]" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: "Framer", icon: <SiFramer className="text-white" /> },
        { name: "GSAP", icon: <SiGreensock className="text-[#88CE02]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
        { name: "Recoil", icon: <SiRecoil className="text-[#3578E5]" /> },
        { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
        { name: "Bun", icon: <SiBun className="text-white" /> },
        { name: "D3.js", icon: <SiD3Dotjs className="text-[#F9A03C]" /> },
        { name: "Mapbox", icon: <SiMapbox className="text-white" /> },
        { name: "MUI", icon: <SiMui className="text-[#007FFF]" /> },
        { name: "Shadcn", icon: <SiRadixui className="text-white" /> },
        { name: "Storybook", icon: <SiStorybook className="text-[#FF4785]" /> },
        { name: "Cypress", icon: <SiCypress className="text-white" /> },
        { name: "Prettier", icon: <SiPrettier className="text-[#F7B93E]" /> },
    ],
    middle: [ // Core / DevOps / Backend
        { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: "Deno", icon: <SiDeno className="text-white" /> },
        { name: "Go", icon: <SiGo className="text-[#00ADD8]" /> },
        { name: "Rust", icon: <SiRust className="text-white" /> },
        { name: "Express", icon: <SiExpress className="text-white" /> },
        { name: "NestJS", icon: <SiNestjs className="text-[#E0234E]" /> },
        { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
        { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
        { name: "Apollo", icon: <SiApollographql className="text-[#311C87]" /> },
        { name: "Socket.io", icon: <SiSocketdotio className="text-white" /> },
        { name: "RabbitMQ", icon: <SiRabbitmq className="text-[#FF6600]" /> },
        { name: "Kafka", icon: <SiApachekafka className="text-white" /> },
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
        { name: "K8s", icon: <SiKubernetes className="text-[#326CE5]" /> },
        { name: "Terraform", icon: <SiTerraform className="text-[#7B42BC]" /> },
        { name: "Ansible", icon: <SiAnsible className="text-[#EE0000]" /> },
        { name: "Jenkins", icon: <SiJenkins className="text-[#D24939]" /> },
        { name: "GitLab", icon: <SiGitlab className="text-[#FC6D26]" /> },
        { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
        { name: "Bash", icon: <SiGnubash className="text-white" /> },
        { name: "Nginx", icon: <SiNginx className="text-[#009639]" /> },
        { name: "Traefik", icon: <FaNetworkWired className="text-[#24A1C1]" /> }, // Fallback
        { name: "Vault", icon: <SiVault className="text-[#000000] bg-white rounded-full p-1" /> }, // Vault is black, needs bg
        { name: "Consul", icon: <SiConsul className="text-[#E44B7E]" /> },
        { name: "AWS", icon: <SiAmazon className="text-[#FF9900]" /> },
        { name: "GCP", icon: <SiGooglecloud className="text-[#4285F4]" /> },
        { name: "Azure", icon: <FaCloud className="text-[#0078D4]" /> },
        { name: "Vercel", icon: <SiVercel className="text-white" /> },
        { name: "Auth0", icon: <SiAuth0 className="text-[#EB5424]" /> },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
        { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
    ],
    bottom: [ // Data / AI / Deep Language
        { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
        { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
        { name: "PyTorch", icon: <SiPytorch className="text-[#EE4C2C]" /> },
        { name: "Keras", icon: <SiKeras className="text-[#D00000]" /> },
        { name: "OpenAI", icon: <SiOpenai className="text-white" /> },
        { name: "LangChain", icon: <SiLangchain className="text-white" /> },
        { name: "HuggingFace", icon: <SiHuggingface className="text-[#FFD21E]" /> },
        { name: "Postgres", icon: <SiPostgresql className="text-[#4169E1]" /> },
        { name: "Mongo", icon: <SiMongodb className="text-[#47A248]" /> },
        { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
        { name: "Cassandra", icon: <SiApachecassandra className="text-[#1287B1]" /> },
        { name: "Elastic", icon: <SiElasticsearch className="text-[#005571]" /> },
        { name: "Neo4j", icon: <SiNeo4J className="text-white" /> },
        { name: "Snowflake", icon: <SiSnowflake className="text-[#29B5E8]" /> },
        { name: "Databricks", icon: <SiDatabricks className="text-[#FF3621]" /> },
        { name: "Airflow", icon: <SiApacheairflow className="text-[#017CEE]" /> },
        { name: "Kubeflow", icon: <FaLayerGroup className="text-[#007CDE]" /> }, // Fallback
        { name: "MLflow", icon: <SiMlflow className="text-[#0194E2]" /> },
        { name: "Pandas", icon: <SiPandas className="text-[#150458]" /> },
        { name: "NumPy", icon: <SiNumpy className="text-[#013243]" /> },
        { name: "Julia", icon: <SiJulia className="text-[#9558B2]" /> },
        { name: "R", icon: <SiR className="text-[#276DC3]" /> },
        { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
        { name: "Java", icon: <FaJava className="text-[#007396]" /> },
        { name: "OpenCV", icon: <SiOpencv className="text-white" /> },
        { name: "Celery", icon: <SiCelery className="text-[#37814A]" /> },
        { name: "Spark", icon: <SiApachespark className="text-[#E25A1C]" /> },
        { name: "Prometheus", icon: <SiPrometheus className="text-[#E6522C]" /> },
        { name: "Grafana", icon: <SiGrafana className="text-[#F46800]" /> },
        { name: "Kibana", icon: <SiKibana className="text-[#005571]" /> },
        { name: "Datadog", icon: <SiDatadog className="text-[#632CA6]" /> },
    ]
};

const TechCard = ({ tech }: { tech: any }) => (
    <div className="relative group min-w-[120px] md:min-w-[160px] h-[120px] md:h-[160px] flex flex-col items-center justify-center p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white/30 z-10">
        <div className="text-4xl md:text-5xl mb-3 filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
            {tech.icon}
        </div>
        <span className="text-xs md:text-sm font-syne font-bold text-white/80 group-hover:text-white">
            {tech.name}
        </span>
    </div>
);

// Animated Connection Line
const ConnectionLine = ({ width }: { width: number }) => (
    <div className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform -translate-y-1/2 z-0 opacity-50"
        style={{ width: `${width}px` }}
    >
        <div className="absolute inset-0 bg-cyan-400 blur-[2px] animate-pulse" />
    </div>
);


export default function TechStream() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal Scroll Transformations
    // Phase 1: Tech Stack Scrolls (0% -> 75% of section) - Finishes earlier
    const xTop = useTransform(scrollYProgress, [0, 0.75], ["0%", "-100%"]);
    const xMiddle = useTransform(scrollYProgress, [0, 0.75], ["-10%", "-120%"]);
    const xBottom = useTransform(scrollYProgress, [0, 0.75], ["-20%", "-100%"]);

    // Opacity fade out for tech stack (70% -> 80%) - Gone before Contact arrives
    const techOpacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);

    // Phase 2: Contact Panel Slides in (85% -> 100% of section) - Delayed entrance
    const xContact = useTransform(scrollYProgress, [0.85, 1], ["100vw", "0vw"]);
    const contactOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

    return (
        <section ref={targetRef} className="relative h-[500vh] w-full bg-black/5"> {/* Added slight tint to separate */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Main Tech Flow */}
                <motion.div
                    style={{ opacity: techOpacity }}
                    className="flex flex-col gap-12 md:gap-20 py-10 relative z-10 filter hue-rotate-15"
                >

                    {/* Visual Connector Branches (Background) */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Connecting Top to Middle */}
                        <svg className="w-full h-full opacity-30">
                            <path d="M 0,200 Q 400,300 800,400 T 1600,300" stroke="url(#gradient-cyan)" strokeWidth="2" fill="none" />
                            <defs>
                                <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* TOP LANE (Frontend) */}
                    <div className="relative w-full">
                        <div className="absolute top-1/2 left-0 w-[800vw] md:w-[300vw] h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0" />
                        <motion.div style={{ x: xTop }} className="flex gap-16 pl-10 md:pl-20 items-center w-[800vw] md:w-[300vw]">
                            {techLanes.top.map((tech, i) => (
                                <div key={`top-${i}`} className="relative group">
                                    <ConnectionLine width={100} />
                                    <TechCard tech={tech} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* MIDDLE LANE (Core) */}
                    <div className="relative w-full">
                        <div className="absolute top-1/2 left-0 w-[800vw] md:w-[300vw] h-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0" />
                        <motion.div style={{ x: xMiddle }} className="flex gap-24 pl-[60vw] items-center w-[800vw] md:w-[300vw]">
                            {techLanes.middle.map((tech, i) => (
                                <div key={`mid-${i}`} className="relative group">
                                    <ConnectionLine width={150} />
                                    <TechCard tech={tech} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* BOTTOM LANE (Data) */}
                    <div className="relative w-full">
                        <div className="absolute top-1/2 left-0 w-[800vw] md:w-[300vw] h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0" />
                        <motion.div style={{ x: xBottom }} className="flex gap-16 pl-40 items-center w-[800vw] md:w-[300vw]">
                            {techLanes.bottom.map((tech, i) => (
                                <div key={`bot-${i}`} className="relative group">
                                    <ConnectionLine width={120} />
                                    <TechCard tech={tech} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </motion.div>

                {/* FINAL DESTINATION: CONTACT */}
                <motion.div
                    style={{ x: xContact, opacity: contactOpacity }}
                    className="absolute right-0 top-0 bottom-0 w-screen h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm z-30"
                >
                    <div className="max-w-4xl w-full p-8 md:p-16 text-center">
                        <h2 className="text-5xl md:text-8xl font-syne font-bold mb-8 text-white relative">
                            <span className="absolute -inset-1 blur-2xl bg-cyan-500/30 rounded-full opacity-50"></span>
                            Ready to Innovate?
                        </h2>
                        <p className="text-xl md:text-2xl text-white/70 mb-12 font-light max-w-2xl mx-auto">
                            You&apos;ve seen the stack. Now let&apos;s build the future with it.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,211,238,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-12 py-5 rounded-full text-xl font-bold font-syne hover:bg-cyan-50 transition-all duration-300 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Start Project</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                        </motion.button>

                        <div className="mt-20 flex justify-center gap-8 text-white/30 text-sm font-mono uppercase tracking-widest">
                            <span>Reverbex Technologies</span>
                            <span>•</span>
                            <span>2025</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
