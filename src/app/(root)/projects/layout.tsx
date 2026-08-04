import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A collection of projects by Hitesh Solanki spanning full-stack web apps, AI agent systems, and cloud infrastructure — built with Next.js, TypeScript, Go, Python, and LangChain.",
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
