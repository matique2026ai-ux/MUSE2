"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Layout, Image as ImageIcon, Loader2, Eye, EyeOff } from "lucide-react";
import { cmsGetAll, cmsAdd, cmsUpdate, cmsDelete } from "@/lib/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { FirestoreService } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: {
    title: "Services Management",
    subtitle: "Manage the architectural expertise displayed on the platform.",
    add: "Add Service",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    empty: "No services cataloged yet.",
    published: "Published",
    draft: "Draft",
    fields: {
      slug: "URL Slug",
      icon: "Icon Name (Lucide)",
      image: "Service Image",
      published: "Visible",
      order: "Sort Order",
      title: "Title",
      subtitle: "Subtitle / Tagline",
      description: "Full Description",
      features: "Key Features (comma separated)",
    },
  },
  fr: {
    title: "Gestion des Services",
    subtitle: "Gérez l'expertise architecturale affichée sur la plateforme.",
    add: "Ajouter un Service",
    edit: "Modifier",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    loading: "Chargement...",
    empty: "Aucun service catalogué.",
    published: "Publié",
    draft: "Brouillon",
    fields: {
      slug: "Slug URL",
      icon: "Nom de l'icône (Lucide)",
      image: "Image du Service",
      published: "Visible",
      order: "Ordre de tri",
      title: "Titre",
      subtitle: "Sous-titre",
      description: "Description complète",
      features: "Caractéristiques clés (séparées par des virgules)",
    },
  },
  ar: {
    title: "إدارة الخدمات",
    subtitle: "إدارة الخبرات المعمارية المعروضة على المنصة.",
    add: "إضافة خدمة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري التحميل...",
    empty: "لا توجد خدمات مضافة بعد.",
    published: "منشور",
    draft: "مسودة",
    fields: {
      slug: "رابط الخدمة",
      icon: "اسم الأيقونة (Lucide)",
      image: "صورة الخدمة",
      published: "مرئي",
      order: "ترتيب العرض",
      title: "العنوان",
      subtitle: "عنوان فرعي",
      description: "الوصف الكامل",
      features: "الميزات الرئيسية (مفصولة بفاصلة)",
    },
  },
};

const emptyService: Omit<FirestoreService, "id"> = {
  slug: "",
  icon: "Layout",
  image: "",
  published: true,
  order: 0,
  en: { title: "", subtitle: "", description: "", features: [] },
  fr: { title: "", subtitle: "", description: "", features: [] },
  ar: { title: "", subtitle: "", description: "", features: [] },
};

export default function AdminServicesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [services, setServices] = useState<FirestoreService[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: any; id?: string }>({
    open: false,
    mode: "add",
    data: emptyService,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await cmsGetAll<FirestoreService>("services");
      setServices(data.sort((a,b) => (a.order || 0) - (b.order || 0)));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...emptyService } });
  const openEdit = (s: any) => setModal({ open: true, mode: "edit", data: { ...s }, id: s.id });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...modal.data };
      if (modal.mode === "add") await cmsAdd("services", data);
      else if (modal.id) await cmsUpdate("services", modal.id, data);
      await load();
      closeModal();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    setDeleting(id);
    try {
      await cmsDelete("services", id);
      await load();
    } finally { setDeleting(null); }
  };

  const setField = (path: string, value: any) => {
    setModal(m => {
      const data = { ...m.data };
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

  const inp = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#A67C52]/50 focus:bg-white/[0.05] transition-all";
  const lbl = "text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold block mb-2 ml-1";

  return (
    <div className="p-6 sm:p-10 lg:p-14 max-w-[1400px] mx-auto w-full">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-wide text-white mb-1">{t.title}</h1>
          <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{t.subtitle}</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#A67C52] hover:bg-[#c4965e] text-black font-semibold text-sm rounded-lg transition-colors">
          <Plus className="w-4 h-4" />{t.add}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-zinc-500"><Loader2 className="w-5 h-5 animate-spin mr-2" />{t.loading}</div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-xl gap-3 text-zinc-500">
          <p>{t.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: any) => (
            <div key={s.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-lg text-[#A67C52]"><Layout className="w-6 h-6" /></div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(s)} className="p-2 bg-white/5 rounded-md hover:text-[#A67C52] transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-2 bg-white/5 rounded-md hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{s[locale]?.title || s.en?.title}</h3>
              <p className="text-sm text-zinc-500 line-clamp-2 mb-4">{s[locale]?.subtitle || s.en?.subtitle}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Order: {s.order}</span>
                <span className={`flex items-center gap-1.5 text-xs font-mono ${s.published ? "text-emerald-400" : "text-zinc-600"}`}>
                  {s.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {s.published ? t.published : t.draft}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

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
              <ImageUploader folder="services" label={t.fields.image} value={modal.data.image} onChange={(url) => setField("image", url)} />
              
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lbl}>{t.fields.slug}</label><input className={inp} value={modal.data.slug} onChange={e => setField("slug", e.target.value)} /></div>
                <div><label className={lbl}>{t.fields.order}</label><input type="number" className={inp} value={modal.data.order} onChange={e => setField("order", parseInt(e.target.value) || 0)} /></div>
              </div>

              {(["en", "fr", "ar"] as const).map(lang => (
                <div key={lang} className="border border-white/5 p-5 rounded-xl space-y-4">
                  <p className="text-xs font-mono text-[#A67C52] uppercase tracking-widest">{lang.toUpperCase()}</p>
                  <div><label className={lbl}>{t.fields.title}</label><input className={inp} value={modal.data[lang]?.title} onChange={e => setField(`${lang}.title`, e.target.value)} /></div>
                  <div><label className={lbl}>{t.fields.subtitle}</label><input className={inp} value={modal.data[lang]?.subtitle} onChange={e => setField(`${lang}.subtitle`, e.target.value)} /></div>
                  <div><label className={lbl}>{t.fields.description}</label><textarea className={`${inp} resize-none`} rows={3} value={modal.data[lang]?.description} onChange={e => setField(`${lang}.description`, e.target.value)} /></div>
                  <div><label className={lbl}>{t.fields.features}</label><input className={inp} value={modal.data[lang]?.features?.join(", ")} onChange={e => setField(`${lang}.features`, e.target.value.split(",").map((s:string)=>s.trim()))} /></div>
                </div>
              ))}

              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setField("published", !modal.data.published)} className={`relative w-10 h-5 rounded-full transition-colors ${modal.data.published ? "bg-[#A67C52]" : "bg-white/10"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${modal.data.published ? "left-5" : "left-0.5"}`} />
                </div>
                <span className="text-sm text-zinc-400">{t.fields.published}</span>
              </label>
            </div>
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
