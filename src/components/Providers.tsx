"use client";

import { FirebaseAuthProvider } from "@/providers/FirebaseAuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>;
}
