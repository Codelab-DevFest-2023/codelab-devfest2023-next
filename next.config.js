/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    logging: {
      level: 'verbose',
    },
  },
  images: {
    domains: ['image.tmdb.org'],
  },
};

module.exports = nextConfig;
