/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['listicle-api.onrender.com'],
  },
  experimental: {
    appDir: true,  // Add this line
    optimizePackageImports: ['lucide-react'],
  },
}
module.exports = nextConfig
