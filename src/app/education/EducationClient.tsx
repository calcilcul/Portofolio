"use client";

import { motion } from "framer-motion";

interface EducationClientProps {
  educations: any[];
}

export default function EducationClient({ educations }: EducationClientProps) {
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
      {educations.map((edu, i) => (
        <motion.div 
          key={edu.id}
          variants={{
            hidden: { opacity: 0, scale: 0.98, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
          }}
          className="bg-[#1C1C1A] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm hover:shadow-xl hover:border-[color:var(--color-lime-accent)] hover:shadow-[0_0_20px_rgba(203,255,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-[color:var(--color-lime-accent)]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-start gap-5 z-10 w-full md:w-auto">
            <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
              <div className="w-7 h-7 rounded-md bg-[color:var(--color-lime-accent)] flex items-center justify-center text-black text-xs font-bold">{edu.institution?.charAt(0) || "U"}</div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white group-hover:text-[color:var(--color-lime-accent)] transition-colors">{edu.degree}</h4>
              <p className="text-[color:var(--color-lime-accent)] text-base font-semibold mb-2">{edu.institution}</p>
              <p className="text-sm text-gray-400 font-medium">{edu.duration}</p>
              
              {edu.description && (
                <div className="mt-6 text-gray-300 text-sm leading-relaxed whitespace-pre-line max-w-2xl">
                  {edu.description}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
