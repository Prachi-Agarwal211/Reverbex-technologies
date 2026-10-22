import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { deviceSizes: [640, 828, 1200, 1920], formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [
      { source: '/work/maac-animation', destination: '/work/maac-animation-jaipur', permanent: true },
      { source: '/work/khemji-wire', destination: '/work/khemji-wire-company', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'reverbex.in' }], destination: 'https://www.reverbex.in/:path*', permanent: true },
    ];
  },
};
export default nextConfig;
