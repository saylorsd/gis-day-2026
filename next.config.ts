import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // `next build` writes a fully static site to out/.
    output: "export",
    // Keep the old Wagtail URLs: /about/ -> out/about/index.html
    trailingSlash: true,
    images: { unoptimized: true },
};

export default nextConfig;
