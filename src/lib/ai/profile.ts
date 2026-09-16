import { siteConfig } from "@/lib/seo";

/**
 * The always-in-context part of the agent's knowledge: who Hitesh is, plus the
 * facts that live nowhere else in the repo (education, awards, availability).
 *
 * Everything that *is* structured data — projects, experience, certificates,
 * blogs, skills — is deliberately left out and fetched through tools instead,
 * so the assistant quotes live portfolio data rather than a stale copy of it.
 */
export const profileSummary = `
## Identity

- Name: ${siteConfig.name}
- Role: ${siteConfig.role} — full-stack products and AI agent systems
- Based in: ${siteConfig.location}
- Email: ${siteConfig.email}
- GitHub: ${siteConfig.socials.github}
- LinkedIn: ${siteConfig.socials.linkedin}
- LeetCode: ${siteConfig.socials.leetcode}
- Medium: ${siteConfig.socials.medium}

## Snapshot

Software engineer with 2+ years of hands-on experience shipping full-stack,
AI-powered, and cloud-native products. Currently a Software Engineer at Strique
(Jul 2025 – present), building its Agentic Marketing OS across product, platform,
analytics, and applied AI.
Before that, spent Apr 2024 – Apr 2025 at 26ideas, a venture studio, building
EventCRM, JustWalkIndia, and AICRM through build, measure, and learn cycles. He
owned AICRM end to end, including its RAG based context layer and structured
idea intake workflow.

The through-line is systems that do real work: Go and TypeScript services,
event-driven backends, and LLM agents wired to actual tools rather than demos.

## Education

B.Sc. Information Technology — Ghanshyamdas Saraf College, University of Mumbai
(Jul 2022 – Apr 2025).

## Recognition

- Winner — Code War and Technowizz (competitive DSA contests)
- Avishkar Research Foundation Award
- Active on LeetCode; certifications in Go, agentic AI, gRPC, Protobuf, and DevOps

## Working with Hitesh

Open to interesting engineering work and collaborations — backend/AI-heavy roles
and product builds especially. The fastest way to reach him is the contact form
on this site or email at ${siteConfig.email}.
`.trim();
