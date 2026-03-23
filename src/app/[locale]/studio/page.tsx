import React from 'react';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

interface OfficePageProps {
  params: Promise<{ locale: string }>;
}

const pageContent = {
  ar: {
    heroTag: "استوديو س-آرش",
    heroTitle: "المكتب",
    heroSub: "ممارسة معمارية وهندسية مقرها سطيف. جذور جزائرية، آفاق عالمية تجمع بين الحس المرهف والدقة التقنية.",
    sections: {
      whoWeAre: {
        tag: "من نحن",
        text: "نحن نصمم فضاءات تُبنى على الأفكار وتُختبر في الواقع. منهجيتنا تجمع بين المبادئ المعمارية الدولية والتقدير العميق للسياق المحلي والتقنيات المعاصرة."
      },
      pillars: {
        tag: "الركائز",
        items: [
          { title: "التناظر", desc: "خلق توازن بين الوظيفة والجمال." },
          { title: "الدقة", desc: "اهتمام صارم بالتفاصيل التقنية." },
          { title: "الابتكار", desc: "تجاوز الحدود المعمارية التقليدية." }
        ]
      },
      leadership: {
        tag: "القيادة",
        members: [
          { name: "م. بوهدة عبد السلام", role: "معماري رئيسي / مؤسس" },
          { name: "م. مامي منير", role: "معماري رئيسي / مؤسس" }
        ]
      },
      process: {
        tag: "المنهجية",
        steps: [
          { id: "01", title: "التحليل", desc: "فهم عميق للموقع والسياق." },
          { id: "02", title: "التصور", desc: "تطوير الفكرة المعمارية." },
          { id: "03", title: "التقنية", desc: "إعداد المخططات الدقيقة." },
          { id: "04", title: "المتابعة", desc: "مرافقة صارمة للإنجاز." }
        ]
      }
    }
  },
  en: {
    heroTag: "OUR STUDIO",
    heroTitle: "Office",
    heroSub: "An architectural and engineering practice based in Sétif. Algerian roots, global outlook combining sensibility with technical precision.",
    sections: {
      whoWeAre: {
        tag: "WHO WE ARE",
        text: "We design spaces built on ideas, tested in reality. Our practice synthesizes international architectural principles with a deep appreciation for local context and contemporary technology."
      },
      pillars: {
        tag: "OUR PILLARS",
        items: [
          { title: "Symmetry", desc: "Balancing function with sculptural form." },
          { title: "Precision", desc: "Rigorous attention to technical detail." },
          { title: "Innovation", desc: "Pushing the boundaries of tradition." }
        ]
      },
      leadership: {
        tag: "LEADERSHIP",
        members: [
          { name: "Eng. Bouhda Abdelssalam", role: "Principal Architect / Founder" },
          { name: "Eng. Mami Mounir", role: "Principal Architect / Founder" }
        ]
      },
      process: {
        tag: "PROCESS",
        steps: [
          { id: "01", title: "Analysis", desc: "Deep understanding of context." },
          { id: "02", title: "Concept", desc: "Developing the architectural vision." },
          { id: "03", title: "Technical", desc: "Precise execution packages." },
          { id: "04", title: "Supervision", desc: "Rigorous on-site oversight." }
        ]
      }
    }
  },
  fr: {
    heroTag: "NOTRE STUDIO",
    heroTitle: "Le Bureau",
    heroSub: "Une pratique d'architecture et d'ingénierie basée à Sétif. Des racines algériennes, une vision globale alliant sensibilité et précision technique.",
    sections: {
      whoWeAre: {
        tag: "QUI SOMMES-NOUS",
        text: "Nous concevons des espaces construits sur des idées, testés dans la réalité. Notre pratique synthétise les principes architecturaux internationaux avec une profonde appréciation du contexte local."
      },
      pillars: {
        tag: "NOS PILIERS",
        items: [
          { title: "Symétrie", desc: "Équilibrer fonction et forme sculpturale." },
          { title: "Précision", desc: "Attention rigoureuse au détail technique." },
          { title: "Innovation", desc: "Repousser les limites de la tradition." }
        ]
      },
      leadership: {
        tag: "DIRECTION",
        members: [
          { name: "Ing. Bouhda Abdelssalam", role: "Architecte Principal / Fondateur" },
          { name: "Ing. Mami Mounir", role: "Architecte Principal / Fondateur" }
        ]
      },
      process: {
        tag: "PROCESSUS",
        steps: [
          { id: "01", title: "Analyse", desc: "Compréhension profonde du contexte." },
          { id: "02", title: "Concept", desc: "Développement de la vision architecturale." },
          { id: "03", title: "Technique", desc: "Plans d'exécution précis." },
          { id: "04", title: "Suivi", desc: "Suivi de chantier rigoureux." }
        ]
      }
    }
  }
};

