"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Code2, ImageOff } from "lucide-react";

interface Project {
  id: string; title: string; description: string;
  imageUrl?: string | null; demoLink?: string | null; githubLink?: string | null; order: number;
}

function ApplePlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-full bg-[#1C1C1A] flex items-center justify-center rounded-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-[color:var(--color-lime-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl z-0" />
      <span className="text-[color:var(--color-lime-accent)] text-4xl font-black uppercase tracking-tighter opacity-20 relative z-10">{title}</span>
    </div>
  );
}

function ProjectCard({ project, isInView }: { project: Project; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col glass-panel rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-[#1C1C1A]/80 hover:shadow-[0_24px_50px_rgba(203,255,0,0.15)] transition-colors border border-gray-200/60 dark:border-white/5 h-full z-10"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full pointer-events-none">
        
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] bg-gray-100 dark:bg-[#111111] overflow-hidden rounded-t-[2.5rem] pointer-events-auto">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          ) : (
            <ApplePlaceholder title={project.title} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        </div>

        {/* Content Panel */}
        <div className="p-10 flex flex-col flex-1 pointer-events-auto bg-[#1C1C1A]/90 backdrop-blur-xl border-t border-white/5">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[color:var(--color-lime-accent)] transition-colors">{project.title}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-10 flex-1">
            {project.description}
          </p>
          <div className="flex gap-3 mt-auto">
            {project.demoLink && (
              <a onClick={(e) => e.stopPropagation()} href={project.demoLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-lime-accent)] text-black px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-[#b0d900] hover:scale-105 transition-all">
                <ExternalLink className="w-4 h-4" /> Live
              </a>
            )}
            {project.githubLink && (
              <a onClick={(e) => e.stopPropagation()} href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-full text-sm font-bold shadow-sm hover:border-[color:var(--color-lime-accent)]/50 hover:bg-white/10 hover:scale-[1.02] transition-all">
                <Code2 className="w-4 h-4 text-gray-400" /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isEmpty = projects.length === 0;
  const items = isEmpty
    ? [{ id: "p1", title: "Project Alpha", description: "A highly interactive dashboard seamlessly integrating data.", imageUrl: null, demoLink: null, githubLink: null, order: 0 },
       { id: "p2", title: "Project Beta", description: "Real-time analytics tool built for rapid insights.", imageUrl: null, demoLink: null, githubLink: null, order: 1 }]
    : projects;

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
           className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Selected Work.
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">A careful curation of my recent software developments.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((project, i) => (
            <div key={project.id} style={{ perspective: "1000px" }}>
              <ProjectCard project={project} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
