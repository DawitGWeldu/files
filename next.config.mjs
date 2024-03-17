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
    api: {
        bodyParser: false, // Optional: Disable body parsing for API routes if not needed
        externalResolver: true, // Optional: Enables external resolvers for API routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Replace '*' with specific origins if needed
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
};

export default nextConfig;
