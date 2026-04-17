"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsClient({ projects }: { projects: any[] }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Frontend", "Backend", "Fullstack"];

  const filteredProjects = projects.filter(p => {
    if (filter === "All") return true;
    if (p.category === filter) return true;
    return false;
  });

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24 flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-5xl font-black uppercase text-gray-900 dark:text-[color:var(--color-lime-accent)] tracking-tighter mb-6">
          Featured Work
        </h1>
        <p className="max-w-2xl text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium mb-12">
          A curated selection of my recent projects, showcasing scalable architectures and elegant interfaces.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                filter === c 
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black shadow-md shadow-gray-900/20 dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                  : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index % 2 === 0 ? 0 : 0.2 }}
            className="group relative bg-white/70 dark:bg-[#1C1C1A]/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-[color:var(--color-lime-accent)] hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(203,255,0,0.15)] transition-all duration-500"
          >
            {/* Image */}
            <div className="aspect-[16/10] w-full relative overflow-hidden bg-gray-50 dark:bg-[#111111] border-b border-gray-50 dark:border-white/5">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100 dark:bg-[#1C1C1A] flex items-center justify-center">
                  <span className="text-gray-400 dark:text-[color:var(--color-lime-accent)] opacity-20 text-3xl font-bold tracking-tight px-6 text-center">{project.title}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col h-[calc(100%-62.5%)]">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors group-hover:text-[color:var(--color-lime-accent)]">
                     {project.title}
                   </h2>
                   {project.category && (
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{project.category}</span>
                   )}
                </div>
                
                {(project.sourceLink || project.githubLink) && (
                  <a
                    href={project.sourceLink || project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all transform hover:-translate-y-1 hover:translate-x-1"
                    title="Source Code"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                )}
              </div>
              
              <div className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed font-medium text-sm flex-1">
                {project.description}
              </div>

              <div className="mt-auto">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-gray-900 dark:bg-[color:var(--color-lime-accent)] text-white dark:text-black px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-[#b0d900] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32"
        >
          <span className="text-gray-400 font-bold text-lg uppercase tracking-widest">
            No projects found in this category.
          </span>
        </motion.div>
      )}
    </div>
  );
}
