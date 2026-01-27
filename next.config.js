/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Bunny CDN Pull Zone
  assetPrefix: "https://bossmindcdn.b-cdn.net",

  images: {
    loader: "default",
    domains: ["bossmindcdn.b-cdn.net"],
  },

  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
