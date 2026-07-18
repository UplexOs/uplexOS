/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has type errors. This is a performance penalty and should only
    // be used for development.
    ignoreBuildErrors: false,
  },
  images: {
    domains: [],
    remotePatterns: [],
  },
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
