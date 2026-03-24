"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Mail, Settings, ArrowLeft, Layout, Users, Globe, Search, Bell } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

interface AdminLayoutTranslations {
  brand: string;
  portal: string;
  nav: {
    overview: string;
    projects: string;
    services: string;
    team: string;
    config: string;
    inquiries: string;
    settings: string;
  };
  back: string;
  logout: string;
}

export function AdminSidebar({ locale, t }: { locale: string, t: AdminLayoutTranslations }) {
  const pathname = usePathname();

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
    <aside className="w-[260px] flex-shrink-0 bg-[#111111] border-r border-[#222222] flex flex-col justify-between h-screen sticky top-0 hidden lg:flex">
      <div>
        <div className="h-20 px-6 flex items-center border-b border-[#222222]">
          <Link href={`/${locale}/admin`} className="flex flex-col">
            <span className="text-xl font-bold tracking-wide text-[#F0F0F0] flex items-center gap-1 font-sans">
              S-ARCH<span className="text-[#C4A882] p-0 m-0">.</span>
            </span>
            <span className="text-[10px] text-[#444444] tracking-[3px] font-semibold mt-0.5">
              {t.portal}
            </span>
          </Link>
        </div>
        
        <nav className="py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const href = `/${locale}${item.href}`;
            const isActive = item.key === 'overview' 
              ? pathname === href || pathname === `${href}/`
              : pathname === href || pathname?.startsWith(`${href}/`);
              
            return (
              <Link
                key={item.key}
                href={href}
                className={`flex items-center gap-3 px-3 h-[40px] rounded-r-md text-[14px] font-sans transition-all duration-150 ${
                  isActive 
                    ? "bg-[#1A1A1A] text-[#F0F0F0] border-l-2 border-[#C4A882]" 
                    : "text-[#666666] hover:text-[#F0F0F0] hover:bg-[#181818] border-l-2 border-transparent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {t.nav[item.key as keyof typeof t.nav]}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="py-4 px-3 border-t border-[#222222] space-y-1">
        <Link 
          href={`/${locale}`}
          className="flex items-center gap-3 px-3 h-[40px] text-[14px] font-sans text-[#555555] hover:text-[#F0F0F0] hover:bg-[#181818] rounded-md transition-all duration-150"
        >
          <ArrowLeft className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
          {t.back}
        </Link>
        <div className="px-3 h-[40px] flex items-center">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}

export function AdminTopbar({ locale, t }: { locale: string, t: AdminLayoutTranslations }) {
  const pathname = usePathname();
  
  const segments = pathname?.replace(`/${locale}/admin`, "").split("/").filter(Boolean) || [];
  const currentPage = segments.length > 0 ? segments[0] : "overview";
  const title = t.nav[currentPage as keyof typeof t.nav] || t.nav.overview;

  return (
    <header 
      className="h-[72px] bg-[#0C0C0C] border-b border-[#222222] flex items-center justify-between flex-shrink-0 z-20 overflow-hidden"
    >
      <div className="flex items-center gap-2 text-[14px] font-sans">
        <span className="text-[#666666]">Admin</span>
        <span className="text-[#444444]">/</span>
        <span className="text-[#F0F0F0] font-medium">{title}</span>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-[14px] text-[#cccccc] rounded-[8px] pl-9 pr-4 h-[38px] w-[180px] xl:w-[240px] focus:outline-none focus:border-[#C4A882]/50 transition-colors placeholder:text-[#666666] font-sans"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-[#666666] hover:text-[#F0F0F0] transition-colors relative flex items-center">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C4A882] rounded-full ring-2 ring-[#0C0C0C]"></span>
          </button>

          <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[12px] font-medium text-[#F0F0F0]">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
