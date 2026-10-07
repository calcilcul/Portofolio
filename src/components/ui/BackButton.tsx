"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white hover:bg-[color:var(--color-lime-accent)] hover:text-black hover:border-[color:var(--color-lime-accent)] transition-all duration-300 shadow-sm group"
    >
      <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
      Back to Home
    </Link>
  );
}
