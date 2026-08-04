import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
  ],
  sitemap: absoluteUrl("/sitemap.xml"),
  host: siteUrl,
});

export default robots;
