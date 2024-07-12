/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8002',
                pathname: '/profile/get_avatar/**',
            },
        ],
    },
};

export default nextConfig;
