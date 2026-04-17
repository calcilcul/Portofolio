"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Quote, Image as ImageIcon, Download } from "lucide-react";

import Link from "next/link";

interface AboutClientProps {
  profile: any;
  experiences: any[];
  educations: any[];
  testimonials: any[];
}

export default function AboutClient({ profile, experiences, educations = [], testimonials = [] }: AboutClientProps) {

  return (
    <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex-1 space-y-24 mb-10">
      
      {/* 1. Intro Section & Photo Placeholder */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Photo Container */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 h-[500px] w-full rounded-[3rem] bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/20 flex flex-col items-center justify-center text-gray-400 overflow-hidden hover:border-[color:var(--color-lime-accent)] transition-colors duration-300 relative group"
        >
          {profile?.aboutPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.aboutPhoto} alt={profile.name || "About Me"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-black/20 shadow-sm flex items-center justify-center">
                <ImageIcon size={28} />
              </div>
              <p className="font-medium tracking-wide text-sm">Photo Placement Container</p>
              <span className="text-xs bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full">Can be set in Admin Dashboard</span>
            </div>
          )}
        </motion.div>

        {/* Text Story Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-7 space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 leading-tight">
            I'm <span className="text-[color:var(--color-lime-accent)]">{profile?.name || "Faisal Ramdhani"}</span>.
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8">
            {profile?.professionalTitle || "Full-Stack Developer"}
          </h2>
          <div className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium space-y-4">
            <p>
              {profile?.aboutText || "I build things for the web. My background as a developer has allowed me to work on incredibly fast and robust projects, delivering highly optimized solutions. I am deeply passionate about modern web technologies and creating performant user interfaces."}
            </p>
            <p>
              When I'm not writing code or building full-stack applications, I enjoy exploring new design trends, contributing to open source, and pushing the limits of what can be done on the modern web platform.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. Experience and Education Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Experience Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pl-2 pr-4 mb-8">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Experience</h3>
            <span className="px-4 py-1 text-[11px] uppercase tracking-widest font-bold rounded-full border border-gray-200 dark:border-white/10 text-gray-400 bg-white dark:bg-white/5">Career</span>
          </div>
          
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {experiences.map((exp: any, i: number) => (
              <motion.div 
                key={exp.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
                }}
                className="bg-white dark:bg-[#1C1C1A] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 flex items-center justify-between group hover:border-[color:var(--color-lime-accent)] shadow-sm hover:shadow-xl hover:shadow-[0_0_20px_rgba(203,255,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-blue-400/20 dark:bg-[color:var(--color-lime-accent)]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start gap-4 z-10 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <div className="w-6 h-6 rounded-md bg-blue-500 dark:bg-[color:var(--color-lime-accent)] flex items-center justify-center text-white dark:text-black text-[10px] font-bold">{exp.company?.charAt(0) || "C"}</div>
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white truncate">{exp.jobTitle}</h4>
                    <p className="text-blue-500 dark:text-[color:var(--color-lime-accent)] text-sm font-semibold mb-2">{exp.company}</p>
                    <p className="text-[13px] text-gray-500 font-medium">{exp.duration}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-6 z-10 shrink-0">
                  {exp.duration?.toLowerCase().includes("present") ? (
                    <span className="px-4 py-1 text-[11px] font-bold tracking-wider text-green-500 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full uppercase">Current</span>
                  ) : (
                    <span className="px-4 py-1 text-[11px] font-bold tracking-wider text-gray-500 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full uppercase">Past</span>
                  )}
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white flex items-center gap-1 group-hover:text-[color:var(--color-lime-accent)] transition-colors">
                    View details
                  </span>
                </div>
              </motion.div>
            ))}
              <Link href="/experience" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-[color:var(--color-lime-accent)] dark:hover:text-black transition-colors shadow-sm group">
                See all experience <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
          </motion.div>
        </div>

        {/* Education Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pl-2 pr-4 mb-8">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Education</h3>
            <span className="px-4 py-1 text-[11px] uppercase tracking-widest font-bold rounded-full border border-gray-200 dark:border-white/10 text-gray-400 bg-white dark:bg-white/5">Studies</span>
          </div>
          
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {educations.map((edu, i) => (
              <motion.div 
                key={edu.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
                }}
                className="bg-white dark:bg-[#1C1C1A] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 flex items-start justify-between group hover:border-[color:var(--color-lime-accent)] shadow-sm hover:shadow-xl hover:shadow-[0_0_20px_rgba(203,255,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[132px]"
              >
                 <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-lime-400/20 dark:bg-[color:var(--color-lime-accent)]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                <div className="z-10 w-full">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white truncate">{edu.degree}</h4>
                  <p className="text-lime-500 dark:text-[color:var(--color-lime-accent)] text-sm font-semibold mb-2">{edu.institution}</p>
                  <p className="text-[13px] text-gray-500 font-medium">{edu.duration}</p>
                </div>
              </motion.div>
            ))}
            <div className="pt-2">
              <Link href="/education" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-[color:var(--color-lime-accent)] dark:hover:text-black transition-colors shadow-sm group">
                See all studies <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

      </section>

      {/* 3. Testimonials Section */}
      <section className="bg-white dark:bg-[#111111] rounded-[3rem] p-8 md:p-12 lg:p-16 border border-gray-100 dark:border-white/5 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background for testimonials */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 dark:bg-white/5 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="mb-12">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4">Testimonials</h3>
          <p className="text-gray-500 font-medium">A few kind words from people I have worked with.</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {testimonials.map((test, i) => (
            <motion.div 
              key={test.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
              }}
              className="bg-gray-50/50 dark:bg-[#1C1C1A] rounded-[2rem] p-8 flex flex-col border border-gray-100 dark:border-white/5 hover:border-[color:var(--color-lime-accent)] transition-colors shadow-sm min-h-[250px] group hover:shadow-[0_0_15px_rgba(203,255,0,0.1)]"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-black/20 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-6 shadow-sm">
                <Quote size={18} fill="currentColor" className="opacity-40" />
              </div>
              <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-300 font-medium mb-10 flex-1 italic break-words break-all">
                "{test.text}"
              </p>
              <div className="mt-auto min-w-0">
                <p className="font-bold text-gray-900 dark:text-white text-sm mb-1 truncate">- {test.author}</p>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold truncate">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Call to Action */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 pt-8 pb-4">
         <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-bold uppercase tracking-widest shadow-xl hover:shadow-[0_0_20px_var(--color-lime-accent)] border border-transparent hover:border-[color:var(--color-lime-accent)] hover:scale-[1.02] transition-all duration-500">
           Say Hello
         </a>
         {profile?.cvLink && (
           <a href={profile.cvLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-white dark:bg-[#1C1C1A] text-gray-900 dark:text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-sm border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#252522] dark:hover:border-[color:var(--color-lime-accent)] hover:shadow-[0_0_20px_rgba(203,255,0,0.15)] hover:border-[color:var(--color-lime-accent)] transition-all duration-300 gap-2">
             <Download size={18} /> Resume
           </a>
         )}
      </section>

    </div>
  );
}
