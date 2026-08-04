import type { PortfolioTools } from "@/lib/ai/tools";

/**
 * What the UI says while a tool runs. Lives apart from the tool definitions so
 * the client can import it without pulling Resend, Firecrawl, and `fs` into the
 * browser bundle — the type import above is erased at build time, but still
 * fails the build if a tool is added without a label.
 */
export const TOOL_LABELS: Record<keyof PortfolioTools, string> = {
  listProjects: "Looking through projects",
  getProject: "Reading project details",
  getExperience: "Checking work history",
  listCertificates: "Checking certifications",
  listBlogs: "Looking up articles",
  getSkills: "Reviewing the tech stack",
  recordContactRequest: "Passing your details to Hitesh",
  recordUnansweredQuestion: "Noting this for Hitesh",
  searchWeb: "Searching the web",
  readWebPage: "Reading a page",
};

export const toolLabel = (toolName: string) =>
  TOOL_LABELS[toolName as keyof PortfolioTools] ?? "Working on it";
