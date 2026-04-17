"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Always start at top of page
    window.scrollTo({ top: 0, behavior: "instant" });

    // Cinematic entrance duration
    const t = setTimeout(() => {
      setVisible(false);
      // Re-enforce scroll to top after loader exits
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
           key="loader"
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="fixed inset-0 z-[9999] bg-[#1b1e16] flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Animated Background glow for the loader */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1.5 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[color:var(--color-lime-accent)] rounded-full blur-[100px] pointer-events-none"
          />

          <motion.div
             initial={{ filter: "blur(20px)", opacity: 0, y: 10 }}
             animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Minimalist Logo / Initials */}
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              FR
              <span className="text-[color:var(--color-lime-accent)] drop-shadow-[0_0_15px_rgba(203,255,0,0.6)]">.</span>
            </h1>

            {/* Cinematic Progress Bar */}
            <div className="w-48 md:w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
                 className="h-full bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full"
               />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[color:var(--color-lime-accent)] font-semibold text-xs tracking-widest uppercase"
            >
              Loading Experience
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
