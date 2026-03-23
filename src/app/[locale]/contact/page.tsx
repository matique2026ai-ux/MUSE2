import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactForm from '@/components/contact/ContactForm';
import { fetchSiteConfig } from '@/lib/server-data';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

const pageContent = {
  ar: {
    heroTitle: "تواصل مع المكتب",
    heroSub: "لمناقشة مشروع جديد، دراسة، إشراف، أو مهمة ترميم مع S-Arch Studio.",
    details: {
      emailText: "info@s-arch.dz",
      phoneText: "+213 (0) 36 00 00 00",
      locationText: "مقرّنا سطيف، الجزائر — ونعمل عبر التراب الوطني ومع شركاء دوليين.",
    },
    form: {
      name: "الاسم الكامل",
      org: "المؤسسة (اختياري)",
      email: "البريد الإلكتروني",
      projectTypeLabel: "نوع المشروع",
      projectTypes: [
        { value: '', label: 'اختر نوع المشروع...' },
        { value: 'new', label: 'مشروع جديد' },
        { value: 'supervision', label: 'إشراف' },
        { value: 'restoration', label: 'ترميم مبنى' },
        { value: 'heritage', label: 'ترميم تراث/آثار' },
        { value: 'other', label: 'أخرى' },
      ],
      message: "الرسالة",
      submit: "إرسال الرسالة",
      successMsg: "تم إرسال رسالتك بنجاح. سنعود إليك قريباً."
    },
    availabilityText: "نردّ على طلبات المشاريع الجادة، الدراسات، ومهام الترميم. للحالات المستعجلة، يُفضّل الاتصال هاتفيًا.",
    cta: {
      learnMore: "تعرف أكثر على المكتب",
      exploreProjects: "اكتشف مشاريعنا"
    }
  },
  en: {
    heroTitle: "Contact the Office",
    heroSub: "Discuss a project, a study, or a restoration mission with S-Arch Studio.",
    details: {
      emailText: "info@s-arch.dz",
      phoneText: "+213 (0) 36 00 00 00",
      locationText: "Based in Sétif, Algeria — working across Algeria and internationally.",
    },
    form: {
      name: "Name",
      org: "Organization (optional)",
      email: "Email",
      projectTypeLabel: "Project type",
      projectTypes: [
        { value: '', label: 'Select project type...' },
        { value: 'new', label: 'New project' },
        { value: 'supervision', label: 'Supervision' },
        { value: 'restoration', label: 'Building restoration' },
        { value: 'heritage', label: 'Heritage / archaeological restoration' },
        { value: 'other', label: 'Other' },
      ],
      message: "Message",
      submit: "Send message",
      successMsg: "Your message has been successfully sent. We will get back to you shortly."
    },
    availabilityText: "We respond to serious project inquiries, studies, and restoration missions. For urgent matters, please use the phone contact.",
    cta: {
      learnMore: "Learn more about the office",
      exploreProjects: "Explore our projects"
    }
  },
  fr: {
    heroTitle: "Contacter le Bureau",
    heroSub: "Discutez d'un projet, d'une étude ou d'une mission de restauration avec S-Arch Studio.",
    details: {
      emailText: "info@s-arch.dz",
      phoneText: "+213 (0) 36 00 00 00",
      locationText: "Basé à Sétif, Algérie — opérant à travers l'Algérie et à l'international.",
    },
    form: {
      name: "Nom complet",
      org: "Organisation (optionnel)",
      email: "E-mail",
      projectTypeLabel: "Type de projet",
      projectTypes: [
        { value: '', label: 'Sélectionnez le type de projet...' },
        { value: 'new', label: 'Nouveau projet' },
        { value: 'supervision', label: 'Supervision' },
        { value: 'restoration', label: 'Restauration de bâtiment' },
        { value: 'heritage', label: 'Restauration du patrimoine / archéologique' },
        { value: 'other', label: 'Autre' },
      ],
      message: "Message",
      submit: "Envoyer le message",
      successMsg: "Votre message a été envoyé avec succès. Nous vous répondrons sous peu."
    },
    availabilityText: "Nous répondons aux demandes de projets sérieuses, aux études et aux missions de restauration. For urgent matters, please use the phone contact.",
    cta: {
      learnMore: "En savoir plus sur le bureau",
      exploreProjects: "Explorer nos projets"
    }
  }
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const content = pageContent[locale as Locale];
  return {
    title: `${content.heroTitle} | S-Arch Studio — Global Contact`,
    description: content.heroSub,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = pageContent[locale as Locale];
  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  const siteConfig = await fetchSiteConfig();

  return (
    <main dir={dir} style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-0)', position: 'relative' }}>
      {/* 0. BREADCRUMBS */}
      <Breadcrumbs 
        items={[
          { label: locale === 'ar' ? 'الرئيسية' : locale === 'fr' ? 'Accueil' : 'Home', href: `/${locale}` },
          { label: content.heroTitle }
        ]} 
        locale={locale as Locale} 
        isRTL={isRtl} 
      />

      {/* 1. HERO */}
      <section style={{ padding: '10rem 0 6rem', backgroundColor: 'var(--color-obsidian)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ maxWidth: '850px', margin: isRtl ? '0 0 0 auto' : '0 auto 0 0', textAlign: isRtl ? 'right' : 'left' }}>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              fontWeight: 800,
              color: 'var(--color-text-inverse)',
              lineHeight: 1.05,
              marginBottom: '2rem',
              letterSpacing: '-0.03em',
            }}>{content.heroTitle}</h1>
            <p style={{
              fontSize: '1.4rem',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '55ch',
              fontWeight: 400,
            }}>{content.heroSub}</p>
          </div>
        </div>
      </section>

      {/* 2. FORM & DETAILS SECTION */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <ContactForm content={content} isRtl={isRtl} dir={dir} siteConfig={siteConfig} />
        </div>
      </section>

      {/* 3. SECONDARY CTA */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--color-hairline)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Link href={`/${locale}/office`} style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', textDecoration: 'underline', fontWeight: 600 }}>
              {content.cta.learnMore}
            </Link>
            <Link href={`/${locale}/projects`} style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', textDecoration: 'underline', fontWeight: 600 }}>
              {content.cta.exploreProjects}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
