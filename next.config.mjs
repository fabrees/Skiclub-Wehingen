/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skiclub-web-storage.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],

    // domains: ['skiclub-web-storage.s3.eu-north-1.amazonaws.com'], alte version der remote domain konfiguration
  },
};

export default nextConfig;
