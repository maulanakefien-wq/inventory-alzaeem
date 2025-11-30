/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Inventory Management System - Al-Zaeem Auto Parts',
  },
};

module.exports = nextConfig;
