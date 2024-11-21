import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    silenceDeprecationWarnings: ['legacy-js-api'],
  },
};

export default nextConfig;
