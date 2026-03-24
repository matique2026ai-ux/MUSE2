'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  slug: string;
  locale: Locale;
  isRtl: boolean;
  image?: string;
}

const labels = {
  en: { serviceDetail: 'Service Detail', home: 'Home', services: 'Services', scroll: 'Scroll to explore' },
  fr: { serviceDetail: 'Détail du Service', home: 'Accueil', services: 'Services', scroll: 'Défiler pour explorer' },
  ar: { serviceDetail: 'تفاصيل الخدمة', home: 'الرئيسية', services: 'الخدمات', scroll: 'قم بالتمرير للاستكشاف' }
};

export const ServiceHero: React.FC<ServiceHeroProps> = ({ title, subtitle, slug, locale, isRtl, image }) => {
  const t = labels[locale];
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const transitionConfig = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: transitionConfig }
  };

  return (
    <section 
      ref={ref}
      style={{ 
        minHeight: '85vh',
        width: '100%',
        backgroundColor: 'var(--color-surface-0)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--header-height)',
        borderBottom: '1px solid var(--color-hairline)'
      }}
    >
      {/* Structure: If there is an image, split the layout. If no image, go highly typographical. */}
      {image && (
        <motion.div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: isRtl ? 0 : 'auto',
            right: isRtl ? 'auto' : 0,
            width: '45%',
            height: '100%',
            y: yImage,
            zIndex: 1
          }}
        >
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(20%) contrast(1.1)',
            }}
          />
          {/* Subtle gradient to blend into the surface */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: isRtl 
              ? 'linear-gradient(to right, transparent 0%, var(--color-surface-0) 100%)' 
              : 'linear-gradient(to left, transparent 0%, var(--color-surface-0) 100%)' 
          }} />
        </motion.div>
      )}

      {/* Very bold, faint background letter for texture */}
      {!image && (
        <div style={{ 
          position: 'absolute', 
          right: isRtl ? 'auto' : '-5%', 
          left: isRtl ? '-5%' : 'auto', 
          bottom: '-5%', 
          fontSize: '40vw', 
          fontWeight: 900, 
          color: 'var(--color-surface-1)', 
          opacity: 0.6, 
          userSelect: 'none', 
          pointerEvents: 'none',
          lineHeight: 0.75,
          zIndex: 0
        }}>
          {slug.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Main Content Container */}
      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 3, 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '6rem'
      }}>
        
        <motion.div 
          style={{ y: yText, opacity: opacityText, width: image ? '55%' : '100%', direction: isRtl ? 'rtl' : 'ltr' }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          
          <motion.nav 
            variants={itemVariants}
            aria-label="Breadcrumb" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              marginBottom: '3rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)'
            }}
          >
            <Link href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-amber-600">{t.home}</Link>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ color: 'inherit' }}>{t.services}</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ color: 'var(--color-obsidian)' }}>{title}</span>
          </motion.nav>

          <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-sand)' }}>
              {t.serviceDetail}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
              fontWeight: 800, 
              lineHeight: 1.05, 
              letterSpacing: isRtl ? 'normal' : '-0.03em',
              marginBottom: '2.5rem',
              color: 'var(--color-obsidian)',
              maxWidth: image ? '100%' : '14ch'
            }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', 
              lineHeight: 1.7, 
              color: 'var(--color-text-secondary)', 
              maxWidth: '38ch',
              fontWeight: 400
            }}
          >
            {subtitle}
          </motion.p>

        </motion.div>
      </div>

      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: '5rem' }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: isRtl ? 'auto' : 'clamp(1.25rem, 5vw, 4rem)',
          right: isRtl ? 'clamp(1.25rem, 5vw, 4rem)' : 'auto',
          width: '1px',
          backgroundColor: 'var(--color-sand)',
          zIndex: 3,
        }}
      />
    </section>
  );
};
