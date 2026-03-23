"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const translationsData = {
    en: {
      title: "S-ARCH",
      subtitle: "ADMIN",
      description: "Management Dashboard",
      emailLabel: "Email Address",
      emailPlaceholder: "admin@s-arch.dz",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      submit: "SIGN IN",
      create: "Create Account",
      forgot: "Forgot Password?",
      errorInvalid: "Incorrect email or password. Please try again.",
      errorConfig: "Authentication service not configured. Please enable Email/Password in Firebase.",
      backToWebsite: "Back to Website"
    },
    fr: {
      title: "S-ARCH",
      subtitle: "ADMIN",
      description: "Tableau de Bord",
      emailLabel: "Adresse e-mail",
      emailPlaceholder: "admin@s-arch.dz",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "••••••••",
      submit: "SE CONNECTER",
      create: "Créer un compte",
      forgot: "Mot de passe oublié ?",
      errorInvalid: "Email ou mot de passe incorrect.",
      errorConfig: "Service non configuré.",
      backToWebsite: "Retour au site"
    },
    ar: {
      title: "إس-آرتش",
      subtitle: "المسؤول",
      description: "لوحة تحكم الإدارة",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "admin@s-arch.dz",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "••••••••",
      submit: "تسجيل الدخول",
      create: "إنشاء حساب",
      forgot: "نسيت كلمة المرور؟",
      errorInvalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      errorConfig: "خدمة غير مفعلة.",
      backToWebsite: "العودة إلى الموقع"
    }
  };

  const translations = translationsData[locale as keyof typeof translationsData] || translationsData.en;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        const errorCode = (err as { code?: string }).code;
        if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
           setError(translations.errorInvalid);
        } else if (errorCode === 'auth/configuration-not-found') {
           setError(translations.errorConfig);
        } else {
           setError(err.message || "An unexpected error occurred.");
        }
      } else {
         setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="w-full flex justify-center mt-8 lg:mt-0 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px]"
      >
        <div className="mb-12">
          <div className="space-y-3">
            <h1 className="text-4xl font-light tracking-widest uppercase !text-white m-0">
              {translations.title} <span className="!text-[#A67C52]">{translations.subtitle}</span>
            </h1>
            <p className="text-[11px] !text-white/70 uppercase tracking-[0.3em] font-mono m-0">
              {translations.description}
            </p>
          </div>
          <Link 
            href={`/${locale}`}
            className="mt-8 text-[11px] uppercase tracking-widest !text-white/60 hover:!text-[#A67C52] transition-colors duration-500 font-mono flex items-center gap-3 group/back w-fit"
          >
            <span className={`group-hover/back:-translate-x-2 transition-transform duration-500 inline-block ${locale === 'ar' ? 'rotate-180 group-hover/back:translate-x-2' : ''}`}>←</span>
            {translations.backToWebsite}
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 group/form">
          <div className="space-y-8">
            {/* Email Field */}
            <div className="flex flex-col gap-3 group/field w-full">
              <label 
                htmlFor="email" 
                className={`text-[11px] font-mono uppercase tracking-[0.2em] !text-white/60 transition-colors duration-300 group-focus-within/field:!text-[#A67C52]`}
              >
                {translations.emailLabel}
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/30 pb-4 text-sm tracking-widest !text-white focus:outline-none focus:border-transparent transition-all duration-300 placeholder-white/30 font-light [&:-webkit-autofill]:shadow-[0_0_0_30px_#050505_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                  placeholder={translations.emailPlaceholder}
                  required
                />
                <div className={`absolute bottom-0 ${locale === 'ar' ? 'right-0' : 'left-0'} h-[1px] w-0 bg-[#A67C52] group-focus-within/field:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`} />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-3 group/field w-full">
              <label 
                htmlFor="password" 
                className={`text-[11px] font-mono uppercase tracking-[0.2em] !text-white/60 transition-colors duration-300 group-focus-within/field:!text-[#A67C52]`}
              >
                {translations.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/30 pb-4 text-lg tracking-[0.4em] !text-white focus:outline-none focus:border-transparent transition-all duration-300 placeholder-white/30 [&:-webkit-autofill]:shadow-[0_0_0_30px_#050505_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                  placeholder="••••••••"
                  required
                />
                <div className={`absolute bottom-0 ${locale === 'ar' ? 'right-0' : 'left-0'} h-[1px] w-0 bg-[#A67C52] group-focus-within/field:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`} />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="!text-[#ff4444] text-[11px] uppercase tracking-widest font-mono pt-4 pb-2 flex items-start gap-2">
                  <span>—</span> <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden group/btn bg-transparent border border-[#A67C52]/50 py-5 text-[11px] tracking-[0.3em] uppercase transition-all duration-[0.8s] hover:border-[#A67C52] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-[#A67C52] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
              
              <span className="relative z-20 flex items-center justify-between px-8 transition-colors duration-[0.6s] !text-white group-hover/btn:!text-[#050505]">
                <span className="font-light group-hover/btn:font-semibold">{loading ? 'Processing...' : translations.submit}</span>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-[#A67C52] group-hover/btn:!text-[#050505]" />
                ) : (
                  <div className="w-6 h-px bg-white group-hover/btn:bg-[#050505] group-hover/btn:w-10 transition-all duration-500 ease-out relative">
                    <ArrowRight className={`absolute ${locale === 'ar' ? '-left-2 rotate-180' : '-right-2'} top-1/2 -translate-y-1/2 h-3 w-3 transition-transform duration-500`} />
                  </div>
                )}
              </span>
            </button>
          </div>
          
          <div className="flex justify-between items-center pt-8 border-t border-white/20">
            <Link 
              href={`/${locale}/auth/signup`} 
              className="text-[11px] uppercase tracking-widest !text-[#A67C52] hover:!text-white transition-colors duration-500 font-mono group/link relative py-2"
            >
              {translations.create}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-white group-hover/link:w-full transition-all duration-500" />
            </Link>
            <span className="text-[11px] uppercase tracking-widest !text-white/50 font-mono cursor-not-allowed py-2">
              {translations.forgot}
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
