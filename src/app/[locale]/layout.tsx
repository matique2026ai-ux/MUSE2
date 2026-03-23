import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Montserrat, Noto_Kufi_Arabic } from 'next/font/google';
import '../globals.css';
import {
  locales,
  localeDir,
  localeLang,
  isValidLocale,
  type Locale,
} from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { fetchSiteConfig } from '@/lib/server-data';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-kufi',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const brandTitles: Record<string, string> = {
  en: 'S-Arch Studio',
  fr: 'S-Arch Studio',
  ar: 'S-Arch Studio | مكتب هندسة معمارية',
};

const brandDescriptions: Record<string, string> = {
  en: 'Sétif Roots, Global Outlook. — An international architectural and engineering studio with deep Algerian grounding.',
  fr: 'Racines de Sétif, Vision Globale. — Un cabinet d\'architecture et d\'ingénierie international avec des racines algériennes profondes.',
  ar: 'جذور سطايفية، رؤية عالمية. — استوديو معماري وهندسي دولي بجذور جزائرية عميقة.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteConfig = await fetchSiteConfig();
  
  const title = siteConfig?.officeName || brandTitles[locale] || 'S-Arch Studio';
  const description = siteConfig?.slogan?.[locale as Locale] || brandDescriptions[locale] || brandDescriptions.en;

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dir = localeDir[validLocale];
  const lang = localeLang[validLocale];

  const siteConfig = await fetchSiteConfig();

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${montserrat.variable} ${notoKufiArabic.variable}`}
    >
      <body style={{ backgroundColor: 'var(--color-surface-0)', color: 'var(--color-text-primary)' }}>
        <Providers>
          <Header locale={validLocale} siteConfig={siteConfig} />
          <main id="main-content">{children}</main>
          <Footer locale={validLocale} siteConfig={siteConfig} />
        </Providers>
      </body>
    </html>
  );
}
