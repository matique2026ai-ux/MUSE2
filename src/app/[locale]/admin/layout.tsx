import { ReactNode } from "react";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { AdminSidebar, AdminTopbar } from "@/components/admin/AdminLayoutComponents";

const translationsData = {
  en: {
    brand: "S-ARCH",
    portal: "ADMIN PORTAL",
    nav: {
      overview: "Overview",
      projects: "Projects",
      services: "Services",
      team: "Team",
      config: "Settings",
      inquiries: "Inbox",
      settings: "Profile"
    },
    back: "Back to Website",
    logout: "Secure Logout"
  },
  fr: {
    brand: "S-ARCH",
    portal: "PORTAIL ADMIN",
    nav: {
      overview: "Aperçu",
      projects: "Projets",
      services: "Services",
      team: "Équipe",
      config: "Paramètres",
      inquiries: "Boîte",
      settings: "Profil"
    },
    back: "Retour au site",
    logout: "Déconnexion"
  },
  ar: {
    brand: "إس-آرتش",
    portal: "بوابة الإدارة",
    nav: {
      overview: "الرئيسية",
      projects: "المشاريع",
      services: "الخدمات",
      team: "الفريق",
      config: "الإعدادات",
      inquiries: "البريد",
      settings: "الملف الشخصي"
    },
    back: "العودة للموقع",
    logout: "خروج"
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

  return (
    <AdminGuard>
      <div className="admin-shell h-screen w-full bg-[#0C0C0C] text-[#F0F0F0] font-sans flex overflow-hidden">
        {/* Sidebar Left */}
        <div className="w-[260px] flex-shrink-0">
          <AdminSidebar locale={locale} t={t} />
        </div>
        
        {/* Main Right Column — Absolute Containment Grid */}
        <div className="flex-1 min-w-0 h-screen grid grid-rows-[72px_1fr] grid-cols-[40px_1fr_40px] overflow-hidden bg-[#0C0C0C]">
          {/* Top Navbar Row */}
          <div className="col-start-2 col-end-3 row-start-1">
            <AdminTopbar locale={locale} t={t} />
          </div>
          
          {/* Scrollable Content Row */}
          <main className="col-start-2 col-end-3 row-start-2 overflow-y-auto pt-8 pb-10">
            {children}
          </main>

          {/* Reserved Margin Tracks (Optional: can add bg if needed) */}
          <div className="col-start-1 col-end-2 row-start-1 row-end-3 border-b border-[#222222] h-[72px]" />
          <div className="col-start-3 col-end-4 row-start-1 row-end-3 border-b border-[#222222] h-[72px]" />
        </div>
      </div>
    </AdminGuard>
  );
}
