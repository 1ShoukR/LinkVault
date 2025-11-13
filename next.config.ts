import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },

  // Image domains for OAuth providers
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
