"use client";

import { motion } from "framer-motion";

interface ExperienceClientProps {
  experiences: any[];
}

export default function ExperienceClient({ experiences }: ExperienceClientProps) {
  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
      }}
    >
      {experiences.map((exp, i) => (
        <motion.div 
          key={exp.id}
          variants={{
            hidden: { opacity: 0, scale: 0.98, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
          }}
          className="bg-[#1C1C1A] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm hover:shadow-xl hover:shadow-[color:var(--color-lime-accent)]/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-[color:var(--color-lime-accent)]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-start gap-5 z-10 w-full md:w-auto">
            <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
              <div className="w-7 h-7 rounded-md bg-[color:var(--color-lime-accent)] flex items-center justify-center text-black text-xs font-bold">{exp.company?.charAt(0) || "C"}</div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">{exp.jobTitle}</h4>
              <p className="text-[color:var(--color-lime-accent)] text-base font-semibold mb-2">{exp.company}</p>
              <p className="text-sm text-gray-400 font-medium">{exp.duration}</p>
              
              <div className="mt-6 text-gray-300 text-sm leading-relaxed whitespace-pre-line max-w-2xl">
                {exp.description}
              </div>
            </div>
          </div>
          
          <div className="md:text-right z-10 shrink-0">
            {exp.duration?.toLowerCase().includes("present") ? (
              <span className="px-4 py-1 text-[11px] font-bold tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 rounded-full uppercase inline-block">Current</span>
            ) : i === 0 ? (
              <span className="px-4 py-1 text-[11px] font-bold tracking-wider text-[color:var(--color-lime-accent)] bg-[color:var(--color-lime-accent)]/10 border border-[color:var(--color-lime-accent)]/20 rounded-full uppercase inline-block">Recent</span>
            ) : null}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
