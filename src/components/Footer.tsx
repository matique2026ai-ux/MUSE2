'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
  siteConfig?: any;
}

const footerContent = {
  en: {
    brand: 'S-Arch Studio',
    slogan: 'Sétif Roots, Global Outlook.',
    tagline: 'International architectural standards, deeply rooted in Algeria.',
    columns: [
      {
        heading: 'Work',
        links: [
          { label: 'Projects', href: '/projects' },
          { label: 'Office', href: '/office' },
          { label: 'Perspective', href: '/perspective' },
        ],
      },
      {
        heading: 'Connect',
        links: [
          { label: 'Contact', href: '/contact' },
          { label: 'Instagram', href: 'https://instagram.com' },
          { label: 'LinkedIn', href: 'https://linkedin.com' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} S-Arch Studio. All rights reserved.`,
  },
  fr: {
    brand: 'S-Arch Studio',
    slogan: 'Racines de Sétif, Vision Globale.',
    tagline: "Standards architecturaux internationaux, profondément ancrés en Algérie.",
    columns: [
      {
        heading: 'Travaux',
        links: [
          { label: 'Projets', href: '/projects' },
          { label: 'Office', href: '/office' },
          { label: 'Perspective', href: '/perspective' },
        ],
      },
      {
        heading: 'Contact',
        links: [
          { label: 'Nous contacter', href: '/contact' },
          { label: 'Instagram', href: 'https://instagram.com' },
          { label: 'LinkedIn', href: 'https://linkedin.com' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} S-Arch Studio. Tous droits réservés.`,
  },
  ar: {
    brand: 'S-Arch Studio',
    slogan: 'جذور سطايفية، رؤية عالمية.',
    tagline: 'معايير معمارية دولية، بجذور جزائرية عميقة.',
    columns: [
      {
        heading: 'الأعمال',
        links: [
          { label: 'المشاريع', href: '/projects' },
          { label: 'المكتب', href: '/office' },
          { label: 'الرؤية', href: '/perspective' },
        ],
      },
      {
        heading: 'التواصل',
        links: [
          { label: 'اتصل بنا', href: '/contact' },
          { label: 'إنستغرام', href: 'https://instagram.com' },
          { label: 'لينكدإن', href: 'https://linkedin.com' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} S-Arch Studio. جميع الحقوق محفوظة.`,
  },
} satisfies Record<Locale, {
  brand: string;
  slogan: string;
  tagline: string;
  columns: { heading: string; links: { label: string; href: string }[] }[];
  copyright: string;
}>;

function isExternal(href: string) {
  return href.startsWith('http');
}

export default function Footer({ locale, siteConfig }: FooterProps) {
  const pathname = usePathname();
  const content = footerContent[locale];

  // Merge live links
  const mergedColumns = content.columns.map(col => {
    if (col.heading === 'Connect' || col.heading === 'Contact' || col.heading === 'التواصل') {
      const liveLinks = [
         { label: locale === 'ar' ? 'اتصل بنا' : locale === 'fr' ? 'Nous contacter' : 'Contact', href: '/contact' }
      ];
      if (siteConfig?.instagram) liveLinks.push({ label: locale === 'ar' ? 'إنستغرام' : 'Instagram', href: siteConfig.instagram });
      if (siteConfig?.linkedin) liveLinks.push({ label: locale === 'ar' ? 'لينكدإن' : 'LinkedIn', href: siteConfig.linkedin });
      return { ...col, links: liveLinks };
    }
    return col;
  });

  const copyrightLabel = siteConfig?.copyright?.[locale] 
    ? `© ${new Date().getFullYear()} ${siteConfig?.copyright?.[locale]}` 
    : content.copyright;

  const brandLabel = siteConfig?.officeName || content.brand;

  // Hide footer completely on immersive pages
  if (pathname.includes('/auth') || pathname.includes('/admin')) return null;

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        color: 'var(--color-text-inverse)',
        borderTop: '1px solid var(--color-hairline-inv)',
      }}
    >
      {/* CSS for link hovers – no JS event handlers needed */}
      <style>{`
        .footer-link {
          font-size: 0.875rem;
          color: rgba(243, 238, 231, 0.6);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .footer-link:hover {
          color: #F3EEE7;
        }
        .footer-brand-link {
          display: inline-block;
          font-weight: 700;
          font-size: 1.125rem;
          letter-spacing: -0.01em;
          color: var(--color-text-inverse);
          text-decoration: none;
          margin-bottom: 0.75rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      {/* Main grid */}
      <div
        className="container footer-grid"
        style={{ paddingTop: '4rem', paddingBottom: '3rem' }}
      >
        <div className="footer-brand-col">
          <Link href={`/${locale}`} className="footer-brand-link">
            {brandLabel}
          </Link>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(243,238,231,0.35)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
            {content.slogan}
          </p>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(243, 238, 231, 0.5)',
              lineHeight: 1.7,
              maxWidth: '28ch',
            }}
          >
            {content.tagline}
          </p>
        </div>

        {/* Nav columns */}
        {mergedColumns.map((col) => (
          <div key={col.heading}>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(243, 238, 231, 0.4)',
                marginBottom: '1rem',
              }}
            >
              {col.heading}
            </p>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
              }}
            >
              {col.links.map((link) => (
                <li key={link.href}>
                  {isExternal(link.href) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={`/${locale}${link.href}`} className="footer-link">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="container"
        style={{
          borderTop: '1px solid var(--color-hairline-inv)',
          paddingTop: '1.25rem',
          paddingBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <p style={{ fontSize: '0.75rem', color: 'rgba(243, 238, 231, 0.35)' }}>
          {copyrightLabel}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(243, 238, 231, 0.25)' }}>
          {locale === 'ar' ? 'مكتب معماري للدراسات والهوية' : 'Architecture Studio'}
        </p>
      </div>
    </footer>
  );
}
