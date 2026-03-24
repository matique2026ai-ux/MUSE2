import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { fetchPublicProjects } from '@/lib/server-data';

interface ProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const pageContent = {
  ar: {
    heroTitle: "المشاريع",
    heroSub: "مجموعة مختارة من أعمالنا المعمارية والهندسية في سطيف وخارجها.",
    projects: [
      {
        id: "setif-grand-theatre",
        title: "المسرح الكبير بسطيف",
        type: "هندسة معمارية / ثقافي",
        location: "سطيف، الجزائر",
        year: "2024",
        summary: "قطب ثقافي حديث يدمج الزخارف التقليدية لشمال إفريقيا مع الهندسة الصوتية المعاصرة.",
        image: "/images/projects/civic-hub-hero.jpg"
      },
      {
        id: "el-djazair-residential",
        title: "المجمع السكني الجزائر",
        type: "سكني",
        location: "الجزائر العاصمة، الجزائر",
        year: "2023",
        summary: "إسكان حضري عالي الكثافة يعطي الأولوية للتهوية الطبيعية، المساحات المجتمعية، والمواد المستدامة.",
        image: "/images/projects/residential-hero.jpg"
      },
      {
        id: "constantine-plaza",
        title: "الساحة التذكارية بقسنطينة",
        type: "تخطيط عمراني",
        location: "قسنطينة، الجزائر",
        year: "2022",
        summary: "إعادة تصميم هيكلي شامل لوسط المدينة التاريخي لتحسين حركة المشاة وتكريم تراث المدينة.",
        image: "/images/projects/civic-hub-gallery-1.jpg"
      },
      {
        id: "mediterranean-tower",
        title: "البرج المتوسطي",
        type: "متعدد الاستخدامات",
        location: "وهران، الجزائر",
        year: "2025",
        summary: "مشروع طموح لبرج شاهق يجمع بين المكاتب التجارية، الشقق الفاخرة، ومساحات البيع بالتجزئة على الساحل.",
        image: "/images/projects/residential-gallery-1.jpg"
      },
      {
        id: "dar-el-kadi",
        title: "ترميم دار القاضي",
        type: "ترميم تراث / آثار",
        location: "بجاية، الجزائر",
        year: "2021",
        summary: "ترميم إنشائي ومادي دقيق لمبنى تاريخي مصنف بالتنسيق مع السلطات الثقافية لحماية التراث.",
        image: "/images/projects/heritage-hero.jpg"
      },
      {
        id: "s-arch-hq",
        title: "تهيئة المقر الرئيسي للمكتب",
        type: "ترميم مبنى",
        location: "سطيف، الجزائر",
        year: "2020",
        summary: "إعادة استخدام تكييفية لمستودع صناعي مهجور لتحويله إلى استوديو معماري خاص بنا، مشرق ومفتوح.",
        image: "/images/projects/adaptive-reuse-hero.jpg"
      }
    ],
    cta: {
      learnMore: "تعرّف أكثر على المكتب",
      contact: "تواصل معنا بخصوص مشروع"
    }
  },
  en: {
    heroTitle: "Projects",
    heroSub: "Selected architectural and engineering work from Sétif and beyond.",
    projects: [
      {
        id: "setif-grand-theatre",
        title: "Sétif Grand Theatre",
        type: "Civic / Cultural",
        location: "Sétif, Algeria",
        year: "2024",
        summary: "A modern cultural hub integrating traditional North African motifs with contemporary acoustic engineering.",
        image: "/images/projects/civic-hub-hero.jpg"
      },
      {
        id: "el-djazair-residential",
        title: "El Djazair Residential Complex",
        type: "Residential",
        location: "Algiers, Algeria",
        year: "2023",
        summary: "High-density urban housing prioritizing natural ventilation, community spaces, and sustainable materials.",
        image: "/images/projects/residential-hero.jpg"
      },
      {
        id: "constantine-plaza",
        title: "Constantine Commemorative Plaza",
        type: "Urban Planning",
        location: "Constantine, Algeria",
        year: "2022",
        summary: "A massive structural redesign of the historic city center to improve pedestrian flow and honor the city's heritage.",
        image: "/images/projects/civic-hub-gallery-1.jpg"
      },
      {
        id: "mediterranean-tower",
        title: "Mediterranean Tower",
        type: "Mixed-use",
        location: "Oran, Algeria",
        year: "2025",
        summary: "An ambitious high-rise development combining commercial offices, luxury apartments, and public retail spaces on the coast.",
        image: "/images/projects/residential-gallery-1.jpg"
      },
      {
        id: "dar-el-kadi",
        title: "Dar El Kadi Restoration",
        type: "Heritage / Archaeological",
        location: "Béjaïa, Algeria",
        year: "2021",
        summary: "Painstaking structural and material restoration of a listed historic building in coordination with cultural authorities.",
        image: "/images/projects/heritage-hero.jpg"
      },
      {
        id: "s-arch-hq",
        title: "S-Arch Headquarters Adaptation",
        type: "Building Restoration",
        location: "Sétif, Algeria",
        year: "2020",
        summary: "Adaptive reuse of an abandoned industrial warehouse into our own light-filled, open-plan architectural studio.",
        image: "/images/projects/adaptive-reuse-hero.jpg"
      }
    ],
    cta: {
      learnMore: "Learn more about the office",
      contact: "Contact us about a project"
    }
  },
  fr: {
    heroTitle: "Projets",
    heroSub: "Sélection de travaux architecturaux et d'ingénierie à Sétif et au-delà.",
    projects: [
      {
        id: "setif-grand-theatre",
        title: "Grand Théâtre de Sétif",
        type: "Civique / Culturel",
        location: "Sétif, Algérie",
        year: "2024",
        summary: "Un pôle culturel moderne intégrant des motifs traditionnels nord-africains avec une ingénierie acoustique contemporaine.",
        image: "/images/projects/civic-hub-hero.jpg"
      },
      {
        id: "el-djazair-residential",
        title: "Complexe Résidentiel El Djazair",
        type: "Résidentiel",
        location: "Alger, Algérie",
        year: "2023",
        summary: "Logements urbains à haute densité qui privilégient la ventilation naturelle, les espaces communautaires et les matériaux durables.",
        image: "/images/projects/residential-hero.jpg"
      },
      {
        id: "constantine-plaza",
        title: "Place Commémorative de Constantine",
        type: "Planification Urbaine",
        location: "Constantine, Algérie",
        year: "2022",
        summary: "Une refonte structurelle massive du centre-ville historique pour améliorer le flux piétonnier et honorer le patrimoine de la ville.",
        image: "/images/projects/civic-hub-gallery-1.jpg"
      },
      {
        id: "mediterranean-tower",
        title: "Tour Méditerranéenne",
        type: "Usage Mixte",
        location: "Oran, Algérie",
        year: "2025",
        summary: "Un ambitieux développement de grande hauteur combinant des bureaux commerciaux, des appartements de luxe et des espaces de vente au détail sur la côte.",
        image: "/images/projects/residential-gallery-1.jpg"
      },
      {
        id: "dar-el-kadi",
        title: "Restauration de Dar El Kadi",
        type: "Patrimoine / Archéologique",
        location: "Béjaïa, Algérie",
        year: "2021",
        summary: "Restauration structurelle et matérielle minutieuse d'un bâtiment historique classé en coordination avec les autorités culturelles.",
        image: "/images/projects/heritage-hero.jpg"
      },
      {
        id: "s-arch-hq",
        title: "Adaptation du Siège de S-Arch",
        type: "Restauration de Bâtiment",
        location: "Sétif, Algérie",
        year: "2020",
        summary: "Réutilisation adaptative d'un entrepôt industriel abandonné pour créer notre propre studio d'architecture ouvert et inondé de lumière.",
        image: "/images/projects/adaptive-reuse-hero.jpg"
      }
    ],
    cta: {
      learnMore: "En savoir plus sur le bureau",
      contact: "Contactez-nous pour un projet"
    }
  }
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const content = pageContent[locale as Locale];
  return {
    title: `${content.heroTitle} | S-Arch Studio`,
    description: content.heroSub,
  };
}

