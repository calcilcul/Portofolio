import { prisma } from "@/lib/prisma";
import EducationManager from "./EducationManager";

export const revalidate = 0;

export default async function EducationPage() {
  const educations = await prisma.education.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter text-[#121212]">Education</h1>
        <p className="text-stone-500 font-medium mt-2">Manage your academic journey.</p>
      </div>
      <EducationManager educations={educations} />
    </div>
  );
}
