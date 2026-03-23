import type { Metadata } from 'next';
import { type Locale, locales } from '@/lib/i18n';
import HeroSection from '@/components/home/HeroSection';
import EthosSection from '@/components/home/EthosSection';
import SelectedWorksSection from '@/components/home/SelectedWorksSection';
import ServiceBridgeSection from '@/components/home/ServiceBridgeSection';
import MethodologySection from '@/components/home/MethodologySection';
import GlobalTrustSection from '@/components/home/GlobalTrustSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = {
    ar: { title: 'S-Arch Studio | مكتب دراسات هندسية ومعمارية بسطيف', desc: 'ممارسة معمارية وهندسية طموحة عالمياً وبجذور إقليمية عميقة في سطيف، الجزائر.' },
    en: { title: 'S-Arch Studio | Architecture & Engineering Firm in Sétif', desc: 'A globally ambitious architectural and engineering practice with deep regional roots in Sétif, Algeria.' },
    fr: { title: 'S-Arch Studio | Bureau d\'Architecture et d\'Ingénierie à Sétif', desc: 'Une pratique d\'architecture et d\'ingénierie à vocation internationale avec de profondes racines régionales à Sétif, Algérie.' }
  }[locale as Locale] || { title: 'S-Arch Studio', desc: '' };

  return {
    title: t.title,
    description: t.desc,
  };
}

import { notFound } from 'next/navigation';
import { fetchHeroConfig, fetchFeaturedProjects, fetchEthosConfig, fetchMethodologyConfig } from '@/lib/server-data';

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  
  const validLocale = locale as Locale;

  const heroConfig = await fetchHeroConfig();
  const featuredProjects = await fetchFeaturedProjects();
  const ethosConfig = await fetchEthosConfig();
  const methodologyConfig = await fetchMethodologyConfig();

  return (
    <>
      <HeroSection locale={validLocale} heroConfig={heroConfig} />
      <EthosSection locale={validLocale} ethosConfig={ethosConfig} />
      <SelectedWorksSection locale={validLocale} featuredProjects={featuredProjects} />
      <ServiceBridgeSection locale={validLocale} />
      <MethodologySection locale={validLocale} methodologyConfig={methodologyConfig} />
      <GlobalTrustSection locale={validLocale} />
    </>
  );
}
