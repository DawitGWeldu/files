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
            { key: 'Access-Control-Allow-Origin', value: 'https://api.chapa.co' }, // Replace with Chapa's exact domain
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' }, // Adjust methods based on your API routes
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' }, // Adjust headers if needed
          ],
        },
    ],
};

export default nextConfig;
