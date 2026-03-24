'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { type Locale } from '@/lib/i18n';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ServiceItem {
  slug?: string;
  label: string;
  desc: string;
}

interface ServicesGridClientProps {
  servicesList: ServiceItem[];
  locale: Locale;
  isRtl: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServicesGridClient({ servicesList, locale, isRtl }: ServicesGridClientProps) {
  const readMoreText = locale === 'en' ? 'Read More' : locale === 'fr' ? 'En Savoir Plus' : 'اقرأ المزيد';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
      }}
    >
      {servicesList.map((service, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          style={{
            padding: '3rem 2.5rem',
            backgroundColor: 'var(--color-surface-0)',
            border: '1px solid var(--color-hairline)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="group transition-colors duration-500 hover:bg-[var(--color-surface-1)] hover:border-[var(--color-sand)]"
        >
          {/* Faint architectural mesh/pattern on hover - Optional, depends on CSS */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 10px 10px, var(--color-text-primary) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col h-full">
            <span style={{ 
              display: 'block', 
              fontSize: '1rem', 
              fontWeight: 500, 
              color: 'var(--color-sand)', 
              marginBottom: '1.5rem', 
              letterSpacing: '0.1em' 
            }} className="group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
              0{i + 1}
            </span>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: 'var(--color-text-primary)', 
              marginBottom: '1rem', 
              lineHeight: 1.3 
            }}>
              {service.label}
            </h3>
            <p style={{ 
              fontSize: '1rem', 
              color: 'var(--color-text-secondary)', 
              lineHeight: 1.6, 
              flexGrow: 1 
            }}>
              {service.desc}
            </p>
            {'slug' in service && service.slug && (
              <Link 
                href={`/${locale}/services/${service.slug}`} 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1.5rem', 
                  fontSize: '0.9rem', 
                  fontWeight: 600, 
                  color: 'var(--color-text-primary)', 
                  textDecoration: 'none', 
                }}
                className="group/link"
              >
                 <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-right after:scale-x-0 group-hover/link:after:origin-left group-hover/link:after:scale-x-100 after:transition-transform after:duration-300">
                   {readMoreText}
                 </span>
                 <ArrowIcon 
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${isRtl ? 'group-hover/link:-translate-x-1' : 'group-hover/link:translate-x-1'}`}
                 />
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
