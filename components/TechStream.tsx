"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo, memo, useState } from "react";
import React from "react";
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

// --- Tech Data (Full 120+ Items) ---
const techLanes = {
    top: [ // Frontend / UI / Design
        { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
        { name: "Vue", icon: <SiVuedotjs className="text-[#4FC08D]" /> },
        { name: "SolidJS", icon: <SiSolid className="text-[#2C4F7C]" /> },
        { name: "Svelte", icon: <SiSvelte className="text-[#FF3E00]" /> },
        { name: "Astro", icon: <SiAstro className="text-[#BC52EE]" /> },
        { name: "Qwik", icon: <FaCode className="text-[#18B6F6]" /> },
        { name: "Angular", icon: <SiAngular className="text-[#DD0031]" /> },
        { name: "HTMX", icon: <SiHtmx className="text-[#3D72D7]" /> },
        { name: "Alpine", icon: <SiAlpinedotjs className="text-[#8BC0D0]" /> },
        { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
        { name: "Babylon.js", icon: <FaCube className="text-[#BB3300]" /> },
        { name: "PixiJS", icon: <FaLayerGroup className="text-[#E72264]" /> },
        { name: "WebGL", icon: <SiWebgl className="text-[#990000]" /> },
        { name: "WebGPU", icon: <FaCode className="text-[#4F5B93]" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: "Framer", icon: <SiFramer className="text-white" /> },
        { name: "GSAP", icon: <SiGreensock className="text-[#88CE02]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
        { name: "Zustand", icon: <FaCode className="text-white" /> },
        { name: "Recoil", icon: <SiRecoil className="text-[#3578E5]" /> },
        { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
        { name: "Bun", icon: <SiBun className="text-white" /> },
        { name: "Webpack", icon: <SiWebpack className="text-[#8DD6F9]" /> },
        { name: "Turbopack", icon: <SiVercel className="text-[#EF4444]" /> },
        { name: "D3.js", icon: <SiD3Dotjs className="text-[#F9A03C]" /> },
        { name: "Chart.js", icon: <FaCode className="text-[#FF6384]" /> },
        { name: "Leaflet", icon: <SiLeaflet className="text-[#199900]" /> },
        { name: "Mapbox", icon: <SiMapbox className="text-white" /> },
        { name: "Cesium", icon: <FaCode className="text-[#6CBAE7]" /> },
        { name: "MUI", icon: <SiMui className="text-[#007FFF]" /> },
        { name: "Chakra", icon: <SiChakraui className="text-[#319795]" /> },
        { name: "Shadcn", icon: <SiRadixui className="text-white" /> },
        { name: "Storybook", icon: <SiStorybook className="text-[#FF4785]" /> },
        { name: "Cypress", icon: <SiCypress className="text-white" /> },
        { name: "Playwright", icon: <FaCode className="text-[#2EAD33]" /> },
        { name: "Jest", icon: <SiJest className="text-[#C21325]" /> },
        { name: "Prettier", icon: <SiPrettier className="text-[#F7B93E]" /> },
        { name: "ESLint", icon: <SiEslint className="text-[#4B32C3]" /> },
        { name: "Babel", icon: <SiBabel className="text-[#F9DC3E]" /> },
        { name: "SWC", icon: <SiVercel className="text-white" /> }
    ],
    middle: [ // Core / DevOps / Backend
        { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: "Deno", icon: <SiDeno className="text-white" /> },
        { name: "Go", icon: <SiGo className="text-[#00ADD8]" /> },
        { name: "Rust", icon: <SiRust className="text-white" /> },
        { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
        { name: "Java", icon: <FaJava className="text-[#007396]" /> },
        { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
        { name: "C#", icon: <SiSharp className="text-[#239120]" /> },
        { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
        { name: "Express", icon: <SiExpress className="text-white" /> },
        { name: "NestJS", icon: <SiNestjs className="text-[#E0234E]" /> },
        { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
        { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
        { name: "Flask", icon: <FaCode className="text-white" /> },
        { name: "Spring", icon: <SiSpring className="text-[#6DB33F]" /> },
        { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
        { name: "Rails", icon: <SiRubyonrails className="text-[#CC0000]" /> },
        { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
        { name: "Apollo", icon: <SiApollographql className="text-[#311C87]" /> },
        { name: "gRPC", icon: <FaCode className="text-[#244C5A]" /> },
        { name: "Socket.io", icon: <SiSocketdotio className="text-white" /> },
        { name: "WebSockets", icon: <FaNetworkWired className="text-white" /> },
        { name: "RabbitMQ", icon: <SiRabbitmq className="text-[#FF6600]" /> },
        { name: "Kafka", icon: <SiApachekafka className="text-white" /> },
        { name: "NATS", icon: <FaCode className="text-[#34A574]" /> },
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
        { name: "K8s", icon: <SiKubernetes className="text-[#326CE5]" /> },
        { name: "Terraform", icon: <SiTerraform className="text-[#7B42BC]" /> },
        { name: "Ansible", icon: <SiAnsible className="text-[#EE0000]" /> },
        { name: "Jenkins", icon: <SiJenkins className="text-[#D24939]" /> },
        { name: "GitLab CI", icon: <SiGitlab className="text-[#FC6D26]" /> },
        { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
        { name: "Bash", icon: <SiGnubash className="text-white" /> },
        { name: "Nginx", icon: <SiNginx className="text-[#009639]" /> },
        { name: "Apache", icon: <SiApache className="text-[#D22128]" /> },
        { name: "Traefik", icon: <FaNetworkWired className="text-[#24A1C1]" /> },
        { name: "Vault", icon: <SiVault className="text-[#000000] bg-white rounded-full p-1" /> },
        { name: "Consul", icon: <SiConsul className="text-[#E44B7E]" /> },
        { name: "AWS", icon: <SiAmazon className="text-[#FF9900]" /> },
        { name: "GCP", icon: <SiGooglecloud className="text-[#4285F4]" /> },
        { name: "Azure", icon: <FaCloud className="text-[#0078D4]" /> },
        { name: "Vercel", icon: <SiVercel className="text-white" /> },
        { name: "Cloudflare", icon: <FaCloud className="text-[#F38020]" /> },
        { name: "Auth0", icon: <SiAuth0 className="text-[#EB5424]" /> },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
        { name: "Supabase", icon: <FaDatabase className="text-[#3ECF8E]" /> },
        { name: "JWT", icon: <SiJsonwebtokens className="text-white" /> },
        { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
        { name: "GitHub", icon: <SiGithub className="text-white" /> },
    ],
    bottom: [ // Data / AI / Deep Language
        { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
        { name: "PyTorch", icon: <SiPytorch className="text-[#EE4C2C]" /> },
        { name: "Keras", icon: <SiKeras className="text-[#D00000]" /> },
        { name: "Scikit", icon: <SiScikitlearn className="text-[#F7931E]" /> },
        { name: "XGBoost", icon: <FaCode className="text-[#FEB600]" /> },
        { name: "OpenAI", icon: <SiOpenai className="text-white" /> },
        { name: "LangChain", icon: <SiLangchain className="text-white" /> },
        { name: "LlamaIndex", icon: <FaBrain className="text-white" /> },
        { name: "HuggingFace", icon: <SiHuggingface className="text-[#FFD21E]" /> },
        { name: "OpenCV", icon: <SiOpencv className="text-white" /> },
        { name: "YOLO", icon: <FaCode className="text-[#00FFFF]" /> },
        { name: "Postgres", icon: <SiPostgresql className="text-[#4169E1]" /> },
        { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
        { name: "Mongo", icon: <SiMongodb className="text-[#47A248]" /> },
        { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
        { name: "Cassandra", icon: <SiApachecassandra className="text-[#1287B1]" /> },
        { name: "ScyllaDB", icon: <FaDatabase className="text-[#4CA6A6]" /> },
        { name: "Elastic", icon: <SiElasticsearch className="text-[#005571]" /> },
        { name: "Neo4j", icon: <SiNeo4J className="text-white" /> },
        { name: "Snowflake", icon: <SiSnowflake className="text-[#29B5E8]" /> },
        { name: "Databricks", icon: <SiDatabricks className="text-[#FF3621]" /> },
        { name: "Airflow", icon: <SiApacheairflow className="text-[#017CEE]" /> },
        { name: "Kubeflow", icon: <FaLayerGroup className="text-[#007CDE]" /> },
        { name: "MLflow", icon: <SiMlflow className="text-[#0194E2]" /> },
        { name: "Pandas", icon: <SiPandas className="text-[#150458]" /> },
        { name: "NumPy", icon: <SiNumpy className="text-[#013243]" /> },
        { name: "SciPy", icon: <FaCode className="text-[#0053A0]" /> },
        { name: "Julia", icon: <SiJulia className="text-[#9558B2]" /> },
        { name: "R", icon: <SiR className="text-[#276DC3]" /> },
        { name: "Celery", icon: <SiCelery className="text-[#37814A]" /> },
        { name: "Spark", icon: <SiApachespark className="text-[#E25A1C]" /> },
        { name: "Hadoop", icon: <FaServer className="text-[#FFF000]" /> },
        { name: "Prometheus", icon: <SiPrometheus className="text-[#E6522C]" /> },
        { name: "Grafana", icon: <SiGrafana className="text-[#F46800]" /> },
        { name: "Kibana", icon: <SiKibana className="text-[#005571]" /> },
        { name: "Datadog", icon: <SiDatadog className="text-[#632CA6]" /> },
        { name: "Splunk", icon: <FaCode className="text-[#F00000]" /> },
        { name: "Tableau", icon: <FaCode className="text-[#E97627]" /> }
    ]
};

// Enhanced TechCard with tooltip
const TechCard = memo(({ tech }: { tech: any }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <motion.div
        className="relative group min-w-[100px] md:min-w-[140px] h-[100px] md:h-[140px] flex flex-col items-center justify-center p-3 rounded-2xl border border-white/5 bg-black/40 transition-all duration-200"
        style={{ willChange: "transform" }}
        whileHover={{
          scale: 1.15,
          y: -5,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(34, 211, 238, 0.5)",
          boxShadow: "0 10px 30px rgba(34, 211, 238, 0.3)"
        }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
      >
        <div className="text-3xl md:text-4xl mb-2 transition-transform duration-200 group-hover:scale-110">
          {tech.icon}
        </div>
        <span className="text-[10px] md:text-xs font-syne font-semibold text-white/50 group-hover:text-white transition-colors text-center">
          {tech.name}
        </span>
      </motion.div>
      
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30 whitespace-nowrap z-50 pointer-events-none"
        >
          <span className="text-sm font-semibold text-white block">{tech.name}</span>
          <span className="text-xs text-cyan-400 mt-1 block">Click to learn more</span>
        </motion.div>
      )}
    </div>
  );
});

TechCard.displayName = 'TechCard';

export default function TechStream() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    // Aggressive spring for ultra-smooth performance
    const smoothScrollY = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001
    });

    // Synchronized scroll range - all three rows move at the same speed and same distance
    // Slower scroll for better visibility
    const xTop = useTransform(smoothScrollY, [0, 1], ["0%", "-180%"]);
    const xMiddle = useTransform(smoothScrollY, [0, 1], ["0%", "-180%"]);
    const xBottom = useTransform(smoothScrollY, [0, 1], ["0%", "-180%"]);

    // Fade out tech section at the very end to eliminate empty space
    const techOpacity = useTransform(smoothScrollY, [0.9, 1], [1, 0]);

    const memoizedLanes = useMemo(() => techLanes, []);

    return (
        <section ref={targetRef} className="relative h-[300vh] w-full bg-black/5">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Main Tech Flow with Category Headers */}
                <motion.div
                    style={{ opacity: techOpacity, willChange: "opacity" }}
                    className="flex flex-col gap-8 md:gap-14 py-8 relative z-10"
                >

                    {/* TOP LANE - Frontend & UI */}
                    <div className="relative w-full">
                        <motion.div
                            className="absolute left-4 md:left-10 -top-8 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                                Frontend & UI
                            </span>
                        </motion.div>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                        <motion.div
                            style={{ x: xTop }}
                            className="flex gap-6 md:gap-10 pl-20 items-center w-[500vw]"
                        >
                            {memoizedLanes.top.map((tech, i) => (
                                <TechCard key={`top-${i}`} tech={tech} />
                            ))}
                        </motion.div>
                    </div>

                    {/* MIDDLE LANE - Backend & Core */}
                    <div className="relative w-full">
                        <motion.div
                            className="absolute left-4 md:left-10 -top-8 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-semibold">
                                Backend & Core
                            </span>
                        </motion.div>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                        <motion.div
                            style={{ x: xMiddle }}
                            className="flex gap-6 md:gap-10 pl-20 items-center w-[500vw]"
                        >
                            {memoizedLanes.middle.map((tech, i) => (
                                <TechCard key={`mid-${i}`} tech={tech} />
                            ))}
                        </motion.div>
                    </div>

                    {/* BOTTOM LANE - Data & AI */}
                    <div className="relative w-full">
                        <motion.div
                            className="absolute left-4 md:left-10 -top-8 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-xs uppercase tracking-widest text-pink-400 font-mono font-semibold">
                                Data & AI
                            </span>
                        </motion.div>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
                        <motion.div
                            style={{ x: xBottom }}
                            className="flex gap-6 md:gap-10 pl-20 items-center w-[500vw]"
                        >
                            {memoizedLanes.bottom.map((tech, i) => (
                                <TechCard key={`bot-${i}`} tech={tech} />
                            ))}
                        </motion.div>
                    </div>

                </motion.div>

            </div>
        </section>
    );
}
