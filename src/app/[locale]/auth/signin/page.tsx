"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A67C52]" /></div>}>
      <SignInForm />
    </Suspense>
  );
}
