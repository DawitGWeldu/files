/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io", "vercel-storage.com"],
    // loader: "custom",
    // loaderFile: "./lib/imageLoader.ts",
    unoptimized: true,
  },
  excludeDefaultMomentLocales: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  poweredByHeader: false,
  trailingSlash: false,
  env: {
    DATABASE_URL:
      "mysql://ittihafv_root:Donut35ddV2.0@localhost:3306/ittihafv_files",
    UPLOADTHING_SECRET:
      "sk_live_0c7fe2d38add16beea7cbdbbec017cc040ef987fda6dea78dcaaab01b8b039c2",
    UPLOADTHING_APP_ID: "3hg97mokjm",
    MUX_TOKEN_ID: "70293b92-a020-438f-8573-cb713cdb4011",
    MUX_TOKEN_SECRET:
      "h078n+L1tErgbHcP9MlaNegDGjLqg6mZOW2rpFF6M+TuXmUIcD9zEtHt3pgjFA36shaFRk0WuwG",
    NEXT_PUBLIC_TEACHER_ID: "user_2clnhRZA6Cy1t1m6JnaX2LayMA3",
    NEXTAUTH_SECRET: "thisisasecret",
    AUTH_SECRET: "thisisasecret",
    secret: "thisisasecret",
    HOST: "ittihadagency.com",
    PORT: "443",
    NEXTAUTH_URL: "https://ittihadagency.com/api/auth",
    NEXT_PUBLIC_APP_URL: "https://ittihadagency.com",
    trustHost: "true",
    AFRO_SMS_API_KEY:
      "eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiR0t6c0hBbnQ2UzJPTG0wdFJCbkJ1VVBlaFRHRU5XSlIiLCJleHAiOjE4NjY4NzE4NzIsImlhdCI6MTcwOTAxOTA3MiwianRpIjoiNTJjMGQ2ZmQtZjU3OC00ZWQyLTg2ODEtYTY1OTk1NzIyODc2In0.fmr7N-K9qbE-31h-Xys9T-Lz6aUKNVsXE5nnOTXitzc",
    AFRO_SMS_IDENTIFIER_ID: "e80ad9d8-adf3-463f-80f4-7c4b39f7f164",
    GITHUB_CLIENT_ID: "3ea87de02166120429ec",
    GITHUB_CLIENT_SECRET: "6c3622f63e34e3eb0dfe7b48f6bf1cc823367e30",
    GOOGLE_CLIENT_ID:
      "798136661434-h6sdt2aq1kmcmh48c0r1ljhjf3nb8tmj.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    CHAPA_PUBLIC_KEY: "CHAPUBK_TEST-qK7jjW0gSrpXK9HjVHvQv6Gb2FCoJuEF",
    CHAPA_SECRET_KEY: "CHASECK_TEST-jlm8m3ZJiu9pNuvWiougRYAJ0moD3mqt",
    CHAPA_ECRYPTION_KEY: "Fpp2v47kLOkcBRqYQcLxmlrK",
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
