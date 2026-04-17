"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe, Code2, Database, FileCode, BarChart3, Layout,
  Server, Cpu, GitBranch, Terminal, Layers, PenTool, Monitor,
  Table2, Network, FileJson,
} from "lucide-react";

interface Skill { id: string; name: string; category?: string | null; }

function getIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("html")) return <Globe className="w-6 h-6" />;
  if (n.includes("css")) return <Layout className="w-6 h-6" />;
  if (n.includes("javascript") || n.includes("js")) return <FileCode className="w-6 h-6" />;
  if (n.includes("typescript")) return <FileJson className="w-6 h-6" />;
  if (n.includes("react")) return <Cpu className="w-6 h-6" />;
  if (n.includes("next")) return <Layers className="w-6 h-6" />;
  if (n.includes("php")) return <Server className="w-6 h-6" />;
  if (n.includes("mysql") || n.includes("sql")) return <Database className="w-6 h-6" />;
  if (n.includes("erd")) return <Network className="w-6 h-6" />;
  if (n.includes("system") || n.includes("analysis")) return <BarChart3 className="w-6 h-6" />;
  if (n.includes("git")) return <GitBranch className="w-6 h-6" />;
  if (n.includes("node")) return <Terminal className="w-6 h-6" />;
  if (n.includes("design") || n.includes("figma")) return <PenTool className="w-6 h-6" />;
  if (n.includes("tailwind")) return <Monitor className="w-6 h-6" />;
  if (n.includes("prisma")) return <Table2 className="w-6 h-6" />;
  return <Code2 className="w-6 h-6" />;
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const defaultSkills: Skill[] = [
    { id: "1", name: "Next.js", category: "Frontend" },
    { id: "2", name: "TypeScript", category: "Language" },
    { id: "3", name: "React", category: "Frontend" },
    { id: "4", name: "Tailwind CSS", category: "Frontend" },
    { id: "5", name: "Prisma", category: "Backend" },
    { id: "6", name: "MySQL", category: "Backend" },
    { id: "7", name: "Node.js", category: "Backend" },
    { id: "8", name: "Git", category: "Other" },
  ];

  const items = skills.length > 0 ? skills : defaultSkills;

  const getProficiency = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes("next") || l.includes("react") || l.includes("tailwind") || l.includes("html") || l.includes("css")) return "w-[90%]";
    if (l.includes("typescript") || l.includes("javascript") || l.includes("js")) return "w-[85%]";
    if (l.includes("node") || l.includes("php") || l.includes("mysql") || l.includes("prisma")) return "w-[80%]";
    return "w-[75%]";
  };

  const groups = items.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category ?? "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
           className="mb-20 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-gray-900 dark:text-white mb-6 flex flex-wrap items-center justify-center gap-3 leading-tight">
            Technical
            <span className="bg-[#1A1A1A] dark:bg-white text-[color:var(--color-lime-accent)] dark:text-[#1A1A1A] px-5 py-1.5 md:py-2 rounded-2xl md:rounded-3xl shadow-sm">
              Skills
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium">My toolbelt for crafting high-quality web solutions</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {items.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass-panel p-6 md:p-8 rounded-[2rem] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-gray-200/60 dark:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgba(203,255,0,0.05)] hover:border-gray-300 dark:hover:border-white/20 cursor-default transition-all duration-300 bg-white/60 dark:bg-[#1C1C1A]/60 group min-h-[160px] md:min-h-[180px]"
            >
              <div className="mb-4 text-gray-400 dark:text-gray-500 group-hover:text-[color:var(--color-lime-accent)] group-hover:scale-110 transition-all duration-300">
                {getIcon(skill.name)}
              </div>
              <span className="text-base md:text-lg font-bold tracking-wide text-center text-gray-900 dark:text-white mb-1.5 group-hover:text-[color:var(--color-lime-accent)] transition-colors">
                {skill.name}
              </span>
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 text-center">
                {skill.category || 'Tool'}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
           className="mt-20 text-center"
        >
          <a href="/skills" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-lg font-semibold shadow-xl border border-transparent hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-lime-accent)] hover:border-[color:var(--color-lime-accent)] transition-all duration-300 hover:bg-gray-800 dark:hover:bg-[#1C1C1A] dark:hover:text-white group">
            View All Tools & Details 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
