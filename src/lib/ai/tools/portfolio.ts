import { tool } from "ai";
import { z } from "zod";

import { blogsData, certificates, projectData } from "@/lib/data";
import experienceData from "@/lib/experience-data.json";
import { getProjectReadme } from "@/lib/project-readme";
import { skillCategories } from "@/lib/skills-data";
import type { Experience, Project } from "@/type";

const experiences = experienceData as Experience[];

/** Longest README slice handed to the model — enough for the gist, not the repo. */
const README_CHAR_LIMIT = 4000;

const matches = (haystack: string[], needle: string) =>
  haystack.some((value) => value.toLowerCase().includes(needle.toLowerCase()));

/** Card-sized view of a project: enough to pick one, not enough to bloat context. */
const toProjectSummary = (project: Project) => ({
  id: project.id,
  name: project.name,
  tagline: project.tagline,
  technologies: project.technologies,
  featured: Boolean(project.featured),
  url: `/projects/${project.id}`,
  github: project.github,
  demo: project.demo,
});

export const listProjects = tool({
  description:
    "Index of Hitesh's projects — id, name, tagline, tech stack and links. Start here for any project question, then call getProject for details on the ones that matter.",
  inputSchema: z.object({
    search: z
      .string()
      .optional()
      .describe("Free-text filter over name, tagline and description."),
    technology: z
      .string()
      .optional()
      .describe("Filter by a single technology, e.g. 'Go' or 'LangGraph'."),
    featuredOnly: z
      .boolean()
      .optional()
      .describe("Only the projects highlighted on the homepage."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(60)
      .optional()
      .describe("Max results to return. Defaults to 20."),
  }),
  execute: async ({ search, technology, featuredOnly, limit = 20 }) => {
    let results = projectData;

    if (featuredOnly) results = results.filter((project) => project.featured);

    if (technology) {
      results = results.filter((project) =>
        matches(project.technologies, technology),
      );
    }

    if (search) {
      const needle = search.toLowerCase();
      results = results.filter((project) =>
        [project.name, project.tagline, project.description]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      );
    }

    return {
      total: projectData.length,
      matched: results.length,
      projects: results.slice(0, limit).map(toProjectSummary),
    };
  },
});

export const getProject = tool({
  description:
    "Full detail for one project by id, including its description and an excerpt of the repository README when one is available.",
  inputSchema: z.object({
    id: z
      .string()
      .describe("Project id (the slug from listProjects, e.g. 'relivo-mcp-server')."),
  }),
  execute: async ({ id }) => {
    const project = projectData.find((item) => item.id === id);

    if (!project) {
      return {
        found: false as const,
        message: `No project with id "${id}". Call listProjects to see valid ids.`,
      };
    }

    const readme = await getProjectReadme(project.github);

    return {
      found: true as const,
      project: {
        ...toProjectSummary(project),
        description: project.description,
      },
      readme: readme
        ? {
            truncated: readme.content.length > README_CHAR_LIMIT,
            content: readme.content.slice(0, README_CHAR_LIMIT),
          }
        : null,
    };
  },
});

export const getExperience = tool({
  description:
    "Hitesh's work history — roles, companies, dates, what he shipped, and the sub-ventures he worked on.",
  inputSchema: z.object({
    currentOnly: z
      .boolean()
      .optional()
      .describe("Only the role he holds right now."),
  }),
  execute: async ({ currentOnly }) => {
    const roles = currentOnly
      ? experiences.filter((role) => role.current)
      : experiences;

    return {
      roles: roles.map((role) => ({
        role: role.role,
        company: role.company,
        companyTagline: role.companyTagline,
        companyUrl: role.companyUrl,
        period: role.period,
        location: role.location,
        employmentType: role.employmentType,
        current: Boolean(role.current),
        summary: role.summary,
        highlights: role.highlights,
        ventures: role.ventures?.map((venture) => ({
          name: venture.name,
          period: venture.period,
          description: venture.description,
          url: venture.url,
        })),
        tags: role.tags,
      })),
    };
  },
});

export const listCertificates = tool({
  description:
    "Certifications and courses Hitesh has completed, with issuer, year and topics.",
  inputSchema: z.object({
    search: z
      .string()
      .optional()
      .describe("Filter by name, issuer or topic, e.g. 'Go' or 'Udemy'."),
  }),
  execute: async ({ search }) => {
    const results = search
      ? certificates.filter(
          (certificate) =>
            [certificate.name, certificate.issuer]
              .join(" ")
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            matches(certificate.category, search),
        )
      : certificates;

    return {
      certificates: results.map((certificate) => ({
        name: certificate.name,
        issuer: certificate.issuer,
        date: certificate.date,
        topics: certificate.category,
        link: certificate.link,
      })),
    };
  },
});

export const listBlogs = tool({
  description: "Articles Hitesh has written, with links.",
  inputSchema: z.object({}),
  execute: async () => ({
    blogs: blogsData.map((blog) => ({
      title: blog.title,
      url: blog.url,
      description: blog.description,
      tags: blog.tags,
    })),
  }),
});

export const getSkills = tool({
  description:
    "Hitesh's technical stack, grouped by category (AI & agents, Go & systems, languages, frameworks, data, ML, DevOps, cloud).",
  inputSchema: z.object({}),
  execute: async () => ({
    categories: skillCategories.map((category) => ({
      title: category.title,
      tagline: category.tagline,
      skills: category.skills,
    })),
  }),
});
