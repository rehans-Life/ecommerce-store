/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "dummyimage.com",
      "instagram.fbah1-1.fna.fbcdn.net",
    ],
  },
};

module.exports = nextConfig;
