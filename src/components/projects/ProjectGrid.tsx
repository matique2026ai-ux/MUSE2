'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { projects as allProjects, getLocalizedProject } from '@/lib/data/projects';

interface ProjectGridProps {
  locale: Locale;
}

const labels = {
  en: {
    all: 'All Projects',
    cultural: 'Cultural',
    residential: 'Residential',
    adaptive: 'Adaptive Reuse',
    filterBy: 'Filter by Category'
  },
  fr: {
    all: 'Tous les Projets',
    cultural: 'Culturel',
    residential: 'Résidentiel',
    adaptive: 'Réhabilitation',
    filterBy: 'Filtrer par Catégorie'
  },
  ar: {
    all: 'جميع المشاريع',
    cultural: 'ثقافي',
    residential: 'سكني',
    adaptive: 'إعادة تأهيل',
    filterBy: 'المشاريع حسب الفئة'
  }
};

const categories = [
  { id: 'all', labelKey: 'all' },
  { id: 'cultural-civic', labelKey: 'cultural' },
  { id: 'residential', labelKey: 'residential' },
  { id: 'adaptive-reuse', labelKey: 'adaptive' }
] as const;

export const ProjectGrid: React.FC<ProjectGridProps> = ({ locale }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = labels[locale];

  const filteredProjects = useMemo(() => {
    return allProjects
      .filter(p => activeCategory === 'all' || p.category === activeCategory)
      .map(p => getLocalizedProject(p, locale));
  }, [activeCategory, locale]);

  return (
    <div className="container" style={{ paddingBottom: '8rem' }}>
      {/* Filter Bar */}
      <div style={{ 
        display: 'flex', 
        flexDirection: locale === 'ar' ? 'row-reverse' : 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '4rem',
        borderBottom: '1px solid var(--color-hairline)',
        paddingBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <p style={{ 
          fontSize: '0.75rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          color: 'var(--color-text-secondary)',
          fontWeight: 600
        }}>
          {t.filterBy}
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          flexDirection: locale === 'ar' ? 'row-reverse' : 'row'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 0 0.5rem 0',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: activeCategory === cat.id ? 'var(--color-sand)' : 'var(--color-text-secondary)',
                borderBottom: `2px solid ${activeCategory === cat.id ? 'var(--color-sand)' : 'transparent'}`,
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {t[cat.labelKey as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: '3rem 2rem' 
      }}>
        {filteredProjects.map((project) => (
          <Link 
            key={project.slug} 
            href={`/${locale}/projects/${project.slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            className="group"
          >
            <div style={{ 
              aspectRatio: '3/4', 
              backgroundColor: '#E8E3DF', // Warm stone background
              borderRadius: 'var(--radius-md)', 
              marginBottom: '1.5rem',
              border: '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] group-hover:-translate-y-1"
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                priority={false}
              />
              
              {/* Subtle Archive Grid Pattern (Overlay) */}
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none'
              }} />

              {/* Hover Darkening Gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)',
                opacity: 0,
                transition: 'opacity 0.8s ease',
                pointerEvents: 'none'
              }}
              className="group-hover:opacity-100"
              />
              
              {/* Category Label Overlay (Top Start) */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                insetInlineStart: '1.5rem', /* Logical property for EN/FR (left) and AR (right) */
                padding: '0.4rem 1rem',
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'full',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: 'var(--color-obsidian)',
                border: '1px solid rgba(0,0,0,0.08)',
                zIndex: 10
              }}>
                {t[categories.find(c => c.id === project.category)?.labelKey as keyof typeof t]}
              </div>

              {/* Reveal "Explore" Cue (Bottom Start) */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  insetInlineStart: '1.5rem',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  color: 'white',
                  transform: 'translateY(10px)',
                  transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                  zIndex: 20
                }}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
              >
                {locale === 'ar' ? 'استكشف المشروع' : locale === 'fr' ? 'Explorer le Projet' : 'Explore Project'}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              gap: '1.5rem' 
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ 
                  fontSize: '1.35rem', 
                  fontWeight: 600, 
                  lineHeight: '1.2',
                  marginBottom: '0.4rem',
                  color: 'var(--color-obsidian)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                className="transition-colors duration-300 group-hover:text-sand"
                >
                  {project.title}
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  fontSize: '0.8rem', 
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.02em',
                  marginBottom: '0.8rem',
                  textTransform: 'uppercase',
                  fontWeight: 500
                }}>
                  <span>{project.location}</span>
                  <span style={{ fontSize: '0.5rem', opacity: 0.4 }}>●</span>
                  <span>{project.type}</span>
                  <span style={{ fontSize: '0.5rem', opacity: 0.4 }}>●</span>
                  <span>{project.status}</span>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'var(--color-obsidian)',
                  opacity: 0.75,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {project.tagline}
                </p>
              </div>
              
              <div style={{
                padding: '0.3rem 0.6rem',
                backgroundColor: 'rgba(166,124,82,0.08)', // Faint bronze/sand tint
                borderRadius: '4px',
                border: '1px solid rgba(166,124,82,0.15)',
                flexShrink: 0
              }}>
                <p style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: 600, 
                  color: 'var(--color-sand)',
                  fontFamily: 'var(--font-mono, monospace)'
                }}>
                  {project.year}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
