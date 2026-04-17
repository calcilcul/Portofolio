import { prisma } from "@/lib/prisma";
import ExperienceManager from "./ExperienceManager";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-[#121212]/10 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter">Work Experience</h1>
        <p className="text-stone-500 text-sm font-medium mt-1">Shown as a timeline on the public portfolio.</p>
      </div>
      <ExperienceManager experiences={experiences} />
    </div>
  );
}
