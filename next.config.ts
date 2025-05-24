import type { NextConfig } from "next";

const scrapingDomain = (process.env.NEXT_PUBLIC_SCRAPING_URL || "")
  .replace(/https?:\/\//, "")
  .split("/")[0];

const nextConfig: NextConfig = {
  images: {
    domains: [scrapingDomain, "s3.voelkerlabs.de"],
  },
};

export default nextConfig;
