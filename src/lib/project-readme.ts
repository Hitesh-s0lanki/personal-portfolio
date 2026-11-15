import { promises as fs } from "node:fs";
import path from "node:path";

export type GitHubRepo = { owner: string; repo: string };

/** `https://github.com/owner/repo[/tree/branch]` -> `{ owner, repo }`. */
export const parseGitHubRepo = (url: string): GitHubRepo | null => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;

    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;

    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
};

/** Base for resolving a README's relative image and file links. */
export const rawContentBase = ({ owner, repo }: GitHubRepo) =>
  `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/`;

export const repoBlobBase = ({ owner, repo }: GitHubRepo) =>
  `https://github.com/${owner}/${repo}/blob/HEAD/`;

const readCachedReadme = async ({ owner, repo }: GitHubRepo) => {
  const dir = path.join(process.cwd(), "public", "project-readmes");

  for (const fileName of [`${owner}__${repo}.md`, `${repo}.md`]) {
    try {
      const content = await fs.readFile(path.join(dir, fileName), "utf-8");
      if (content.trim()) return content;
    } catch {
      // Try the next candidate.
    }
  }

  return null;
};

const fetchRemoteReadme = async ({ owner, repo }: GitHubRepo) => {
  // The API resolves README filename casing (e.g. Readme.md). Keep the raw
  // endpoint as the first attempt so normal builds don't use GitHub API quota.
  for (const url of [
    `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
    `https://api.github.com/repos/${owner}/${repo}/readme`,
  ]) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "personal-portfolio-readme-loader",
          Accept: "application/vnd.github.raw+json",
        },
        signal: AbortSignal.timeout(10_000),
        next: { revalidate: 60 * 60 * 24 },
      });
      if (!response.ok) continue;
      const content = await response.text();
      if (content.trim()) return content;
    } catch {
      // A failed endpoint must not prevent the remaining fallback from running.
    }
  }
  return null;
};

/**
 * README for a project page. The repo snapshots in `public/project-readmes`
 * (refreshed by `npm run readmes:sync`) are tried first so builds stay fast and
 * work offline; anything missing is pulled from GitHub.
 */
export const getProjectReadme = async (githubUrl?: string) => {
  if (!githubUrl) return null;

  const repo = parseGitHubRepo(githubUrl);
  if (!repo) return null;

  const content = (await readCachedReadme(repo)) ?? (await fetchRemoteReadme(repo));
  if (!content) return null;

  return { content, repo };
};
