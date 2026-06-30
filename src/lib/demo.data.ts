export type CaseStudyStat = {
  label: string;
  value: string;
  description?: string;
};

export type CaseStudyMetaItem = {
  label: string;
  value: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudyHighlight = {
  title: string;
  description: string;
};

export type CaseStudySection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  bullets?: string[];
  highlights?: CaseStudyHighlight[];
  image?: CaseStudyImage;
};

export type RelatedCaseStudy = {
  title: string;
  description: string;
  image: CaseStudyImage;
  href: string;
};

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type DemoCaseStudyData = {
  slug: string;
  projectName: string;
  category: string;
  headline: string;
  summary: string;
  heroImage: CaseStudyImage;
  meta: CaseStudyMetaItem[];
  stats: CaseStudyStat[];
  overview: {
    title: string;
    body: string[];
  };
  requiredInputs: CaseStudyMetaItem[];
  sections: CaseStudySection[];
  reflection: {
    title: string;
    body: string[];
  };
  sourceLinks: CaseStudyLink[];
  relatedProjects: RelatedCaseStudy[];
};

export const demoCaseStudyData: DemoCaseStudyData = {
  slug: "relivo",
  projectName: "Relivo",
  category: "Work in Progress",
  headline:
    "One platform to build, test, publish, and run AI agent workflows.",
  summary:
    "Relivo brings workflow orchestration, memory, observability, chat, API access, and deployment into one product stack for teams building AI agents.",
  heroImage: {
    src: "/projects/relivo/problem.png",
    alt: "The problem Relivo solves diagram",
    caption: "The core problem: scattered agent infrastructure, custom glue code, and poor run visibility.",
  },
  meta: [
    { label: "Status", value: "Work in progress" },
    { label: "Frontend", value: "Next.js, React, Tailwind, Clerk" },
    { label: "Backend", value: "FastAPI, SSE, S3 uploads, OpenAI" },
    { label: "Focus", value: "Agent orchestration and deployment" },
  ],
  stats: [
    {
      label: "Core flow",
      value: "4 steps",
      description: "Create, test, publish, run.",
    },
    {
      label: "Channels",
      value: "Chat/API",
      description: "Embeddable UI and SDKs planned.",
    },
    {
      label: "Stack",
      value: "FE + BE",
      description: "Separate frontend and backend repos.",
    },
  ],
  overview: {
    title: "Overview",
    body: [
      "Relivo is an agent orchestration platform for teams that want AI workflows in production without rebuilding the same infrastructure every time.",
      "The MVP focuses on one complete loop: create a workflow, test it, publish a version, and use it through chat or API.",
    ],
  },
  requiredInputs: [
    { label: "Workspace", value: "Teams, members, environments, credentials" },
    { label: "Agents", value: "Models, instructions, skills, tools, memory" },
    { label: "Workflows", value: "Handoffs, conditions, retries, final response" },
    { label: "MCP", value: "External tools, APIs, business systems" },
    { label: "Deployments", value: "Published workflow versions" },
    { label: "Observability", value: "Logs, usage, latency, streamed events" },
  ],
  sections: [
    {
      id: "problem-statement",
      eyebrow: "Problem Statement",
      title: "AI teams keep rebuilding the same agent infrastructure.",
      body: [
        "Prompts, tool calls, memory, logs, deployments, and chat UI often live in separate places.",
        "That creates glue code, fragile handoffs, and poor run visibility.",
      ],
      bullets: [
        "Too many one-off integrations.",
        "No shared memory or state.",
        "Hard to debug failed runs.",
        "Repeated setup for every agent workflow.",
      ],
      image: {
        src: "/projects/relivo/problem.png",
        alt: "Diagram showing the scattered agent infrastructure problem Relivo solves",
        caption: "The problem: agent stacks are scattered across prompts, APIs, tools, and custom code.",
      },
    },
    {
      id: "solution",
      eyebrow: "Solution",
      title: "Build once. Test. Publish. Run anywhere.",
      body: [
        "Relivo turns fragmented agent infrastructure into one usable product stack.",
        "Teams can orchestrate workflows visually, connect tools, publish versions, and consume them through chat or API.",
      ],
      highlights: [
        {
          title: "Visual orchestration",
          description:
            "Agents, tools, skills, conditions, retries, and handoffs in one workflow.",
        },
        {
          title: "Connected memory + MCP",
          description:
            "Shared context with external tools, APIs, and business systems.",
        },
        {
          title: "Publish once",
          description:
            "Use workflows through Relivo Chat, streaming API, SDKs, or embedded UI.",
        },
      ],
      image: {
        src: "/projects/relivo/how.png",
        alt: "Diagram showing Relivo turning agent chaos into one orchestrated platform",
        caption: "The product direction: one focused platform foundation for AI workflows.",
      },
    },
    {
      id: "how-it-helps",
      eyebrow: "How It Helps",
      title: "Relivo reduces the hidden work around production agents.",
      body: [
        "The goal is not just to run agents. It is to make them visible, reusable, and easier to ship with a team.",
      ],
      bullets: [
        "Faster setup for new workflows.",
        "Clearer debugging through run events.",
        "Reusable deployments for production use.",
        "Less glue code across chat, tools, APIs, and logs.",
      ],
    },
    {
      id: "architecture",
      eyebrow: "Architecture",
      title: "A layered system for workflow creation and execution.",
      body: [
        "The frontend handles the workspace, builder, chat, docs, and authenticated app shell.",
        "The backend provides streaming chat, uploads, conversations, files, and model/tool execution.",
      ],
      bullets: [
        "Next.js frontend with Clerk and TanStack Query.",
        "FastAPI backend with Server-Sent Events.",
        "OpenAI model streaming and reasoning support.",
        "S3-backed file upload and attachment flow.",
      ],
      image: {
        src: "/projects/relivo/system-design.png",
        alt: "Relivo system design architecture diagram",
        caption: "System direction: users, frontend, auth, backend gateway, orchestration, tools, and observability.",
      },
    },
    {
      id: "mvp-scope",
      eyebrow: "MVP Scope",
      title: "One complete flow before broad platform expansion.",
      body: [
        "The first version is intentionally focused: create workflow, test workflow, publish workflow, and use it in production.",
      ],
      highlights: [
        {
          title: "Workspace + auth",
          description:
            "Teams, members, environments, credentials, logs, and usage.",
        },
        {
          title: "Agent setup",
          description:
            "Model configuration, instructions, tools, memory, and guardrails.",
        },
        {
          title: "Run visibility",
          description:
            "Workflow path, model calls, tool calls, latency, tokens, and errors.",
        },
      ],
    },
    {
      id: "outcome",
      eyebrow: "Current State",
      title: "The foundation is in progress.",
      body: [
        "The frontend includes public pages, authenticated chat, conversation history, settings, connectors, and streaming integration.",
        "The backend includes chat streaming, uploads, conversations, file APIs, and model integration.",
      ],
    },
  ],
  reflection: {
    title: "What I am shaping next",
    body: [
      "The next challenge is making the workflow builder feel simple without hiding the power needed for real production agent systems.",
      "The product needs to stay focused: visible runs, reliable handoffs, reusable deployments, and clear developer onboarding.",
    ],
  },
  sourceLinks: [
    {
      label: "Frontend repo",
      href: "https://github.com/Hitesh-s0lanki/relivo-fe",
    },
    {
      label: "Backend repo",
      href: "https://github.com/Hitesh-s0lanki/relivo-be",
    },
  ],
  relatedProjects: [
    {
      title: "Agentic AI Chatbot",
      description:
        "Agent workflow experiments with tools, streaming, and multi-model support.",
      image: {
        src: "/projects/agentic-ai.png",
        alt: "Agentic AI chatbot project preview",
      },
      href: "/projects",
    },
    {
      title: "CrewAI Example",
      description:
        "A multi-agent reasoning demo with FastAPI and real-time output.",
      image: {
        src: "/projects/crew-ai-example.png",
        alt: "CrewAI example project preview",
      },
      href: "/projects",
    },
  ],
};
