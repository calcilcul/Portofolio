"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Mail, ExternalLink, MessageCircle } from "lucide-react";

interface ContactProps {
  instagramLink?: string | null;
  githubLink?: string | null;
  linkedinLink?: string | null;
  cvLink?: string | null;
}

export default function Contact({ instagramLink, githubLink, linkedinLink, cvLink }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    { label: "Instagram", href: instagramLink },
    { label: "GitHub", href: githubLink },
    { label: "LinkedIn", href: linkedinLink },
  ].filter((s) => s.href);

  return (
    <section id="contact" ref={ref} className="py-40 relative">
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="glass-panel p-12 md:p-24 rounded-[3.5rem] text-center shadow-[0_24px_50px_rgba(0,0,0,0.04)] bg-white/50 dark:bg-[#1C1C1A]/80 border-[3px] border-transparent dark:border-white/10 animate-gradient-border hover:shadow-[0_24px_50px_rgba(203,255,0,0.15)] transition-shadow duration-500"
        >
          <div className="w-20 h-20 bg-white dark:bg-[#1C1C1A] shadow-sm border border-gray-100 dark:border-white/10 rounded-[1.5rem] mx-auto flex items-center justify-center mb-10 shrink-0 group-hover:scale-110 transition-transform">
             <MessageCircle className="w-10 h-10 text-[color:var(--color-lime-accent)]" />
          </div>

          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1]">
            Let's build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-400 dark:from-white dark:to-gray-500">extraordinary.</span>
          </h2>
          
          <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed">
            I'm currently available for freelance work and open to new opportunities. Let's discuss your next project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <a href="mailto:contact@example.com" className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-lg font-semibold shadow-xl hover:shadow-[0_0_20px_var(--color-lime-accent)] hover:scale-[1.02] hover:bg-gray-800 dark:hover:bg-gray-100 dark:hover:text-black transition-all duration-300 gap-3 border border-transparent hover:border-[color:var(--color-lime-accent)]">
              <Mail className="w-5 h-5" /> Say Hello
            </a>
            {cvLink && (
              <a href={cvLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-white dark:bg-[#1C1C1A] text-gray-900 dark:text-white rounded-full text-lg font-semibold border border-gray-200 dark:border-white/10 shadow-sm hover:border-[color:var(--color-lime-accent)] hover:shadow-[0_0_20px_rgba(203,255,0,0.15)] hover:bg-gray-50 dark:hover:bg-[#252522] hover:scale-[1.02] transition-all duration-300 gap-3">
                <Download className="w-5 h-5" /> Resume
              </a>
            )}
          </div>

          {socials.length > 0 && (
            <div className="border-t border-gray-200/60 pt-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">Find me on</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 group/link"
                  >
                    {s.label}
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:text-[color:var(--color-lime-accent)] group-hover/link:opacity-100 transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
