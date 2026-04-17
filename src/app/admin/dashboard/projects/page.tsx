import { prisma } from "@/lib/prisma";
import ProjectsManager from "./ProjectsManager";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-[#121212]/10 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter">Projects</h1>
        <p className="text-stone-500 text-sm font-medium mt-1">Upload images to Cloudinary or provide direct URLs. If no image is set, an aesthetic placeholder will show on the portfolio.</p>
      </div>
      <ProjectsManager projects={projects} />
    </div>
  );
}
