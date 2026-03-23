import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface PerspectivePageProps {
  params: Promise<{ locale: string }>;
}

const pageContent = {
  ar: {
    heroTag: "المنشورات والرؤى",
    heroTitle: "الرؤية",
    heroSub: "رؤى معمارية وتقنية وتراثية من S-Arch Studio.",
    intro: "في هذه الصفحة نشارك طريقة تفكيرنا في العمارة، الهندسة، الترميم، والتراث — من سياق شمال إفريقيا إلى الممارسة الدولية.",
    tags: ["التصميم", "الإشراف", "الترميم", "التراث"],
    articles: [
      {
        title: "من سطيف إلى العالم",
        summary: "لماذا يمنح الانطلاق من مكان محدد مثل سطيف المشاريع عمقًا أكبر، حتى عندما تستهدف معيارًا دوليًا.",
        category: "التصميم"
      },
      {
        title: "الترميم كمسؤولية",
        summary: "كيف يجمع الترميم الإنشائي والمعماري بين احترام المبنى القائم والدقة التقنية.",
        category: "الترميم"
      },
      {
        title: "العمل مع هيئات حماية التراث",
        summary: "ماذا يعني التعاون مع هيئات حماية التراث عند التدخل في المباني المصنفة والمعالم الأثرية.",
        category: "التراث"
      }
    ],
    cta: "اطّلع على مشاريعنا أو تواصل مع المكتب لمناقشة مشروعك."
  },
  en: {
    heroTag: "INSIGHTS & PUBLICATIONS",
    heroTitle: "Perspectives",
    heroSub: "Architectural, technical, and heritage reflections from S-Arch Studio.",
    intro: "Here we share how we think about architecture, engineering, restoration, and heritage — from the North African context to international practice.",
    tags: ["Design", "Supervision", "Restoration", "Heritage"],
    articles: [
      {
        title: "Designing from Sétif to the World",
        summary: "Why starting from a specific place like Sétif gives projects more depth, even when they aim for an international standard.",
        category: "Design"
      },
      {
        title: "Restoration as Responsibility",
        summary: "How structural and architectural restoration demands respect for existing buildings as well as technical precision.",
        category: "Restoration"
      },
      {
        title: "Working with Heritage Authorities",
        summary: "What it means to collaborate with cultural protection bodies when intervening on listed buildings and archaeological sites.",
        category: "Heritage"
      }
    ],
    cta: "Explore our projects or contact the office to discuss your own."
  },
  fr: {
    heroTag: "RÉFLEXIONS & PUBLICATIONS",
    heroTitle: "Perspectives",
    heroSub: "Réflexions architecturales, techniques et patrimoniales de S-Arch Studio.",
    intro: "Ici, nous partageons notre vision de l'architecture, de l'ingénierie, de la restauration et du patrimoine — du contexte nord-africain à la pratique internationale.",
    tags: ["Conception", "Supervision", "Restauration", "Patrimoine"],
    articles: [
      {
        title: "Concevoir de Sétif vers le Monde",
        summary: "Pourquoi partir d'un lieu spécifique comme Sétif donne plus de profondeur aux projets, même lorsqu'ils visent un standard international.",
        category: "Conception"
      },
      {
        title: "La Restauration comme Responsabilité",
        summary: "Comment la restauration structurelle et architecturale exige à la fois le respect des bâtiments existants et une rigueur technique.",
        category: "Restauration"
      },
      {
        title: "Travailler avec les Autorités du Patrimoine",
        summary: "Ce que signifie collaborer avec les organismes de protection culturelle lors d'interventions sur des bâtiments classés et des sites archéologiques.",
        category: "Patrimoine"
      }
    ],
    cta: "Explorez nos projets ou contactez le bureau pour discuter du vôtre."
  }
};

export async function generateMetadata({ params }: PerspectivePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const content = pageContent[locale as Locale];
  return {
    title: `${content.heroTitle} | S-Arch Studio — Architectural Insights`,
    description: content.heroSub,
  };
}

