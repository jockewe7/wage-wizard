import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove MDX page extensions since we're using MDXRemote for content
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    // Remove mdxRs since we're not using MDX pages directly
  },
};

export default nextConfig;
