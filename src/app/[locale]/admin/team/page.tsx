"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Users, Loader2, UserPlus } from "lucide-react";
import { cmsGetAll, cmsAdd, cmsUpdate, cmsDelete } from "@/lib/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { FirestoreTeamMember } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: { add: "Add Member", edit: "Edit", delete: "Delete", save: "Save Member", cancel: "Cancel", loading: "Loading team...", empty: "No team members found.", emptySub: "Add members to showcase your architectural staff.", published: "Visible", draft: "Hidden", fields: { name: "Full Name", photo: "Photo", published: "Visible on page", order: "Sort Order", roleEn: "Role (EN)", roleFr: "Role (FR)", roleAr: "Role (AR)" } },
  fr: { add: "Ajouter un Membre", edit: "Modifier", delete: "Supprimer", save: "Enregistrer", cancel: "Annuler", loading: "Chargement...", empty: "Aucun membre trouvé.", emptySub: "Ajoutez des membres à l'équipe architecturale.", published: "Visible", draft: "Masqué", fields: { name: "Nom Complet", photo: "Photo", published: "Visible sur la page", order: "Ordre de tri", roleEn: "Rôle (EN)", roleFr: "Rôle (FR)", roleAr: "Rôle (AR)" } },
  ar: { add: "إضافة عضو", edit: "تعديل", delete: "حذف", save: "حفظ", cancel: "إلغاء", loading: "جاري تحميل الفريق...", empty: "لا يوجد أعضاء مضافون بعد.", emptySub: "أضف أعضاء الفريق لعرض قيادة الاستوديو.", published: "مرئي", draft: "مخفي", fields: { name: "الاسم الكامل", photo: "الصورة الشخصية", published: "مرئي في الصفحة", order: "ترتيب العرض", roleEn: "الدور (EN)", roleFr: "الدور (FR)", roleAr: "الدور (AR)" } },
};

const emptyMember: Omit<FirestoreTeamMember, "id"> = { name: "", role: { en: "", fr: "", ar: "" }, photo: "", order: 0, published: true };

export default function AdminTeamPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [team, setTeam] = useState<FirestoreTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: any; id?: string }>({ open: false, mode: "add", data: emptyMember });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setTeam((await cmsGetAll<FirestoreTeamMember>("team")).sort((a,b) => (a.order || 0) - (b.order || 0))); } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...emptyMember } });
  const openEdit = (m: any) => setModal({ open: true, mode: "edit", data: { ...m }, id: m.id });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...modal.data };
      if (modal.mode === "add") await cmsAdd("team", data);
      else if (modal.id) await cmsUpdate("team", modal.id, data);
      await load(); closeModal();
    } catch (e) { console.error(e); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    setDeleting(id);
    try { await cmsDelete("team", id); await load(); } finally { setDeleting(null); }
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
      ) : team.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#161616] border border-[#222222] rounded-[8px] gap-4">
          <div className="w-16 h-16 rounded-full bg-[#111111] flex items-center justify-center text-[#666666] mb-2 border border-[#222222]">
            <UserPlus className="w-8 h-8" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[20px]">
          {team.map((m: any) => (
            <div key={m.id} className="bg-[#161616] border border-[#222222] p-4 rounded-[8px] group relative flex flex-col hover:border-[#C4A882] transition-colors duration-300">
              <div className="relative aspect-[4/5] rounded-[6px] bg-[#111111] border border-[#222222] overflow-hidden mb-4">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-[#666666]"><Users className="w-10 h-10" /></div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => openEdit(m)} className="p-1.5 bg-[#161616] text-[#C4A882] border border-[#222222] rounded-[6px] shadow-sm hover:bg-[#C4A882] hover:text-[#111111] transition-colors"><Pencil className="w-4 h-4" /></button>
                   <button onClick={() => handleDelete(m.id)} className="p-1.5 bg-[#161616] text-red-400 border border-[#222222] rounded-[6px] shadow-sm hover:bg-red-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-[#F0F0F0] mb-0.5">{m.name}</h3>
              <p className="text-[12px] text-[#cccccc] mb-4">{m.role[locale] || m.role.en}</p>
              
              <div className="mt-auto pt-3 border-t border-[#222222] flex justify-between items-center text-[10px] font-mono uppercase tracking-[1px]">
                <span className="text-[#666666] font-medium">ORD {m.order}</span>
                {m.published ? (
                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1C2B22] text-[#4ADE80]">Visible</span>
                ) : (
                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1A1A1A] text-[#666666] border border-[#222222]">Hidden</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#161616] border border-[#222222] rounded-[8px] w-full max-w-xl my-8 relative">
            <div className="flex items-center justify-between p-6 border-b border-[#222222]">
              <h2 className="text-[18px] font-bold text-[#F0F0F0]">{modal.mode === "add" ? t.add : t.edit}</h2>
              <button onClick={closeModal} className="text-[#666666] hover:text-[#F0F0F0] transition-colors">✕</button>
            </div>
            <div className="p-[24px] space-y-6">
              <ImageUploader folder="team" label={t.fields.photo} value={modal.data.photo} onChange={(url) => setField("photo", url)} />
              
              <div><label className={lbl}>{t.fields.name}</label><input className={inp} value={modal.data.name} onChange={e => setField("name", e.target.value)} /></div>

              <div className="space-y-4 pt-2">
                <h3 className="text-[16px] font-semibold text-[#F0F0F0]">Role Translations</h3>
                <div className="bg-[#111111] rounded-[8px] border border-[#222222] p-4 space-y-4">
                  <div><label className={lbl}>{t.fields.roleEn}</label><input className={inp} value={modal.data.role?.en} onChange={e => setField("role.en", e.target.value)} /></div>
                  <div><label className={lbl}>{t.fields.roleFr}</label><input className={inp} value={modal.data.role?.fr} onChange={e => setField("role.fr", e.target.value)} /></div>
                  <div><label className={lbl}>{t.fields.roleAr}</label><input className={inp} value={modal.data.role?.ar} onChange={e => setField("role.ar", e.target.value)} /></div>
                </div>
              </div>

              <div><label className={lbl}>{t.fields.order}</label><input type="number" className={inp} value={modal.data.order} onChange={e => setField("order", parseInt(e.target.value) || 0)} /></div>

              <label className="flex items-center gap-3 cursor-pointer pt-4 border-t border-[#222222]">
                <div className={`w-9 h-5 rounded-full relative transition-colors ${modal.data.published ? "bg-[#C4A882]" : "bg-[#222222]"}`} onClick={() => setField("published", !modal.data.published)}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${modal.data.published ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-[14px] font-medium text-[#cccccc]">{t.fields.published}</span>
              </label>
            </div>
            <div className={`flex justify-end gap-3 p-[24px] border-t border-[#222222] bg-[#111111] rounded-b-[8px] ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button onClick={closeModal} className="px-4 h-[40px] rounded-[8px] text-[14px] font-medium text-[#666666] hover:text-[#F0F0F0] hover:bg-[#181818] transition-colors duration-150">{t.cancel}</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 h-[40px] bg-[#C4A882] hover:bg-[#d4ba97] text-[#111111] font-medium text-[14px] rounded-[8px] transition-colors duration-150">
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
