/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  sassOptions: {
    includePaths: ['./src'],
  },
  // SEO optimizations
  poweredByHeader: false,
  compress: true,
}

export default nextConfig