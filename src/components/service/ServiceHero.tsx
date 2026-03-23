import React from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  slug: string;
  locale: Locale;
  isRtl: boolean;
}

const labels = {
  en: {
    serviceDetail: 'Service Detail',
    home: 'Home',
    services: 'Services'
  },
  fr: {
    serviceDetail: 'Détail du Service',
    home: 'Accueil',
    services: 'Services'
  },
  ar: {
    serviceDetail: 'تفاصيل الخدمة',
    home: 'الرئيسية',
    services: 'الخدمات'
  }
};

export const ServiceHero: React.FC<ServiceHeroProps> = ({ title, subtitle, slug, locale, isRtl }) => {
  const t = labels[locale];

  return (
    <section 
      style={{ 
        paddingTop: '10rem', 
        paddingBottom: '8rem', 
        backgroundColor: 'var(--color-obsidian)',
        color: 'var(--color-surface-0)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Breadcrumb Section */}
        <nav 
          aria-label="Breadcrumb" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            marginBottom: '3rem',
            fontSize: '0.8125rem',
            fontWeight: 500,
            opacity: 0.6,
            letterSpacing: '0.02em',
            direction: isRtl ? 'rtl' : 'ltr'
          }}
        >
          <Link href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none' }}>{t.home}</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: 'inherit' }}>{t.services}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: 'var(--color-sand)' }}>{title}</span>
        </nav>

        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', opacity: 0.8 }}>
            <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {t.serviceDetail}
            </span>
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 700, 
            lineHeight: 1.1, 
            letterSpacing: isRtl ? 'normal' : '-0.03em',
            marginBottom: '1.5rem' 
          }}>
            {title}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', 
            lineHeight: 1.6, 
            opacity: 0.7, 
            maxWidth: '600px',
            fontStyle: isRtl ? 'normal' : 'italic'
          }}>
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Subtle architectural backdrop detail */}
      <div style={{ 
        position: 'absolute', 
        right: isRtl ? 'auto' : '-5%', 
        left: isRtl ? '-5%' : 'auto', 
        bottom: '-10%', 
        fontSize: '20rem', 
        fontWeight: 900, 
        opacity: 0.03, 
        userSelect: 'none', 
        pointerEvents: 'none' 
      }}>
        {slug.charAt(0).toUpperCase()}
      </div>
    </section>
  );
};
