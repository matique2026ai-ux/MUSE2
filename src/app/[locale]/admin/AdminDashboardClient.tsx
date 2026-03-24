'use client';

import React, { useEffect, useState } from 'react';
import { Activity, FileText, Users } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function AdminDashboardClient({ t, locale }: { t: any, locale: string }) {
  const [stats, setStats] = useState({
    totalProjects: 0,
    newInquiries: 0,
    totalViews: "—",
    totalUsers: "1 (Admin)",
  });
  
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectsSnap = await getDocs(collection(db, "projects"));
        const inqRef = collection(db, "inquiries");
        const inqSnap = await getDocs(inqRef);
        const newInq = inqSnap.docs.filter(d => d.data().status === "new").length;
        const qRecent = query(inqRef, orderBy("createdAt", "desc"), limit(4));
        const recentSnap = await getDocs(qRecent);
        
        const recentData = recentSnap.docs.map(d => {
          const data = d.data();
          let dateStr = '—';
          if (data.createdAt?.toDate) {
            const dateObj = data.createdAt.toDate();
            dateStr = dateObj.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
          }
          return {
            id: d.id,
            name: data.name || '—',
            subject: data.subject || '—',
            date: dateStr,
            status: data.status === 'new' ? "New" : (data.status === 'responded' ? "Responded" : data.status) || 'New',
            rawStatus: data.status || 'new'
          };
        });

        setStats({
          totalProjects: projectsSnap.size,
          newInquiries: newInq,
          totalViews: "—",
          totalUsers: "1 (Admin)",
        });
        
        setRecentInquiries(recentData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [locale]);

  const cards = [
    { key: 'projects', icon: FileText, title: t.cards.projects.title, value: stats.totalProjects.toString() },
    { key: 'inquiries', icon: MailIcon, title: t.cards.inquiries.title, value: stats.newInquiries.toString() },
    { key: 'views', icon: Activity, title: t.cards.views.title, value: stats.totalViews },
    { key: 'users', icon: Users, title: t.cards.users.title, value: stats.totalUsers }
  ];

  return (
    <div className="flex flex-col animate-in fade-in duration-500 font-sans w-full">
      
      {/* Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[20px]">
        {cards.map((card, i) => (
          <div key={i} className="bg-[#161616] border border-[#222222] rounded-[8px] p-[24px] hover:border-[#C4A882] transition-colors duration-300 flex flex-col justify-between">
            <card.icon width="20" height="20" className="text-[#C4A882] mb-4" />
            <div>
              <div className="text-[48px] font-bold text-[#F0F0F0] leading-none mb-1">
                {loading ? <div className="h-12 w-20 bg-[#1A1A1A] rounded animate-pulse" /> : card.value}
              </div>
              <div className="text-[12px] text-[#666666] font-medium">
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <h2 className="text-[16px] font-semibold text-[#F0F0F0] mb-[20px] flex justify-between items-center px-1">
        Recent Inquiries
        <button className="text-[12px] font-medium text-[#c4A882] hover:text-[#d4ba97] transition-colors">
          View All &rarr;
        </button>
      </h2>

      <div className="bg-[#161616] border border-[#222222] rounded-[8px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222222] bg-[#161616]">
                {["Client Name", "Subject", "Date", "Status"].map((col, idx) => (
                  <th key={idx} className="px-[16px] py-[16px] text-[11px] font-medium text-[#555555] uppercase tracking-[1px] whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="h-[48px]">
                    <td className="px-[16px]"><div className="h-4 w-32 bg-[#1A1A1A] rounded animate-pulse" /></td>
                    <td className="px-[16px]"><div className="h-4 w-48 bg-[#1A1A1A] rounded animate-pulse" /></td>
                    <td className="px-[16px]"><div className="h-4 w-24 bg-[#1A1A1A] rounded animate-pulse" /></td>
                    <td className="px-[16px]"><div className="h-5 w-16 bg-[#1A1A1A] rounded-full animate-pulse" /></td>
                  </tr>
                ))
              ) : recentInquiries.length > 0 ? (
                recentInquiries.map((row) => (
                  <tr key={row.id} className="h-[48px] hover:bg-[#1A1A1A] transition-colors duration-200">
                    <td className="px-[16px] text-[14px] font-medium text-[#F0F0F0] whitespace-nowrap">{row.name}</td>
                    <td className="px-[16px] text-[14px] text-[#cccccc] whitespace-nowrap">{row.subject}</td>
                    <td className="px-[16px] text-[12px] text-[#666666] whitespace-nowrap">{row.date}</td>
                    <td className="px-[16px] whitespace-nowrap">
                      {row.rawStatus === 'new' ? (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C2B22] text-[#4ADE80]">
                          New
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1A1A1A] text-[#666666] border border-[#222222]">
                          {row.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[48px]">
                  <td colSpan={4} className="px-[16px] text-center text-[#666666] text-[13px]">No recent inquiries</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
