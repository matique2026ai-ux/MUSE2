import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { fetchPublicServices } from '@/lib/server-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

const pageContent = {
  ar: {
    heroTag: "خدماتنا",
    heroTitle: "الخدمات",
    heroSub: "خدمات معمارية وهندسية متكاملة من الدراسة إلى الإشراف والترميم.",
    intro: "نقدم سلسلة متكاملة من الخدمات: من الدراسات والتصميم إلى الإشراف على الإنجاز، وترميم المباني، والعمل على التراث والآثار.",
    services: [
      {
        slug: 'architectural-studies',
        label: 'الدراسات المعمارية',
        desc: 'دراسات أولية وتحليل جدوى تُطوَّر إلى ملفات معمارية جاهزة للترخيص والتنفيذ.'
      },
      {
        slug: 'interior-design',
        label: 'التصميم والهندسة الداخلية',
        desc: 'تصميم الفضاءات والمواد للمباني العمومية والسكنية، من الفكرة العامة إلى التفاصيل الداخلية الدقيقة.'
      },
      {
        slug: 'urban-planning',
        label: 'دعم التخطيط العمراني',
        desc: 'دراسات إدماج عمراني، مرافقة في المخططات التهيئية، واستشارات متناسقة مع أدوات التنظيم والتعمير.'
      },
      {
        slug: 'construction-supervision',
        label: 'الإشراف على التنفيذ / OPC',
        desc: 'متابعة تقنية صارمة في الورشة وتنسيق OPC من الأساسات إلى التسليم النهائي.'
      },
      {
        slug: 'building-restoration',
        label: 'ترميم المباني',
        desc: 'ترميم إنشائي ومعماري للمباني المتضررة أو المتدهورة مع احترام طابعها الأصلي قدر الإمكان.'
      },
      {
        slug: 'heritage-restoration',
        label: 'ترميم التراث والآثار',
        desc: 'تدخلات متخصصة في ترميم المباني المصنَّفة والمعالم الأثرية بالتنسيق مع هيئات حماية التراث.'
      }
    ],
    process: {
      tag: "منهجيتنا",
      steps: [
        "1. استماع وتحليل",
        "2. تصميم وتنسيق",
        "3. إشراف ومحافظة"
      ]
    },
    cta: {
      title: "ناقشنا حول مشروعك",
      btnContact: "اتصل بالمكتب",
      btnOffice: "العودة إلى المكتب"
    }
  },
  en: {
    heroTag: "OUR EXPERTISE",
    heroTitle: "Services",
    heroSub: "Integrated architectural and engineering services from studies to supervision and restoration.",
    intro: "S-Arch Studio offers a complete chain of services: from architectural studies and design to construction supervision, building restoration, and heritage work.",
    services: [
      {
        slug: 'architectural-studies',
        label: 'Architectural Studies',
        desc: 'Preliminary concept and feasibility studies developed into permit-ready architectural packages.'
      },
      {
        slug: 'interior-design',
        label: 'Design & Interior Architecture',
        desc: 'Spatial and material design for civic and residential environments, from overall concept to detailed interior atmospheres.'
      },
      {
        slug: 'urban-planning',
        label: 'Urban Planning Support',
        desc: 'Urban integration studies, master-planning support, and advisory work aligned with regulatory planning tools.'
      },
      {
        slug: 'construction-supervision',
        label: 'Construction Supervision / OPC',
        desc: 'Rigorous on-site technical supervision and OPC coordination from foundation to handover.'
      },
      {
        slug: 'building-restoration',
        label: 'Building Restoration',
        desc: 'Structural and architectural restoration of deteriorated or damaged existing buildings.'
      },
      {
        slug: 'heritage-restoration',
        label: 'Heritage & Archaeological Restoration',
        desc: 'Specialized restoration of listed heritage buildings and archaeological sites in coordination with protection authorities.'
      }
    ],
    process: {
      tag: "PROCESS",
      steps: [
        "1. Listen & Analyse",
        "2. Design & Coordinate",
        "3. Supervise & Preserve"
      ]
    },
    cta: {
      title: "Discuss your project",
      btnContact: "Contact the Office",
      btnOffice: "Back to Office"
    }
  },
  fr: {
    heroTag: "NOTRE EXPERTISE",
    heroTitle: "Services",
    heroSub: "Services intégrés d'architecture et d'ingénierie, des études à la supervision et la restauration.",
    intro: "S-Arch Studio offre une chaîne complète de services : des études architecturales et de la conception à la supervision de chantier, en passant par la restauration de bâtiments et les travaux sur le patrimoine.",
    services: [
      {
        slug: 'architectural-studies',
        label: 'Études Architecturales',
        desc: 'Études préliminaires de concept et de faisabilité développées jusqu\'aux dossiers d\'exécution prêts pour les permis.'
      },
      {
        slug: 'interior-design',
        label: 'Conception & Architecture d\'Intérieur',
        desc: 'Conception spatiale et matérielle pour les environnements civiques et résidentiels, du concept global aux ambiances intérieures détaillées.'
      },
      {
        slug: 'urban-planning',
        label: 'Support en Planification Urbaine',
        desc: 'Études d\'intégration urbaine, support au plan directeur et conseil alignés sur les outils de planification réglementaire.'
      },
      {
        slug: 'construction-supervision',
        label: 'Supervision de Chantier / OPC',
        desc: 'Supervision technique rigoureuse sur site et coordination OPC, des fondations jusqu\'à la livraison.'
      },
      {
        slug: 'building-restoration',
        label: 'Restauration de Bâtiments',
        desc: 'Restauration structurelle et architecturale de bâtiments existants détériorés ou endommagés.'
      },
      {
        slug: 'heritage-restoration',
        label: 'Restauration du Patrimoine & Archéologique',
        desc: 'Restauration spécialisée de bâtiments patrimoniaux classés et de sites archéologiques en coordination avec les autorités de protection.'
      }
    ],
    process: {
      tag: "PROCESSUS",
      steps: [
        "1. Écouter & Analyser",
        "2. Concevoir & Coordonner",
        "3. Superviser & Préserver"
      ]
    },
    cta: {
      title: "Discutez de votre projet",
      btnContact: "Contacter le Bureau",
      btnOffice: "Retour au Bureau"
    }
  }
};

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const content = pageContent[locale as Locale];
  return {
    title: `${content.heroTitle} | S-Arch Studio — Global Expertise`,
    description: content.heroSub,
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = pageContent[locale as Locale];
  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // Fetch live services
  const fetchedServices = await fetchPublicServices();
  
  // Create the final list by prioritizing fetched services and keeping hardcoded ones as fallback
  const dynamicList = fetchedServices.map(s => {
    const t = s[locale as keyof typeof s] as { title?: string; subtitle?: string } | undefined;
    return {
      label: (t && t.title) ? t.title : s.en?.title || s.slug,
      desc: (t && t.subtitle) ? t.subtitle : s.en?.subtitle || '',
      slug: s.slug
    };
  });

  // Filter hardcoded services to only those not already present in dynamic list (by slug)
  const fallbackList = content.services.filter(h => 
    !dynamicList.some(d => d.slug === h.slug)
  );

  const servicesList = [...dynamicList, ...fallbackList];

  // Standard elegant styling 
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
    <main dir={dir} style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-0)', paddingBottom: '0', position: 'relative' }}>
      
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
      <section style={{ ...sectionStyle, padding: '10rem 0 8rem', backgroundColor: 'var(--color-obsidian)', borderBottom: 'none' }}>
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
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <p style={{
              fontSize: '1.5rem',
              lineHeight: 1.6,
              color: 'var(--color-text-primary)',
              maxWidth: '65ch',
            }}>
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ maxWidth: '1024px', margin: isRtl ? '0 0 0 auto' : '0 auto 0 0' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
            }}>
              {servicesList.map((service, i) => (
                <div key={i} style={{ padding: '3rem 2.5rem', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-hairline)', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ display: 'block', fontSize: '1rem', fontWeight: 500, color: 'var(--color-sand)', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
                    0{i + 1}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>
                    {service.label}
                  </h3>
                  <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
                    {service.desc}
                  </p>
                  {'slug' in service && (
                    <Link href={`/${locale}/services/${service.slug}`} style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                       {locale === 'en' ? 'Read More' : locale === 'fr' ? 'En Savoir Plus' : 'اقرأ المزيد'}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section style={{ padding: '5rem 0 6rem', borderTop: '1px solid var(--color-hairline)' }}>
        <div className="container">
          <div style={{ maxWidth: '1024px', margin: isRtl ? '0 0 0 auto' : '0 auto 0 0' }}>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '2rem', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {content.process.steps.map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                    {step}
                  </div>
                  {i < content.process.steps.length - 1 && (
                    <div style={{ 
                      flexGrow: 1, 
                      height: '1px', 
                      backgroundColor: 'var(--color-text-primary)', 
                      opacity: 0.1,
                      minWidth: '50px' 
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            color: 'var(--color-text-inverse)',
            marginBottom: '3rem',
            letterSpacing: '-0.02em',
          }}>
            {content.cta.title}
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/contact`} style={{
              padding: '1rem 2rem',
              backgroundColor: 'var(--color-surface-0)',
              color: 'var(--color-obsidian)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}>
              {content.cta.btnContact}
            </Link>
            <Link href={`/${locale}/office`} style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--color-text-inverse)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}>
              {content.cta.btnOffice}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
