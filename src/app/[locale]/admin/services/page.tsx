"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Layout, Image as ImageIcon, Loader2, LayoutGrid } from "lucide-react";
import { cmsGetAll, cmsAdd, cmsUpdate, cmsDelete } from "@/lib/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { FirestoreService } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: { add: "Add Service", edit: "Edit", delete: "Delete", save: "Save Service", cancel: "Cancel", loading: "Loading services...", empty: "No services cataloged yet.", emptySub: "Define the architectural services your studio offers.", published: "Published", draft: "Draft", fields: { slug: "URL Slug", icon: "Icon Name (Lucide)", image: "Service Image", published: "Visible", order: "Sort Order", title: "Title", subtitle: "Subtitle / Tagline", description: "Full Description", features: "Key Features (comma separated)" } },
  fr: { add: "Ajouter un Service", edit: "Modifier", delete: "Supprimer", save: "Enregistrer", cancel: "Annuler", loading: "Chargement...", empty: "Aucun service catalogué.", emptySub: "Définissez les services architecturaux que votre studio propose.", published: "Publié", draft: "Brouillon", fields: { slug: "Slug URL", icon: "Nom de l'icône (Lucide)", image: "Image du Service", published: "Visible", order: "Ordre de tri", title: "Titre", subtitle: "Sous-titre", description: "Description complète", features: "Caractéristiques clés (séparées par des virgules)" } },
  ar: { add: "إضافة خدمة", edit: "تعديل", delete: "حذف", save: "حفظ الخدمة", cancel: "إلغاء", loading: "جاري التحميل...", empty: "لا توجد خدمات مضافة بعد.", emptySub: "قم بتعريف الخدمات المعمارية التي يقدمها الاستوديو.", published: "منشور", draft: "مسودة", fields: { slug: "رابط الخدمة", icon: "اسم الأيقونة (Lucide)", image: "صورة الخدمة", published: "مرئي", order: "ترتيب العرض", title: "العنوان", subtitle: "عنوان فرعي", description: "الوصف الكامل", features: "الميزات الرئيسية" } },
};

const emptyService: Omit<FirestoreService, "id"> = { slug: "", icon: "Layout", image: "", published: true, order: 0, en: { title: "", subtitle: "", description: "", features: [] }, fr: { title: "", subtitle: "", description: "", features: [] }, ar: { title: "", subtitle: "", description: "", features: [] } };

