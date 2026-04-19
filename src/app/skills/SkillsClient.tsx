"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  category?: string | null;
  description?: string | null;
  link?: string | null;
  imageUrl?: string | null;
};

export default function SkillsClient({ skills }: { skills: Skill[] }) {
  const items = skills;

  const titleVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.96, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariant}
        className="mb-20 text-center flex flex-col items-center justify-center py-20 px-8 glass-panel rounded-[3rem] relative overflow-hidden"
      >
        {/* Decorative background blur inside the header */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--color-lime-accent)]/10 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto z-10">
          <h1 className="text-5xl md:text-[6.5rem] font-black uppercase text-gray-900 dark:text-white tracking-tighter mb-8 leading-[0.85]">
            Toolkit <span className="text-[color:var(--color-lime-accent)]">&</span> <br /> Arsenal.
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
            I actively use a diverse set of cutting-edge technologies and tools in my daily work. From modern frameworks and languages to powerful platforms, my toolkit ensures high-quality and efficient development.
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariant}
      >
        {items.map((tool, index) => {
          const displayDesc = tool.description || `${tool.name} is a powerful tool integrated into my daily workflow to build performant and robust solutions.`;

          return (
            <motion.div
              key={tool.id}
              variants={cardVariant}
              className="group flex flex-col bg-white dark:bg-[#1C1C1A] rounded-[2.5rem] p-8 lg:p-10 border border-gray-200/60 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_24px_50px_rgba(203,255,0,0.15)] dark:hover:shadow-[0_24px_50px_rgba(203,255,0,0.05)] hover:-translate-y-2 transition-all duration-500 ease-out min-h-[360px]"
            >
              {/* Icon Placeholder or Custom SVG */}
              <div className="mb-6 h-12 w-12 flex items-center shrink-0">
                {tool.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tool.imageUrl} alt={tool.name} className="w-auto h-full object-contain max-w-full drop-shadow-sm group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-12 h-12 rounded-[1rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-[color:var(--color-lime-accent)] group-hover:text-black group-hover:border-[color:var(--color-lime-accent)] transition-all duration-300">
                    <span className="font-black text-xl tracking-tighter uppercase">{tool.name.slice(0, 1)}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-[color:var(--color-lime-accent)] transition-colors duration-300">
                {tool.name}
              </h2>

              {/* Description */}
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-8 flex-1">
                {displayDesc}
              </p>

              {/* Bottom Arrow Link */}
              <div className="mt-auto pt-2 shrink-0">
                {tool.link ? (
                  <a href={tool.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 items-center justify-center text-gray-600 dark:text-gray-400 group-hover:bg-[color:var(--color-lime-accent)] group-hover:text-white group-hover:shadow-[0_0_15px_var(--color-lime-accent)] transition-all duration-300 shadow-sm" aria-label={`View ${tool.name}`}>
                    <ArrowUpRight strokeWidth={2.5} className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </a>
                ) : (
                  <div className="inline-flex w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 items-center justify-center text-gray-600 dark:text-gray-400 group-hover:bg-[color:var(--color-lime-accent)] group-hover:text-white group-hover:shadow-[0_0_15px_var(--color-lime-accent)] transition-all duration-300 shadow-sm opacity-50 cursor-not-allowed hidden md:inline-flex" title="No link provided">
                    <ArrowUpRight strokeWidth={2.5} className="w-5 h-5" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
