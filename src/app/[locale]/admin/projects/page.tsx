"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, MapPin, Calendar, Loader2, Eye, EyeOff, FolderPlus } from "lucide-react";
import { cmsGetAll, cmsAdd, cmsUpdate, cmsDelete } from "@/lib/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { GalleryManager } from "@/components/admin/GalleryManager";
import type { FirestoreProject, WithId } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: { add: "Add Project", edit: "Edit", delete: "Delete", save: "Save Project", cancel: "Cancel", loading: "Loading projects...", empty: "No projects yet", emptySub: "Get started by adding your very first architectural project.", published: "Public", draft: "Draft", fields: { slug: "URL Slug", category: "Category", status: "Status", heroImage: "Hero Image", published: "Visible on site", featured: "Show on Homepage", titleEn: "Title (EN)", location: "Location", year: "Year", gallery: "Project Gallery" } },
  fr: { add: "Ajouter un Projet", edit: "Modifier", delete: "Supprimer", save: "Enregistrer", cancel: "Annuler", loading: "Chargement...", empty: "Aucun projet", emptySub: "Commencez par ajouter votre premier projet architectural.", published: "Public", draft: "Brouillon", fields: { slug: "Slug URL", category: "Catégorie", status: "Statut", heroImage: "Image Principale", published: "Visible", featured: "À la une", titleEn: "Titre (EN)", location: "Lieu", year: "Année", gallery: "Galerie du Projet" } },
  ar: { add: "إضافة مشروع", edit: "تعديل", delete: "حذف", save: "حفظ المشروع", cancel: "إلغاء", loading: "جاري التحميل...", empty: "لا توجد مشاريع", emptySub: "ابدأ بإضافة أول مشروع معماري في محفظتك.", published: "عام", draft: "مسودة", fields: { slug: "رابط المشروع", category: "الفئة", status: "الحالة", heroImage: "الصورة الرئيسية", published: "مرئي على الموقع", featured: "مميز", titleEn: "العنوان (EN)", location: "الموقع", year: "السنة", gallery: "معرض صور المشروع" } },
};

const emptyProject: Omit<FirestoreProject, "createdAt" | "updatedAt"> = {
  slug: "", category: "cultural-civic", status: "design", heroImage: "", images: [], published: true, featured: false, order: 0,
  en: { title: "", location: "", year: new Date().getFullYear().toString(), type: "", tagline: "", status: "", client: "", services: [], narrative: { context: [], design: [], outcome: [] } },
  fr: { title: "", location: "", year: new Date().getFullYear().toString(), type: "", tagline: "", status: "", client: "", services: [], narrative: { context: [], design: [], outcome: [] } },
  ar: { title: "", location: "", year: new Date().getFullYear().toString(), type: "", tagline: "", status: "", client: "", services: [], narrative: { context: [], design: [], outcome: [] } },
};

