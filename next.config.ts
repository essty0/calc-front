/*
require('dotenv').config()

module.exports = {
    env: {
        BACK_URL: process.env.NEXT_PUBLIC_API_URL
    },
    output: "export",
    reactStrictMode: true,
    swcMinify: true,
}
*/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        BACK_URL: process.env.BACK_URL
    },
};

export default nextConfig;
