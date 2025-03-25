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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/(client)/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
