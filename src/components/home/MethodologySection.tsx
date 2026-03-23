import type { Locale } from '@/lib/i18n';
import type { FirestoreMethodologyConfig } from '@/lib/cms-types';

interface MethodologySectionProps {
  locale: Locale;
  methodologyConfig?: FirestoreMethodologyConfig | null;
}

const content = {
  en: {
    eyebrow: 'Our Methodology',
    headline: 'How a Project Comes to Life',
    intro: 'Architecture is not invented — it is uncovered through patient inquiry, collaborative rigour, and disciplined craft.',
    steps: [
      {
        phase: 'Phase I',
        title: 'Ground',
        body: 'We begin with the site and the brief. Every constraint is treated as a design prompt; every memory embedded in the place is brought into the conversation.',
      },
      {
        phase: 'Phase II',
        title: 'Enquiry',
        body: 'Research into typological precedents, material cultures, climate, and regulation feeds a collective design conversation. We ask hard questions early.',
      },
      {
        phase: 'Phase III',
        title: 'Form',
        body: 'Proposals emerge iteratively through model-making, drawing, and dialogue — structured to reveal the project\u2019s underlying architecture before it is locked.',
      },
      {
        phase: 'Phase IV',
        title: 'Realisation',
        body: 'We maintain close involvement during construction — not to control, but to ensure that the intention survives the complexity of building.',
      },
    ],
  },
  fr: {
    eyebrow: 'Notre Méthodologie',
    headline: 'Comment un Projet Prend Vie',
    intro: "L'architecture n'est pas inventée — elle est révélée par une enquête patiente, une rigueur collaborative et un savoir-faire discipliné.",
    steps: [
      {
        phase: 'Phase I',
        title: 'Ancrage',
        body: "Nous commençons par le site et le programme. Chaque contrainte est traitée comme une invitation à concevoir ; chaque mémoire inscrite dans le lieu est intégrée à la conversation.",
      },
      {
        phase: 'Phase II',
        title: 'Enquête',
        body: "La recherche sur les précédents typologiques, les cultures matérielles, le climat et la réglementation alimente une conversation collective. Nous posons les questions difficiles tôt.",
      },
      {
        phase: 'Phase III',
        title: 'Forme',
        body: "Les propositions émergent de manière itérative à travers la maquette, le dessin et le dialogue — structurés pour révéler l'architecture sous-jacente du projet avant qu'elle ne soit figée.",
      },
      {
        phase: 'Phase IV',
        title: 'Réalisation',
        body: "Nous maintenons une implication étroite pendant la construction — non pas pour contrôler, mais pour s'assurer que l'intention survit à la complexité du chantier.",
      },
    ],
  },
  ar: {
    eyebrow: 'منهجيتنا',
    headline: 'تجسيد الرؤية المعمارية',
    intro: 'العمارة لا تُبتكر عشوائياً؛ بل تُكتشف من خلال البحث الدؤوب، والمنطق التشاركي، والحرفة المنضبطة.',
    steps: [
      {
        phase: 'المرحلة الأولى',
        title: 'الأرض والسياق',
        body: 'نبدأ بدراسة الموقع والسياق العام. نتعامل مع كل قيد كحافز للتصميم، وكل ذاكرة في المكان كجزء من الحوار العربي.',
      },
      {
        phase: 'المرحلة الثانية',
        title: 'الاستقصاء التصميمي',
        body: 'البحث في السوابق المعمارية، وثقافة المواد، والمناخ؛ مما يغذي حواراً تصميمياً جماعياً يجيب على التساؤلات الجوهرية مبكراً.',
      },
      {
        phase: 'المرحلة الثالثة',
        title: 'تطوير الشكل',
        body: 'تنبثق المقترحات بشكل تكراري من خلال النمذجة والرسم والحوار؛ لتكشف عن جوهر العمارة قبل صياغتها النهائية.',
      },
      {
        phase: 'المرحلة الرابعة',
        title: 'التنفيذ والإشراف',
        body: 'نحافظ على حضور وثيق أثناء مرحلة البناء؛ لضمان صمود الفكرة التصميمية أمام تعقيدات التنفيذ الإنشائي.',
      },
    ],
  },
} satisfies Record<Locale, { eyebrow: string; headline: string; intro: string; steps: { phase: string; title: string; body: string }[] }>;

export default function MethodologySection({ locale, methodologyConfig }: MethodologySectionProps) {
  const c = methodologyConfig?.[locale] || content[locale] || content['en'];
  if (!c) return null;


  return (
    <section
      aria-labelledby="method-heading"
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <div className="container" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '5rem',
            alignItems: 'end',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ width: '2rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                {c.eyebrow}
              </span>
            </div>
            <h2
              id="methodology-heading"
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
              }}
            >
              {c.headline}
            </h2>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', maxWidth: '46ch' }}>
            {c.intro}
          </p>
        </div>

        {/* Phase timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0',
            position: 'relative',
          }}
        >
          {/* Horizontal connector line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '2rem',
              right: '2rem',
              height: '1px',
              backgroundColor: 'var(--color-hairline)',
              zIndex: 0,
            }}
          />

          {c.steps.map((step, idx) => (
            <div
              key={step.phase}
              style={{
                position: 'relative',
                padding: '0 2rem 0 0',
                zIndex: 1,
              }}
            >
              {/* Phase dot */}
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: idx === 0 ? 'var(--color-obsidian)' : 'var(--color-surface-2)',
                  border: `1px solid ${idx === 0 ? 'var(--color-obsidian)' : 'var(--color-hairline)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: idx === 0 ? 'var(--color-sand)' : 'var(--color-text-muted)',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Phase label */}
              <span
                style={{
                  display: 'block',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-sand)',
                  marginBottom: '0.5rem',
                }}
              >
                {step.phase}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.875rem',
                }}
              >
                {step.title}
              </h3>

              {/* Body */}
              <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
