import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // admin uploads (photos up to 8 MB) arrive through server actions
  experimental: { serverActions: { bodySizeLimit: "10mb" } },
};

export default nextConfig;
