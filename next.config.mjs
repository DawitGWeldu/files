/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:[
            "utfs.io",
        ]
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    poweredByHeader: false,
    env: {
        // NEXT_PUBLIC_APP_URL: `https://${process.env.VERCEL_URL}`,
        // NEXT_PUBLIC_APP_URL: `https://danielgetachew.tech`,
        NEXT_PUBLIC_APP_URL: `http://localhost:3000`,
    },
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*", // Set your origin
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
