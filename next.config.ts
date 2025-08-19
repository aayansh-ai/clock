
import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  // This is the name of your repository.
  basePath: isGithubActions ? '/clock' : '',
  assetPrefix: isGithubActions ? '/clock/' : '',
  // Your other Next.js config options here
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
