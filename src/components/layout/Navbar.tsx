"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Plus, ArrowLeft } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { title: "ABOUT ME", href: "/about" },
    { title: "SKILLS", href: "/skills" },
    { title: "PROJECTS", href: "/projects" },
    { title: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        .menu-font {
          font-family: 'Anton', sans-serif;
        }
      `}</style>
      
      {/* Navbar wrapper - z-[200] to sit above the sidebar and all hero vignettes */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-0 right-0 z-[200] flex justify-between items-center px-8 md:px-16 pointer-events-none"
      >
        {/* Logo and Back Button Container */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Name Logo */}
          <Link href="/" className="group flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
            <div className="relative flex items-center justify-center px-4 py-2">
              {/* The 3 overlapping lime circles */}
              <div className="absolute inset-0 flex flex-row items-center justify-center z-0">
                 <div className="w-10 h-10 rounded-full bg-[color:var(--color-lime-accent)]"></div>
                 <div className="w-10 h-10 rounded-full bg-[color:var(--color-lime-accent)] -ml-4"></div>
                 <div className="w-10 h-10 rounded-full bg-[color:var(--color-lime-accent)] -ml-4"></div>
              </div>
              {/* The bold black text on top */}
              <span 
                className="text-black font-black text-2xl tracking-tighter uppercase z-20"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                FAISAL
              </span>
            </div>
          </Link>

          {/* Back Button (only if not on Home) */}
          {!isHome && (
            <Link 
              href="/" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-[color:var(--color-lime-accent)] text-white hover:text-black transition-colors duration-300 shadow-sm backdrop-blur-md border border-white/10"
              title="Back to Home"
            >
               <ArrowLeft size={20} />
            </Link>
          )}
        </div>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-white hover:text-[color:var(--color-lime-accent)] transition-colors pointer-events-auto group drop-shadow-md"
        >
          <span className="text-3xl md:text-4xl font-bold tracking-tight">Menu</span>
          <motion.div
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <Plus size={44} strokeWidth={2.5} />
          </motion.div>
        </button>
      </motion.header>

      {/* Fullscreen Sliding Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Sidebar from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-[100dvh] w-full md:w-[60vw] lg:w-[45vw] xl:w-[40vw] bg-black shadow-2xl z-[60] flex flex-col justify-center px-10 md:px-16"
            >
              {/* Navigation Links */}
              <div className="flex flex-col gap-2 md:gap-4 mt-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, ease: "easeOut", duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="menu-font text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] leading-[0.85] text-white uppercase hover:text-[color:var(--color-lime-accent)] transition-colors flex"
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
