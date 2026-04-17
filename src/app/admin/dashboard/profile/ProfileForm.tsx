"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import { Save, CheckCircle } from "lucide-react";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";

type Profile = {
  id: string; name: string; professionalTitle: string; aboutText: string;
  cvLink?: string | null; aboutPhoto?: string | null; instagramLink?: string | null;
  githubLink?: string | null; linkedinLink?: string | null;
} | null;

const inputClass = "w-full bg-[#1b1e16] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-medium border border-white/5 focus:border-[color:var(--color-lime-accent)] focus:ring-4 focus:ring-[color:var(--color-lime-accent)]/20 focus:bg-[#1C1C1A] outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5";

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: profile?.name ?? "Faisal Ramdhani",
    professionalTitle: profile?.professionalTitle ?? "Full-Stack Developer",
    aboutText: profile?.aboutText ?? "",
    cvLink: profile?.cvLink ?? "",
    aboutPhoto: profile?.aboutPhoto ?? "",
    instagramLink: profile?.instagramLink ?? "",
    githubLink: profile?.githubLink ?? "",
    linkedinLink: profile?.linkedinLink ?? "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    startTransition(async () => {
      await updateProfile({
        ...form,
        cvLink: form.cvLink || undefined,
        aboutPhoto: form.aboutPhoto || undefined,
        instagramLink: form.instagramLink || undefined,
        githubLink: form.githubLink || undefined,
        linkedinLink: form.linkedinLink || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <div className="space-y-5 bg-[#1C1C1A] rounded-2xl border border-white/5 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input className={inputClass} value={form.name} onChange={set("name")} placeholder="Faisal Ramdhani" />
        </div>
        <div>
          <label className={labelClass}>Professional Title</label>
          <input className={inputClass} value={form.professionalTitle} onChange={set("professionalTitle")} placeholder="Full-Stack Developer" />
        </div>
      </div>

      <div>
        <label className={labelClass}>About Text</label>
        <textarea
          rows={5}
          className={`${inputClass} resize-none`}
          value={form.aboutText}
          onChange={set("aboutText")}
          placeholder="Tell your story..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <CloudinaryUpload 
            label="About Photo" 
            currentUrl={form.aboutPhoto} 
            onUpload={(url) => setForm(f => ({ ...f, aboutPhoto: url }))} 
            type="image" 
          />
          <div className="mt-2">
            <label className={labelClass}>Image URL Fallback</label>
            <input className={inputClass} value={form.aboutPhoto} onChange={set("aboutPhoto")} placeholder="https://..." />
          </div>
        </div>
        <div>
          <CloudinaryUpload 
            label="CV / Resume Document" 
            currentUrl={form.cvLink} 
            onUpload={(url) => setForm(f => ({ ...f, cvLink: url }))} 
            type="raw" 
          />
          <div className="mt-2">
            <label className={labelClass}>Document URL Fallback</label>
            <input className={inputClass} value={form.cvLink} onChange={set("cvLink")} placeholder="https://..." />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/5">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Social Links</p>
        <div className="grid md:grid-cols-3 gap-4">
          {(["instagramLink", "githubLink", "linkedinLink"] as const).map((key) => (
            <div key={key}>
              <label className={labelClass}>{key.replace("Link", "")}</label>
              <input className={inputClass} value={form[key]} onChange={set(key)} placeholder="https://..." />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="flex items-center gap-2 px-6 py-3 bg-[color:var(--color-lime-accent)] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--color-lime-accent)]/80 transition-all disabled:opacity-60 active:scale-95"
      >
        {saved ? <CheckCircle className="w-4 h-4 text-black" /> : <Save className="w-4 h-4" />}
        {isPending ? "Saving..." : saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
