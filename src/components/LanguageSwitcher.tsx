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
        gap: '0.125rem',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface-2)',
      }}
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchLocale(locale)}
            aria-pressed={isActive}
            aria-label={`Switch to ${localeLabels[locale]}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
              backgroundColor: isActive ? 'var(--color-obsidian)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 150ms ease, color 150ms ease',
              letterSpacing: '0.03em',
              lineHeight: 1,
              minWidth: '1.75rem',
              textTransform: 'uppercase',
            }}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
