import { ReactNode } from "react";
import Link from "next/link";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { LayoutDashboard, FolderKanban, Mail, Settings, ArrowLeft, Layout, Users, Globe } from "lucide-react";

const translationsData = {
  en: {
    brand: "S-ARCH",
    portal: "ADMIN PORTAL",
    nav: {
      overview: "Overview",
      projects: "Projects Matrix",
      services: "Services",
      team: "Team / Office",
      config: "Site Config",
      inquiries: "Inbox / CRM",
      settings: "User Settings"
    },
    back: "Back to Website",
    logout: "Secure Logout"
  },
  fr: {
    brand: "S-ARCH",
    portal: "PORTAIL ADMIN",
    nav: {
      overview: "Aperçu",
      projects: "Matrice des Projets",
      services: "Services",
      team: "Équipe",
      config: "Config Site",
      inquiries: "Boîte de Réception",
      settings: "Profil"
    },
    back: "Retour au site",
    logout: "Déconnexion"
  },
  ar: {
    brand: "إس-آرتش",
    portal: "بوابة الإدارة",
    nav: {
      overview: "نظرة عامة",
      projects: "إدارة المشاريع",
      services: "الخدمات",
      team: "فريق العمل",
      config: "إعدادات الموقع",
      inquiries: "الرسائل الواردة",
      settings: "الملف الشخصي"
    },
    back: "العودة للموقع العام",
    logout: "تسجيل الخروج الآمن"
  }
};

export default async function AdminLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = translationsData[locale as keyof typeof translationsData] || translationsData.en;
  
  // Define navigation array for map
  const navItems = [
    { key: 'overview', href: `/admin`, icon: LayoutDashboard },
    { key: 'projects', href: `/admin/projects`, icon: FolderKanban },
    { key: 'services', href: `/admin/services`, icon: Layout },
    { key: 'team', href: `/admin/team`, icon: Users },
    { key: 'config', href: `/admin/site-config`, icon: Globe },
    { key: 'inquiries', href: `/admin/inquiries`, icon: Mail },
    { key: 'settings', href: `/admin/settings`, icon: Settings },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#020202] p-4 sm:p-8 lg:p-12 flex items-center justify-center font-sans selection:bg-[#A67C52] selection:text-black">
        {/* The Floating Console Box */}
        <div className="w-full flex-1 min-h-[calc(100vh-6rem)] bg-[#050505] text-white flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl shadow-black border border-white/5 relative">

        
        {/* Sidebar - Fix width */}
        <aside className="w-full lg:w-[340px] flex-shrink-0 bg-[#070707] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
          <div>
            {/* Admin Header Logo */}
            <div className="h-32 px-12 flex items-center border-b border-white/5">
              <Link href={`/${locale}/admin`} className="flex flex-col gap-1">
                <span className="text-xl font-medium tracking-[0.2em] uppercase text-white">
                  {t.brand}<span className="text-[#A67C52]">.</span>
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                  {t.portal}
                </span>
              </Link>
            </div>
            
            {/* Primary Navigation */}
            <nav className="py-8 px-6 space-y-2">
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest px-6 mb-4 block">Main Menu</span>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="flex items-center gap-5 px-6 py-4 text-base text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors group"
                >
                  <item.icon className="w-4 h-4 text-zinc-500 group-hover:text-[#A67C52] transition-colors" />
                  <span className="font-medium tracking-wide">{t.nav[item.key as keyof typeof t.nav]}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="py-8 px-6 pb-24 border-t border-white/5 space-y-3">
            <Link 
              href={`/${locale}`}
              className="flex items-center gap-5 px-6 py-4 text-base text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className={`w-4 h-4 text-zinc-500 group-hover:text-white transition-colors ${locale === 'ar' ? 'rotate-180' : ''}`} />
              <span className="font-medium tracking-wide">{t.back}</span>
            </Link>
            <LogoutButton />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#050505] overflow-y-auto h-screen relative">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.015] z-0"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '3rem 3rem'
            }}
          />
          <div className="relative z-10 w-full min-h-full">
            {children}
          </div>
        </main>
        </div>
      </div>
    </AdminGuard>
  );
}
