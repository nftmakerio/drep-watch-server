await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    typescript: {
        ignoreBuildErrors: process.env.NEXT_PUBLIC_NODE_ENV !== 'development',
    },
    eslint: {
        ignoreDuringBuilds: process.env.NEXT_PUBLIC_NODE_ENV !== 'development',
    },

    swcMinify: true,
};

export default config;
