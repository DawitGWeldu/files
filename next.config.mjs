/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:[
            "utfs.io",
            "litix.io"
        ]
    },
    env: {
        // NEXT_PUBLIC_APP_URL: `https://${process.env.VERCEL_URL}`,
        NEXT_PUBLIC_APP_URL: `https://danielgetachew.tech`,
    },
};

export default nextConfig;
