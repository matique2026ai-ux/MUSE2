import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <div className="min-h-svh bg-[#050505] selection:bg-[#A67C52] selection:text-black w-full flex flex-col lg:grid lg:grid-cols-[55%_45%] overflow-hidden relative">
      {/* Media Pane - 55% Width */}
      <div className="relative h-[30vh] lg:h-svh w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 order-1 lg:order-none">
        {/* Subtle Ken Burns Zoom Effect via CSS */}
        <div className="absolute inset-0 z-0 animate-[ken-burns_30s_ease-in-out_infinite_alternate]">
          <Image
            src="/images/projects/civic-hub-hero.jpg"
            alt="S-Arch Architectural Vision"
            fill
            className="object-cover opacity-50 grayscale brightness-75"
            priority
          />
        </div>
        
        {/* Gradient Overlays for integration */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-80 z-10" />
        <div className="absolute inset-0 bg-[#A67C52]/5 mix-blend-color-burn z-10" />
        
        {/* Brand Watermark */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20 hidden lg:block drop-shadow-lg">
          <Link href={`/${locale}`} className="text-xl font-medium tracking-[0.3em] uppercase !text-white hover:!text-[#A67C52] transition-colors duration-500">
            S-ARCH<span className="!text-[#A67C52]">.</span>
          </Link>
        </div>
      </div>

      {/* Form Pane - 45% Width */}
      <div className="relative h-[70vh] lg:h-svh w-full bg-[#050505] flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 z-20 order-2 lg:order-none overflow-y-auto custom-scrollbar">
        {/* Subtle Architectural Grid Background inside Form Pane */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '3rem 3rem'
          }}
        />
        
        {/* Mobile Header (Shows only on small screens) */}
        <div className="absolute top-6 left-6 z-20 lg:hidden">
            <Link href={`/${locale}`} className="text-sm font-medium tracking-[0.2em] uppercase !text-white">
              S-ARCH<span className="!text-[#A67C52]">.</span>
            </Link>
        </div>

        <div className="relative z-10 w-full max-w-[440px] mx-auto py-12 lg:py-0">
          {children}
        </div>
        
        {/* Footer info */}
        <div className="absolute bottom-6 left-0 right-0 text-center lg:left-12 lg:right-auto lg:text-left z-20">
          <p className="text-[10px] uppercase tracking-widest !text-white/40 font-mono">
              &copy; {new Date().getFullYear()} S-Arch Studio. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
