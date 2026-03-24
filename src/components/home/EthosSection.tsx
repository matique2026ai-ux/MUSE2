'use client';

import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { FirestoreEthosConfig } from '@/lib/cms-types';

interface EthosSectionProps {
  locale: Locale;
  ethosConfig?: FirestoreEthosConfig | null;
}

const content = {
  en: {
    eyebrow: 'Our Ethos',
    headline: 'Architecture as an Act of Cultural Continuity',
    paragraphs: [
      'S-Arch Studio was founded on the belief that architecture is an act of cultural continuity—an articulation of a culture’s relationship with time, place, and global aspiration.',
      'We combine international professional standards with a profound respect for regional identity, ensuring every project responds to its context with rigour, restraint, and precision.',
    ],
    pullQuote: 'We do not build for the present alone. We build for what endures.',
    stat1: { value: '12+', label: 'Years of practice' },
    stat2: { value: '3', label: 'Continents' },
    stat3: { value: '60+', label: 'Projects realised' },
  },
  fr: {
    eyebrow: 'Notre Philosophie',
    headline: "L'Architecture comme Acte de Continuité Culturelle",
    paragraphs: [
      'S-Arch Studio a été fondé sur la conviction que l’architecture est un acte de continuité culturelle — une articulation de la relation d’une culture avec le temps, le lieu et l’aspiration mondiale.',
      'Nous combinons les standards professionnels internationaux avec un profond respect pour l’identité régionale, veillant à ce que chaque projet réponde à son contexte avec rigueur, retenue et précision.',
    ],
    pullQuote: 'Nous ne bâtissons pas seulement pour le présent. Nous bâtissons pour ce qui dure.',
    stat1: { value: '12+', label: 'Ans de pratique' },
    stat2: { value: '3', label: 'Continents' },
    stat3: { value: '60+', label: 'Projets réalisés' },
  },
  ar: {
    eyebrow: 'رؤيتنا',
    headline: 'العمارة كفعل استمرارية ثقافية',
    paragraphs: [
      'تأسس S-Arch Studio على قناعة بأن العمارة هي فعل استمرارية ثقافية؛ صياغة لعلاقة المجتمع بالزمن والمكان والطموح العالمي.',
      'نحن نجمع بين المعايير المهنية الدولية والاحترام العميق للهوية الإقليمية، لضمان استجابة كل مشروع لسياقه برصانة ودقة وصرامة تصميمية.',
    ],
    pullQuote: 'لا نبني للحاضر فحسب؛ نؤسس لما يبقى.',
    stat1: { value: '+12', label: 'عاماً من الخبرة' },
    stat2: { value: '3', label: 'قارات' },
    stat3: { value: '+60', label: 'مشروعاً منجزاً' },
  },
} satisfies Record<Locale, { eyebrow: string; headline: string; paragraphs: string[]; pullQuote: string; stat1: { value: string; label: string }; stat2: { value: string; label: string }; stat3: { value: string; label: string } }>;

const fadeUpParams = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function EthosSection({ locale, ethosConfig }: EthosSectionProps) {
  const c = ethosConfig?.[locale] || content[locale];
  const isRTL = locale === 'ar';

  // Normalize content structure without 'any'
  type Stat = { value: string; label: string };
  const rawContent = c as { 
    stats?: Stat[]; 
    stat1?: Stat; 
    stat2?: Stat; 
    stat3?: Stat;
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    pullQuote: string;
  };

  const stats: Stat[] = rawContent.stats || [
    rawContent.stat1,
    rawContent.stat2,
    rawContent.stat3
  ].filter((s): s is Stat => !!s);

  return (
    <section 
      aria-labelledby="ethos-heading"
      style={{
        backgroundColor: 'var(--color-surface-0)',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Text Content */}
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <motion.div 
              {...fadeUpParams}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}
            >
              {!isRTL && <span style={{ width: '1.5rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />}
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase',
                color: 'var(--color-sand)'
              }}>
                {c.eyebrow}
              </span>
              {isRTL && <span style={{ width: '1.5rem', height: '1px', backgroundColor: 'var(--color-sand)', display: 'inline-block' }} />}
            </motion.div>

            <motion.h2 
              {...fadeUpParams}
              transition={{ ...fadeUpParams.transition, delay: 0.1 }}
              id="ethos-heading" 
              style={{ 
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', 
                fontWeight: 300, 
                lineHeight: 1.25,
                marginBottom: '2.5rem',
                color: 'var(--color-obsidian)',
                letterSpacing: '-0.01em'
              }}
            >
              {c.headline}
            </motion.h2>

            {c.paragraphs.map((p, i) => (
              <motion.p 
                key={i} 
                {...fadeUpParams}
                transition={{ ...fadeUpParams.transition, delay: 0.15 + (i * 0.1) }}
                style={{ 
                  fontSize: '1.15rem', 
                  lineHeight: 1.8, 
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.5rem',
                  maxWidth: '55ch'
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Stats & Quote */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '3.5rem',
            paddingTop: '1rem'
          }}>
            <motion.blockquote 
              {...fadeUpParams}
              transition={{ ...fadeUpParams.transition, delay: 0.3 }}
              style={{
                fontSize: '1.5rem',
                lineHeight: 1.4,
                color: 'var(--color-obsidian)',
                fontStyle: 'italic',
                borderLeft: isRTL ? 'none' : '2px solid var(--color-sand)',
                borderRight: isRTL ? '2px solid var(--color-sand)' : 'none',
                paddingLeft: isRTL ? '0' : '1.5rem',
                paddingRight: isRTL ? '1.5rem' : '0',
                textAlign: isRTL ? 'right' : 'left'
              }}
            >
              “{c.pullQuote}”
            </motion.blockquote>

            <motion.div 
              {...fadeUpParams}
              transition={{ ...fadeUpParams.transition, delay: 0.4 }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '1.5rem',
                textAlign: isRTL ? 'right' : 'left'
              }}
            >
              {stats.map((stat: { value: string; label: string }, i: number) => (
                <div key={i}>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 300, 
                    color: 'var(--color-sand)',
                    marginBottom: '0.25rem',
                    fontVariantNumeric: 'lining-nums tabular-nums'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em',
                    color: 'var(--color-text-tertiary)',
                    fontWeight: 600
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
