/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  typescript: {
    ignoreBuildErrors: true, // ⚠️ Disables all TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Disables ESLint checks
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
    outputFileTracing: true
=======
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
    outputFileTracing: true,
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
  },
  webpack: (config) => {
    // Add node-loader for .node files
    config.module.rules.push({
      test: /\.node$/,
<<<<<<< HEAD
      use: 'node-loader',
=======
      use: "node-loader",
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
<<<<<<< HEAD
        pathname: `/a/${process.env.UPLOADTHING_APP_ID || "*"}/**`,
      },
      {
        protocol: "https",
        hostname: "j1384sfojb.ufs.sh",
        pathname: `/a/${process.env.UPLOADTHING_APP_ID || "*"}/**`,
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // Allow all Google profile image paths
=======
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID || "*"}/**`,
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
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
<<<<<<< HEAD
=======
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript build errors
  },
>>>>>>> 03997ca83e92534005f18531b19b66bb8cadbee1
};

export default nextConfig;
