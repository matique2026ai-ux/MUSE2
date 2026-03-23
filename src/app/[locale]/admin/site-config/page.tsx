"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Loader2, Image as ImageIcon, Globe, Phone, Mail, Instagram, Linkedin, Home } from "lucide-react";
import { cmsGet, cmsUpdate } from "@/lib/cms";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { FirestoreHeroConfig, FirestoreSiteConfig } from "@/lib/cms-types";
import { useParams } from "next/navigation";

const i18n = {
  en: {
    title: "Site Configuration",
    subtitle: "Manage global branding, hero sections, and contact metadata.",
    save: "Save All Changes",
    loading: "Loading configuration...",
    hero: {
      title: "Homepage Hero",
      bg: "Background Image",
      titleEn: "Title (EN)",
      subEn: "Subtitle (EN)",
      titleFr: "Title (FR)",
      subFr: "Subtitle (FR)",
      titleAr: "Title (AR)",
      subAr: "Subtitle (AR)",
    },
    contact: {
      title: "Contact & Identity",
      brand: "Office Name",
      phone: "Phone Number",
      email: "Public Email",
      insta: "Instagram URL",
      link: "LinkedIn URL",
      addrEn: "Address (EN)",
      addrFr: "Address (FR)",
      addrAr: "Address (AR)",
    }
  },
  fr: {
    title: "Configuration du Site",
    subtitle: "Gérez l'image de marque, le hero et les métadonnées de contact.",
    save: "Enregistrer tout",
    loading: "Chargement...",
    hero: {
      title: "Hero Accueil",
      bg: "Image de fond",
      titleEn: "Titre (EN)",
      subEn: "Sous-titre (EN)",
      titleFr: "Titre (FR)",
      subFr: "Sous-titre (FR)",
      titleAr: "Titre (AR)",
      subAr: "Sous-titre (AR)",
    },
    contact: {
      title: "Contact & Identité",
      brand: "Nom du Bureau",
      phone: "Numéro de Téléphone",
      email: "Email Public",
      insta: "Lien Instagram",
      link: "Lien LinkedIn",
      addrEn: "Adresse (EN)",
      addrFr: "Adresse (FR)",
      addrAr: "Adresse (AR)",
    }
  },
  ar: {
    title: "إعدادات الموقع",
    subtitle: "إدارة الهوية البصرية، واجهة الموقع، ومعلومات التواصل.",
    save: "حفظ كافة التغييرات",
    loading: "جاري تحميل الإعدادات...",
    hero: {
      title: "واجهة الصفحة الرئيسية",
      bg: "صورة الخلفية",
      titleEn: "العنوان (EN)",
      subEn: "العنوان الفرعي (EN)",
      titleFr: "العنوان (FR)",
      subFr: "العنوان الفرعي (FR)",
      titleAr: "العنوان (AR)",
      subAr: "العنوان الفرعي (AR)",
    },
    contact: {
      title: "الهوية والتواصل",
      brand: "اسم المكتب",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      insta: "رابط إنستغرام",
      link: "رابط لينكد إن",
      addrEn: "العنوان (EN)",
      addrFr: "العنوان (FR)",
      addrAr: "العنوان (AR)",
    }
  }
};

