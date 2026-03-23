import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { projects, getLocalizedProject } from '@/lib/data/projects';

interface SelectedWorksSectionProps {
  locale: Locale;
  featuredProjects: any[];
}

const content = {
  en: {
    eyebrow: 'Selected Works',
    headline: 'Projects Across Cultures',
    sub: 'A selection of built and ongoing work spanning residential, cultural, and civic commissions.',
    viewAll: 'View All Projects'
  },
  fr: {
    eyebrow: 'Travaux Sélectionnés',
    headline: 'Projets à travers les Cultures',
    sub: 'Une sélection de réalisations bâties et en cours, couvrant des commandes résidentielles, culturelles et civiques.',
    viewAll: 'Voir tous les projets'
  },
  ar: {
    eyebrow: 'أعمال مختارة',
    headline: 'مشاريع عبر الثقافات',
    sub: 'مجموعة من المشاريع المنجزة والجارية؛ تشمل مباني ثقافية، وسكنية، ومدنية.',
    viewAll: 'جميع المشاريع'
  },
} satisfies Record<Locale, { eyebrow: string; headline: string; sub: string; viewAll: string; }>;

export default function SelectedWorksSection({ locale, featuredProjects }: SelectedWorksSectionProps) {
  const c = content[locale];

  const topProjects = (featuredProjects && featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3)).slice(0, 6).map((p, idx) => {
    let localized;
    if (p.translations) {
      // It's a static project
      localized = getLocalizedProject(p, locale);
    } else {
      // It's a FirestoreProject
      localized = p[locale as keyof typeof p] as any;
      localized = { ...localized, type: localized?.type || p.en?.type || 'Project' };
      localized.title = localized?.title || p.en?.title || p.slug;
    }
    
    return {
      index: `0${idx + 1}`,
      slug: p.slug,
      heroImage: p.heroImage,
      localized
    };
  });

  return (
    <section
      aria-labelledby="works-heading"
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <div
        className="container"
        style={{ paddingTop: '7rem', paddingBottom: '7rem' }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-sand)' }}>
                {c.eyebrow}
              </span>
            </div>
            <h2
              id="works-heading"
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
              }}
            >
              {c.headline}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', maxWidth: '52ch', lineHeight: 1.7 }}>
              {c.sub}
            </p>
          </div>

          <Link
            href={`/${locale}/projects`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-sand)',
              textDecoration: 'none',
              paddingBottom: '2px',
              borderBottom: '1px solid rgba(166, 124, 82, 0.35)',
              flexShrink: 0,
            }}
          >
            {c.viewAll}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : 'none' }}>
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Projects grid mapped dynamically from DB */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2px',
          }}
        >
          {topProjects.map((project, idx) => (
            <Link
              key={project.index}
              href={`/${locale}/projects/${project.slug}`}
              className="group"
              style={{
                display: 'block',
                position: 'relative',
                textDecoration: 'none',
                overflow: 'hidden',
                borderRadius: idx === 0 ? 'var(--radius-lg) 0 0 var(--radius-lg)' : idx === topProjects.length - 1 ? '0 var(--radius-lg) var(--radius-lg) 0' : '0',
                backgroundColor: 'var(--color-surface-2)'
              }}
            >
              <div
                style={{
                  aspectRatio: '3/4',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image 
                  src={project.heroImage}
                  alt={project.localized.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  priority={idx === 0}
                  className="group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                {/* Index */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    insetInlineStart: '1.25rem',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontVariantNumeric: 'tabular-nums',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {project.index}
                </span>

                {/* Category tag */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    insetInlineEnd: '1.25rem',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '2rem',
                    padding: '0.3rem 0.75rem',
                  }}
                >
                  {project.localized.type}
                </span>

              </div>

              {/* Card info */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--color-surface-1)',
                  borderTop: '1px solid var(--color-hairline)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.375rem',
                    letterSpacing: '-0.01em',
                  }}
                  className="group-hover:text-[var(--color-sand)] transition-colors"
                >
                  {project.localized.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    {project.localized.location}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
                    {project.localized.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
