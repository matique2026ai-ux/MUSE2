"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, Clock, CheckCircle, AlertCircle, Archive, Loader2, Trash2 } from "lucide-react";
import { cmsGetAll, cmsUpdate, cmsDelete } from "@/lib/cms";
import type { FirestoreInquiry } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: {
    title: "Inbox / CRM", subtitle: "Live client inquiry management.",
    columns: ["Client", "Subject", "Contact", "Received", "Status", ""],
    status: { new: "New", responded: "Responded", archived: "Archived" },
    actions: { markResponded: "Mark Responded", archive: "Archive", delete: "Delete" },
    loading: "Loading inquiries...", empty: "No inquiries yet.",
    stats: ["Total", "Unread", "Responded", "Archived"],
  },
  fr: {
    title: "Boîte de Réception / CRM", subtitle: "Gestion en direct des demandes clients.",
    columns: ["Client", "Sujet", "Contact", "Reçu", "Statut", ""],
    status: { new: "Nouveau", responded: "Répondu", archived: "Archivé" },
    actions: { markResponded: "Marquer comme répondu", archive: "Archiver", delete: "Supprimer" },
    loading: "Chargement...", empty: "Aucune demande.",
    stats: ["Total", "Non lues", "Répondues", "Archivées"],
  },
  ar: {
    title: "الرسائل الواردة / CRM", subtitle: "إدارة مباشرة لاستشارات العملاء.",
    columns: ["العميل", "الموضوع", "التواصل", "التاريخ", "الحالة", ""],
    status: { new: "جديد", responded: "تم الرد", archived: "مؤرشف" },
    actions: { markResponded: "تحديد كـ مُجاب", archive: "أرشفة", delete: "حذف" },
    loading: "جاري التحميل...", empty: "لا توجد رسائل بعد.",
    stats: ["الإجمالي", "غير مقروءة", "تم الرد عليها", "مؤرشفة"],
  },
};

const statusStyles: Record<string, { style: string; icon: React.ElementType }> = {
  new: { style: "bg-[#A67C52]/10 text-[#A67C52] border border-[#A67C52]/20", icon: AlertCircle },
  responded: { style: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", icon: CheckCircle },
  archived: { style: "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20", icon: Archive },
};

export default function AdminInquiriesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [inquiries, setInquiries] = useState<(FirestoreInquiry & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await cmsGetAll<FirestoreInquiry>("inquiries");
      setInquiries(data as (FirestoreInquiry & { id: string })[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: FirestoreInquiry["status"]) => {
    setActing(id);
    await cmsUpdate<FirestoreInquiry>("inquiries", id, { status });
    await load();
    setActing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry permanently?")) return;
    setActing(id);
    await cmsDelete("inquiries", id);
    await load();
    setActing(null);
  };

  const stats = [
    inquiries.length,
    inquiries.filter(i => i.status === "new").length,
    inquiries.filter(i => i.status === "responded").length,
    inquiries.filter(i => i.status === "archived").length,
  ];

  return (
    <div className="p-6 sm:p-10 lg:p-14 max-w-[1600px] mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-wide text-white mb-1">{t.title}</h1>
        <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{t.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {t.stats.map((label, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.03] transition-colors">
            <p className="text-3xl font-light text-white mb-2">{loading ? "—" : stats[i]}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-mono font-semibold">{label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-zinc-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />{t.loading}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex items-center justify-center h-40 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-xl text-zinc-500">
          {t.empty}
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.03]">
                  {t.columns.map((col, i) => (
                    <th key={i} className="px-8 py-5 text-left text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.map((row) => {
                  const s = statusStyles[row.status] || statusStyles.new;
                  const StatusIcon = s.icon;
                  const isActing = acting === row.id;
                  return (
                    <tr key={row.id} className={`hover:bg-white/[0.03] border-b border-white/[0.02] transition-colors group ${row.status === 'new' ? 'bg-[#A67C52]/[0.02]' : ''}`}>
                      <td className="px-8 py-6">
                        <p className="font-medium text-white whitespace-nowrap">{row.name}</p>
                        <p className="text-[10px] text-zinc-600 font-mono mt-0.5">{row.locale?.toUpperCase()}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-zinc-300 max-w-[250px] truncate font-medium">{row.subject}</p>
                        {row.message && <p className="text-xs text-zinc-500 mt-1 max-w-[250px] line-clamp-1">{row.message}</p>}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1.5">
                          <span className="flex items-center gap-2 text-xs text-zinc-400 font-mono"><Mail className="w-3.5 h-3.5 text-[#A67C52]/50" />{row.email}</span>
                          {row.phone && <span className="flex items-center gap-2 text-xs text-zinc-400 font-mono"><Phone className="w-3.5 h-3.5 text-[#A67C52]/50" />{row.phone}</span>}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase tracking-tighter">
                          <Clock className="w-3 h-3 text-zinc-600" />
                          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest w-fit font-bold ${s.style}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {t.status[row.status as keyof typeof t.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isActing ? (
                            <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
                          ) : (
                            <>
                              {row.status === "new" && (
                                <button onClick={() => updateStatus(row.id, "responded")} className="text-xs text-emerald-400 hover:text-emerald-300 font-mono uppercase whitespace-nowrap">
                                  ✓ {t.actions.markResponded}
                                </button>
                              )}
                              {row.status !== "archived" && (
                                <button onClick={() => updateStatus(row.id, "archived")} className="text-xs text-zinc-500 hover:text-zinc-300 font-mono uppercase">
                                  {t.actions.archive}
                                </button>
                              )}
                              <button onClick={() => handleDelete(row.id)} className="text-xs text-red-500/60 hover:text-red-400 font-mono uppercase flex items-center gap-1">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          )}
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
    </div>
  );
}
