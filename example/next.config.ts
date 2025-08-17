import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repoName = '/your-repo-name' // IMPORTANT: REPLACE WITH YOUR REPO NAME

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubActions ? repoName : '',
  assetPrefix: isGithubActions ? repoName : '',
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
