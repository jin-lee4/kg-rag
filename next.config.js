/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'multer'];
    return config;
  },
  api: {
    bodyParser: false, // Disable body parsing for all API routes
  },
};

export default nextConfig;