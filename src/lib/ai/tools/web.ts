import Firecrawl, {
  type DocumentMetadata,
  type SearchResultWeb,
} from "@mendable/firecrawl-js";
import { tool } from "ai";
import { z } from "zod";

/** Longest page slice handed to the model. */
const PAGE_CHAR_LIMIT = 6000;

/** Longest per-result snippet in a search response. */
const SNIPPET_CHAR_LIMIT = 400;

let client: Firecrawl | null = null;

const getClient = () => {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) return null;

  client ??= new Firecrawl({ apiKey });
  return client;
};

export const hasWebAccess = () => Boolean(process.env.FIRECRAWL_API_KEY);

/**
 * The model picks these URLs, and a visitor can nudge it toward one — so keep
 * the fetcher off the loopback and private ranges rather than trusting either.
 */
const PRIVATE_HOST = /^(localhost|.*\.local(host)?|.*\.internal)$/i;
const PRIVATE_IP =
  /^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.|::1$|f[cd])/i;

const assertPublicUrl = (raw: string) => {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return `"${raw}" isn't a valid URL.`;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "Only http and https URLs can be fetched.";
  }

  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (PRIVATE_HOST.test(host) || PRIVATE_IP.test(host)) {
    return "That host is not reachable from here.";
  }

  return null;
};

export const searchWeb = tool({
  description:
    "Search the live web via Firecrawl. Use for context that isn't in the portfolio — a company, a technology, or current information. Never use it for facts about Hitesh himself.",
  inputSchema: z.object({
    query: z.string().describe("The search query."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(8)
      .optional()
      .describe("How many results to return. Defaults to 5."),
  }),
  execute: async ({ query, limit = 5 }) => {
    const firecrawl = getClient();
    if (!firecrawl) {
      return { error: "Web search is not configured on this deployment." };
    }

    try {
      const data = await firecrawl.search(query, {
        limit,
        sources: ["web"],
      });

      // Results come back as plain hits, or as scraped documents when the
      // account has scrape defaults — both reduce to the same triple. Snippets
      // from the latter can run to whole pages, so they get trimmed.
      const results = (data.web ?? []).map((result) => {
        const hit = result as Partial<SearchResultWeb> & {
          metadata?: DocumentMetadata;
        };

        return {
          title: hit.title ?? hit.metadata?.title,
          url: hit.url ?? hit.metadata?.url,
          description: (hit.description ?? hit.metadata?.description)?.slice(
            0,
            SNIPPET_CHAR_LIMIT,
          ),
        };
      });

      return { query, results };
    } catch (error) {
      console.error("[assistant] firecrawl search failed:", error);
      return { error: "The web search failed. Answer without it." };
    }
  },
});

export const readWebPage = tool({
  description:
    "Fetch a single public web page as Markdown via Firecrawl. Use it to read a link the visitor shared, or a page surfaced by searchWeb.",
  inputSchema: z.object({
    url: z.string().describe("Absolute http(s) URL of the page to read."),
  }),
  execute: async ({ url }) => {
    const firecrawl = getClient();
    if (!firecrawl) {
      return { error: "Web browsing is not configured on this deployment." };
    }

    const rejection = assertPublicUrl(url);
    if (rejection) return { error: rejection };

    try {
      const document = await firecrawl.scrape(url, {
        formats: ["markdown"],
        onlyMainContent: true,
        timeout: 20_000,
      });

      const markdown = document.markdown ?? "";
      if (!markdown.trim()) {
        return { url, error: "That page returned no readable content." };
      }

      return {
        url,
        title: document.metadata?.title,
        truncated: markdown.length > PAGE_CHAR_LIMIT,
        content: markdown.slice(0, PAGE_CHAR_LIMIT),
      };
    } catch (error) {
      console.error("[assistant] firecrawl scrape failed:", error);
      return { url, error: "That page couldn't be fetched. Answer without it." };
    }
  },
});
