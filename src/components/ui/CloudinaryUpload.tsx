"use client";

import { useState, useTransition } from "react";
import { Loader2, Upload, X } from "lucide-react";

const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5";

interface CloudinaryUploadProps {
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  label?: string;
  type?: "image" | "raw";
}

export default function CloudinaryUpload({ currentUrl, onUpload, label = "Image", type = "image" }: CloudinaryUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");

    // Local preview
    setPreview(URL.createObjectURL(file));

    startTransition(async () => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", type);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.url) {
          onUpload(data.url);
        } else {
          setError(data.error ?? "Upload failed");
        }
      } catch {
        setError("Upload failed — check Cloudinary config in .env");
      }
    });
  };

  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      <div className="relative border-2 border-dashed border-white/5 rounded-xl p-4 hover:border-[color:var(--color-lime-accent)] transition-colors group bg-black/20">
        {preview ? (
          <div className="relative flex flex-col items-center justify-center p-4">
            {type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="w-full h-36 object-cover rounded-lg border border-white/10" />
            ) : (
              <div className="w-full h-36 bg-white/5 rounded-lg flex flex-col items-center justify-center text-gray-400 border border-white/10">
                <span className="text-sm font-bold truncate max-w-full px-4 text-white">{preview.split('/').pop()}</span>
                <span className="text-[10px] uppercase font-bold mt-2 text-gray-500 tracking-widest">Document Uploaded</span>
              </div>
            )}
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPreview(null); onUpload(""); }}
              className="absolute top-2 right-2 w-7 h-7 bg-red-500/80 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors z-10 shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-gray-500 group-hover:text-white transition-colors">
            <Upload className="w-8 h-8 mb-2 opacity-50 group-hover:opacity-100 group-hover:text-[color:var(--color-lime-accent)] transition-all" />
            <span className="text-xs font-semibold">Click to upload or drag & drop</span>
            <span className="text-[10px] tracking-tight mt-1 opacity-50 font-medium">
              {type === "image" ? "PNG, JPG, WEBP — uploaded to Cloudinary" : "PDF, DOC, PDF — uploaded to Cloudinary"}
            </span>
          </div>
        )}
        <input
          type="file"
          accept={type === "image" ? "image/*" : ".pdf,.doc,.docx"}
          onChange={handleFile}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isPending}
        />
        {isPending && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[color:var(--color-lime-accent)] mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-lime-accent)]">Uploading...</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
    </div>
  );
}
