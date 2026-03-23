import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface Project {
  title: string;
  location: string;
  year: string;
  slug: string;
  heroImage?: string;
}

interface ServiceProjectsProps {
  locale: Locale;
  projects: Project[];
}

const labels = {
  en: {
    title: 'Related Projects',
    viewAll: 'View All'
  },
  fr: {
    title: 'Projets Connexes',
    viewAll: 'Voir Tout'
  },
  ar: {
    title: 'مشاريع ذات صلة',
    viewAll: 'مشاهدة الكل'
  }
};

export const ServiceProjects: React.FC<ServiceProjectsProps> = ({ locale, projects }) => {
  const t = labels[locale];

  return (
    <section style={{ padding: '7rem 0', backgroundColor: 'var(--color-surface-0)', borderBottom: '1px solid var(--color-hairline)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-obsidian)' }}>
            {t.title}
          </h2>
          <Link 
            href={`/${locale}/projects`}
            style={{ 
              fontSize: '0.875rem', 
              fontWeight: 600, 
              color: 'var(--color-sand)', 
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '1px solid currentColor',
              transition: 'opacity 0.2s ease'
            }}
            className="hover-opacity"
          >
            {t.viewAll}
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <Link 
              key={idx} 
              href={`/${locale}/projects/${project.slug}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              className="project-card-link group"
            >
              <div style={{ 
                aspectRatio: '16/10', 
                backgroundColor: 'var(--color-surface-1)', 
                borderRadius: 'var(--radius-lg)', 
                marginBottom: '1.25rem',
                border: '1px solid var(--color-hairline)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="group-hover:scale-[1.02] group-hover:shadow-xl"
              >
                {/* Real Architectural Image */}
                {project.heroImage && (
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={85}
                  />
                )}
                
                {/* Grid overlay for architectural feel */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundImage: 'linear-gradient(rgba(166,124,82,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(166,124,82,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  opacity: 0.15,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: 'none'
                }} 
                className="group-hover:opacity-10"
                />
              </div>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                marginBottom: '0.5rem',
                transition: 'color 0.3s ease'
              }}
              className="group-hover:text-sand"
              >
                {project.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {project.location} | {project.year}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

