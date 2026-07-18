/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
