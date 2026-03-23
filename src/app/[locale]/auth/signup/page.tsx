"use client";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A67C52]" /></div>}>
      <SignUpForm />
    </Suspense>
  );
}
