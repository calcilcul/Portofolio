import { prisma } from "@/lib/prisma";
import AboutClient from "./AboutClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About | Faisal Ramdhani",
  description: "Learn more about my journey, experience, and background as a full-stack developer.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, experiences, educations, testimonials, skills] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-20 bg-[#fafafa] dark:bg-[#1b1e16] flex flex-col transition-colors duration-300">
        <AboutClient profile={profile} experiences={experiences} educations={educations} testimonials={testimonials} />
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
