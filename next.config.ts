import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale/studio',
        destination: '/:locale/office',
        permanent: true,
      },
      {
        source: '/:locale/journal',
        destination: '/:locale/perspective',
        permanent: true,
      },
    ];
  },
  // Required for path aliasing (@/...)
  // No i18n config block here – routing is handled manually via middleware + [locale] segment
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
