import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['substackcdn.com'],
  },
  async rewrites() {
    return [
      {
        source: '/substack-feed',
        destination: 'https://tommurphy888.substack.com/feed',
      },
    ]
  },
};

export default nextConfig;