import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: ["192.168.3.5"],
};

export default nextConfig;
