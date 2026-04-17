"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, Briefcase, Terminal, Code2, Link as LinkIcon, Mail } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSectionData {
  label: string;
  links: FooterLink[];
}

interface FooterSectionProps {
  instagramLink?: string | null;
  githubLink?: string | null;
  linkedinLink?: string | null;
}

export function FooterSection({ instagramLink, githubLink, linkedinLink }: FooterSectionProps) {
  const footerLinks: FooterSectionData[] = [
    {
      label: "Navigation",
      links: [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Skills", href: "/skills" },
        { title: "Projects", href: "/projects" },
      ],
    },
    {
      label: "Contact",
      links: [
        { title: "Hire Me", href: "/#contact", icon: Briefcase },
        { title: "Email", href: "mailto:hello@example.com", icon: Mail },
      ],
    },
    {
      label: "Social Links",
      links: [
        { title: "Instagram", href: instagramLink || "#", icon: Camera },
        { title: "GitHub", href: githubLink || "#", icon: Terminal },
        { title: "LinkedIn", href: linkedinLink || "#", icon: Briefcase },
      ],
    },
  ];

  return (
    <footer className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-[3rem] border-t border-white/5 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/3%),transparent)] px-6 py-12 lg:py-16 mt-20">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-[color:var(--color-lime-accent)]/30" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8 relative z-10">
        <AnimatedContainer className="space-y-4">
          <Code2 className="size-8 text-[color:var(--color-lime-accent)] mb-6" />
          <p className="text-gray-400 mt-8 text-sm md:mt-0 max-w-sm">
            Full-Stack Developer crafting clean, high-performance digital experiences. Designing and building the future of the web.
          </p>
          <p className="text-gray-500 mt-2 text-xs">
            © {new Date().getFullYear()} Faisal Ramdhani. All rights reserved.
            {/* Hidden admin shortcut */}
            <Link
              href="/admin/login"
              className="select-none inline-block ml-2 px-3 py-1 text-transparent hover:text-[color:var(--color-lime-accent)]/20 transition-all cursor-default"
              aria-label="Admin"
              tabIndex={-1}
            >
              CMS
            </Link>
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">{section.label}</h3>
                <ul className="text-gray-400 mt-6 space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="hover:text-[color:var(--color-lime-accent)] font-medium inline-flex items-center transition-all duration-300"
                        {...(["Instagram", "GitHub", "LinkedIn"].includes(link.title) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.icon && <link.icon className="me-2 size-4 opacity-80" />}
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className as string}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
