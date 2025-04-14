/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        pathname: '/system/resources/previews/**',
      },
    ],
  },
};

export default nextConfig;
