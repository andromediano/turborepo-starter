import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 웹소켓 연결을 위한 설정
  async rewrites() {
    const websocketUrl =
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:4000";
    return [
      {
        source: "/socket/:path*",
        destination: `${websocketUrl}/socket/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindcss.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
