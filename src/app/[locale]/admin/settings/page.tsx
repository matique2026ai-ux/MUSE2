"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { User, Globe, Lock, Bell, CheckCircle2, Loader2 } from "lucide-react";

const i18n = {
  en: {
    title: "System Configuration",
    subtitle: "Manage platform settings and administrator preferences.",
    profile: {
      title: "Administrator Profile",
      description: "Update your display name, email, and contact information.",
      fullName: "Full Name",
      adminEmail: "Admin Email",
      phone: "Phone (Optional)",
    },
    language: {
      title: "Platform Language",
      description: "Set the default language for the administration portal.",
      label: "Default Language",
      options: [
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
        { value: "ar", label: "العربية" },
      ],
    },
    notifications: {
      title: "Notification Preferences",
      description: "Control how and when you receive alerts.",
      toggles: [
        { key: "newInquiry", label: "New Inquiry Received", description: "Alert on every new client message." },
        { key: "projectStatus", label: "Project Status Changed", description: "Notify when a project's status is updated." },
        { key: "weeklyReport", label: "Weekly Summary Report", description: "Receive a weekly digest every Monday." },
      ],
    },
    security: {
      title: "Security & Access",
      description: "Change your password or review active sessions.",
      changePassword: "Change Password",
      revokeSessions: "Revoke All Sessions",
    },
    save: "Save Changes",
    saving: "Saving...",
    saved: "Changes Saved!",
  },
  fr: {
    title: "Configuration du Système",
    subtitle: "Gérez les paramètres de la plateforme et les préférences administrateur.",
    profile: {
      title: "Profil Administrateur",
      description: "Mettez à jour votre nom, email et informations de contact.",
      fullName: "Nom Complet",
      adminEmail: "Email Admin",
      phone: "Téléphone (Optionnel)",
    },
    language: {
      title: "Langue de la Plateforme",
      description: "Définissez la langue par défaut du portail d'administration.",
      label: "Langue par défaut",
      options: [
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
        { value: "ar", label: "العربية" },
      ],
    },
    notifications: {
      title: "Préférences de Notifications",
      description: "Contrôlez comment et quand vous recevez des alertes.",
      toggles: [
        { key: "newInquiry", label: "Nouvelle Demande Reçue", description: "Alerte pour chaque nouveau message client." },
        { key: "projectStatus", label: "Statut Projet Changé", description: "Notifier lors de la mise à jour d'un statut." },
        { key: "weeklyReport", label: "Rapport Hebdomadaire", description: "Recevoir un résumé chaque lundi." },
      ],
    },
    security: {
      title: "Sécurité & Accès",
      description: "Modifiez votre mot de passe ou vérifiez les sessions actives.",
      changePassword: "Changer le Mot de Passe",
      revokeSessions: "Révoquer Toutes les Sessions",
    },
    save: "Enregistrer",
    saving: "Enregistrement...",
    saved: "Modifications Sauvegardées !",
  },
  ar: {
    title: "إعدادات النظام",
    subtitle: "إدارة إعدادات المنصة وتفضيلات المسؤول.",
    profile: {
      title: "الملف الشخصي للمسؤول",
      description: "تحديث اسمك وبريدك الإلكتروني ومعلومات الاتصال.",
      fullName: "الاسم الكامل",
      adminEmail: "بريد المسؤول",
      phone: "الهاتف (اختياري)",
    },
    language: {
      title: "لغة المنصة",
      description: "تعيين اللغة الافتراضية لبوابة الإدارة.",
      label: "اللغة الافتراضية",
      options: [
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
        { value: "ar", label: "العربية" },
      ],
    },
    notifications: {
      title: "تفضيلات الإشعارات",
      description: "التحكم في كيفية وتوقيت استلام التنبيهات.",
      toggles: [
        { key: "newInquiry", label: "استلام رسالة جديدة", description: "تنبيه عند كل طلب عميل جديد." },
        { key: "projectStatus", label: "تغيير حالة المشروع", description: "إشعار عند تحديث حالة مشروع." },
        { key: "weeklyReport", label: "تقرير أسبوعي", description: "تلقي ملخص أسبوعي كل اثنين." },
      ],
    },
    security: {
      title: "الأمان والوصول",
      description: "تغيير كلمة المرور أو مراجعة الجلسات النشطة.",
      changePassword: "تغيير كلمة المرور",
      revokeSessions: "إلغاء جميع الجلسات",
    },
    save: "حفظ التغييرات",
    saving: "جاري الحفظ...",
    saved: "تم حفظ التغييرات!",
  },
};

