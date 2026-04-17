"use client";

import { useState, useTransition } from "react";
import { createProject, updateProject, deleteProject } from "@/app/actions/projects";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

type Project = { id: string; title: string; description: string; imageUrl?: string | null; demoLink?: string | null; githubLink?: string | null; sourceLink?: string | null; category?: string | null; order: number };

const inputClass = "w-full bg-[#1b1e16] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-medium border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-2 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5";

function ProjectCard({ project, onDelete }: { project: Project; onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: project.title, description: project.description,
    imageUrl: project.imageUrl ?? "", demoLink: project.demoLink ?? "", githubLink: project.githubLink ?? "", sourceLink: project.sourceLink ?? "", category: project.category ?? "Frontend",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    startTransition(async () => {
      await updateProject(project.id, {
        ...form,
        imageUrl: form.imageUrl || undefined,
        demoLink: form.demoLink || undefined,
        githubLink: form.githubLink || undefined,
        sourceLink: form.sourceLink || undefined,
        category: form.category || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex items-center px-5 py-4 gap-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setOpen(o => !o)}>
        {form.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.imageUrl} alt={form.title} className="w-14 h-10 object-cover rounded-lg border border-white/10 shrink-0" />
        ) : (
          <div className="w-14 h-10 rounded-lg bg-[color:var(--color-lime-accent)]/10 border-2 border-dashed border-[color:var(--color-lime-accent)]/30 shrink-0 flex items-center justify-center text-[8px] font-bold uppercase tracking-widest text-[color:var(--color-lime-accent)]/60">No img</div>
        )}
        <div className="flex-1 shrink-0 min-w-0">
          <span className="text-sm font-black text-white uppercase tracking-tight block truncate">{form.title}</span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{form.category || "Frontend"}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Title</label><input className={inputClass} value={form.title} onChange={set("title")} /></div>
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={form.category} onChange={(e) => setForm(f => ({...f, category: e.target.value}))}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
              </select>
            </div>
          </div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} /></div>
          <CloudinaryUpload currentUrl={form.imageUrl || null} onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))} label="Project Image" />
          <div className="md:hidden">
            <label className={labelClass}>Image URL (direct)</label>
            <input className={inputClass} value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://res.cloudinary.com/..." />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Demo Link</label><input className={inputClass} value={form.demoLink} onChange={set("demoLink")} placeholder="https://..." /></div>
            <div><label className={labelClass}>Source Code Link</label><input className={inputClass} value={form.sourceLink} onChange={set("sourceLink")} placeholder="https://github.com/..." /></div>
            <div><label className={labelClass}>GitHub (Legacy)</label><input className={inputClass} value={form.githubLink} onChange={set("githubLink")} placeholder="https://github.com/..." /></div>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 disabled:opacity-60 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
            <button onClick={() => onDelete(project.id)} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsManager({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", demoLink: "", githubLink: "", sourceLink: "", category: "Frontend" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = () => {
    if (!form.title.trim()) return;
    startTransition(async () => {
      await createProject({ ...form, imageUrl: form.imageUrl || undefined, demoLink: form.demoLink || undefined, githubLink: form.githubLink || undefined, sourceLink: form.sourceLink || undefined, category: form.category || undefined, order: projects.length });
      setForm({ title: "", description: "", imageUrl: "", demoLink: "", githubLink: "", sourceLink: "", category: "Frontend" });
      setShowAdd(false);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this project?")) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    startTransition(async () => await deleteProject(id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 transition-all shadow-[0_0_15px_rgba(203,255,0,0.2)]">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border-2 border-[color:var(--color-lime-accent)]/50 p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">New Project</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Title *</label><input className={inputClass} value={form.title} onChange={set("title")} placeholder="My Portfolio Website" autoFocus /></div>
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={form.category} onChange={(e) => setForm(f => ({...f, category: e.target.value}))}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
              </select>
            </div>
          </div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} placeholder="What does it do?" /></div>
          <CloudinaryUpload currentUrl={null} onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))} label="Project Image" />
          <div className="grid md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Demo Link</label><input className={inputClass} value={form.demoLink} onChange={set("demoLink")} placeholder="https://..." /></div>
            <div><label className={labelClass}>Source Code Link</label><input className={inputClass} value={form.sourceLink} onChange={set("sourceLink")} placeholder="https://github.com/..." /></div>
            <div><label className={labelClass}>GitHub</label><input className={inputClass} value={form.githubLink} onChange={set("githubLink")} placeholder="https://github.com/..." /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] hover:bg-[color:var(--color-lime-accent)]/80 text-black rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Adding..." : "Add Project"}
            </button>
            <button onClick={() => setShowAdd(false)} className="flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:bg-white/5 transition-colors">
              <X className="w-3 h-3" /> Cancel
            </button>
          </div>
        </div>
      )}

      {projects.length === 0 && !showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 p-10 text-center">
          <p className="text-gray-500 font-medium text-sm">No projects yet.</p>
        </div>
      )}
      {projects.map(p => <ProjectCard key={p.id} project={p} onDelete={handleDelete} />)}
    </div>
  );
}
