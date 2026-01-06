import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      new URL('https://i.ytimg.com/**'),
      new URL('https://img.youtube.com/**'),
    ],
  },
};

export default nextConfig;
