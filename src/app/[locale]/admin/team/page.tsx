"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Users, Loader2, Eye, EyeOff } from "lucide-react";
import { cmsGetAll, cmsAdd, cmsUpdate, cmsDelete } from "@/lib/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { FirestoreTeamMember } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: {
    title: "Team / Office Management",
    subtitle: "Manage the architectural practice leadership and staff.",
    add: "Add Member",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading team...",
    empty: "No team members found.",
    published: "Publicly Visible",
    draft: "Hidden",
    fields: {
      name: "Full Name",
      photo: "Photo",
      published: "Visible on Office page",
      order: "Sort Order",
      roleEn: "Role (EN)",
      roleFr: "Role (FR)",
      roleAr: "Role (AR)",
    },
  },
  fr: {
    title: "Gestion de l'Équipe",
    subtitle: "Gérez la direction et le personnel du cabinet.",
    add: "Ajouter un Membre",
    edit: "Modifier",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    loading: "Chargement...",
    empty: "Aucun membre trouvé.",
    published: "Visible",
    draft: "Masqué",
    fields: {
      name: "Nom Complet",
      photo: "Photo",
      published: "Visible sur la page Office",
      order: "Ordre de tri",
      roleEn: "Rôle (EN)",
      roleFr: "Rôle (FR)",
      roleAr: "Rôle (AR)",
    },
  },
  ar: {
    title: "إدارة الفريق والمكتب",
    subtitle: "إدارة أعضاء الفريق والقيادة المعمارية.",
    add: "إضافة عضو",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري تحميل الفريق...",
    empty: "لا يوجد أعضاء مضافون بعد.",
    published: "مرئي للعامة",
    draft: "مخفي",
    fields: {
      name: "الاسم الكامل",
      photo: "الصورة الشخصية",
      published: "مرئي في صفحة المكتب",
      order: "ترتيب العرض",
      roleEn: "الدور (EN)",
      roleFr: "الدور (FR)",
      roleAr: "الدور (AR)",
    },
  },
};

const emptyMember: Omit<FirestoreTeamMember, "id"> = {
  name: "",
  role: { en: "", fr: "", ar: "" },
  photo: "",
  order: 0,
  published: true,
};

export default function AdminTeamPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [team, setTeam] = useState<FirestoreTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: any; id?: string }>({
    open: false,
    mode: "add",
    data: emptyMember,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await cmsGetAll<FirestoreTeamMember>("team");
      setTeam(data.sort((a,b) => (a.order || 0) - (b.order || 0)));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
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
      await load();
      closeModal();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    setDeleting(id);
    try {
      await cmsDelete("team", id);
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
    <div className="p-6 sm:p-10 lg:p-14 max-w-[1200px] mx-auto w-full">
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
      ) : team.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-xl gap-3 text-zinc-500">
          <p>{t.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m: any) => (
            <div key={m.id} className="bg-white/[0.02] border border-white/5 p-5 rounded-xl transition-all group overflow-hidden">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-white/5">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-zinc-700"><Users className="w-12 h-12" /></div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button onClick={() => openEdit(m)} className="p-2 bg-[#A67C52] text-black rounded-lg transition-transform hover:scale-110"><Pencil className="w-4 h-4" /></button>
                   <button onClick={() => handleDelete(m.id)} className="p-2 bg-red-500 text-white rounded-lg transition-transform hover:scale-110"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-lg font-medium text-white mb-1">{m.name}</h3>
              <p className="text-xs text-[#A67C52] font-mono uppercase tracking-wider">{m.role[locale] || m.role.en}</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-600">ORDER {m.order}</span>
                <span className={m.published ? "text-emerald-400" : "text-zinc-500"}>{m.published ? t.published : t.draft}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl w-full max-w-xl my-8 shadow-2xl">
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
            <div className="p-6 space-y-6">
              <ImageUploader folder="team" label={t.fields.photo} value={modal.data.photo} onChange={(url) => setField("photo", url)} />
              
              <div><label className={lbl}>{t.fields.name}</label><input className={inp} value={modal.data.name} onChange={e => setField("name", e.target.value)} /></div>

              <div className="grid grid-cols-1 gap-4">
                <div><label className={lbl}>{t.fields.roleEn}</label><input className={inp} value={modal.data.role?.en} onChange={e => setField("role.en", e.target.value)} /></div>
                <div><label className={lbl}>{t.fields.roleFr}</label><input className={inp} value={modal.data.role?.fr} onChange={e => setField("role.fr", e.target.value)} /></div>
                <div><label className={lbl}>{t.fields.roleAr}</label><input className={inp} value={modal.data.role?.ar} onChange={e => setField("role.ar", e.target.value)} /></div>
              </div>

              <div><label className={lbl}>{t.fields.order}</label><input type="number" className={inp} value={modal.data.order} onChange={e => setField("order", parseInt(e.target.value) || 0)} /></div>

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
