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
    },
    headers: async () => [
        {
          source: '/api/:path*', // Matches all API routes
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: 'Access-Control-Allow-Origin', value: '*' }, // Replace with Chapa's exact domain
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "*" },
        ],
        },
    ],
};

export default nextConfig;
