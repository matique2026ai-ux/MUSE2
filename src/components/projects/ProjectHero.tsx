'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectHeroProps {
  title: string;
  category: string;
  location: string;
  year: string;
  officeRole?: string;
  heroImage: string;
  isRTL: boolean;
}

export default function ProjectHero({ 
  title, 
  category,
  location, 
  year, 
  officeRole,
  heroImage,
  isRTL 
}: ProjectHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A0A0A]"
      style={{ height: 'calc(100vh - 4.5rem)', minHeight: '500px' }}
    >
      {/* ── Full-bleed image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* ── Gradient layers ── */}
      {/* Bottom-to-top: makes title area legible without being overpowering */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 15%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.0) 70%)',
        }}
      />
      {/* Top-to-bottom: makes breadcrumbs legible */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 25%)',
        }}
      />

      {/* ── Content ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end items-start"
        style={{ 
          paddingInlineStart: '10rem',
          paddingBottom: '10rem'
        }}
      >
        {/* ── TITLE ── */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={`font-light mb-10 leading-none ${
            isRTL
              ? 'text-2xl sm:text-3xl md:text-4xl leading-[1.2]'
              : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.04em]'
          }`}
          style={{
            color: '#FFFFFF',
            maxWidth: isRTL ? '80%' : '75%',
            textShadow: '0 2px 32px rgba(0,0,0,0.95), 0 4px 80px rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </motion.h1>

        {/* ── Core Metadata under title ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col gap-2 mb-12"
        >
          <div className="flex items-center gap-4 text-white/90">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C8A97E]">
              {category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="font-light text-sm tracking-wide">
              {location}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="font-light text-sm tracking-wide">
              {year}
            </span>
          </div>
          {officeRole && (
            <div className="text-white/60 font-light text-sm tracking-wide">
              {officeRole}
            </div>
          )}
        </motion.div>
      </div>

    </section>
  );
}
