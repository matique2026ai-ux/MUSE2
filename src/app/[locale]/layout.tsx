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
  const title = brandTitles[locale] ?? 'S-Arch Studio';
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: brandDescriptions[locale] ?? brandDescriptions.en,
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

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${montserrat.variable} ${notoKufiArabic.variable}`}
    >
      <body style={{ backgroundColor: 'var(--color-surface-0)', color: 'var(--color-text-primary)' }}>
        <Providers>
          <Header locale={validLocale} />
          <main id="main-content">{children}</main>
          <Footer locale={validLocale} />
        </Providers>
      </body>
    </html>
  );
}
