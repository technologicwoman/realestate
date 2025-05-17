/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'image.wasi.co',
      },
      {
        protocol: 'https',
        hostname: 'images.wasi.co',
      }
    ],
  },
};

module.exports = nextConfig;