import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass through static assets, API routes, and Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the first path segment is a supported locale
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  const hasValidLocale = locales.includes(firstSegment as typeof locales[number]);

  if (hasValidLocale) {
    // Locale is present and valid → allow through
    return NextResponse.next();
  }

  // No valid locale prefix → redirect to default locale
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
