'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeLabels, type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === currentLocale) return;

    // Safely replace the locale prefix in the current pathname.
    // pathname is always of the form /[locale]/...rest
    const segments = pathname.split('/');
    // segments[0] = '', segments[1] = current locale
    segments[1] = nextLocale;
    const nextPath = segments.join('/') || `/${nextLocale}`;
    router.push(nextPath);
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
      }}
    >
      {locales.map((locale, index) => {
        const isActive = locale === currentLocale;
        return (
          <div key={locale} style={{ display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => switchLocale(locale)}
              aria-pressed={isActive}
              aria-label={`Switch to ${localeLabels[locale]}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: isActive ? 'default' : 'pointer',
                transition: 'color 150ms ease',
                letterSpacing: '0.05em',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
              className="hover:text-[var(--color-text-primary)]"
            >
              {locale}
            </button>
            {index < locales.length - 1 && (
              <span style={{ 
                color: 'var(--color-text-secondary)', 
                opacity: 0.5, 
                fontSize: '0.6rem', 
                margin: '0 2px' 
              }}>
                /
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
