import { Project } from "@/type";

export type ProjectCategoryId = "all" | "ai" | "web" | "backend" | "cloud" | "data";

/**
 * The project data carries 130+ free-text technology strings ("openai", "OpenAI",
 * "OPENAI", "Langchain", "langgraph", …). Showing them raw makes a filter row
 * nobody can scan, so projects are bucketed into a handful of stacks instead.
 * Anything more specific is what the search box is for.
 */
interface CategoryDefinition {
  id: Exclude<ProjectCategoryId, "all">;
  label: string;
  /** Lowercased technology names that put a project in this bucket. */
  technologies: string[];
}

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: "ai",
    label: "AI & Agents",
    technologies: [
      "ai",
      "ai agents",
      "ai news",
      "gen ai",
      "agents",
      "agentic",
      "agentic rag",
      "react agent",
      "tool agent",
      "openai",
      "gemini",
      "groq",
      "langchain",
      "langgraph",
      "langserve",
      "crewai",
      "mcp",
      "vapi",
      "vapi ai",
      "tavily",
      "arxiv",
      "wikipedia",
      "streamlit",
    ],
  },
  {
    id: "web",
    label: "Web & Frontend",
    technologies: [
      "nextjs",
      "react",
      "reactjs",
      "react native",
      "vite",
      "tailwind css",
      "shadcn",
      "typescript",
      "javascript",
      "html",
      "css",
      "zustand",
      "redux",
      "react flow",
      "gsap",
      "three.js",
      "react three fiber",
      "webgl",
      "drag n drop",
      "liveblocks",
      "chrome extension",
      "shopify",
      "hydrogen",
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    technologies: [
      "java",
      "spring",
      "spring boot",
      "spring framework",
      "spring mvc",
      "spring security",
      "python",
      "advance python",
      "fastapi",
      "go",
      "gin",
      "gorm",
      "nestjs",
      "node.js",
      "microservice",
      "trpc",
      "swagger",
      "jwt",
      "auth",
      "clerk",
      "protobuf",
      "kafka",
      "sse",
      "streaming",
      "real-time",
      "stream",
      "inngest",
      "razorpay",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    technologies: [
      "aws",
      "aws s3",
      "aws sqs",
      "ec2",
      "ecs",
      "rds",
      "vpc",
      "nat",
      "api gateway",
      "terraform",
      "github actions",
      "docker",
      "vercel",
    ],
  },
  {
    id: "data",
    label: "Data & Storage",
    technologies: [
      "postgresql",
      "postgres",
      "mysql",
      "pgvector",
      "prisma",
      "drizzle",
      "convex",
      "supabase",
      "suprabase",
      "firebase",
      "appwrite",
      "analytics",
      "crm",
    ],
  },
];

const normalize = (value: string) => value.toLowerCase().trim();

const matchesCategory = (project: Project, definition: CategoryDefinition) =>
  project.technologies.some((tech) =>
    definition.technologies.includes(normalize(tech)),
  );

export interface ProjectCategory {
  id: ProjectCategoryId;
  label: string;
  count: number;
}

/**
 * Categories in display order, each with how many projects it holds. Empty
 * buckets are dropped so the filter row never offers a dead end.
 */
export const buildCategories = (projects: Project[]): ProjectCategory[] => [
  { id: "all", label: "All", count: projects.length },
  ...CATEGORY_DEFINITIONS.map((definition) => ({
    id: definition.id as ProjectCategoryId,
    label: definition.label,
    count: projects.filter((project) => matchesCategory(project, definition))
      .length,
  })).filter((category) => category.count > 0),
];

export const isInCategory = (project: Project, categoryId: ProjectCategoryId) => {
  if (categoryId === "all") return true;

  const definition = CATEGORY_DEFINITIONS.find(({ id }) => id === categoryId);
  return definition ? matchesCategory(project, definition) : true;
};

/** Everything a search query is allowed to hit, lowercased once per project. */
export const searchHaystack = (project: Project) =>
  [
    project.name,
    project.tagline,
    project.description,
    project.technologies.join(" "),
  ]
    .join(" ")
    .toLowerCase();