export default function AdminProjectsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [projects, setProjects] = useState<WithId<FirestoreProject>[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: FirestoreProject; id?: string }>({ open: false, mode: "add", data: emptyProject as FirestoreProject });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setProjects(await cmsGetAll("projects")); } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...emptyProject } });
  const openEdit = (p: WithId<FirestoreProject>) => setModal({ open: true, mode: "edit", data: { ...p }, id: p.id });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal.mode === "add") await cmsAdd("projects", modal.data);
      else if (modal.id) await cmsUpdate("projects", modal.id, modal.data);
      await load(); closeModal();
    } catch (e) { console.error(e); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setDeleting(id);
    try { await cmsDelete("projects", id); await load(); } finally { setDeleting(null); }
  };

  const setField = (path: string, value: unknown) => {
    setModal(m => {
      const data = { ...m.data } as any;
      const parts = path.split(".");
      let cur = data;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {};
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return { ...m, data };
    });
  };

  const inp = "w-full bg-[#111111] border border-[#222222] rounded-[8px] px-3 h-[40px] text-[14px] text-[#F0F0F0] placeholder-[#666666] focus:outline-none focus:border-[#C4A882]/50 transition-colors";
  const lbl = "text-[12px] font-medium text-[#666666] block mb-1.5";

  return (
    <div className="flex flex-col animate-in fade-in duration-500 font-sans w-full max-w-full box-border overflow-x-hidden">
      <div className="flex justify-end mb-[20px]">
        <button onClick={openAdd} className="flex items-center gap-2 px-[16px] h-[40px] bg-[#C4A882] hover:bg-[#d4ba97] text-[#111111] font-medium text-[14px] rounded-[8px] transition-colors duration-150 shadow-sm">
          <Plus className="w-4 h-4" />{t.add}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-[#666666]">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />{t.loading}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#161616] border border-[#222222] rounded-[8px] gap-4">
          <div className="w-16 h-16 rounded-full bg-[#111111] flex items-center justify-center text-[#666666] mb-2 border border-[#222222]">
            <FolderPlus className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-[18px] font-semibold text-[#F0F0F0] mb-1">{t.empty}</h3>
            <p className="text-[14px] text-[#666666] max-w-sm">{t.emptySub}</p>
          </div>
          <button onClick={openAdd} className="mt-4 flex items-center gap-2 px-[24px] py-[10px] bg-[#C4A882] hover:bg-[#d4ba97] text-[#0C0C0C] font-[500] text-[14px] rounded-[6px] transition-colors duration-150">
            {t.add}
          </button>
        </div>
      ) : (
        <div className="bg-[#161616] border border-[#222222] rounded-[8px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161616] border-b border-[#222222]">
                  {["Project", "Location", "Status", "Year", "Visibility", ""].map((h, i) => (
                    <th key={i} className="px-[16px] py-[16px] text-[11px] font-medium text-[#555555] uppercase tracking-[1px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E1E]">
                {projects.map((p) => {
                  const title = p.en?.title || p.slug;
                  return (
                    <tr key={p.id} className="h-[48px] hover:bg-[#1A1A1A] transition-colors duration-150 group">
                      <td className="px-[16px]">
                        <p className="font-medium text-[#F0F0F0] text-[14px] leading-tight mb-0.5">{title}</p>
                        <p className="text-[12px] text-[#666666]">/{p.slug}</p>
                      </td>
                      <td className="px-[16px]">
                        <span className="flex items-center gap-2 text-[14px] text-[#cccccc]">
                          <MapPin className="w-3.5 h-3.5 text-[#666666]" />{p.en?.location}
                        </span>
                      </td>
                      <td className="px-[16px]">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#111111] text-[#cccccc] border border-[#222222]">
                          {p.status?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-[16px]">
                        <span className="flex items-center gap-2 text-[14px] text-[#cccccc]">
                          <Calendar className="w-3.5 h-3.5 text-[#666666]" />{p.en?.year}
                        </span>
                      </td>
                      <td className="px-[16px]">
                        {p.published ? (
                           <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C2B22] text-[#4ADE80]">Public</span>
                        ) : (
                           <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1A1A1A] text-[#666666] border border-[#222222]">Draft</span>
                        )}
                      </td>
                      <td className="px-[16px] text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-[#666666] hover:text-[#C4A882] rounded-[6px] transition-colors" title={t.edit}>
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="p-1.5 text-[#666666] hover:text-[#ef4444] rounded-[6px] transition-colors" title={t.delete}>
                            {deleting === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#161616] border border-[#222222] rounded-[8px] w-full max-w-3xl my-8 relative">
            <div className="flex items-center justify-between p-6 border-b border-[#222222]">
              <h2 className="text-[18px] font-bold text-[#F0F0F0]">
                {modal.mode === "add" ? t.add : t.edit}
              </h2>
              <button onClick={closeModal} className="text-[#666666] hover:text-[#F0F0F0] transition-colors">✕</button>
            </div>
            <div className="p-[24px] space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
              <ImageUploader folder="projects" label={t.fields.heroImage} value={modal.data.heroImage} onChange={(url) => setField("heroImage", url)} />
              <GalleryManager folder="projects" label={t.fields.gallery} images={modal.data.images || []} onChange={(urls) => setField("images", urls)} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                <div><label className={lbl}>{t.fields.slug}</label><input className={inp} value={modal.data.slug} onChange={e => setField("slug", e.target.value)} /></div>
                <div><label className={lbl}>{t.fields.category}</label>
                  <select className={`${inp} cursor-pointer`} value={modal.data.category} onChange={e => setField("category", e.target.value)}>
                    {["cultural-civic","residential","adaptive-reuse","urban-planning","mixed-use","heritage"].map(c => (
                      <option key={c} value={c} className="bg-[#111111]">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px]">
                <div><label className={lbl}>{t.fields.status}</label>
                  <select className={`${inp} cursor-pointer`} value={modal.data.status} onChange={e => setField("status", e.target.value)}>
                    {["active","completed","design","on_hold","archived"].map(s => (
                      <option key={s} value={s} className="bg-[#111111]">{s.replace("_"," ")}</option>
                    ))}
                  </select>
                </div>
                <div><label className={lbl}>{t.fields.year}</label><input className={inp} value={modal.data.en?.year} onChange={e => { setField("en.year", e.target.value); setField("fr.year", e.target.value); setField("ar.year", e.target.value); }} /></div>
                <div><label className={lbl}>Order</label><input className={inp} type="number" value={modal.data.order} onChange={e => setField("order", parseInt(e.target.value) || 0)} /></div>
              </div>

              <div className="flex gap-8 border-t border-[#222222] pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-9 h-5 rounded-full relative transition-colors ${modal.data.published ? "bg-[#C4A882]" : "bg-[#222222]"}`} onClick={() => setField("published", !modal.data.published)}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${modal.data.published ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-[14px] font-medium text-[#cccccc]">{t.fields.published}</span>
                </label>
              </div>

              <div className="space-y-6 pt-6 border-t border-[#222222]">
                <h3 className="text-[16px] font-semibold text-[#F0F0F0] mb-2">Translations</h3>
                {(["en", "fr", "ar"] as const).map(lang => (
                  <div key={lang} className="bg-[#111111] rounded-[8px] border border-[#222222] p-[24px] space-y-4">
                    <span className="inline-block px-2 py-0.5 bg-[#161616] border border-[#222222] rounded-[4px] text-[10px] font-bold text-[#C4A882] tracking-[1px] uppercase">{lang}</span>
                    <div className="grid grid-cols-2 gap-[20px]">
                      <div><label className={lbl}>Title</label><input className={inp} value={modal.data[lang]?.title} onChange={e => setField(`${lang}.title`, e.target.value)} /></div>
                      <div><label className={lbl}>Location</label><input className={inp} value={modal.data[lang]?.location} onChange={e => setField(`${lang}.location`, e.target.value)} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex justify-end gap-3 p-[24px] border-t border-[#222222] bg-[#111111] rounded-b-[8px] ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button onClick={closeModal} className="px-4 h-[40px] rounded-[8px] text-[14px] font-medium text-[#666666] hover:text-[#F0F0F0] hover:bg-[#181818] transition-colors duration-150">
                {t.cancel}
              </button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 h-[40px] bg-[#C4A882] hover:bg-[#d4ba97] text-[#111111] font-medium text-[14px] rounded-[8px] transition-colors duration-150">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
