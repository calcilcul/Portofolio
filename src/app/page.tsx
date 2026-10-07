import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Certificates from "@/components/home/Certificates";
import Contact from "@/components/home/Contact";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Revalidate every 60 seconds so edits from the Admin panel go live quickly
export const revalidate = 60;

async function getData() {
  try {
    const profile = await prisma.profile.findFirst();
    const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    const certificates = await prisma.certificate.findMany({ orderBy: { order: "asc" } });

    return { profile, skills, experiences, projects, certificates };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { 
      profile: null, 
      skills: [], 
      experiences: [], 
      projects: [], 
      certificates: [] 
    };
  }
}

import Interactive3DBoxes from "@/components/home/Interactive3DBoxes";
import RetroIntroGate from "@/components/ui/RetroIntroGate";

export default async function HomePage() {
  const { profile, skills, experiences, projects, certificates } = await getData();

  // Fallback values in case the DB profile hasn't been created yet
  const name = profile?.name ?? "Faisal Ramdhani";
  const title = profile?.professionalTitle ?? "Full-Stack Developer";
  const about = profile?.aboutText ?? "I build things for the web.";

  return (
    <>
      <LoadingScreen />
      <RetroIntroGate />
      <Navbar />

      <main>
        <Hero name={name} professionalTitle={title} />
        <Interactive3DBoxes />
        <SectionWrapper><About aboutText={about} cvLink={profile?.cvLink} aboutPhoto={profile?.aboutPhoto} /></SectionWrapper>
        <SectionWrapper><Skills skills={skills} /></SectionWrapper>
        <SectionWrapper><Experience experiences={experiences} /></SectionWrapper>
        <SectionWrapper><Projects projects={projects} /></SectionWrapper>
        <SectionWrapper><Certificates certificates={certificates} /></SectionWrapper>
        <SectionWrapper>
          <Contact
            instagramLink={profile?.instagramLink}
            githubLink={profile?.githubLink}
            linkedinLink={profile?.linkedinLink}
            cvLink={profile?.cvLink}
          />
        </SectionWrapper>
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
