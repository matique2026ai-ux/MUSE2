import type { Locale } from '@/lib/i18n';
import Link from 'next/link';
interface GlobalTrustSectionProps {
  locale: Locale;
}

const content = {
  en: {
    eyebrow: 'Collaboration & Trust',
    headline: 'Clients Who Trusted Us With Their Vision',
    sub: 'We have been fortunate to work with institutions, private clients, and civic bodies across the Mediterranean, the Maghreb, and Western Europe.',
    testimonials: [
      {
        quote: 'S-Arch Studio understood what we were trying to build before we could fully articulate it ourselves. The result is a building that belongs here.',
        author: 'Rima Benali',
        role: 'Director, Centre Culturel de Tunis',
      },
      {
        quote: 'Their method is patient and deeply considered. There was never a moment where craft and vision were not perfectly aligned.',
        author: 'Jean-Pierre Moreau',
        role: 'Private Client, Lyon',
      },
    ],
    partners: ['Ministère de la Culture', 'Dar Al Hanaa Foundation', 'Ville de Lyon', 'Institut du Monde Arabe', 'ARCI Morocco'],
    partnersLabel: 'Institutional Partners & Clients',
  },
  fr: {
    eyebrow: 'Collaboration & Confiance',
    headline: 'Des Clients qui Nous ont Confié leur Vision',
    sub: "Nous avons eu la chance de travailler avec des institutions, des clients privés et des organes civiques à travers la Méditerranée, le Maghreb et l'Europe occidentale.",
    testimonials: [
      {
        quote: "S-Arch Studio a compris ce que nous cherchions à construire avant même que nous puissions l'articuler. Le résultat est un bâtiment qui appartient à cet endroit.",
        author: 'Rima Benali',
        role: 'Directrice, Centre Culturel de Tunis',
      },
      {
        quote: "Leur méthode est patiente et profondément réfléchie. Il n'y a jamais eu un moment où le savoir-faire et la vision n'étaient pas parfaitement alignés.",
        author: 'Jean-Pierre Moreau',
        role: 'Client Privé, Lyon',
      },
    ],
    partners: ['Ministère de la Culture', 'Fondation Dar Al Hanaa', 'Ville de Lyon', 'Institut du Monde Arabe', 'ARCI Maroc'],
    partnersLabel: 'Partenaires & Clients Institutionnels',
  },
  ar: {
    eyebrow: 'التعاون والثقة',
    headline: 'شركاء الرؤية والعمل',
    sub: 'لقد حظينا بامتياز العمل مع مؤسسات رائدة، وعملاء خاصين، وهيئات مدنية عبر حوض المتوسط والمغرب العربي وأوروبا الغربية.',
    testimonials: [
      {
        quote: 'أدرك S-Arch Studio جوهر ما كنا نسعى لتشييده قبل أن نتمكن من صياغته بأنفسنا؛ النتيجة بناء ينتمي بوضوح لروحه وسياقه.',
        author: 'ريما بن علي',
        role: 'مديرة المركز الثقافي، تونس',
      },
      {
        quote: 'منهجيتهم تتسم بالصبر والتأمل العميق. لم نشهد لحظة واحدة حاد فيها التنفيذ عن الرؤية الأصلية والحرفة العالية.',
        author: 'جان بيير مورو',
        role: 'عميل خاص، ليون',
      },
    ],
    partners: ['وزارة الثقافة', 'مؤسسة دار الهناء', 'مدينة ليون', 'معهد العالم العربي', 'ARCI المغرب'],
    partnersLabel: 'شركاء ومؤسسات',
  },
} satisfies Record<Locale, { eyebrow: string; headline: string; sub: string; testimonials: { quote: string; author: string; role: string }[]; partners: string[]; partnersLabel: string }>;

export default function GlobalTrustSection({ locale }: GlobalTrustSectionProps) {
  const c = content[locale] || content['en'];
  if (!c) return null;


  return (
    <section
      aria-labelledby="trust-heading"
      style={{
        backgroundColor: 'var(--color-charcoal)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="container" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '5rem',
            alignItems: 'end',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-sand)' }}>
                {c.eyebrow}
              </span>
            </div>
            <h2
              id="trust-heading"
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                color: 'var(--color-text-inverse)',
                lineHeight: 1.2,
              }}
            >
              {c.headline}
            </h2>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,234,0.55)', maxWidth: '46ch' }}>
            {c.sub}
          </p>
        </div>

        {/* Testimonials */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5px',
            marginBottom: '5rem',
          }}
        >
          {c.testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                padding: '2.5rem',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: idx === 0 ? 'var(--radius-xl) var(--radius-sm) var(--radius-sm) var(--radius-xl)' : 'var(--radius-sm) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                position: 'relative',
              }}
            >
              {/* Quote mark */}
              <div
                aria-hidden="true"
                style={{
                  fontSize: '4rem',
                  lineHeight: 0.8,
                  color: 'var(--color-sand)',
                  opacity: 0.3,
                  fontFamily: 'Georgia, serif',
                  marginBottom: '1rem',
                  display: 'block',
                }}
              >
                &ldquo;
              </div>

              <blockquote
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.85,
                  color: 'rgba(245,240,234,0.8)',
                  fontStyle: 'normal',
                  margin: '0 0 2rem',
                }}
              >
                {t.quote}
              </blockquote>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(245,240,234,0.9)', marginBottom: '0.2rem' }}>
                  {t.author}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,234,0.4)', letterSpacing: '0.02em' }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partners strip */}
        <div
          style={{
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,234,0.3)',
              marginBottom: '1.5rem',
            }}
          >
            {c.partnersLabel}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem 2rem',
              alignItems: 'center',
            }}
          >
            {c.partners.map((partner) => (
              <span
                key={partner}
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(245,240,234,0.35)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Action Block */}
        <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
             href={`/${locale}/contact`}
             style={{
                backgroundColor: 'var(--color-sand)',
                color: '#fff',
                padding: '1rem 2.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
             }}
             className="hover:opacity-90"
          >
            {locale === 'ar' ? 'تواصل لمناقشة مشروعك' : locale === 'fr' ? 'Discuter de votre projet' : 'Discuss your project'}
          </Link>
          <Link
             href={`/${locale}/perspective`}
             style={{
                backgroundColor: 'transparent',
                color: 'var(--color-text-inverse)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '1rem 2.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
             }}
             className="hover:bg-white/10 hover:border-white"
          >
            {locale === 'ar' ? 'استكشاف الرؤية' : locale === 'fr' ? 'Lire nos perspectives' : 'Read our perspectives'}
          </Link>
        </div>
      </div>
    </section>
  );
}
