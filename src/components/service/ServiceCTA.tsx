import React from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface ServiceCTAProps {
  locale: Locale;
  isRtl: boolean;
  title: string;
  buttonText: string;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({ locale, isRtl, title, buttonText }) => {
  return (
    <section style={{ padding: '8rem 0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '2.5rem', color: 'var(--color-obsidian)' }}>
          {title}
        </h2>
        <Link
          href={`/${locale}/contact`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'var(--color-obsidian)',
            color: 'var(--color-surface-0)',
            padding: '1.25rem 3rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
        >
          {buttonText}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }}>
            <path d="M4 9h10M10 4l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  );
};
