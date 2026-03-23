import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface ServiceBridgeSectionProps {
  locale: Locale;
}

const content = {
  en: {
    eyebrow: 'Services',
    headline: 'How We Work With You',
    doors: [
      {
        number: '01',
        sector: 'Cultural & Civic',
        title: 'Spaces that Carry Meaning',
        body: 'Museums, libraries, civic halls, and memorials — buildings where collective memory and public identity converge.',
        link: '/services/cultural-civic',
        linkLabel: 'Learn more',
      },
      {
        number: '02',
        sector: 'Residential',
        title: 'The Private Realm',
        body: 'From urban apartments to landscape-bound maisons, we design domestic spaces that shelter the full texture of inhabited life.',
        link: '/services/residential',
        linkLabel: 'Learn more',
      },
      {
        number: '03',
        sector: 'Adaptive Reuse',
        title: 'Continuity Reconsidered',
        body: 'Transforming buildings that have outlived their original purpose — preserving structure and memory while serving new needs.',
        link: '/services/adaptive-reuse',
        linkLabel: 'Learn more',
      },
    ],
  },
  fr: {
    eyebrow: 'Services',
    headline: 'Comment Nous Travaillons',
    doors: [
      {
        number: '01',
        sector: 'Culturel & Civique',
        title: 'Des Espaces qui ont du Sens',
        body: 'Musées, bibliothèques, salles civiques et mémoriaux — des bâtiments où la mémoire collective et l\u2019identité publique convergent.',
        link: '/services/cultural-civic',
        linkLabel: 'En savoir plus',
      },
      {
        number: '02',
        sector: 'Résidentiel',
        title: 'La Sphère Privée',
        body: "Des appartements urbains aux maisons enveloppées dans le paysage, nous concevons des espaces domestiques qui abritent la vie.",
        link: '/services/residential',
        linkLabel: 'En savoir plus',
      },
      {
        number: '03',
        sector: 'Réhabilitation',
        title: 'La Continuité Repensée',
        body: 'Transformer des bâtiments qui ont survécu à leur usage d\u2019origine — en préservant la structure et la mémoire tout en répondant à de nouveaux besoins.',
        link: '/services/adaptive-reuse',
        linkLabel: 'En savoir plus',
      },
    ],
  },
  ar: {
    eyebrow: 'الخدمات',
    headline: 'منهجية العمل والتعاون',
    doors: [
      {
        number: '01',
        sector: 'الثقافي والمدني',
        title: 'فضاءات تفيض بالمعنى',
        body: 'المتاحف، والمكتبات، والقاعات المدنية؛ فضاءات تتقاطع فيها الذاكرة الجماعية مع الهوية العامة.',
        link: '/services/cultural-civic',
        linkLabel: 'التفاصيل',
      },
      {
        number: '02',
        sector: 'السكني',
        title: 'المجال الخاص',
        body: 'من الشقق الحضرية إلى المنازل المنسجمة مع الطبيعة؛ نصمم فضاءات سكنية تحتضن نسيج الحياة المعاشة.',
        link: '/services/residential',
        linkLabel: 'التفاصيل',
      },
      {
        number: '03',
        sector: 'إعادة التأهيل',
        title: 'إعادة تصور الاستمرارية',
        body: 'تحويل المباني القائمة لتتناسب مع متطلبات جديدة، مع الحفاظ على هيكلها وذاكرتها الجوهرية.',
        link: '/services/adaptive-reuse',
        linkLabel: 'التفاصيل',
      },
    ],
  },
} satisfies Record<Locale, { eyebrow: string; headline: string; doors: { number: string; sector: string; title: string; body: string; link: string; linkLabel: string }[] }>;

export default function ServiceBridgeSection({ locale }: ServiceBridgeSectionProps) {
  const c = content[locale];

  return (
    <section
      aria-labelledby="services-heading"
      style={{
        backgroundColor: 'var(--color-surface-2)',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <div className="container" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            {c.eyebrow}
          </span>
        </div>

          <h2
            id="bridge-heading"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              color: 'var(--color-text-inverse)',
              lineHeight: 1.2,
              marginBottom: '1rem',
              maxWidth: '30ch',
            }}
          >{c.headline}
        </h2>

        {/* Three doors */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          {c.doors.map((door, idx) => (
            <div
              key={door.number}
              style={{
                padding: '2.5rem',
                borderInlineEnd: idx < c.doors.length - 1 ? '1px solid var(--color-hairline)' : 'none',
                backgroundColor: 'var(--color-surface-0)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Number + sector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-sand)' }}>
                  {door.number}
                </span>
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    backgroundColor: 'var(--color-surface-2)',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '2rem',
                    border: '1px solid var(--color-hairline)',
                  }}
                >
                  {door.sector}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'var(--color-hairline)', margin: '0.25rem 0' }} />

              {/* Title */}
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                {door.title}
              </h3>

              {/* Body */}
              <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', flexGrow: 1 }}>
                {door.body}
              </p>

              {/* CTA */}
              <Link
                href={`/${locale}${door.link}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  marginTop: '0.5rem',
                  paddingBottom: '1px',
                  borderBottom: '1px solid var(--color-hairline)',
                }}
              >
                {door.linkLabel}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : 'none' }}>
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
