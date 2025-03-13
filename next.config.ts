import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // ✅ Enables dynamic API routes
};

export default nextConfig;
