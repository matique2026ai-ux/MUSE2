'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: Locale;
  isRTL: boolean;
}

export default function Breadcrumbs({ items, isRTL }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full"
      style={{ 
        paddingTop: 'calc(var(--header-height, 64px) + 1.5rem)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20
      }}
    >
      <ol
        className="container flex flex-wrap items-center gap-x-2 gap-y-1 list-none m-0 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em]"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-3">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-stone-300 hover:text-white transition-colors duration-200 no-underline"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-[#C8A97E]"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,1)' }}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span
                  className="text-stone-500"
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none', display: 'inline-block' }}
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
