import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  module.exports = {
    experimental: {
      // Disable Turbopack
      appDir: false,
    },
  };
  
};

export default nextConfig;
