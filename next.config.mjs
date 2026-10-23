/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  images: {
    // Bilder werden unverändert ausgeliefert. Der Bildoptimierer von Next 14
    // hat ungepatchte Sicherheitslücken (/_next/image); die Bilder in public
    // sind bereits verkleinert. Erst mit Next >= 15.5.28 wieder einschalten.
    unoptimized: true,
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
