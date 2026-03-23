'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface HeroSectionProps {
  locale: Locale;
  heroConfig: any;
}

const content = {
  en: {
    eyebrow: 'Architecture Studio',
    headline: 'Where Form\nMeets Identity',
    sub: 'We design buildings that belong to their land — architecture that carries memory forward while answering the demands of the contemporary world.',
    cta1: 'View Projects',
    cta2: 'Our Studio',
    scroll: 'Scroll to explore',
  },
  fr: {
    eyebrow: 'Cabinet d\u2019Architecture',
    headline: 'Là où la Forme\nRencontre l\u2019Identité',
    sub: "Nous concevons des bâtiments qui appartiennent à leur territoire — une architecture qui porte la mémoire tout en répondant aux exigences du monde contemporain.",
    cta1: 'Voir les Projets',
    cta2: 'Notre Studio',
    scroll: 'Défiler pour explorer',
  },
  ar: {
    eyebrow: 'مكتب هندسة معمارية',
    headline: 'صياغة الهوية\nمن خلال الشكل',
    sub: 'نصمم فضاءات تنتمي لأرضها؛ عمارة تحمل إرث الذاكرة وتستجيب لمتطلبات العالم المعاصر.',
    cta1: 'استعراض المشاريع',
    cta2: 'عن المكتب',
    scroll: 'مرر للاستكشاف',
  },
} satisfies Record<Locale, { eyebrow: string; headline: string; sub: string; cta1: string; cta2: string; scroll: string }>;

export default function HeroSection({ locale, heroConfig }: HeroSectionProps) {
  const c = content[locale];
  const isRtl = locale === 'ar';

  const title = heroConfig?.[locale]?.title || (isRtl ? 'صياغة الهوية من خلال\nالشكل المعماري' : c.headline);
  const subtitle = heroConfig?.[locale]?.subtitle || c.sub;
  const bgImage = heroConfig?.backgroundImage || "/images/projects/civic-hub-hero.jpg";

  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'var(--color-obsidian)'
      }}
    >
      {/* Architectural image backdrop */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image 
          src={bgImage}
          alt="S-Arch Studio Architecture"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        {/* Dark Obsidian Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              160deg,
              rgba(24,22,20,0.85) 0%,
              rgba(24,22,20,0.6) 55%,
              rgba(24,22,20,0.85) 100%
            ),
            linear-gradient(
              to bottom right,
              rgba(42,38,34,0.4) 0%,
              rgba(53,49,45,0.2) 35%,
              rgba(24,22,20,0.9) 100%
            )
          `
        }} />
      </div>

      {/* Accent line — left for LTR, right for RTL */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          bottom: '15%',
          [isRtl ? 'right' : 'left']: 'clamp(1.25rem, 5vw, 4rem)',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,185,154,0.5), transparent)',
          zIndex: 2,
        }}
      />

      <div
        className="container"
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 3,
          paddingTop: 'var(--header-height)',
        }}
      >
        <div style={{ maxWidth: '80ch' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', opacity: 0.95 }}>
            <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-sand)' }}>
              {c.eyebrow}
            </span>
          </div>

          <h1
            style={{
              fontSize: isRtl ? 'clamp(2rem, 4vw, 3.25rem)' : 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: isRtl ? 1.3 : 1.1,
              letterSpacing: isRtl ? 'normal' : '-0.02em',
              color: 'var(--color-text-inverse)',
              marginBottom: isRtl ? '3rem' : '2.5rem',
              whiteSpace: isRtl ? 'pre-line' : 'normal',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
              lineHeight: isRtl ? 1.9 : 1.8,
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: 'min(48ch, 90vw)',
              marginBottom: '3.5rem',
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Primary Button: Deep Anchor Tone */}
            <Link
              href={`/${locale}/projects`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'var(--color-sand)',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all var(--duration-normal) var(--ease-reveal)',
              }}
              className="hover:opacity-90"
            >
              {c.cta1}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : 'none' }}>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>

            {/* Secondary Button: Hairline Border */}
            <Link
              href={`/${locale}/office`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(5px)',
                color: 'var(--color-surface-0)',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-hairline)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all var(--duration-normal) var(--ease-reveal)',
              }}
              className="hover:bg-white/10 hover:border-white"
            >
              {c.cta2}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '12rem',
          background: 'linear-gradient(to bottom, transparent, var(--color-surface-1))',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
