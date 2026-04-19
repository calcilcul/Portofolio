"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Award } from "lucide-react";

interface Certificate {
  id: string; name: string; issuer: string; date: string;
  imageUrl?: string | null; link?: string | null; order: number;
}

function CertPlaceholder() {
  return (
    <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center bg-[#1C1C1A]">
       <Award className="w-10 h-10 text-[color:var(--color-lime-accent)]" strokeWidth={2} />
    </div>
  );
}

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const items = certificates;

  return (
    <section id="certificates" ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
           className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Licences & Certifications.
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">Validations of my continuous learning journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group glass-panel p-5 rounded-[2.5rem] flex flex-col hover:shadow-[0_16px_40px_rgba(203,255,0,0.15)] hover:border-[color:var(--color-lime-accent)]/40 transition-all duration-300 relative bg-white/70 dark:bg-[#1C1C1A]/80 dark:border-white/10"
            >
              <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-[#1C1C1A] shadow-inner">
                {cert.imageUrl ? (
                  <Image src={cert.imageUrl} alt={cert.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <CertPlaceholder />
                )}
              </div>

              <div className="pt-6 px-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-[color:var(--color-lime-accent)] transition-colors line-clamp-1 pr-2">{cert.name}</h3>
                   {cert.link && (
                     <a onClick={(e) => e.stopPropagation()} href={cert.link} target="_blank" rel="noopener noreferrer" className="shrink-0 p-2 bg-white dark:bg-white/10 border border-gray-100 dark:border-transparent rounded-full text-gray-500 dark:text-gray-400 shadow-sm hover:text-black dark:hover:text-black hover:bg-[color:var(--color-lime-accent)] transition-all hover:border-transparent">
                       <ExternalLink className="w-4 h-4" />
                     </a>
                   )}
                </div>
                {cert.issuer && <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{cert.issuer}</p>}
                {cert.date && <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-3 uppercase tracking-widest">{cert.date}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
