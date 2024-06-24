/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js'],
  experimental: {
    appDir: true,
  },
  images:{
    domains: ["localhost"], //This will allow the images from the localhost to be displayed in the app.
  }
};

module.exports = nextConfig;
