import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LogOut, Home, KeySquare, Blocks, User, Award, Monitor, Mail, GraduationCap, MessageSquareQuote } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name ?? "Admin";

  return (
    <div className="min-h-screen flex text-white bg-[#1b1e16] font-sans selection:bg-[color:var(--color-lime-accent)] selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col bg-[#1C1C1A]">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-bold text-xl tracking-tighter uppercase text-white">CMS</h2>
          <KeySquare className="text-black fill-[color:var(--color-lime-accent)] bg-[color:var(--color-lime-accent)] p-1 rounded-sm w-7 h-7" />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto font-medium text-sm text-gray-300">
          <Link href="/admin/dashboard" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--color-lime-accent)]">
            <Home className="w-5 h-5 mr-3 opacity-70" />
            Dashboard Overview
          </Link>
          <p className="px-4 pt-4 pb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Content</p>
          <Link href="/admin/dashboard/inbox" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <Mail className="w-5 h-5 mr-3 opacity-70" />
            Inbox
          </Link>
          <Link href="/admin/dashboard/profile" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <User className="w-5 h-5 mr-3 opacity-70" />
            Profile Setup
          </Link>
          <Link href="/admin/dashboard/skills" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <Blocks className="w-5 h-5 mr-3 opacity-70" />
            Skills
          </Link>
          <Link href="/admin/dashboard/projects" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <Monitor className="w-5 h-5 mr-3 opacity-70" />
            Projects
          </Link>
          <Link href="/admin/dashboard/certificates" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <Award className="w-5 h-5 mr-3 opacity-70" />
            Certificates
          </Link>
          <Link href="/admin/dashboard/experience" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <Blocks className="w-5 h-5 mr-3 opacity-70" />
            Experience
          </Link>
          <Link href="/admin/dashboard/education" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <GraduationCap className="w-5 h-5 mr-3 opacity-70" />
            Education
          </Link>
          <Link href="/admin/dashboard/testimonials" className="flex items-center px-4 py-3 rounded-lg hover:bg-[color:var(--color-lime-accent)]/20 hover:text-[color:var(--color-lime-accent)] transition-colors">
            <MessageSquareQuote className="w-5 h-5 mr-3 opacity-70" />
            Testimonials
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <Link href="/api/auth/signout" className="flex items-center justify-center w-full px-4 py-2 font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Link>
          <div className="mt-4 text-center text-xs text-gray-500 font-medium">
            Logged in as {userName}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-[#1b1e16] overflow-auto relative">
        <header className="h-16 border-b border-white/5 bg-[#1C1C1A]/80 backdrop-blur-xl sticky top-0 z-10 flex items-center px-8 justify-between">
          <p className="font-semibold text-sm tracking-wide text-white">Faisal Ramdhani Portfolio Admin</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[color:var(--color-lime-accent)] animate-pulse shadow-[0_0_8px_var(--color-lime-accent)]"></div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-lime-accent)]">System Online</span>
          </div>
        </header>
        <div className="p-8 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
}
