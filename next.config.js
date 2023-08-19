/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: config => ({
    ...config,
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
    },
  }),
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
