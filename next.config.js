/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  output: "standalone",
  images: {
    domains: ["w3s.link"],
  },
};

module.exports = nextConfig;
