import type { InferUITools, UIMessage } from "ai";

import {
  recordContactRequest,
  recordUnansweredQuestion,
} from "@/lib/ai/tools/notify";
import {
  getExperience,
  getProject,
  getSkills,
  listBlogs,
  listCertificates,
  listProjects,
} from "@/lib/ai/tools/portfolio";
import { hasWebAccess, readWebPage, searchWeb } from "@/lib/ai/tools/web";

const portfolioTools = {
  listProjects,
  getProject,
  getExperience,
  listCertificates,
  listBlogs,
  getSkills,
  recordContactRequest,
  recordUnansweredQuestion,
};

const webTools = { searchWeb, readWebPage };

/**
 * The Firecrawl tools are only offered when a key is present — otherwise the
 * model would keep reaching for a tool that can only ever return an error.
 */
export const buildTools = () =>
  hasWebAccess() ? { ...portfolioTools, ...webTools } : { ...portfolioTools };

export type PortfolioTools = InferUITools<
  typeof portfolioTools & typeof webTools
>;

/** UI message type shared by the chat route and the client hook. */
export type PortfolioUIMessage = UIMessage<never, never, PortfolioTools>;