export default async function ProjectsArchivePage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = pageContent[locale as Locale];
  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // Fetch projects from Firestore (falls back to static data)
  const firestoreProjects = await fetchPublicProjects();
  const projects = firestoreProjects.map(p => {
    const t = p[locale as keyof typeof p] as { title?: string; location?: string; year?: string; type?: string; tagline?: string } | undefined;
    return {
      id: p.slug,
      title: (t && t.title) ? t.title : p.en?.title || p.slug,
      type: (t && t.type) ? t.type : p.en?.type || '',
      location: (t && t.location) ? t.location : p.en?.location || '',
      year: (t && t.year) ? t.year : p.en?.year || '',
      summary: (t && t.tagline) ? t.tagline : p.en?.tagline || '',
      image: p.heroImage || '/images/projects/civic-hub-hero.jpg',
    };
  });

  const sectionStyle: React.CSSProperties = {
    padding: '8rem 0 4rem',
    backgroundColor: 'var(--color-surface-0)',
    position: 'relative',
    overflow: 'hidden',
  };

  const overlineStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.6)',
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
      {/* 1. HERO - SEO H1 */}
      <section style={{ ...sectionStyle, padding: '10rem 0 8rem', backgroundColor: 'var(--color-obsidian)', borderBottom: 'none' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: isRtl ? '0 0 0 auto' : '0 auto 0 0', textAlign: isRtl ? 'right' : 'left' }}>
            <span style={overlineStyle}>
              {locale === 'en' ? 'OUR ARCHIVE' : locale === 'fr' ? 'NOTRE ARCHIVE' : 'أرشيفنا'}
            </span>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              fontWeight: 800,
              color: 'var(--color-text-inverse)',
              lineHeight: 1.05,
              marginBottom: '2rem',
              letterSpacing: '-0.03em',
            }}>
              {content.heroTitle}
            </h1>
            <p style={{
              fontSize: '1.4rem',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '55ch',
              fontWeight: 400,
            }}>
              {content.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROJECTS GRID - SEO H2s */}
      <section style={{ padding: '6rem 0 8rem' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16" style={{ textAlign: isRtl ? 'right' : 'left' }}>
            {projects.map((project, idx) => (
              <div key={idx} className="group relative flex flex-col cursor-pointer" style={{ transition: 'transform 0.3s ease' }}>
                <Link href={`/${locale}/projects/${project.id}`} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                  <span className="sr-only">View {project.title}</span>
                </Link>
                
                {/* Image Rendering Block */}
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  backgroundColor: 'var(--color-surface-2)',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  position: 'relative'
                }}>
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </div>
                
                {/* Metadata & Typography */}
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline', 
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      color: 'var(--color-sand)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em' 
                    }}>
                      {project.type}
                    </span>
                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500, 
                      color: 'var(--color-text-secondary)',
                      fontVariantNumeric: 'lining-nums tabular-nums' // Ensures Western digits render nicely and evenly
                    }}>
                      {project.year}
                    </span>
                  </div>

                  <h2 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 800, 
                    color: 'var(--color-text-primary)', 
                    lineHeight: 1.2, 
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                    transition: 'color 0.2s ease'
                  }} className="group-hover:text-[var(--color-sand)]">
                    {project.title}
                  </h2>
                  
                  <p style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '1rem',
                    opacity: 0.8
                  }}>
                    {project.location}
                  </p>
                  
                  <p style={{ 
                    fontSize: '1.05rem', 
                    lineHeight: 1.6, 
                    color: 'var(--color-text-secondary)',
                    marginTop: 'auto'
                  }}>
                    {project.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FINAL CTA */}
      <section style={{ 
        padding: '5rem 0', 
        borderTop: '1px solid var(--color-hairline)', 
        backgroundColor: 'var(--color-surface-0)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Link href={`/${locale}/office`} style={{
              fontSize: '1.25rem',
              color: 'var(--color-text-primary)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              fontWeight: 600,
              transition: 'color 0.2s'
            }} className="hover:text-[var(--color-sand)]">
              {content.cta.learnMore}
            </Link>
            <Link href={`/${locale}/contact`} style={{
              fontSize: '1.25rem',
              color: 'var(--color-text-primary)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              fontWeight: 600,
              transition: 'color 0.2s'
            }} className="hover:text-[var(--color-sand)]">
              {content.cta.contact}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
