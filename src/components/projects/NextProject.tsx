'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface NextProjectProps {
  slug: string;
  title: string;
  category: string;
  locale: Locale;
  label: string;
  isRTL: boolean;
}

export default function NextProject({ slug, title, category, locale, label, isRTL }: NextProjectProps) {
  const Icon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-stone-900 py-24 md:py-32">
      <Link href={`/${locale}/projects/${slug}`} className="group block w-full">
        <div className="container mx-auto flex flex-col items-center px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-8 flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 underline underline-offset-8">
              {label}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className={`mb-6 font-light !text-white tracking-tight transition-transform duration-700 group-hover:scale-105 ${
              isRTL ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-6xl lg:text-7xl'
            }`}>
              {title}
            </h2>
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} text-white/60 text-[10px] uppercase tracking-[0.2em]`}>
              <span>{category}</span>
              <Icon 
                size={14} 
                className={`transition-transform duration-500 ${
                  isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'
                } group-hover:scale-125`} 
              />
            </div>
          </motion.div>
        </div>
      </Link>
    </section>
  );
}
