/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['listicle-api.onrender.com'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
