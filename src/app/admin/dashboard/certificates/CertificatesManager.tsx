"use client";

import { useState, useTransition } from "react";
import { createCertificate, updateCertificate, deleteCertificate } from "@/app/actions/certificates";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

type Certificate = { id: string; name: string; issuer: string; date: string; imageUrl?: string | null; link?: string | null; order: number };

const inputClass = "w-full bg-[#1b1e16] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-medium border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-2 focus:ring-[color:var(--color-lime-accent)]/20 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5";

function CertCard({ cert, onDelete }: { cert: Certificate; onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: cert.name, issuer: cert.issuer, date: cert.date, imageUrl: cert.imageUrl ?? "", link: cert.link ?? "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    startTransition(async () => {
      await updateCertificate(cert.id, { ...form, imageUrl: form.imageUrl || undefined, link: form.link || undefined });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex items-center px-5 py-4 gap-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setOpen(o => !o)}>
        {form.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.imageUrl} alt={form.name} className="w-12 h-9 object-cover rounded-lg border border-white/10 shrink-0" />
        ) : (
          <div className="w-12 h-9 rounded-lg bg-[color:var(--color-lime-accent)]/10 border-2 border-dashed border-[color:var(--color-lime-accent)]/30 shrink-0 flex items-center justify-center text-[7px] font-bold uppercase tracking-widest text-[color:var(--color-lime-accent)]/60">Img</div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white uppercase tracking-tight line-clamp-1">{form.name}</p>
          <p className="text-xs text-gray-400 font-semibold">{form.issuer} · {form.date}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4 bg-black/20">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2"><label className={labelClass}>Certificate Name</label><input className={inputClass} value={form.name} onChange={set("name")} /></div>
            <div><label className={labelClass}>Date</label><input className={inputClass} value={form.date} onChange={set("date")} placeholder="Dec 2024" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Issuer</label><input className={inputClass} value={form.issuer} onChange={set("issuer")} placeholder="Coursera" /></div>
            <div><label className={labelClass}>Verify Link</label><input className={inputClass} value={form.link} onChange={set("link")} placeholder="https://..." /></div>
          </div>
          <CloudinaryUpload currentUrl={form.imageUrl || null} onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))} label="Certificate Image" />
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 bg-[color:var(--color-lime-accent)] hover:bg-[color:var(--color-lime-accent)]/80 text-black rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60 transition-colors">
              <Save className="w-3 h-3" /> {isPending ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
            <button onClick={() => onDelete(cert.id)} disabled={isPending} className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CertificatesManager({ certificates: initial }: { certificates: Certificate[] }) {
  const [certs, setCerts] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", issuer: "", date: "", imageUrl: "", link: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = () => {
    if (!form.name.trim() || !form.issuer.trim()) return;
    startTransition(async () => {
      await createCertificate({ ...form, imageUrl: form.imageUrl || undefined, link: form.link || undefined, order: certs.length });
      setForm({ name: "", issuer: "", date: "", imageUrl: "", link: "" });
      setShowAdd(false);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    setCerts(prev => prev.filter(c => c.id !== id));
    startTransition(async () => await deleteCertificate(id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 transition-all active:scale-95 shadow-[0_0_15px_rgba(203,255,0,0.2)]">
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border-2 border-[color:var(--color-lime-accent)]/50 p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">New Certificate</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2"><label className={labelClass}>Name *</label><input className={inputClass} value={form.name} onChange={set("name")} placeholder="React Developer Certificate" autoFocus /></div>
            <div><label className={labelClass}>Date</label><input className={inputClass} value={form.date} onChange={set("date")} placeholder="Dec 2024" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Issuer *</label><input className={inputClass} value={form.issuer} onChange={set("issuer")} placeholder="Coursera, Udemy..." /></div>
            <div><label className={labelClass}>Verify Link</label><input className={inputClass} value={form.link} onChange={set("link")} placeholder="https://..." /></div>
          </div>
          <CloudinaryUpload currentUrl={null} onUpload={(url) => setForm(f => ({ ...f, imageUrl: url }))} label="Certificate Image" />
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

      {certs.length === 0 && !showAdd && (
        <div className="bg-[#1C1C1A] rounded-2xl border border-white/5 p-10 text-center">
          <p className="text-gray-500 font-medium text-sm">No certificates yet.</p>
        </div>
      )}
      {certs.map(c => <CertCard key={c.id} cert={c} onDelete={handleDelete} />)}
    </div>
  );
}
