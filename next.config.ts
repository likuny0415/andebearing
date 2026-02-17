import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
    // Only add specific domains here when needed:
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'your-cdn.example.com' },
    // ],
  },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);