/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ⚠️ Disables all TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Disables ESLint checks
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
    outputFileTracing: true
  },
  webpack: (config) => {
    // Add node-loader for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.UPLOADTHING_APP_ID || "*"}/**`,
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: `/a/${process.env.UPLOADTHING_APP_ID ||"*"}/**`,
      },
    ],
  },
  rewrites: () => {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },
};

export default nextConfig;
