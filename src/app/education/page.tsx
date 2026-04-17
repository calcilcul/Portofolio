import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EducationClient from "./EducationClient";

export const metadata = {
  title: "Education | Faisal Ramdhani",
  description: "A complete list of my academic studies and degrees.",
};

export const revalidate = 60;

export default async function EducationPage() {
  const educations = await prisma.education.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-20 bg-[#1b1e16] flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-[color:var(--color-lime-accent)]/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[color:var(--color-lime-accent)]/10 rounded-full blur-[100px] -z-10" />
        
        <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex justify-end mb-4">
             <Link href="/about" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white hover:bg-[color:var(--color-lime-accent)] hover:text-black transition-colors shadow-sm">
                <ArrowLeft size={16} /> Back
             </Link>
          </div>
          <div className="mb-16 text-center">
             <h1 className="text-5xl md:text-6xl font-black uppercase text-white tracking-tighter mb-4">
               Academic <span className="text-[color:var(--color-lime-accent)]">Studies</span>
             </h1>
             <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
               A detailed timeline of my educational background and institutions.
             </p>
          </div>

          <EducationClient educations={educations} />
        </div>
      </main>
      <Footer />
    </>
  );
}
