import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // permitir imágenes de cualquier dominio (Unsplash, etc.)
      },
    ],
  },
};

export default nextConfig;
