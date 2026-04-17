import { prisma } from "@/lib/prisma";
import ContactClient from "./ContactClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Contact | Faisal Ramdhani",
  description: "Get in touch for building modern web applications.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const [profile, skills] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-20 bg-[#1b1e16] flex flex-col relative overflow-hidden">
        {/* Subtle background glows */}
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-[color:var(--color-lime-accent)]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <ContactClient email="ical.ramdhani@gmail.com" phone="+62 822-4435-7717" location="Malang, Indonesia" />
      </main>
      <Footer 
        instagramLink={profile?.instagramLink}
        githubLink={profile?.githubLink}
        linkedinLink={profile?.linkedinLink}
        skills={skills}
      />
    </>
  );
}
