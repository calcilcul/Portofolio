"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, ChevronRight } from "lucide-react";

interface AboutProps { aboutText: string; cvLink?: string | null; aboutPhoto?: string | null; }

export default function About({ aboutText, cvLink, aboutPhoto }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-8 lg:px-12 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
           className="glass-panel rounded-[3rem] p-12 md:p-20"
        >
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center md:items-start text-center md:text-left shadow-none border-none">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
                About <span className="relative inline-block text-[color:var(--color-lime-accent)] drop-shadow-[0_0_12px_rgba(203,255,0,0.5)]">Me.</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {aboutText || "I'm deeply passionate about bridging the gap between design and engineering. My focus is on writing clean, elegant code that powers beautiful, highly-performant user interfaces."}
              </p>

              {cvLink && (
                <div className="pt-6">
                  <a
                    href={cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-fit items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full px-8 py-4 text-lg font-semibold border-2 border-transparent hover:border-[color:var(--color-lime-accent)] hover:shadow-[0_0_20px_var(--color-lime-accent)] transition-all duration-300 dark:hover:bg-[#1C1C1A] dark:hover:text-white group"
                  >
                    Download CV <Download className="w-5 h-5 text-[color:var(--color-lime-accent)] group-hover:drop-shadow-[0_0_10px_rgba(203,255,0,0.8)]" />
                  </a>
                </div>
              )}
            </div>

            {/* Profile Avatar / Decoration */}
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-full p-3 bg-[color:var(--color-lime-accent)] shadow-[0_12px_48px_rgba(203,255,0,0.15)] shrink-0 group relative cursor-pointer">
               <div className="w-full h-full rounded-full bg-[color:var(--color-lime-accent)] border-2 border-transparent flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-[0.98]">
                 {aboutPhoto ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={aboutPhoto} alt="About Me" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                 ) : (
                   <span className="font-bold text-[#1C1C1A] text-6xl group-hover:scale-105 transition-transform duration-300">FR</span>
                 )}
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
