"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, MapPin, Calendar, ExternalLink, Loader2, Eye, EyeOff } from "lucide-react";
import { cmsGetAll, cmsAdd, cmsUpdate, cmsDelete } from "@/lib/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { GalleryManager } from "@/components/admin/GalleryManager";
import type { FirestoreProject } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: {
    title: "Projects Matrix",
    subtitle: "Live content — changes appear on the public website instantly.",
    add: "Add Project",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    empty: "No projects yet. Add your first one.",
    published: "Published",
    draft: "Draft",
    featured: "Featured",
    fields: {
      slug: "URL Slug (e.g. my-project)",
      category: "Category",
      status: "Status",
      heroImage: "Hero Image",
      published: "Visible on public site",
      featured: "Show on Homepage",
      titleEn: "Title (EN)",
      titleFr: "Title (FR)",
      titleAr: "Title (AR)",
      location: "Location",
      year: "Year",
      type: "Project Type",
      client: "Client",
      tagline: "Tagline",
      gallery: "Project Gallery",
    },
  },
  fr: {
    title: "Matrice des Projets",
    subtitle: "Contenu en direct — les modifications apparaissent instantanément.",
    add: "Ajouter",
    edit: "Modifier",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    loading: "Chargement...",
    empty: "Aucun projet. Ajoutez le premier.",
    published: "Publié",
    draft: "Brouillon",
    featured: "À la une",
    fields: {
      slug: "Slug URL (ex: mon-projet)",
      category: "Catégorie",
      status: "Statut",
      heroImage: "Image Principale",
      published: "Visible sur le site",
      featured: "Afficher en page d'accueil",
      titleEn: "Titre (EN)",
      titleFr: "Titre (FR)",
      titleAr: "Titre (AR)",
      location: "Lieu",
      year: "Année",
      type: "Type de projet",
      client: "Client",
      tagline: "Accroche",
      gallery: "Galerie du Projet",
    },
  },
  ar: {
    title: "إدارة المشاريع",
    subtitle: "محتوى مباشر — التغييرات تظهر على الموقع فوراً.",
    add: "إضافة مشروع",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري التحميل...",
    empty: "لا توجد مشاريع بعد. أضف أول مشروع.",
    published: "منشور",
    draft: "مسودة",
    featured: "مميز",
    fields: {
      slug: "رابط المشروع (مثال: my-project)",
      category: "الفئة",
      status: "الحالة",
      heroImage: "الصورة الرئيسية",
      published: "مرئي على الموقع",
      featured: "عرض في الصفحة الرئيسية",
      titleEn: "العنوان (EN)",
      titleFr: "العنوان (FR)",
      titleAr: "العنوان (AR)",
      location: "الموقع",
      year: "السنة",
      type: "نوع المشروع",
      client: "العميل",
      tagline: "الشعار",
      gallery: "معرض صور المشروع",
    },
  },
};

const emptyProject: Omit<FirestoreProject, "createdAt" | "updatedAt"> = {
  slug: "",
  category: "cultural-civic",
  status: "design",
  heroImage: "",
  images: [],
  published: true,
  featured: false,
  order: 0,
  en: { title: "", location: "", year: new Date().getFullYear().toString(), type: "", tagline: "", status: "", client: "", services: [], narrative: { context: [], design: [], outcome: [] } },
  fr: { title: "", location: "", year: new Date().getFullYear().toString(), type: "", tagline: "", status: "", client: "", services: [], narrative: { context: [], design: [], outcome: [] } },
  ar: { title: "", location: "", year: new Date().getFullYear().toString(), type: "", tagline: "", status: "", client: "", services: [], narrative: { context: [], design: [], outcome: [] } },
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  completed: "bg-[#A67C52]/10 text-[#A67C52] border border-[#A67C52]/20",
  design: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  on_hold: "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20",
  archived: "bg-red-500/10 text-red-400 border border-red-500/20",
};

