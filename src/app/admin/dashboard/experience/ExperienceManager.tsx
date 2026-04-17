"use client";

import { useState, useTransition } from "react";
import { createExperience, updateExperience, deleteExperience } from "@/app/actions/experience";
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

type Experience = { id: string; jobTitle: string; company: string; duration: string; description: string; order: number };

const inputClass = "w-full bg-[#1b1e16] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-medium border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-2 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5";

function ExperienceCard({ exp, onDelete }: { exp: Experience, onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ jobTitle: exp.jobTitle, company: exp.company, duration: exp.duration, description: exp.description });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    startTransition(async () => {
      await updateExperience(exp.id, form);
      setSaved(true);
      setTimeout(() => { setSaved(false); setOpen(false); }, 1500);
    });
  };

  return (
    <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex items-center px-5 py-4 gap-3 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setOpen(o => !o)}>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white uppercase tracking-tight">{exp.jobTitle}</p>
          <p className="text-xs font-semibold text-black bg-[color:var(--color-lime-accent)] px-2 py-0.5 rounded-full inline-block mt-1">{exp.company}</p>
        </div>
        <span className="text-xs font-semibold text-gray-400 shrink-0">{exp.duration}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4 bg-black/20">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Job Title</label><input className={inputClass} value={form.jobTitle} onChange={set("jobTitle")} /></div>
            <div><label className={labelClass}>Company</label><input className={inputClass} value={form.company} onChange={set("company")} /></div>
          </div>
          <div><label className={labelClass}>Duration</label><input className={inputClass} value={form.duration} onChange={set("duration")} placeholder="Jan 2023 - Present" /></div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] hover:bg-[color:var(--color-lime-accent)]/80 text-black rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
            <button onClick={() => onDelete(exp.id)} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExperienceManager({ experiences: initial }: { experiences: Experience[] }) {
  const [experiences, setExperiences] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ jobTitle: "", company: "", duration: "", description: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = () => {
    if (!form.jobTitle.trim() || !form.company.trim()) return;
    startTransition(async () => {
      await createExperience({ ...form, order: experiences.length });
      setForm({ jobTitle: "", company: "", duration: "", description: "" });
      setShowAdd(false);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this experience?")) return;
    setExperiences(prev => prev.filter(e => e.id !== id));
    startTransition(async () => await deleteExperience(id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 transition-all active:scale-95 shadow-[0_0_15px_rgba(203,255,0,0.2)]">
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border-2 border-[color:var(--color-lime-accent)]/50 p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">New Experience</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Job Title *</label><input className={inputClass} value={form.jobTitle} onChange={set("jobTitle")} placeholder="Frontend Developer" autoFocus /></div>
            <div><label className={labelClass}>Company *</label><input className={inputClass} value={form.company} onChange={set("company")} placeholder="PT Maju Jaya" /></div>
          </div>
          <div><label className={labelClass}>Duration</label><input className={inputClass} value={form.duration} onChange={set("duration")} placeholder="Jan 2023 - Present" /></div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} placeholder="Describe your responsibilities..." /></div>
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] text-black hover:bg-[color:var(--color-lime-accent)]/80 rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Adding..." : "Add"}
            </button>
            <button onClick={() => setShowAdd(false)} className="flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:bg-white/5 transition-colors">
              <X className="w-3 h-3" /> Cancel
            </button>
          </div>
        </div>
      )}

      {experiences.length === 0 && !showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 p-10 text-center">
          <p className="text-gray-500 font-medium text-sm">No experiences yet. Add your first one above.</p>
        </div>
      )}

      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} onDelete={handleDelete} />
      ))}
    </div>
  );
}
