/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js'],
  experimental: {
    appDir: true,
  },
  images:{
    domains: ["localhost"], //This will allow the images from the localhost to be displayed in the app.
  },
  env:{
    NEXT_PUBLIC_ZEGO_APP_ID: 1159748303,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "f7528798da2bbc833a096730ba609638",
    
  }
};

module.exports = nextConfig;
