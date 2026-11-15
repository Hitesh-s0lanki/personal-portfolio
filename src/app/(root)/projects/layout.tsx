import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI & Full-Stack Projects",
  description:
    "Explore Hitesh Solanki's AI agents, full-stack apps, and backend systems, with source code, demos, and documentation for Next.js, Go, and Python projects.",
  path: "/projects",
  eyebrow: "Work",
  keywords: [
    "Hitesh Solanki projects",
    "full stack projects",
    "AI projects",
    "Next.js projects",
    "open source portfolio",
  ],
});

type Props = {
  children: React.ReactNode;
};

/**
 * Metadata-only layout. Structured data lives in the page itself so it does not
 * leak into nested routes such as /projects/relivo.
 */
const ProjectsLayout = ({ children }: Props) => <>{children}</>;

export default ProjectsLayout;
