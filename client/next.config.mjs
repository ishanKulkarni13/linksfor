/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        esmExternals: "loose",
        serverComponentsExternalPackages: ["mongoose"]
    } ,
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


