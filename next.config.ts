import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio-bap-neuilly.nicolas-becharat.com",
        port: "",
        pathname: "/bap-neuilly/**",
      },
    ],
  },
};

export default nextConfig;