export default function AdminConfigPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = i18n[locale as keyof typeof i18n] || i18n.en;

  const [hero, setHero] = useState<FirestoreHeroConfig | null>(null);
  const [site, setSite] = useState<FirestoreSiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const h = await cmsGet<FirestoreHeroConfig>("hero_config", "homepage");
      const s = await cmsGet<FirestoreSiteConfig>("site_config", "global");
      setHero(h);
      setSite(s);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!hero || !site) return;
    setSaving(true);
    try {
      await Promise.all([
        cmsUpdate("hero_config", "homepage", hero),
        cmsUpdate("site_config", "global", site),
      ]);
      alert("Settings updated successfully");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const sectionCard = "bg-white/[0.02] border border-white/5 rounded-2xl p-10 mb-8 hover:bg-white/[0.03] transition-colors";
  const sectionHeader = "flex items-start gap-5 mb-8 pb-8 border-b border-white/5";
  const iconBox = "p-3 bg-white/5 rounded-xl flex-shrink-0 text-[#A67C52]";
  const lbl = "text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold block mb-2.5 ml-1";
  const inp = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#A67C52]/50 focus:bg-white/[0.05] transition-all";

  if (loading) return <div className="p-10 flex items-center justify-center text-zinc-500"><Loader2 className="w-5 h-5 animate-spin mr-2" />{t.loading}</div>;

  return (
    <div className="p-6 sm:p-10 lg:p-14 max-w-[1200px] mx-auto w-full">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-3xl font-light tracking-wide text-white mb-1">{t.title}</h1>
          <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{t.subtitle}</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#A67C52] hover:bg-[#c4965e] text-black font-semibold text-sm rounded-lg transition-colors">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {t.save}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* HERO CONFIG */}
        <div className="space-y-8 bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Home className="w-5 h-5 text-[#A67C52]" />
            <h2 className="text-xl font-medium text-white">{t.hero.title}</h2>
          </div>
          
          {hero && (
            <>
              <ImageUploader folder="hero" label={t.hero.bg} value={hero.backgroundImage} onChange={url => setHero({...hero, backgroundImage: url})} />
              
              <div className="space-y-6">
                {(["en", "fr", "ar"] as const).map(l => (
                  <div key={l} className="space-y-3">
                    <p className="text-[10px] font-mono text-[#A67C52] uppercase tracking-[0.2em]">{l.toUpperCase()}</p>
                    <div><label className={lbl}>{t.hero.titleEn}</label><input className={inp} value={hero[l]?.title} onChange={e => setHero({...hero, [l]: {...hero[l], title: e.target.value}})} /></div>
                    <div><label className={lbl}>{t.hero.subEn}</label><textarea className={`${inp} resize-none`} rows={2} value={hero[l]?.subtitle} onChange={e => setHero({...hero, [l]: {...hero[l], subtitle: e.target.value}})} /></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CONTACT & SITE CONFIG */}
        <div className="space-y-8 bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Globe className="w-5 h-5 text-[#A67C52]" />
            <h2 className="text-xl font-medium text-white">{t.contact.title}</h2>
          </div>

          {site && (
            <div className="space-y-6">
              <div><label className={lbl}>{t.contact.brand}</label><input className={inp} value={site.officeName} onChange={e => setSite({...site, officeName: e.target.value})} /></div>
              
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lbl}>{t.contact.phone}</label><div className="relative"><Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-600" /><input className={`${inp} pl-10`} value={site.phone} onChange={e => setSite({...site, phone: e.target.value})} /></div></div>
                <div><label className={lbl}>{t.contact.email}</label><div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-600" /><input className={`${inp} pl-10`} value={site.email} onChange={e => setSite({...site, email: e.target.value})} /></div></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><label className={lbl}>{t.contact.insta}</label><div className="relative"><Instagram className="absolute left-3 top-3 w-4 h-4 text-zinc-600" /><input className={`${inp} pl-10`} value={site.instagram} onChange={e => setSite({...site, instagram: e.target.value})} /></div></div>
                <div><label className={lbl}>{t.contact.link}</label><div className="relative"><Linkedin className="absolute left-3 top-3 w-4 h-4 text-zinc-600" /><input className={`${inp} pl-10`} value={site.linkedin} onChange={e => setSite({...site, linkedin: e.target.value})} /></div></div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                {(["en", "fr", "ar"] as const).map(l => (
                  <div key={l}>
                    <label className={lbl}>{t.contact.addrEn} ({l.toUpperCase()})</label>
                    <input className={inp} value={site.address?.[l]} onChange={e => setSite({...site, address: {...site.address, [l]: e.target.value}})} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