export default function SettingsPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [form, setForm] = useState({
    fullName: "S-Arch Studio",
    adminEmail: "merlina.curiosity@gmail.com",
    phone: "",
    language: locale,
  });

  const [toggles, setToggles] = useState({
    newInquiry: true,
    projectStatus: true,
    weeklyReport: false,
  });

  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const handleSave = useCallback(async () => {
    setSaveState("saving");
    await new Promise((r) => setTimeout(r, 1000));
    setSaveState("saved");
    // Redirect to the selected language if it changed
    if (form.language !== locale) {
      const newPath = pathname.replace(`/${locale}/`, `/${form.language}/`);
      setTimeout(() => router.push(newPath), 600);
    } else {
      setTimeout(() => setSaveState("idle"), 3000);
    }
  }, [form.language, locale, pathname, router]);

  const sectionCard = "bg-white/[0.02] border border-white/5 rounded-xl p-8 mb-6";
  const sectionHeader = "flex items-start gap-4 mb-7 pb-7 border-b border-white/5";
  const iconBox = "p-2.5 bg-white/5 rounded-lg flex-shrink-0";
  const label = "text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2";
  const input = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-[#A67C52]/50 transition-colors";

  return (
    <div className="p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="text-3xl font-light tracking-wide text-white mb-1">{t.title}</h1>
        <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{t.subtitle}</p>
      </div>

      {/* Profile */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className={iconBox}><User className="w-5 h-5 text-[#A67C52]" /></div>
          <div>
            <h2 className="text-lg font-medium text-white mb-0.5">{t.profile.title}</h2>
            <p className="text-sm text-zinc-500">{t.profile.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={label}>{t.profile.fullName}</label>
            <input className={input} type="text" value={form.fullName} onChange={e => setForm(f => ({...f, fullName: e.target.value}))} />
          </div>
          <div>
            <label className={label}>{t.profile.adminEmail}</label>
            <input className={input} type="email" value={form.adminEmail} onChange={e => setForm(f => ({...f, adminEmail: e.target.value}))} />
          </div>
          <div>
            <label className={label}>{t.profile.phone}</label>
            <input className={input} type="tel" value={form.phone} placeholder="+213 555 0000" onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
          </div>
        </div>
      </div>

      {/* Language */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className={iconBox}><Globe className="w-5 h-5 text-[#A67C52]" /></div>
          <div>
            <h2 className="text-lg font-medium text-white mb-0.5">{t.language.title}</h2>
            <p className="text-sm text-zinc-500">{t.language.description}</p>
          </div>
        </div>
        <div className="max-w-xs">
          <label className={label}>{t.language.label}</label>
          <select
            className={`${input} cursor-pointer`}
            value={form.language}
            onChange={e => setForm(f => ({...f, language: e.target.value}))}
          >
            {t.language.options.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#111]">{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className={iconBox}><Bell className="w-5 h-5 text-[#A67C52]" /></div>
          <div>
            <h2 className="text-lg font-medium text-white mb-0.5">{t.notifications.title}</h2>
            <p className="text-sm text-zinc-500">{t.notifications.description}</p>
          </div>
        </div>
        <div className="space-y-6">
          {t.notifications.toggles.map((tog) => (
            <div key={tog.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-medium text-white">{tog.label}</p>
                <p className="text-sm text-zinc-500 mt-0.5">{tog.description}</p>
              </div>
              <button
                onClick={() => setToggles(prev => ({...prev, [tog.key]: !prev[tog.key as keyof typeof prev]}))}
                className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 focus:outline-none ${toggles[tog.key as keyof typeof toggles] ? 'bg-[#A67C52]' : 'bg-white/10'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${toggles[tog.key as keyof typeof toggles] ? (locale === 'ar' ? 'right-1' : 'left-7') : (locale === 'ar' ? 'right-7' : 'left-1')}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className={iconBox}><Lock className="w-5 h-5 text-[#A67C52]" /></div>
          <div>
            <h2 className="text-lg font-medium text-white mb-0.5">{t.security.title}</h2>
            <p className="text-sm text-zinc-500">{t.security.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            {t.security.changePassword}
          </button>
          <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-colors">
            {t.security.revokeSessions}
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          disabled={saveState !== "idle"}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${
            saveState === "saved"
              ? "bg-emerald-500 text-white"
              : "bg-[#A67C52] hover:bg-[#c4965e] text-black"
          } disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {saveState === "saving" && <Loader2 className="w-4 h-4 animate-spin" />}
          {saveState === "saved" && <CheckCircle2 className="w-4 h-4" />}
          {saveState === "idle" ? t.save : saveState === "saving" ? t.saving : t.saved}
        </button>
      </div>
    </div>
  );
}
