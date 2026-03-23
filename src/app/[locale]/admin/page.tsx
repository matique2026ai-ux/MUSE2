import { ReactNode } from "react";
import { Activity, Users, FileText, ArrowUpRight } from "lucide-react";

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

  const { fetchDashboardStats } = await import("@/lib/server-data");
  const stats = await fetchDashboardStats();

  const cards = [
    { key: 'projects', icon: FileText, title: t.cards.projects.title, value: stats.totalProjects.toString(), trend: '' },
    { key: 'inquiries', icon: MailIcon, title: t.cards.inquiries.title, value: stats.newInquiries.toString(), trend: '' },
    { key: 'views', icon: Activity, title: t.cards.views.title, value: "—", trend: '' },
    { key: 'users', icon: Users, title: t.cards.users.title, value: "1 (Admin)", trend: '' }
  ];

  let recentInquiries: { name: string; subject: string; date: string; status: string }[] = [];
  try {
    const { collection, getDocs, query, orderBy, limit } = await import("firebase/firestore");
    const { db } = await import("@/lib/firebase");
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"), limit(4));
    const snap = await getDocs(q);
    recentInquiries = snap.docs.map(d => {
      const data = d.data();
      const date = data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString(locale) : '—';
      return {
        name: data.name || '—',
        subject: data.subject || '—',
        date,
        status: data.status === 'new' ? t.recent.rows[0].status : (data.status === 'responded' ? t.recent.rows[1].status : data.status)
      };
    });
  } catch (e) {
    // silently fallback
  }

  return (
    <div className="p-8 sm:p-12 lg:p-20 max-w-[1600px] mx-auto w-full">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-3xl font-light tracking-wide !text-white mb-2">{t.title}</h1>
        <p className="text-base !text-zinc-500 font-mono tracking-wider uppercase">{t.subtitle}</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {cards.map((card, i) => {
           return (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-lg hover:border-[#A67C52]/50 transition-colors duration-500 group cursor-default">
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-white/5 rounded-md group-hover:bg-[#A67C52]/10 transition-colors">
                  <card.icon className="w-5 h-5 text-zinc-400 group-hover:text-[#A67C52]" />
                </div>
              </div>
              <h3 className="text-3xl font-medium !text-white mb-1">{card.value}</h3>
              <p className="text-base !text-zinc-400 font-medium mb-4">{card.title}</p>
            </div>
           );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-medium !text-white">{t.recent.title}</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                {t.recent.columns.map((col, idx) => (
                  <th key={idx} className="px-8 py-6 text-sm font-mono uppercase tracking-widest text-zinc-500 whitespace-nowrap text-start">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentInquiries.length > 0 ? recentInquiries.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6 text-base font-medium text-white whitespace-nowrap">{row.name}</td>
                  <td className="px-8 py-6 text-base text-zinc-400">{row.subject}</td>
                  <td className="px-8 py-6 text-base text-zinc-500 font-mono">{row.date}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider ${
                      row.status === t.recent.rows[0].status ? 'bg-[#A67C52]/20 text-[#A67C52] border border-[#A67C52]/30' : 'bg-white/5 text-zinc-400 border border-white/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-6 text-center text-zinc-500 font-mono text-sm uppercase">No recent inquiries</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
