"use client";

import { useState, useRef, useCallback } from "react";
import { cmsUploadImage } from "@/lib/cms";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  folder: string;
  value?: string;       // Current image URL
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ folder, value, onChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      const url = await cmsUploadImage(file, folder, setProgress);
      onChange(url);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err?.message || "Upload failed. Check your Firebase permissions.");
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">{label}</span>}

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-white/5" style={{ height: 200 }}>
          <Image src={value} alt="Uploaded" fill className="object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors h-40 ${
            dragOver
              ? "border-[#A67C52] bg-[#A67C52]/10"
              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-[#A67C52] animate-spin" />
              <span className="text-sm text-zinc-400">{progress}%</span>
              <div className="absolute bottom-0 left-0 h-1 bg-[#A67C52] rounded-b-lg transition-all" style={{ width: `${progress}%` }} />
            </>
          ) : (
            <>
              <div className="p-3 rounded-full bg-white/5">
                <ImageIcon className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="text-center">
                <p className="text-sm text-zinc-400">Drag & drop or <span className="text-[#A67C52] font-semibold">browse</span></p>
                <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-tighter">PNG, JPG, WEBP — MAX 10MB</p>
              </div>
              <Upload className="absolute top-4 right-4 w-4 h-4 text-zinc-600" />
            </>
          )}
          {error && (
            <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
              <X className="w-5 h-5 text-red-500 mb-2" />
              <p className="text-xs text-red-400 font-mono leading-tight">{error}</p>
              <button onClick={(e) => { e.stopPropagation(); setError(null); }} className="mt-2 text-[10px] text-white/50 underline uppercase tracking-widest">Dismiss</button>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}
    </div>
  );
}
