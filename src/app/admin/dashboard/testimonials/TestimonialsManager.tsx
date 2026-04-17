"use client";

import { useState, useTransition } from "react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions/testimonials";
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

type Testimonial = { id: string; text: string; author: string; role: string; order: number };

const inputClass = "w-full bg-[#1b1e16] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-medium border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-2 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5";

function TestimonialCard({ t, onDelete }: { t: Testimonial, onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ text: t.text, author: t.author, role: t.role });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    startTransition(async () => {
      await updateTestimonial(t.id, form);
      setSaved(true);
      setTimeout(() => { setSaved(false); setOpen(false); }, 1500);
    });
  };

  return (
    <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex items-center px-5 py-4 gap-3 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setOpen(o => !o)}>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white uppercase tracking-tight">{t.author}</p>
          <p className="text-xs font-semibold text-gray-300 truncate">{t.text}</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-black shrink-0 bg-[color:var(--color-lime-accent)] px-2 rounded-full">{t.role}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4 bg-black/20">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Author Name</label><input className={inputClass} value={form.author} onChange={set("author")} /></div>
            <div><label className={labelClass}>Role / Company</label><input className={inputClass} value={form.role} onChange={set("role")} /></div>
          </div>
          <div><label className={labelClass}>Testimonial Text</label><textarea rows={4} className={`${inputClass} resize-none`} value={form.text} onChange={set("text")} /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] hover:bg-[color:var(--color-lime-accent)]/80 text-black rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
            <button onClick={() => onDelete(t.id)} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestimonialsManager({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ text: "", author: "", role: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = () => {
    if (!form.author.trim() || !form.text.trim()) return;
    startTransition(async () => {
      await createTestimonial({ ...form, order: testimonials.length });
      setForm({ text: "", author: "", role: "" });
      setShowAdd(false);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setTestimonials(prev => prev.filter(t => t.id !== id));
    startTransition(async () => await deleteTestimonial(id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 transition-all active:scale-95 shadow-[0_0_15px_rgba(203,255,0,0.2)]">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border-2 border-[color:var(--color-lime-accent)]/50 p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">New Testimonial</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Author Name *</label><input className={inputClass} value={form.author} onChange={set("author")} placeholder="John Doe" autoFocus /></div>
            <div><label className={labelClass}>Role / Company</label><input className={inputClass} value={form.role} onChange={set("role")} placeholder="CEO at Innovate, Inc." /></div>
          </div>
          <div><label className={labelClass}>Testimonial Text *</label><textarea rows={4} className={`${inputClass} resize-none`} value={form.text} onChange={set("text")} placeholder="Write the testimonial here..." /></div>
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

      {testimonials.length === 0 && !showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 p-10 text-center">
          <p className="text-gray-500 font-medium text-sm">No testimonials yet. Add your first one above.</p>
        </div>
      )}

      {testimonials.map((t) => (
        <TestimonialCard key={t.id} t={t} onDelete={handleDelete} />
      ))}
    </div>
  );
}
