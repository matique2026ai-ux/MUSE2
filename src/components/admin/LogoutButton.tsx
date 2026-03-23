"use client";

import { useFirebaseAuth } from "@/providers/FirebaseAuthProvider";
import { useRouter, useParams } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

const logoutLabels: Record<string, string> = {
  en: "Secure Logout",
  fr: "Déconnexion",
  ar: "تسجيل الخروج الآمن",
};

export function LogoutButton() {
  const { logout } = useFirebaseAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push(`/${locale}/auth/signin`);
    } catch (err) {
      console.error("Logout failed:", err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center gap-5 px-6 py-4 text-base text-[#ff5555]/80 hover:text-[#ff5555] hover:bg-[#ff5555]/10 rounded-md transition-colors disabled:opacity-50"
    >
      <LogOut className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      <span className="font-medium tracking-wide">{loading ? "..." : logoutLabels[locale]}</span>
    </button>
  );
}
