import { prisma } from "@/lib/prisma";
import { Project, Profile, Skill } from "@prisma/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsClient from "./ProjectsClient";

export const revalidate = 60;

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let profile: Profile | null = null;
  let skills: Skill[] = [];

  try {
    [projects, profile, skills] = await Promise.all([
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.profile.findFirst(),
      prisma.skill.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch (error) {
    console.error("Projects page database error:", error);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-32 bg-[#1b1e16]">
         <ProjectsClient projects={projects} />
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
