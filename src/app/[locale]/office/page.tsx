import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { fetchPublicTeam } from '@/lib/server-data';

interface OfficePageProps {
  params: Promise<{ locale: string }>;
}

const pageContent = {
  ar: {
    heroTag: "مقرنا في سطيف، الجزائر",
    heroTitle: "المكتب",
    heroSub: "ممارسة معمارية وهندسية طموحة عالمياً وبجذور إقليمية عميقة.",
    sections: {
      whoWeAre: {
        tag: "من نحن",
        text: "استوديو س-آرش هو ممارسة معمارية وهندسية ذات توجه دولي مقرها في سطيف، الجزائر. نحن نجمع بين المعايير المهنية العالمية والفهم العميق للسياق الشمال أفريقي. نعمل عبر دورة حياة المشروع الكاملة: الدراسات، التصميم، الإشراف، والترميم التراثي."
      },
      leadership: {
        tag: "القيادة",
        members: [
          { name: "م. بوهدة عبد السلام", role: "معماري رئيسي ومؤسس مشارك" },
          { name: "م. مامي منير", role: "معماري رئيسي ومؤسس مشارك" }
        ]
      },
      teamStructure: {
        tag: "هيكلة الفريق",
        roles: [
          "المهندسون المعماريون الرئيسيون / المؤسسون",
          "مهندسو المشاريع",
          "المهندسون الإنشائيون",
          "المهندسون التقنيون / الهندسة الميكانيكية والكهربائية (MEP)",
          "أخصائيو ترميم التراث",
          "أخصائيو المسح بالليزر ونمذجة معلومات البناء (BIM)",
          "الإشراف على الموقع / OPC",
          "التنسيق الإداري والتنظيمي"
        ]
      },
      process: {
        tag: "منهجيتنا",
        steps: [
          { id: "01", title: "التحليل", desc: "فهم شامل للموقع والمتطلبات وسياق المشروع لضمان التأسيس السليم." },
          { id: "02", title: "التصور", desc: "تطوير الرؤية المعمارية وهندسة الفضاء بما يتوافق مع الأهداف." },
          { id: "03", title: "التطوير التقني", desc: "إعداد مخططات الإنتاج الدقيقة والوثائق الهندسية الشاملة." },
          { id: "04", title: "الإشراف", desc: "متابعة صارمة لمراحل التنفيذ على أرض الواقع لضمان مطابقة التصميم." }
        ]
      },
      technology: {
        tag: "التكنولوجيا",
        tools: [
          "النمذجة ثلاثية الأبعاد ونمذجة معلومات البناء (BIM)",
          "المسح بالليزر والتقاط البيانات الرقمية",
          "التصور المعماري المتقدم",
          "التصميم بمساعدة الذكاء الاصطناعي"
        ]
      },
      credibility: {
        tag: "الاعتماد المهني",
        text: "نعمل بامتثال كامل مع لوائح الهندسة المعمارية والإنشائية الجزائرية. نحن مسجلون رسمياً لدى نقابة المهندسين المعماريين الجزائريين، مما يضمن التزامنا المطلق بأعلى معايير جودة التنفيذ والمسؤولية المهنية."
      },
      cta: {
        title: "اعمل معنا",
        btnServices: "خدماتنا",
        btnContact: "اتصل بالمكتب"
      }
    }
  },
  en: {
    heroTag: "Based in Sétif, Algeria",
    heroTitle: "Office",
    heroSub: "An architectural and engineering practice with global ambition and deep regional roots.",
    sections: {
      whoWeAre: {
        tag: "WHO WE ARE",
        text: "S-Arch Studio is an internationally focused architectural and engineering practice based in Sétif, Algeria. We combine global professional standards with a deep understanding of the North African context. Our work spans the full lifecycle of architecture: from initial studies and concept design to full technical supervision and heritage restoration."
      },
      leadership: {
        tag: "LEADERSHIP",
        members: [
          { name: "Eng. Bouhda Abdelssalam", role: "Principal Architect & Co-Founder" },
          { name: "Eng. Mami Mounir", role: "Principal Architect & Co-Founder" }
        ]
      },
      teamStructure: {
        tag: "TEAM STRUCTURE",
        roles: [
          "Principal Architects / Founders",
          "Project Architects",
          "Structural Engineers",
          "MEP & Technical Engineers",
          "Heritage Restoration Specialists",
          "BIM, 3D & Laser Survey Specialists",
          "Site Supervision & OPC",
          "Administrative & Regulatory Coordination"
        ]
      },
      process: {
        tag: "HOW WE WORK",
        steps: [
          { id: "01", title: "Analysis", desc: "Deep understanding of the site, requirements, and context." },
          { id: "02", title: "Concept", desc: "Developing the core architectural and spatial vision." },
          { id: "03", title: "Technical Development", desc: "Precise execution packages and thorough engineering documentation." },
          { id: "04", title: "Supervision", desc: "Rigorous on-site oversight ensuring exact fidelity to the design." }
        ]
      },
      technology: {
        tag: "TECHNOLOGY",
        tools: [
          "3D Modeling & BIM",
          "Laser Survey & Digital Capture",
          "Architectural Visualization",
          "AI-Assisted Design"
        ]
      },
      credibility: {
        tag: "PROFESSIONAL CREDIBILITY",
        text: "We operate in full compliance with Algerian architectural and engineering regulations. S-Arch Studio is officially registered with the Ordre National des Architectes d'Algérie, ensuring our unyielding commitment to execution quality and absolute professional liability."
      },
      cta: {
        title: "Work With Us",
        btnServices: "Our Services",
        btnContact: "Contact the Office"
      }
    }
  },
  fr: {
    heroTag: "Basé à Sétif, Algérie",
    heroTitle: "Le Bureau",
    heroSub: "Une pratique d'architecture et d'ingénierie avec une ambition globale et de profondes racines régionales.",
    sections: {
      whoWeAre: {
        tag: "QUI SOMMES-NOUS",
        text: "S-Arch Studio est une agence d'architecture et d'ingénierie à vocation internationale basée à Sétif, en Algérie. Nous combinons des standards professionnels mondiaux avec une compréhension fine du contexte nord-africain. Nous intervenons sur l'ensemble du cycle de vie des projets : études, conception, supervision et restauration du patrimoine."
      },
      leadership: {
        tag: "DIRECTION",
        members: [
          { name: "Ing. Bouhda Abdelssalam", role: "Architecte Principal et Co-Fondateur" },
          { name: "Ing. Mami Mounir", role: "Architecte Principal et Co-Fondateur" }
        ]
      },
      teamStructure: {
        tag: "STRUCTURE DE L'ÉQUIPE",
        roles: [
          "Architectes Principaux / Fondateurs",
          "Architectes de Projet",
          "Ingénieurs Structure",
          "Ingénieurs Techniques / CVC",
          "Spécialistes en Restauration du Patrimoine",
          "Experts BIM, 3D et Relevé Laser",
          "Supervision de Chantier / OPC",
          "Coordination Administrative et Réglementaire"
        ]
      },
      process: {
        tag: "NOTRE MÉTHODOLOGIE",
        steps: [
          { id: "01", title: "Analyse", desc: "Compréhension approfondie du site, des besoins et du contexte." },
          { id: "02", title: "Concept", desc: "Développement de la vision architecturale et spatiale centrale." },
          { id: "03", title: "Développement Technique", desc: "Plans d'exécution précis et documentation d'ingénierie rigoureuse." },
          { id: "04", title: "Supervision", desc: "Suivi de chantier intransigeant garantissant la fidélité au projet." }
        ]
      },
      technology: {
        tag: "TECHNOLOGIE",
        tools: [
          "Modélisation 3D et BIM",
          "Relevé Laser et Capture Numérique",
          "Visualisation Architecturale",
          "Conception Assistée par l'IA"
        ]
      },
      credibility: {
        tag: "CRÉDIBILITÉ PROFESSIONNELLE",
        text: "Nous opérons en totale conformité avec les réglementations algériennes en matière d'architecture et d'ingénierie. S-Arch Studio est officiellement inscrit à l'Ordre National des Architectes d'Algérie, garantissant notre engagement absolu envers la qualité d'exécution et la responsabilité professionnelle."
      },
      cta: {
        title: "Travailler Avec Nous",
        btnServices: "Nos Services",
        btnContact: "Contacter le Bureau"
      }
    }
  }
};

