/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        formats: ['image/avif', 'image/webp'],
        remotePatterns:[
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                port:'',
                pathname:'/**'
            }
        ]
    }
};

export default nextConfig;


