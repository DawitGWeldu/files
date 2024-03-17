/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:[
            "utfs.io",
        ]
    },
    env: {
        // NEXT_PUBLIC_APP_URL: `https://${process.env.VERCEL_URL}`,
        NEXT_PUBLIC_APP_URL: `https://danielgetachew.tech`,
        // NEXT_PUBLIC_APP_URL: `http://localhost:3000`,
    }
};

export default nextConfig;
