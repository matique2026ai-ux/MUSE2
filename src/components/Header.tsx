'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { type Locale } from '@/lib/i18n';
import type { FirestoreSiteConfig } from '@/lib/cms-types';
import LanguageSwitcher from './LanguageSwitcher';
import { useFirebaseAuth } from "@/providers/FirebaseAuthProvider";
import { User, LogOut } from "lucide-react";

interface HeaderProps {
  locale: Locale;
  siteConfig?: FirestoreSiteConfig | null;
}

const navLinks = {
  en: [
    { label: 'Projects', href: '/projects' },
    { label: 'Office', href: '/office' },
    { label: 'Services', href: '/services' },
    { label: 'Perspective', href: '/perspective' },
    { label: 'Contact', href: '/contact' },
  ],
  fr: [
    { label: 'Projets', href: '/projects' },
    { label: 'Office', href: '/office' },
    { label: 'Services', href: '/services' },
    { label: 'Perspective', href: '/perspective' },
    { label: 'Contact', href: '/contact' },
  ],
  ar: [
    { label: 'المشاريع', href: '/projects' },
    { label: 'المكتب', href: '/office' },
    { label: 'الخدمات', href: '/services' },
    { label: 'الرؤية', href: '/perspective' },
    { label: 'التواصل', href: '/contact' },
  ],
} satisfies Record<Locale, { label: string; href: string }[]>;

export default function Header({ locale, siteConfig }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    // Initial check - wrapped to avoid synchronous setState lint error
    requestAnimationFrame(() => handleScroll());
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    if (menuOpen) {
      requestAnimationFrame(() => setMenuOpen(false));
    }
  }, [pathname, menuOpen]);

  const links = navLinks[locale];

  // Hide header completely on auth and admin pages for immersive experience
  if (pathname.includes('/auth') || pathname.includes('/admin')) return null;


  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 'var(--header-height)',
    display: 'flex',
    alignItems: 'center',
    transition: `background-color ${250}ms ease, box-shadow ${250}ms ease`,
    // Solid-first: always opaque. Only adds backdrop blur + shadow when scrolled.
    // Solid-first: always opaque. Only adds backdrop blur + shadow when scrolled.
    backgroundColor: scrolled
      ? 'var(--color-glass)'
      : 'var(--color-surface-0)',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
    boxShadow: scrolled
      ? '0 1px 0 var(--color-hairline)'
      : '0 1px 0 transparent',
  };

  const brandStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: '1.05rem',
    letterSpacing: '-0.01em',
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    flexShrink: 0,
  };

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
    textDecoration: 'none',
    padding: '0.25rem 0',
    borderBottom: isActive ? '1px solid var(--color-sand)' : '1px solid transparent',
    transition: 'color 150ms ease, border-color 150ms ease',
  });

  return (
    <>
      <header style={headerStyle} role="banner">
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Brand */}
          <Link href={`/${locale}`} style={brandStyle} aria-label="S-Arch Studio – Home" className="flex flex-col items-start gap-0.5">
            <span>{siteConfig?.officeName || 'S-Arch Studio'}</span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', fontWeight: 400, color: 'var(--color-text-secondary)', textTransform: 'uppercase', lineHeight: 1 }}>
              {siteConfig?.slogan?.[locale] || (locale === 'ar' ? 'جذور سطايفية، رؤية عالمية' : locale === 'fr' ? 'Racines de Sétif, Vision Globale' : 'Setif Roots, Global Outlook')}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
            className="desktop-nav"
          >
            {links.map((link) => {
              const href = `/${locale}${link.href}`;
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link key={link.href} href={href} style={navLinkStyle(isActive)}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <LanguageSwitcher currentLocale={locale} />
            <AuthCluster locale={locale} />

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: 'var(--color-text-primary)',
              }}
              className="hamburger-btn"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="18" y2="18" />
                    <line x1="18" y1="4" x2="4" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="19" y2="7" />
                    <line x1="3" y1="11" x2="19" y2="11" />
                    <line x1="3" y1="15" x2="19" y2="15" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: 'var(--color-surface-0)',
          borderBottom: '1px solid var(--color-hairline)',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 300ms var(--ease-reveal)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem clamp(1.25rem, 5vw, 4rem)',
          gap: '1.25rem',
        }}
        className="mobile-nav"
      >
        {links.map((link) => {
          const href = `/${locale}${link.href}`;
          const isActive = pathname === href;
          return (
            <Link
              key={link.href}
              href={href}
              style={{
                ...navLinkStyle(isActive),
                fontSize: '1.125rem',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Spacer so content doesn't hide under fixed header */}
      <div style={{ height: 'var(--header-height)' }} aria-hidden="true" />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function AuthCluster({ locale }: { locale: Locale }) {
  const { user, role, logout } = useFirebaseAuth();

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Link 
          href={`/${locale}/profile`} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.75rem', 
            color: 'var(--color-text-secondary)',
            textDecoration: 'none'
          }}
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline uppercase tracking-widest">{user.displayName || 'Portal'}</span>
        </Link>
        {role === "ADMIN" && (
          <Link 
            href={`/${locale}/admin`} 
            style={{ 
              fontSize: '0.65rem', 
              color: 'var(--color-sand)', 
              border: '1px solid var(--color-sand)', 
              padding: '2px 8px',
              textDecoration: 'none',
              marginLeft: '4px'
            }}
          >
            ADMIN
          </Link>
        )}
        <button 
          onClick={logout}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: '0.25rem' }}
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <Link 
      href={`/${locale}/auth/signin`} 
      style={{ 
        fontSize: '0.75rem', 
        fontWeight: 600, 
        color: 'var(--color-text-primary)', 
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: '0.25rem',
        borderBottom: '1px solid transparent',
      }}
      className="hover:border-[var(--color-sand)] hover:text-[var(--color-sand)] transition-colors"
    >
      {locale === 'ar' ? 'دخول' : locale === 'fr' ? 'Accès' : 'Access'}
    </Link>
  );
}

