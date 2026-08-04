import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const baseConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "streamflow-sigma.vercel.app",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

// `next build` wipes the dist dir, which deletes `static/development/` out from
// under a running `next dev`. The dev server only creates that folder at
// startup, so every later edit fails with
// `ENOENT ... static/development/_buildManifest.js.tmp.<random>`.
// Keeping dev on its own dist dir makes the two safe to run side by side.
const nextConfig = (phase: string): NextConfig => ({
  ...baseConfig,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});

export default nextConfig;