export default async function PerspectivePage({ params }: PerspectivePageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = pageContent[locale as Locale];
  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  const sectionStyle: React.CSSProperties = {
    padding: '8rem 0 4rem',
    backgroundColor: 'var(--color-surface-0)',
    position: 'relative',
    overflow: 'hidden',
  };

  const contentWrapperStyle: React.CSSProperties = {
    maxWidth: '850px',
    margin: isRtl ? '0 0 0 auto' : '0 auto 0 0',
    textAlign: isRtl ? 'right' : 'left',
  };

  const overlineStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-sand)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '1rem',
    display: 'block',
  };

  return (
    <main dir={dir} style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-0)', position: 'relative' }}>
      {/* 0. BREADCRUMBS */}
      <Breadcrumbs 
        items={[
          { label: locale === 'ar' ? 'الرئيسية' : locale === 'fr' ? 'Accueil' : 'Home', href: `/${locale}` },
          { label: content.heroTitle }
        ]} 
        locale={locale as Locale} 
        isRTL={isRtl} 
      />
      {/* 1. HERO */}
      <section style={{ ...sectionStyle, padding: '10rem 0 8rem', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="container">
          <div style={{ ...contentWrapperStyle, maxWidth: '900px' }}>
            <span style={{ ...overlineStyle, color: 'rgba(255,255,255,0.6)' }}>{content.heroTag}</span>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              fontWeight: 800,
              color: 'var(--color-text-inverse)',
              lineHeight: 1.05,
              marginBottom: '2rem',
              letterSpacing: '-0.03em',
            }}>{content.heroTitle}</h1>
            <p style={{
              fontSize: '1.4rem',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '55ch',
              fontWeight: 400,
            }}>{content.heroSub}</p>
          </div>
        </div>
      </section>

      {/* 2. INTRO PARAGRAPH */}
      <section style={{ padding: '6rem 0 2rem' }}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <p style={{
              fontSize: '1.6rem',
              lineHeight: 1.6,
              color: 'var(--color-text-primary)',
              maxWidth: '65ch',
              fontWeight: 400
            }}>
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES/TAGS STRIP */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ ...contentWrapperStyle, maxWidth: '1024px' }}>
            <ul style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              marginTop: '1.5rem',
              borderTop: '1px solid var(--color-hairline)',
              borderBottom: '1px solid var(--color-hairline)',
              paddingBlock: '1.5rem'
            }}>
              {content.tags.map((tag, i) => (
                <li key={i} style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  cursor: 'default'
                }}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PERSPECTIVES LIST */}
      <section style={{ padding: '2rem 0 8rem' }}>
        <div className="container">
          <div style={{ maxWidth: '1024px', margin: isRtl ? '0 0 0 auto' : '0 auto 0 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {content.articles.map((article, i) => (
                <article key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '3rem',
                  backgroundColor: 'var(--color-surface-1)',
                  border: '1px solid var(--color-hairline)',
                  transition: 'border-color 0.3s'
                }}>
                  <div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-sand)',
                      display: 'inline-block',
                      marginBottom: '1rem'
                    }}>
                      {/* Using the localized tag name exactly as requested */}
                      {article.category}
                    </span>
                    <h2 style={{
                      fontSize: '2.25rem',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      marginBottom: '1.5rem'
                    }}>
                      {article.title}
                    </h2>
                    <p style={{
                      fontSize: '1.15rem',
                      lineHeight: 1.6,
                      color: 'var(--color-text-secondary)',
                      maxWidth: '70ch'
                    }}>
                      {article.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section style={{
        padding: '5rem 0',
        borderTop: '1px solid var(--color-hairline)',
        backgroundColor: 'var(--color-surface-0)',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--color-text-primary)',
            maxWidth: '60ch',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            {content.cta}{' '}
            <Link href={`/${locale}/projects`} style={{ color: 'var(--color-text-primary)', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: 600 }}>Explore</Link>
            {' / '}
            <Link href={`/${locale}/contact`} style={{ color: 'var(--color-text-primary)', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: 600 }}>Contact</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
