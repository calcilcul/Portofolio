"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6"
    >
      <div 
        className={`flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 w-full max-w-4xl bg-[#1C1F15]/90 backdrop-blur-xl border border-white/10 shadow-2xl`}
      >
        {/* Name Logo */}
        <Link href="/" className="group flex-shrink-0">
          <div className="text-white font-semibold text-xl tracking-tight transition-colors duration-300">
            Faisal<span className="text-[color:var(--color-lime-accent)]">.</span>
          </div>
        </Link>

        {/* Nav links — center */}
        <nav className="hidden md:flex items-center gap-10">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative text-base font-medium text-white/70 hover:text-white transition-colors py-1 group/nav"
            >
              {item}
              {/* Animated underline */}
              <span className="absolute left-0 bottom-0 top-[1.2rem] h-[2px] w-0 bg-[color:var(--color-lime-accent)] transition-all duration-300 group-hover/nav:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center gap-2 bg-[color:var(--color-lime-accent)] text-[#1C1F15] px-6 py-2 text-sm font-bold rounded-full shadow-lg hover:shadow-[color:var(--color-lime-accent)]/20 hover:scale-[1.02] transition-all duration-300"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
