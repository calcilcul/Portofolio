import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// Server-side stats for the overview
async function getStats() {
  const [skills, projects, certificates, experiences] = await Promise.all([
    prisma.skill.count(),
    prisma.project.count(),
    prisma.certificate.count(),
    prisma.experience.count(),
  ]);
  return { skills, projects, certificates, experiences };
}

export default async function DashboardPage() {
  let stats = { skills: 0, projects: 0, certificates: 0, experiences: 0 };
  try {
    stats = await getStats();
  } catch {
    redirect("/admin/login");
  }

  const cards = [
    { label: "Skills", value: stats.skills, href: "/admin/dashboard/skills" },
    { label: "Projects", value: stats.projects, href: "/admin/dashboard/projects" },
    { label: "Certificates", value: stats.certificates, href: "/admin/dashboard/certificates" },
    { label: "Experiences", value: stats.experiences, href: "/admin/dashboard/experience" },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Dashboard</h1>
        <p className="text-gray-400 font-medium mt-1">Your portfolio content at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className={`bg-[#1C1C1A] text-white border border-white/5 rounded-2xl p-6 hover:scale-105 hover:border-[color:var(--color-lime-accent)] hover:shadow-[0_0_15px_rgba(203,255,0,0.1)] transition-all shadow-sm group`}
          >
            <p className="text-4xl font-black group-hover:text-[color:var(--color-lime-accent)] transition-colors">{card.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{card.label}</p>
          </a>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 p-6 space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Quick Actions</p>
        {[
          { label: "Edit Profile & Hero Text", href: "/admin/dashboard/profile" },
          { label: "Manage Skills", href: "/admin/dashboard/skills" },
          { label: "Add / Edit Projects", href: "/admin/dashboard/projects" },
          { label: "Add / Edit Certificates", href: "/admin/dashboard/certificates" },
          { label: "Edit Work Experience", href: "/admin/dashboard/experience" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-[color:var(--color-lime-accent)] hover:bg-[color:var(--color-lime-accent)]/5 transition-all group"
          >
            <span className="text-sm font-bold text-white transition-colors">{link.label}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-[color:var(--color-lime-accent)] transition-colors">Go →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
