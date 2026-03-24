import { ReactNode } from "react";
import AdminDashboardClient from "./AdminDashboardClient";

const translationsData = {
  en: {
    title: "System Overview",
    subtitle: "Real-time metrics and architectural platform telemetry.",
    cards: {
      projects: { title: "Active Projects", value: "12" },
      inquiries: { title: "New Inquiries", value: "3" },
      views: { title: "Platform Views", value: "24.5k" },
      users: { title: "Registered Clients", value: "8" }
    },
    recent: {
      title: "Recent Inquiries",
      viewAll: "View All",
      columns: ["Client Name", "Subject", "Date", "Status"],
      rows: [
        { name: "Ahmed Mansouri", subject: "Commercial Tower Consultation", date: "Today, 14:30", status: "New" },
        { name: "Sarah Laurent", subject: "Residential Villa Renovation", date: "Yesterday", status: "Reviewed" }
      ]
    }
  },
  fr: {
    title: "Aperçu du Système",
    subtitle: "Métriques en temps réel et télémétrie de la plateforme.",
    cards: {
      projects: { title: "Projets Actifs", value: "12" },
      inquiries: { title: "Nouvelles Demandes", value: "3" },
      views: { title: "Vues Plateforme", value: "24.5k" },
      users: { title: "Clients Inscrits", value: "8" }
    },
    recent: {
      title: "Demandes Récentes",
      viewAll: "Voir Tout",
      columns: ["Nom du Client", "Sujet", "Date", "Statut"],
      rows: [
        { name: "Ahmed Mansouri", subject: "Consultation Tour Commerciale", date: "Aujourd'hui, 14:30", status: "Nouveau" },
        { name: "Sarah Laurent", subject: "Rénovation Villa Résidentielle", date: "Hier", status: "Révisé" }
      ]
    }
  },
  ar: {
    title: "مؤشرات الأداء",
    subtitle: "إحصائيات المنصة ونشاط العملاء في الوقت الفعلي.",
    cards: {
      projects: { title: "المشاريع النشطة", value: "12" },
      inquiries: { title: "الرسائل الجديدة", value: "3" },
      views: { title: "زيارات المنصة", value: "24.5k" },
      users: { title: "العملاء المسجلين", value: "8" }
    },
    recent: {
      title: "أحدث الرسائل والطلبات",
      viewAll: "عرض الكل",
      columns: ["اسم العميل", "موضوع الرسالة", "التاريخ", "الحالة"],
      rows: [
        { name: "أحمد منصوري", subject: "استشارة بشأن برج تجاري", date: "اليوم، 14:30", status: "جديد" },
        { name: "سارة لوران", subject: "إعداد دراسة تصميم لفيلا", date: "البارحة", status: "مقروء" }
      ]
    }
  }
};

export default async function AdminDashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = translationsData[locale as keyof typeof translationsData] || translationsData.en;

  return <AdminDashboardClient t={t} locale={locale} />;
}
