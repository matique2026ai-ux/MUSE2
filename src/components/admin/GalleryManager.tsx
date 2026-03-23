"use client";

import { useState, useRef, useCallback } from "react";
import { Plus, X, Image as ImageIcon, Loader2, GripVertical, Upload } from "lucide-react";
import Image from "next/image";
import { cmsUploadImage } from "@/lib/cms";

interface GalleryManagerProps {
  folder: string;
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
}

export function GalleryManager({ folder, images, onChange, label }: GalleryManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    setProgress(0);
    try {
      const url = await cmsUploadImage(file, folder, setProgress);
      onChange([...images, url]);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }, [folder, images, onChange]);

  const removeImage = (index: number) => {
    const next = [...images];
    next.splice(index, 1);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {label && <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">{label}</span>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url, idx) => (
          <div key={idx} className="relative aspect-square group rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <Image src={url} alt={`Gallery ${idx}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => removeImage(idx)}
                className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Drag Handle (Simulated for UI) */}
            <div className="absolute top-2 left-2 p-1 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="w-3.5 h-3.5 text-white/50" />
            </div>
          </div>
        ))}

        {/* Upload Button Slot */}
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`aspect-square flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all ${
            uploading 
              ? "border-[#A67C52] bg-[#A67C52]/5" 
              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-[#A67C52] animate-spin" />
              <span className="text-xs text-zinc-400 font-mono">{progress}%</span>
            </>
          ) : (
            <>
              <div className="p-2.5 rounded-full bg-white/5">
                <Plus className="w-5 h-5 text-zinc-500" />
              </div>
              <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Add Image</span>
            </>
          )}
        </button>
      </div>
      
      <input 
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={e => {
          const files = Array.from(e.target.files || []);
          files.forEach(f => handleUpload(f));
        }}
      />
    </div>
  );
}