export default async function OfficePage({ params }: OfficePageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = pageContent[locale as Locale];
  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // Common styles extracted from projects/page.tsx
  const sectionStyle = {
    padding: '10rem 0 4rem', // Tightened bottom padding
    borderBottom: '1px solid var(--color-hairline)',
    backgroundColor: 'var(--color-surface-0)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const adaptiveSectionStyle = {
    padding: '4rem 0', // Tightened inter-section padding
    borderBottom: '1px solid var(--color-hairline)',
    backgroundColor: 'var(--color-surface-0)',
    position: 'relative' as const,
  };

  const contentWrapperStyle = {
    maxWidth: '800px',
    margin: isRtl ? '0 0 0 auto' : '0 auto 0 0',
    textAlign: (isRtl ? 'right' : 'left') as 'right' | 'left',
  };

  const expandedWrapperStyle = {
    maxWidth: '1024px', // Expanded for grids to fill space better
    margin: isRtl ? '0 0 0 auto' : '0 auto 0 0',
    textAlign: (isRtl ? 'right' : 'left') as 'right' | 'left',
  };

  const overlineStyle = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-sand)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    marginBottom: '1.5rem',
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: 800,
    color: 'var(--color-obsidian)',
    lineHeight: 1.1,
    marginBottom: '2.5rem',
    letterSpacing: '-0.03em',
  };

  const descriptionStyle = {
    fontSize: '1.25rem',
    lineHeight: 1.6,
    color: 'var(--color-text-secondary)',
    maxWidth: '60ch',
  };

  return (
    <main dir={dir} style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-0)' }}>
      {/* ─── GHOST WATERMARK FILLER ──────────────────────────────── */}
      <div 
        style={{ 
          position: 'fixed', 
          top: '50%', 
          left: isRtl ? '4rem' : 'auto',
          right: isRtl ? 'auto' : '4rem',
          transform: 'translateY(-50%) rotate(90deg)', 
          fontSize: '0.75rem', 
          fontWeight: 800, 
          letterSpacing: '1em', 
          color: 'var(--color-text-primary)', 
          opacity: 0.04, 
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0
        }}
      >
        S-ARCH STUDIO / {isRtl ? 'استوديو س-آرش' : 'ARCHITECTURAL DNA'}
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <p style={overlineStyle}>{content.heroTag}</p>
            <h1 style={titleStyle}>{content.heroTitle}</h1>
            <p style={descriptionStyle}>{content.heroSub}</p>
          </div>
        </div>
      </section>

      {/* ─── WHO WE ARE ─────────────────────────────────────────── */}
      <section style={adaptiveSectionStyle}>
        <div className="container">
          <div style={contentWrapperStyle}>
            <p style={overlineStyle}>{content.sections.whoWeAre.tag}</p>
            <p style={{ ...descriptionStyle, fontSize: '1.5rem', maxWidth: '80ch', color: 'var(--color-text-primary)' }}>
              {content.sections.whoWeAre.text}
            </p>
          </div>
        </div>
      </section>

      {/* ─── OUR PILLARS (Content Enrichment) ───────────────────── */}
      <section style={adaptiveSectionStyle}>
        <div className="container">
          <div style={expandedWrapperStyle}>
            <p style={overlineStyle}>{content.sections.pillars.tag}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '2.5rem' }}>
              {content.sections.pillars.items.map((pillar, i) => (
                <div key={i} style={{ padding: '2rem 1.5rem', border: '1px solid var(--color-hairline)', backgroundColor: 'rgba(0,0,0,0.01)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP ─────────────────────────────────────────── */}
      <section style={adaptiveSectionStyle}>
        <div className="container">
          <div style={expandedWrapperStyle}>
            <p style={overlineStyle}>{content.sections.leadership.tag}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '2rem' }}>
              {content.sections.leadership.members.map((leader, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                    {leader.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    {leader.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────────────────── */}
      <section style={adaptiveSectionStyle}>
        <div className="container">
          <div style={expandedWrapperStyle}>
            <p style={overlineStyle}>{content.sections.process.tag}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', marginTop: '2.5rem' }} className="md:!grid-cols-4">
              {content.sections.process.steps.map((step, i) => (
                <div key={i}>
                  <span style={{ fontSize: '4rem', fontWeight: 200, color: 'var(--color-surface-2)', display: 'block', marginBottom: '1rem', fontFamily: 'monospace' }}>
                    {step.id}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
