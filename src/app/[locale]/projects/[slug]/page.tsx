import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { fetchProjectBySlug, fetchPublicProjects } from '@/lib/server-data';

interface ProjectDetailProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// 1. DYNAMIC ROUTES
export async function generateStaticParams() {
  const allProjects = await fetchPublicProjects();
  const params: { locale: string; slug: string }[] = [];
  allProjects.forEach((p) => {
    locales.forEach((l) => {
      params.push({ locale: l, slug: p.slug });
    });
  });
  return params;
}

// 2. DYNAMIC SEO METADATA
export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) return {};
  
  const project = await fetchProjectBySlug(slug);
  if (!project) return {};
  const t = project[locale as keyof typeof project] as { title?: string; tagline?: string } | undefined;
  const title = t?.title || project.en?.title || slug;
  const tagline = t?.tagline || project.en?.tagline || '';
  return {
    title: `${title} — ${project.en?.location || ''} | S-Arch Studio`,
    description: tagline,
    openGraph: {
      type: 'article',
      title: `${title} | S-Arch Studio`,
      description: tagline,
      images: [project.heroImage]
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  // Fetch from Firestore (with static fallback)
  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  const lang = locale as Locale;
  const t = project[lang as keyof typeof project] as {
    title: string; location: string; year: string; type: string;
    tagline: string; status: string; client: string; services: string[];
    narrative: { context: string[]; design: string[]; outcome: string[] };
  } | undefined;
  const localized = t || project.en;

  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // UI Localization Dictionary
  const ui = {
    en: {
      client: 'Client',
      location: 'Location',
      year: 'Year',
      status: 'Status',
      services: 'Services Provided',
      context: 'Context & Brief',
      design: 'Design & Technical Response',
      outcome: 'Outcome & Impact',
      related: 'Related Projects',
      home: 'Home',
      projects: 'Projects'
    },
    fr: {
      client: 'Client',
      location: 'Lieu',
      year: 'Année',
      status: 'Statut',
      services: 'Services Fournis',
      context: 'Contexte et Cahier des Charges',
      design: 'Réponse Architecturale et Technique',
      outcome: 'Résultat et Impact',
      related: 'Projets Similaires',
      home: 'Accueil',
      projects: 'Projets'
    },
    ar: {
      client: 'العميل',
      location: 'الموقع',
      year: 'السنة',
      status: 'الحالة',
      services: 'الخدمات المقدمة',
      context: 'السياق والتكليف',
      design: 'الاستجابة المعمارية والتقنية',
      outcome: 'النتيجة والأثر',
      related: 'مشاريع ذات صلة',
      home: 'الرئيسية',
      projects: 'المشاريع'
    }
  }[locale as Locale];

  const breadcrumbs = [
    { label: ui.home, href: `/${locale}` },
    { label: ui.projects, href: `/${locale}/projects` },
    { label: localized.title }
  ];

  // Fetch Related Projects (Same Category)
  const allPublic = await fetchPublicProjects();
  const related = allPublic
    .filter(p => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3)
    .map(p => {
       const pt = p[lang as keyof typeof p] as { title: string; type: string; year: string; location: string } | undefined;
       return {
         slug: p.slug,
         heroImage: p.heroImage,
         localized: pt || p.en
       };
    });

  return (
    <main dir={dir} style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-0)', color: 'var(--color-text-primary)', position: 'relative' }}>
      
      {/* 2. BREADCRUMBS (Absolute over Hero) */}
      <Breadcrumbs items={breadcrumbs} locale={locale as Locale} isRTL={isRtl} />

      {/* 3. HERO (Full width image, h1, Meta Line, Tagline) */}
      <section style={{ position: 'relative', width: '100%', height: '85vh', minHeight: '600px', backgroundColor: 'var(--color-obsidian)' }}>
        <Image 
          src={project.heroImage}
          alt={localized.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        {/* Gradient Overlay for Legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.4) 100%)' }} />
        
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '5rem', zIndex: 10 }}>
          <div style={{ maxWidth: '900px', textAlign: isRtl ? 'right' : 'left', margin: isRtl ? '0 0 0 auto' : '0 auto 0 0' }}>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center', 
              color: 'var(--color-sand)', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <span>{localized.type}</span>
              <span style={{ opacity: 0.5 }}>—</span>
              <span>{localized.location}</span>
              <span style={{ opacity: 0.5 }}>—</span>
              <span style={{ fontVariantNumeric: 'lining-nums tabular-nums' }}>{localized.year}</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
              fontWeight: 800, 
              color: '#ffffff', 
              lineHeight: 1.1, 
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}>
              {localized.title}
            </h1>
            
            <p style={{ 
              fontSize: '1.35rem', 
              color: 'rgba(255,255,255,0.85)', 
              lineHeight: 1.5, 
              fontWeight: 400,
              maxWidth: '65ch'
            }}>
              {localized.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* 4. MAIN LAYOUT (Facts Column + Story Column) */}
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* SIDEBAR: Project Facts */}
          {/* Note: In RTL (lg), aside should be pushed to the left. We use lg:order-last in RTL context. */}
          <aside 
            className={`lg:col-span-4 ${isRtl ? 'lg:order-first' : ''}`} 
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            <div style={{ position: 'sticky', top: '8rem' }}>
              <div style={{ 
                borderTop: '2px solid var(--color-hairline)', 
                paddingTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>{ui.client}</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{localized.client}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>{ui.location}</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{localized.location}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>{ui.year}</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 500, fontVariantNumeric: 'lining-nums tabular-nums' }}>{localized.year}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>{ui.status}</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{localized.status}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>{ui.services}</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0, margin: 0, listStyle: 'none' }}>
                    {localized.services.map((service, idx) => (
                      <li key={idx} style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--color-sand)', marginTop: '0.1em' }}>■</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN NARRATIVE: Story Column */}
          <article 
            className={`lg:col-span-8 ${isRtl ? 'lg:order-last' : ''}`} 
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
              {/* Context */}
              {localized.narrative.context && localized.narrative.context.length > 0 && (
                <section>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>{ui.context}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {localized.narrative.context.map((para, idx) => (
                      <p key={idx} style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{para}</p>
                    ))}
                  </div>
                </section>
              )}
              {/* Design */}
              {localized.narrative.design && localized.narrative.design.length > 0 && (
                <section>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>{ui.design}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {localized.narrative.design.map((para, idx) => (
                      <p key={idx} style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{para}</p>
                    ))}
                  </div>
                </section>
              )}
              {/* Outcome */}
              {localized.narrative.outcome && localized.narrative.outcome.length > 0 && (
                <section>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>{ui.outcome}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {localized.narrative.outcome.map((para, idx) => (
                      <p key={idx} style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{para}</p>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* 5. GALLERY (Responsive Grid) */}
      {project.images && project.images.length > 0 && (
        <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-surface-1)' }}>
          <div className="container" style={{ maxWidth: '1400px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: 'var(--color-surface-2)' }}>
                  <Image 
                    src={img}
                    alt={`${localized.title} - ${idx === 0 ? 'Exterior View' : 'Interior Detail'} | S-Arch Studio`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. RELATED PROJECTS */}
      {related.length > 0 && (
        <section style={{ padding: '8rem 0', borderTop: '1px solid var(--color-hairline)' }}>
          <div className="container">
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              marginBottom: '3rem', 
              textAlign: isRtl ? 'right' : 'left',
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)'
            }}>
              {ui.related}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8" style={{ textAlign: isRtl ? 'right' : 'left' }}>
              {related.map((relProject, idx) => (
                <Link key={idx} href={`/${locale}/projects/${relProject.slug}`} className="group flex flex-col cursor-pointer">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: '1.5rem', overflow: 'hidden', backgroundColor: 'var(--color-surface-2)' }}>
                    <Image 
                      src={relProject.heroImage}
                      alt={relProject.localized.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-sand)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{relProject.localized.type}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', fontVariantNumeric: 'lining-nums tabular-nums' }}>{relProject.localized.year}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }} className="group-hover:text-[var(--color-sand)] transition-colors">{relProject.localized.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>{relProject.localized.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
