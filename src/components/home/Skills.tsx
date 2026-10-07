"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";

// ─── Skill Logo Chips ─────────────────────────────────────────────────────────
const SKILLS = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff" },
  { name: "scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
];

// S-curve path that forms a loop in the middle like the reference
const PATH =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

const VIEWBOX = "0 0 996 330";

// ─── Single logo chip ─────────────────────────────────────────────────────────
function LogoChip({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      title={name}
      className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[color:var(--color-lime-accent)] hover:scale-125 hover:shadow-[0_0_20px_rgba(203,255,0,0.4)] transition-all duration-300 cursor-default"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={name}
        width={32}
        height={32}
        loading="lazy"
        draggable={false}
        className="w-8 h-8 object-contain"
      />
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="bg-[#1C1C1A] border border-[color:var(--color-lime-accent)] text-[color:var(--color-lime-accent)] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
          {name}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
interface Skill { id: string; name: string; category?: string | null; }

export default function Skills({ skills: _dbSkills }: { skills: Skill[] }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-gray-900 dark:text-white mb-6 flex flex-wrap items-center justify-center gap-3 leading-tight">
            Technical
            <span className="bg-[#1A1A1A] dark:bg-white text-[color:var(--color-lime-accent)] dark:text-[#1A1A1A] px-5 py-1.5 md:py-2 rounded-2xl md:rounded-3xl shadow-sm">
              Skills
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium">
            My toolbelt for crafting high-quality web solutions
          </p>
        </div>

        {/* Marquee along SVG path — wrapped with fade mask */}
        {isInView && (
          <div
            className="w-full relative py-8"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
          <MarqueeAlongSvgPath
            path={PATH}
            viewBox={VIEWBOX}
            baseVelocity={6}
            slowdownOnHover={true}
            slowDownFactor={0.08}
            draggable={true}
            repeat={2}
            dragSensitivity={0.15}
            grabCursor={true}
            showPath={false}
            responsive={true}
            className="w-full overflow-visible"
            style={{ height: "460px" } as React.CSSProperties}
          >
            {SKILLS.map((skill) => (
              <LogoChip key={skill.name} name={skill.name} logo={skill.logo} />
            ))}
          </MarqueeAlongSvgPath>
          </div>
        )}

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-8 text-center">
          <a
            href="/skills"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-lg font-semibold shadow-xl border border-transparent hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-lime-accent)] hover:border-[color:var(--color-lime-accent)] transition-all duration-300 group"
          >
            View All Tools & Details
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