export default function AdminProjectsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: Omit<FirestoreProject, "createdAt" | "updatedAt">; id?: string }>({
    open: false,
    mode: "add",
    data: emptyProject,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await cmsGetAll<FirestoreProject>("projects");
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...emptyProject } });
  const openEdit = (p: FirestoreProject & { id: string }) => setModal({ open: true, mode: "edit", data: { ...p }, id: p.id });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal.mode === "add") {
        await cmsAdd("projects", modal.data);
      } else if (modal.id) {
        await cmsUpdate("projects", modal.id, modal.data);
      }
      await load();
      closeModal();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project from the database?")) return;
    setDeleting(id);
    try {
      await cmsDelete("projects", id);
      await load();
    } finally {
      setDeleting(null);
    }
  };

  const setField = (path: string, value: unknown) => {
    setModal(m => {
      const data = { ...m.data } as Record<string, unknown>;
      const parts = path.split(".");
      let cur = data;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {};
        cur = cur[parts[i]] as Record<string, unknown>;
      }
      cur[parts[parts.length - 1]] = value;
      return { ...m, data: data as typeof m.data };
    });
  };

  const inp = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#A67C52]/50 focus:bg-white/[0.05] transition-all";
  const lbl = "text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold block mb-2 ml-1";

  return (
    <div className="p-6 sm:p-10 lg:p-14 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-wide text-white mb-1">{t.title}</h1>
          <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{t.subtitle}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#A67C52] hover:bg-[#c4965e] text-black font-semibold text-sm rounded-lg transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          {t.add}
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-zinc-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />{t.loading}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-xl gap-3 text-zinc-500">
          <p>{t.empty}</p>
          <button onClick={openAdd} className="text-[#A67C52] text-sm font-mono">{t.add} →</button>
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  {["Project", "Location", "Status", "Year", "Visibility", ""].map((h, i) => (
                    <th key={i} className="px-6 py-4 text-left text-xs font-mono uppercase tracking-widest text-zinc-500 font-normal whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((p) => {
                  const proj = p as FirestoreProject & { id: string };
                  const title = p.en?.title || p.slug;
                  return (
                    <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{title}</p>
                        <p className="text-xs text-zinc-600 font-mono mt-0.5">/{p.slug}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                          <MapPin className="w-3 h-3 text-zinc-600" />{p.en?.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${statusColors[p.status] || statusColors.design}`}>
                          {p.status?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-sm text-zinc-400 font-mono">
                          <Calendar className="w-3 h-3 text-zinc-600" />{p.en?.year}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-mono ${p.published ? "text-emerald-400" : "text-zinc-600"}`}>
                          {p.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          {p.published ? t.published : t.draft}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(proj)} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-mono uppercase">
                            <Pencil className="w-3.5 h-3.5" />{t.edit}
                          </button>
                          <span className="text-zinc-700">|</span>
                          <button onClick={() => handleDelete(proj.id)} disabled={deleting === proj.id} className="flex items-center gap-1.5 text-xs text-red-500/60 hover:text-red-400 font-mono uppercase">
                            {deleting === proj.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            {t.delete}
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

      {/* Add / Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl w-full max-w-3xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-8 border-b border-white/5 bg-white/[0.01]">
              <h2 className="text-2xl font-light tracking-wide text-white">
                {modal.mode === "add" ? t.add : t.edit}
              </h2>
              <button 
                onClick={closeModal} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {/* Hero Image */}
              <ImageUploader
                folder="projects"
                label={t.fields.heroImage}
                value={modal.data.heroImage}
                onChange={(url: string) => setField("heroImage", url)}
              />

              {/* Gallery Manager */}
              <GalleryManager
                folder="projects"
                label={t.fields.gallery}
                images={modal.data.images || []}
                onChange={(urls: string[]) => setField("images", urls)}
              />

              {/* Slug & Category Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>{t.fields.slug}</label>
                  <input className={inp} value={modal.data.slug} onChange={e => setField("slug", e.target.value)} placeholder="my-project-name" />
                </div>
                <div>
                  <label className={lbl}>{t.fields.category}</label>
                  <select className={`${inp} cursor-pointer`} value={modal.data.category} onChange={e => setField("category", e.target.value)}>
                    {["cultural-civic","residential","adaptive-reuse","urban-planning","mixed-use","heritage"].map(c => (
                      <option key={c} value={c} className="bg-[#111]">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>{t.fields.status}</label>
                  <select className={`${inp} cursor-pointer`} value={modal.data.status} onChange={e => setField("status", e.target.value)}>
                    {["active","completed","design","on_hold","archived"].map(s => (
                      <option key={s} value={s} className="bg-[#111]">{s.replace("_"," ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={lbl}>{t.fields.year}</label>
                  <input className={inp} value={modal.data.en?.year} onChange={e => { setField("en.year", e.target.value); setField("fr.year", e.target.value); setField("ar.year", e.target.value); }} />
                </div>
                <div>
                  <label className={lbl}>Sort Order</label>
                  <input type="number" className={inp} value={modal.data.order} onChange={e => setField("order", parseInt(e.target.value) || 0)} />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                {[
                  { key: "published", label: t.fields.published },
                  { key: "featured", label: t.fields.featured },
                ].map(f => (
                  <label key={f.key} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setField(f.key, !modal.data[f.key as keyof typeof modal.data])}
                      className={`relative w-10 h-5 rounded-full transition-colors ${modal.data[f.key as keyof typeof modal.data] ? "bg-[#A67C52]" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${modal.data[f.key as keyof typeof modal.data] ? "left-5" : "left-0.5"}`} />
                    </div>
                    <span className="text-sm text-zinc-400">{f.label}</span>
                  </label>
                ))}
              </div>

              {/* Multilingual Titles */}
              <div className="border border-white/5 rounded-xl p-5 space-y-4">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Multilingual Content</p>
                {(["en", "fr", "ar"] as const).map(lang => (
                  <div key={lang} className="space-y-3">
                    <p className="text-xs font-mono text-[#A67C52] uppercase">{lang.toUpperCase()}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={lbl}>Title</label>
                        <input className={inp} value={modal.data[lang]?.title} onChange={e => setField(`${lang}.title`, e.target.value)} />
                      </div>
                      <div>
                        <label className={lbl}>Location</label>
                        <input className={inp} value={modal.data[lang]?.location} onChange={e => setField(`${lang}.location`, e.target.value)} />
                      </div>
                      <div>
                        <label className={lbl}>Type</label>
                        <input className={inp} value={modal.data[lang]?.type} onChange={e => setField(`${lang}.type`, e.target.value)} />
                      </div>
                      <div>
                        <label className={lbl}>Client</label>
                        <input className={inp} value={modal.data[lang]?.client} onChange={e => setField(`${lang}.client`, e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className={lbl}>Tagline</label>
                      <textarea className={`${inp} resize-none`} rows={2} value={modal.data[lang]?.tagline} onChange={e => setField(`${lang}.tagline`, e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className={`flex justify-end gap-4 p-8 border-t border-white/5 bg-white/[0.01] ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button 
                onClick={closeModal} 
                className="px-6 py-3 rounded-xl text-sm font-medium text-zinc-400 border border-white/10 hover:bg-white/5 transition-colors"
              >
                {t.cancel}
              </button>
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="flex items-center gap-2 px-8 py-3 bg-[#A67C52] hover:bg-[#c4965e] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#A67C52]/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin text-black" />}
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
