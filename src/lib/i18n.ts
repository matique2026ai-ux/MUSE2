export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Map locales to HTML dir attribute */
export const localeDir: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fr: 'ltr',
  ar: 'rtl',
};

/** Human-readable locale labels */
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
};

/** Locale to IETF BCP47 tag */
export const localeLang: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar',
};

export function isValidLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
