"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Experience {
  id: string; jobTitle: string; company: string; duration: string; description: string; order: number;
}

export default function Experience({ experiences }: { experiences: Experience[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const itemsToRender = experiences;

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
           className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Professional Experience.
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">My history of creating value through code.</p>
        </motion.div>

        {itemsToRender.length === 0 ? (
          <div className="glass-panel rounded-[2rem] p-16 text-center text-gray-400 font-medium text-lg border border-gray-200">
            No experience entries yet.
          </div>
        ) : (
          <div className="space-y-10">
            {itemsToRender.map((exp: any, i: number) => (
              <motion.div
                key={exp.id || i}
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel p-10 md:p-14 rounded-[2.5rem] group relative overflow-hidden bg-white/60 dark:bg-[#1C1C1A]/80 border border-gray-200/60 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
              >
                {/* Subtle Neon Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-lime-accent)]/0 via-[color:var(--color-lime-accent)]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
                   <div className="flex-1 space-y-4">
                     <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                       {exp.jobTitle || exp.role}
                     </h3>
                     <p className="text-[color:var(--color-lime-accent)] text-base font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(203,255,0,0.3)]">{exp.company}</p>
                     <p className="text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed mt-6 max-w-3xl">{exp.description}</p>
                   </div>
                   <div className="shrink-0 pt-2 md:pt-0">
                     <div className="px-5 py-2.5 rounded-full bg-white dark:bg-white/10 shadow-sm border border-[color:var(--color-lime-accent)]/50 text-[color:var(--color-lime-accent)] text-sm font-semibold">
                       {exp.duration || exp.period}
                     </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
