/**
 * Skill bento data. Kept as plain data (no JSX) so both the skills section and
 * the AI assistant's `getSkills` tool read from the same source.
 */

export type SkillIcon =
  | "ai"
  | "systems"
  | "languages"
  | "frameworks"
  | "data"
  | "ml"
  | "devops"
  | "aws"
  | "cloud";

export interface SkillCategory {
  title: string;
  /** Key resolved to a lucide icon by the skills section. */
  icon: SkillIcon;
  skills: string[];
  /** Short line shown only on featured cards. */
  tagline?: string;
  featured?: boolean;
  /** Column span on the lg 6-column bento grid. */
  span: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Agents",
    icon: "ai",
    tagline: "Agentic systems that ship to real users.",
    featured: true,
    span: "lg:col-span-3",
    skills: [
      "Agentic AI",
      "LangChain",
      "LangGraph",
      "MCP Servers",
      "RAG Pipelines",
      "Multi-Agent Systems",
      "Tool Calling",
      "Vector DBs",
      "Embeddings",
      "OpenAI API",
      "Claude API",
      "LLM Evals",
    ],
  },
  {
    title: "Go & Systems",
    icon: "systems",
    tagline: "Concurrent services built to hold load.",
    featured: true,
    span: "lg:col-span-3",
    skills: [
      "Gin",
      "GORM",
      "gRPC",
      "Protobuf",
      "Goroutines",
      "Channels",
      "Worker Pools",
      "REST APIs",
      "Microservices",
      "Benchmarking",
    ],
  },
  {
    title: "Languages",
    icon: "languages",
    span: "lg:col-span-2",
    skills: [
      "Go",
      "TypeScript",
      "Python",
      "Java",
      "JavaScript",
      "SQL",
      "Dart",
      "C++",
    ],
  },
  {
    title: "Frameworks",
    icon: "frameworks",
    span: "lg:col-span-2",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Nest.js",
      "Spring Boot",
      "FastAPI",
      "Flutter",
      "Tailwind",
    ],
  },
  {
    title: "Backend & Data",
    icon: "data",
    span: "lg:col-span-2",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "GraphQL",
      "System Design",
      "Event-Driven",
      "Caching",
    ],
  },
  {
    title: "ML & Deep Learning",
    icon: "ml",
    span: "lg:col-span-3",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "Transformers",
      "Fine-Tuning",
      "NLP",
      "Computer Vision",
      "NER",
      "scikit-learn",
      "Pandas",
    ],
  },
  {
    title: "DevOps",
    icon: "devops",
    span: "lg:col-span-3",
    skills: [
      "Docker",
      "Kubernetes",
      "Helm",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
      "Ansible",
      "Prometheus",
      "Grafana",
      "Nginx",
    ],
  },
  {
    title: "AWS",
    icon: "aws",
    span: "lg:col-span-3",
    skills: [
      "EC2",
      "S3",
      "Lambda",
      "EKS",
      "ECS",
      "SQS",
      "RDS",
      "IAM",
      "CloudWatch",
      "Bedrock",
    ],
  },
  {
    title: "Azure & GCP",
    icon: "cloud",
    span: "md:col-span-2 lg:col-span-3",
    skills: [
      "Azure OpenAI",
      "Azure Functions",
      "AKS",
      "Blob Storage",
      "Cosmos DB",
      "Cloud Run",
      "GKE",
      "Vertex AI",
      "BigQuery",
      "Pub/Sub",
    ],
  },
];
