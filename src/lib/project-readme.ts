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
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
      {
        headers: { "User-Agent": "personal-portfolio-readme-loader" },
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    if (!response.ok) return null;
    const content = await response.text();
    return content.trim() ? content : null;
  } catch {
    return null;
  }
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