export async function generateMetadata({ params }: OfficePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const content = pageContent[locale as Locale];
  return {
    title: `${content.heroTitle} | S-Arch Studio — Architecture & Engineering`,
    description: content.heroSub,
  };
}

export default async function OfficePage({ params }: OfficePageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = pageContent[locale as Locale];
  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // Fetch Team from Firestore
  const fsTeam = await fetchPublicTeam();
  const leadershipMembers = fsTeam.length > 0
    ? fsTeam.map(m => ({
        name: m.name,
        role: String(m.role[locale as keyof typeof m.role] || m.role.en || ''),
        photo: m.photo
      }))
    : content.sections.leadership.members;

  // Standard elegant styling 
  const sectionStyle = {
    padding: '8rem 0 4rem',
    backgroundColor: 'var(--color-surface-0)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const contentWrapperStyle: React.CSSProperties = {
    maxWidth: '850px',
    margin: isRtl ? '0 0 0 auto' : '0 auto 0 0',
    textAlign: isRtl ? 'right' : 'left',
  };

  const overlineStyle = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-sand)',
    textTransform: 'uppercase' as const,
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

      {/* 2. WHO WE ARE */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <span style={overlineStyle}>{content.sections.whoWeAre.tag}</span>
            <p style={{
              fontSize: '1.35rem',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '65ch',
            }}>
              {content.sections.whoWeAre.text}
            </p>
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <span style={overlineStyle}>{content.sections.leadership.tag}</span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              marginTop: '2.5rem'
            }}>
              {leadershipMembers.map((leader, i) => (
                <div key={i} style={{ padding: '2.5rem', backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-hairline)' }}>
                  {((leader as any).photo) && (
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1.5rem', backgroundColor: 'var(--color-hairline)' }}>
                      <img src={(leader as any).photo} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                    {leader.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
                    {leader.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAM STRUCTURE */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <span style={overlineStyle}>{content.sections.teamStructure.tag}</span>
            <ul style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '2.5rem',
              listStyle: 'none',
              padding: 0
            }}>
              {content.sections.teamStructure.roles.map((role, i) => (
                <li key={i} style={{ 
                  fontSize: '1rem', 
                  color: 'var(--color-text-primary)', 
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-sand)', borderRadius: '50%' }} />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '1024px', margin: isRtl ? '0 0 0 auto' : '0 auto 0 0' }}>
            <span style={overlineStyle}>{content.sections.process.tag}</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
              {content.sections.process.steps.map((step, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <span style={{ 
                    fontSize: '3.5rem', 
                    fontWeight: 300, 
                    color: 'rgba(0,0,0,0.06)', 
                    display: 'block', 
                    marginBottom: '1rem',
                    lineHeight: 1
                  }}>
                    {step.id}
                  </span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <span style={overlineStyle}>{content.sections.technology.tag}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
              {content.sections.technology.tools.map((tool, i) => (
                <span key={i} style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: 'var(--color-surface-1)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: '100px',
                  fontSize: '0.95rem',
                  color: 'var(--color-text-primary)',
                  fontWeight: 500
                }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROFESSIONAL CREDIBILITY */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ ...contentWrapperStyle, borderLeft: isRtl ? 'none' : '2px solid var(--color-sand)', borderRight: isRtl ? '2px solid var(--color-sand)' : 'none', paddingLeft: isRtl ? 0 : '1.5rem', paddingRight: isRtl ? '1.5rem' : 0 }}>
            <span style={overlineStyle}>{content.sections.credibility.tag}</span>
            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '65ch',
            }}>
              {content.sections.credibility.text}
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ padding: '7rem 0', marginTop: '4rem', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            color: 'var(--color-text-inverse)',
            marginBottom: '3rem',
            letterSpacing: '-0.02em',
          }}>
            {content.sections.cta.title}
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/services`} style={{
              padding: '1rem 2rem',
              backgroundColor: 'var(--color-surface-0)',
              color: 'var(--color-obsidian)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}>
              {content.sections.cta.btnServices}
            </Link>
            <Link href={`/${locale}/contact`} style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--color-text-inverse)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}>
              {content.sections.cta.btnContact}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
