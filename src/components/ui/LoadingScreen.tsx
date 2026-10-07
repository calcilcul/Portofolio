"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

let globalHasLoaded = false;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (globalHasLoaded) {
      setIsLoading(false);
      return;
    }

    // Total duration of the fake loading in ms
    const duration = 2000;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          globalHasLoaded = true; // Mark as loaded only when it completes
          // Small delay before fading out once it hits 100%
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden"
        >
          <div className="relative flex flex-col items-center justify-center w-full max-w-md px-8">
            {/* Percentage Text */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tighter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.round(progress)}
              <span className="text-3xl md:text-5xl text-white/50">%</span>
            </motion.h1>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="tracking-[0.4em] text-xs font-light text-white/40 uppercase mt-8"
            >
              Loading Experience
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
