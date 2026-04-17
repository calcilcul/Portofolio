import { prisma } from "@/lib/prisma";
import SkillsClient from "./SkillsClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tools & Skills | Faisal Ramdhani",
  description: "A definitive collection of my technical workflow, programming languages, and tools.",
};

export const revalidate = 60; // Revalidate every minute

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-20 bg-[#1b1e16] flex flex-col">
        <SkillsClient skills={skills} />
      </main>
      <Footer />
    </>
  );
}
