"use client";

import { useFirebaseAuth } from "@/providers/FirebaseAuthProvider";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useFirebaseAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      if (!user || role !== "ADMIN") {
        router.push(`/${locale}/auth/signin`);
      }
    }
  }, [user, role, loading, router, locale, isMounted]);

  if (!isMounted || loading || role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#A67C52] animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
