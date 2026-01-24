/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Forces Cloudflare Pages to generate and serve /out (static export)
  output: "export",

  // ✅ Ensures routes work as folders (required for many static hosts)
  trailingSlash: true,

  // ✅ Required for static export when using next/image
  images: {
    unoptimized: true,
  },

  // ✅ No runtime/server features (static only)
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
