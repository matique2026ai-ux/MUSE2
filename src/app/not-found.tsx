import Link from 'next/link';

/**
 * Global 404 page – shown when notFound() is called anywhere in the app,
 * including from the [locale]/layout.tsx locale validation check.
 */
export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#f7f5f2',
          color: '#111111',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8a8480',
            marginBottom: '1rem',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#111111',
            marginBottom: '1rem',
          }}
        >
          Page not found
        </h1>
        <p style={{ color: '#5a5550', marginBottom: '2rem', maxWidth: '36ch' }}>
          The page you are looking for does not exist or the locale is not supported.
        </p>
        <Link
          href="/en"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1.25rem',
            backgroundColor: '#0d0d0d',
            color: '#f5f0ea',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Go home
        </Link>
      </body>
    </html>
  );
}
