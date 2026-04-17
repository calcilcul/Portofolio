"use client";

import { useState, useTransition } from "react";
import { createEducation, updateEducation, deleteEducation } from "@/app/actions/education";
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

type Education = { id: string; degree: string; institution: string; duration: string; description: string | null; order: number };

const inputClass = "w-full bg-[#1b1e16] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-medium border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-2 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5";

function EducationCard({ edu, onDelete }: { edu: Education, onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ degree: edu.degree, institution: edu.institution, duration: edu.duration, description: edu.description || "" });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    startTransition(async () => {
      await updateEducation(edu.id, form);
      setSaved(true);
      setTimeout(() => { setSaved(false); setOpen(false); }, 1500);
    });
  };

  return (
    <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex items-center px-5 py-4 gap-3 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setOpen(o => !o)}>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white uppercase tracking-tight">{edu.degree}</p>
          <p className="text-xs font-semibold text-black bg-[color:var(--color-lime-accent)] px-2 py-0.5 rounded-full inline-block mt-1">{edu.institution}</p>
        </div>
        <span className="text-xs font-semibold text-gray-400 shrink-0">{edu.duration}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4 bg-black/20">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Degree / Course</label><input className={inputClass} value={form.degree} onChange={set("degree")} /></div>
            <div><label className={labelClass}>Institution</label><input className={inputClass} value={form.institution} onChange={set("institution")} /></div>
          </div>
          <div><label className={labelClass}>Duration</label><input className={inputClass} value={form.duration} onChange={set("duration")} placeholder="2020 - 2024" /></div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] hover:bg-[color:var(--color-lime-accent)]/80 text-black rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
            <button onClick={() => onDelete(edu.id)} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EducationManager({ educations: initial }: { educations: Education[] }) {
  const [educations, setEducations] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ degree: "", institution: "", duration: "", description: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = () => {
    if (!form.degree.trim() || !form.institution.trim()) return;
    startTransition(async () => {
      await createEducation({ ...form, order: educations.length });
      setForm({ degree: "", institution: "", duration: "", description: "" });
      setShowAdd(false);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this education?")) return;
    setEducations(prev => prev.filter(e => e.id !== id));
    startTransition(async () => await deleteEducation(id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 transition-all active:scale-95 shadow-[0_0_15px_rgba(203,255,0,0.2)]">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border-2 border-[color:var(--color-lime-accent)]/50 p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">New Education</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Degree / Course *</label><input className={inputClass} value={form.degree} onChange={set("degree")} placeholder="Bachelor of Science" autoFocus /></div>
            <div><label className={labelClass}>Institution *</label><input className={inputClass} value={form.institution} onChange={set("institution")} placeholder="University Name" /></div>
          </div>
          <div><label className={labelClass}>Duration</label><input className={inputClass} value={form.duration} onChange={set("duration")} placeholder="2020 - 2024" /></div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} placeholder="Details about studies..." /></div>
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

      {educations.length === 0 && !showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 p-10 text-center">
          <p className="text-gray-500 font-medium text-sm">No education history yet. Add your first one above.</p>
        </div>
      )}

      {educations.map((edu) => (
        <EducationCard key={edu.id} edu={edu} onDelete={handleDelete} />
      ))}
    </div>
  );
}
