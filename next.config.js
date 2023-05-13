/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    asyncWebAssembly: true,
    layers: true,
    appDir: true,
  },
}

module.exports = nextConfig
