/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     appDir: true,
    //     esmExternals: "loose",
    //     serverComponentsExternalPackages: ["mongoose"]
    // } ,
    // webpack:(config)=>{
    //     config.experiments = {
    //         topLevelAwait: true,
    //         layers : true
    //     }
    //     return config
    // },
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


