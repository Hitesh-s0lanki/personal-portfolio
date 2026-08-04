import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const manifest = (): MetadataRoute.Manifest => ({
  name: siteConfig.title,
  short_name: siteConfig.shortName,
  description: siteConfig.description,
  start_url: "/",
  display: "standalone",
  background_color: siteConfig.backgroundColor,
  theme_color: siteConfig.themeColor,
  icons: [
    {
      src: "/icon.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
    {
      src: "/apple-icon",
      sizes: "180x180",
      type: "image/png",
    },
  ],
});

export default manifest;
