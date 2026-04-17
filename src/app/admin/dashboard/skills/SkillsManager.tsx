"use client";

import { useState, useTransition } from "react";
import { createSkill, updateSkill, deleteSkill } from "@/app/actions/skills";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

type Skill = { id: string; name: string; category?: string | null; description?: string | null; link?: string | null; imageUrl?: string | null; order: number };

const inputClass = "w-full bg-[#1b1e16] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-medium border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-2 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5";

function SkillCard({ skill, onDelete }: { skill: Skill; onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: skill.name, category: skill.category ?? "",
    description: skill.description ?? "", link: skill.link ?? "", imageUrl: skill.imageUrl ?? "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    startTransition(async () => {
      await updateSkill(skill.id, {
        ...form,
        category: form.category || undefined,
        description: form.description || undefined,
        link: form.link || undefined,
        imageUrl: form.imageUrl || undefined,
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
          <img src={form.imageUrl} alt={form.name} className="w-10 h-10 object-contain p-1 rounded-lg border border-white/10 shrink-0 bg-black/40" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-[color:var(--color-lime-accent)]/10 border-2 border-dashed border-[color:var(--color-lime-accent)]/30 shrink-0 flex items-center justify-center text-[10px] font-bold uppercase text-[color:var(--color-lime-accent)]/60">SVG</div>
        )}
        <span className="flex-1 text-sm font-black text-white tracking-tight">{form.name}</span>
        {form.category && <span className="hidden md:inline-block text-[10px] uppercase font-bold text-gray-400 bg-black/40 border border-white/5 px-2 py-1 rounded-full shrink-0">{form.category}</span>}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4 bg-black/20">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Resource Name</label><input className={inputClass} value={form.name} onChange={set("name")} /></div>
            <div><label className={labelClass}>Category</label><input className={inputClass} value={form.category} onChange={set("category")} placeholder="e.g. Frontend" /></div>
          </div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} placeholder="Short explanation of the tool for the card..." /></div>
          <CloudinaryUpload currentUrl={form.imageUrl || null} onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))} label="Custom SVG / Icon" />
          <div className="md:hidden">
            <label className={labelClass}>Icon URL (direct fallback)</label>
            <input className={inputClass} value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://res.cloudinary.com/..." />
          </div>
          <div><label className={labelClass}>Official Website / Link</label><input className={inputClass} value={form.link} onChange={set("link")} placeholder="https://..." /></div>
          
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 hover:bg-[color:var(--color-lime-accent)]/80 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </button>
            <button onClick={() => onDelete(skill.id)} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkillsManager({ skills: initial }: { skills: Skill[] }) {
  const [skills, setSkills] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", description: "", link: "", imageUrl: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = () => {
    if (!form.name.trim()) return;
    startTransition(async () => {
      await createSkill({ ...form, category: form.category || undefined, description: form.description || undefined, link: form.link || undefined, imageUrl: form.imageUrl || undefined, order: skills.length });
      setForm({ name: "", category: "", description: "", link: "", imageUrl: "" });
      setShowAdd(false);
      // Wait for server to revalidate logic
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this skill?")) return;
    setSkills(prev => prev.filter(s => s.id !== id));
    startTransition(async () => await deleteSkill(id));
  };

  // Group by category to keep it organized
  const groups = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category ?? "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-6 py-3 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 transition-all shadow-[0_0_15px_rgba(203,255,0,0.2)]">
          <Plus className="w-4 h-4" /> Add New Tool
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1C1C1A] rounded-3xl border border-[color:var(--color-lime-accent)]/50 p-6 space-y-4 relative">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 pb-2 border-b border-white/5">New Tool</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Resource Name *</label><input className={inputClass} value={form.name} onChange={set("name")} placeholder="React, Node.js..." autoFocus /></div>
            <div><label className={labelClass}>Category</label><input className={inputClass} value={form.category} onChange={set("category")} placeholder="Frontend" /></div>
          </div>
          <div><label className={labelClass}>Description</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description} onChange={set("description")} placeholder="Short explanation." /></div>
          <CloudinaryUpload currentUrl={null} onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))} label="Custom SVG / Icon" />
          <div><label className={labelClass}>Link / URL</label><input className={inputClass} value={form.link} onChange={set("link")} placeholder="https://..." /></div>
          
          <div className="flex gap-2 pt-4">
            <button onClick={handleAdd} disabled={isPending || !form.name.trim()} className="flex items-center gap-1.5 px-6 py-3 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 transition-colors hover:bg-[color:var(--color-lime-accent)]/80">
              <Save className="w-4 h-4" /> {isPending ? "Adding..." : "Add Tool"}
            </button>
            <button onClick={() => setShowAdd(false)} className="flex items-center gap-1.5 px-6 py-3 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:bg-white/5 transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      {Object.entries(groups).length === 0 && !showAdd && (
        <div className="bg-[#1C1C1A] rounded-3xl border border-white/5 p-12 text-center shadow-sm">
          <p className="text-gray-500 font-medium text-sm">Your toolstack is empty. Add your first skill.</p>
        </div>
      )}

      {Object.entries(groups).map(([cat, catSkills]) => (
        <div key={cat} className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-4 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-white/10 inline-block rounded-full" />{cat}
          </p>
          <div className="space-y-2">
            {catSkills.map(skill => <SkillCard key={skill.id} skill={skill} onDelete={handleDelete} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
