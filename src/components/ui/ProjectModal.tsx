"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface Project {
  id: string; title: string; description: string;
  imageUrl?: string | null; demoLink?: string | null; githubLink?: string | null; sourceLink?: string | null; category?: string | null;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C1C1A] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 z-10 scrollbar-hide"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
            
            {project.imageUrl && (
              <div className="relative w-full aspect-video bg-gray-100 dark:bg-black">
                <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
              </div>
            )}
            
            <div className="p-8 md:p-10">
              {project.category && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-lime-accent)] mb-2 block">
                  {project.category}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {project.title}
              </h2>
              
              <div className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-medium text-sm md:text-base mb-10">
                {project.description}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.demoLink && (
                  <a href={project.demoLink || undefined} target="_blank" rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-lime-accent)] text-black px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-[#b0d900] hover:scale-105 transition-all">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {(project.sourceLink || project.githubLink) && (
                  <a href={project.sourceLink || project.githubLink || undefined} target="_blank" rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full text-sm font-bold shadow-sm hover:border-gray-300 dark:hover:border-[color:var(--color-lime-accent)]/50 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-[1.02] transition-all">
                    <Code2 className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
