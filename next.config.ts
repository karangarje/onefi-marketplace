import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: '/shop/marketplace/products',
        destination: '/products',
      },
      {
        source: '/shop/marketplace/products/:slug',
        destination: '/products/:slug',
      },
    ];
  },
};

export default nextConfig;
