"use client";

import { motion } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";


interface HeroProps {
  name: string;
  professionalTitle: string;
}

export default function Hero({ name, professionalTitle }: HeroProps) {
  return (
    <HeroGeometric>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/60 dark:bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:border-[color:var(--color-lime-accent)] border border-gray-200/50 dark:border-white/10 backdrop-blur-xl mb-12 transition-all cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--color-lime-accent)] shadow-[0_0_12px_rgba(203,255,0,0.8)] animate-pulse" />
          <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">Available for work</span>
        </motion.div>

        <h1 className="text-6xl md:text-[6.5rem] lg:text-[7.5rem] font-semibold tracking-tighter text-gray-900 dark:text-white mb-8 leading-[1.05]">
          Building digital <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-500">experiences.</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto font-medium mb-20 leading-relaxed">
          I'm a <span className="text-gray-900 dark:text-white font-semibold">{professionalTitle}</span> focused on crafting clean, user-centric interfaces and robust architectures.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="/projects" className="inline-flex items-center justify-center overflow-hidden relative px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-lg font-semibold shadow-2xl hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-lime-accent)] transition-all duration-300 border border-transparent hover:border-[color:var(--color-lime-accent)]">
            View Projects
          </a>
          <a href="/about" className="inline-flex items-center justify-center px-10 py-5 bg-white/80 dark:bg-[#1C1C1A]/80 text-gray-900 dark:text-white rounded-full text-lg font-semibold shadow-sm border border-gray-200 dark:border-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-[#252522] hover:border-[color:var(--color-lime-accent)] hover:shadow-[0_0_20px_rgba(203,255,0,0.15)] transition-all duration-300">
            About Me
          </a>
        </div>
      </motion.div>
    </HeroGeometric>
  );
}
