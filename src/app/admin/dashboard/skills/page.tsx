import { prisma } from "@/lib/prisma";
import SkillsManager from "./SkillsManager";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-[#121212]/10 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter">Skills</h1>
        <p className="text-stone-500 text-sm font-medium mt-1">Icons are auto-generated based on skill names. Add, edit, or remove skills below.</p>
      </div>
      <SkillsManager skills={skills} />
    </div>
  );
}