export default function AdminServicesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [services, setServices] = useState<FirestoreService[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: any; id?: string }>({ open: false, mode: "add", data: emptyService });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setServices((await cmsGetAll<FirestoreService>("services")).sort((a,b) => (a.order || 0) - (b.order || 0))); } catch (e) { console.error(e); } finally { setLoading(false); }
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
      await load(); closeModal();
    } catch (e) { console.error(e); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    setDeleting(id);
    try { await cmsDelete("services", id); await load(); } finally { setDeleting(null); }
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

  const inp = "w-full bg-[#111111] border border-[#222222] rounded-[8px] px-3 h-[40px] text-[14px] text-[#F0F0F0] placeholder-[#666666] focus:outline-none focus:border-[#C4A882]/50 transition-colors";
  const lbl = "text-[12px] font-medium text-[#666666] block mb-1.5";

  return (
    <div className="flex flex-col animate-in fade-in duration-500 font-sans w-full">
      <div className="flex justify-end mb-[20px]">
        <button onClick={openAdd} className="flex items-center gap-2 px-[16px] h-[40px] bg-[#C4A882] hover:bg-[#d4ba97] text-[#111111] font-medium text-[14px] rounded-[8px] transition-colors duration-150 shadow-sm">
          <Plus className="w-4 h-4" />{t.add}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-[#666666]"><Loader2 className="w-5 h-5 animate-spin mr-2" />{t.loading}</div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#161616] border border-[#222222] rounded-[8px] gap-4">
          <div className="w-16 h-16 rounded-full bg-[#111111] flex items-center justify-center text-[#666666] mb-2 border border-[#222222]">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-[18px] font-semibold text-[#F0F0F0] mb-1">{t.empty}</h3>
            <p className="text-[14px] text-[#666666] max-w-sm">{t.emptySub}</p>
          </div>
          <button onClick={openAdd} className="mt-4 px-[20px] h-[40px] bg-[#C4A882] hover:bg-[#d4ba97] text-[#111111] font-medium text-[14px] rounded-[8px] transition-colors duration-150 shadow-sm">
            {t.add}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
          {services.map((s: any) => (
            <div key={s.id} className="bg-[#161616] border border-[#222222] p-[24px] rounded-[8px] hover:border-[#C4A882] transition-colors duration-300 group flex flex-col">
              <div className="flex justify-between items-start mb-[16px]">
                <div className="w-10 h-10 bg-[#111111] border border-[#222222] rounded-full flex items-center justify-center text-[#C4A882]"><Layout className="w-5 h-5" /></div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-[#666666] hover:text-[#C4A882] rounded-[6px] transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 text-[#666666] hover:text-[#ef4444] rounded-[6px] transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-[16px] font-semibold text-[#F0F0F0] mb-1">{s[locale]?.title || s.en?.title}</h3>
              <p className="text-[14px] text-[#cccccc] line-clamp-2 mb-6">{s[locale]?.subtitle || s.en?.subtitle}</p>
              
              <div className="mt-auto pt-[16px] border-t border-[#222222] flex justify-between items-center text-[12px]">
                <span className="font-medium text-[#666666] uppercase tracking-[1px] text-[10px]">Ord {s.order}</span>
                {s.published ? (
                   <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C2B22] text-[#4ADE80]">Public</span>
                ) : (
                   <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1A1A1A] text-[#666666] border border-[#222222]">Draft</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#161616] border border-[#222222] rounded-[8px] w-full max-w-3xl my-8 relative">
            <div className="flex items-center justify-between p-6 border-b border-[#222222]">
              <h2 className="text-[18px] font-bold text-[#F0F0F0]">{modal.mode === "add" ? t.add : t.edit}</h2>
              <button onClick={closeModal} className="text-[#666666] hover:text-[#F0F0F0] transition-colors">✕</button>
            </div>
            <div className="p-[24px] space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
              <ImageUploader folder="services" label={t.fields.image} value={modal.data.image} onChange={(url) => setField("image", url)} />
              
              <div className="grid grid-cols-2 gap-[20px]">
                <div><label className={lbl}>{t.fields.slug}</label><input className={inp} value={modal.data.slug} onChange={e => setField("slug", e.target.value)} /></div>
                <div><label className={lbl}>{t.fields.order}</label><input type="number" className={inp} value={modal.data.order} onChange={e => setField("order", parseInt(e.target.value) || 0)} /></div>
              </div>

              <div className="space-y-6 pt-2">
                <h3 className="text-[16px] font-semibold text-[#F0F0F0] mb-2">Translations</h3>
                {(["en", "fr", "ar"] as const).map(lang => (
                  <div key={lang} className="bg-[#111111] rounded-[8px] border border-[#222222] p-[24px] space-y-4">
                    <span className="inline-block px-2 py-0.5 bg-[#161616] border border-[#222222] rounded-[4px] text-[10px] font-bold text-[#C4A882] tracking-[1px] uppercase">{lang}</span>
                    <div><label className={lbl}>{t.fields.title}</label><input className={inp} value={modal.data[lang]?.title} onChange={e => setField(`${lang}.title`, e.target.value)} /></div>
                    <div><label className={lbl}>{t.fields.subtitle}</label><input className={inp} value={modal.data[lang]?.subtitle} onChange={e => setField(`${lang}.subtitle`, e.target.value)} /></div>
                    <div><label className={lbl}>{t.fields.description}</label><textarea className={`${inp} resize-none h-24 py-2`} value={modal.data[lang]?.description} onChange={e => setField(`${lang}.description`, e.target.value)} /></div>
                    <div><label className={lbl}>{t.fields.features}</label><input className={inp} value={modal.data[lang]?.features?.join(", ")} onChange={e => setField(`${lang}.features`, e.target.value.split(",").map((s:string)=>s.trim()))} /></div>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-3 cursor-pointer pt-6 border-t border-[#222222]">
                <div className={`w-9 h-5 rounded-full relative transition-colors ${modal.data.published ? "bg-[#C4A882]" : "bg-[#222222]"}`} onClick={() => setField("published", !modal.data.published)}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${modal.data.published ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-[14px] font-medium text-[#cccccc]">{t.fields.published}</span>
              </label>
            </div>
            <div className={`flex justify-end gap-3 p-[24px] border-t border-[#222222] bg-[#111111] rounded-b-[8px] ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button onClick={closeModal} className="px-4 h-[40px] rounded-[8px] text-[14px] font-medium text-[#666666] hover:text-[#F0F0F0] hover:bg-[#181818] transition-colors duration-150">{t.cancel}</button>
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
