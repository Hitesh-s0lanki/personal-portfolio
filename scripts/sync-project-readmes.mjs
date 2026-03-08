import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "src", "lib", "data.ts");
const OUTPUT_DIR = path.join(ROOT, "public", "project-readmes");

const parseRepoFromUrl = (value) => {
  try {
    const parsed = new URL(value);
    if (parsed.hostname !== "github.com") return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ""),
    };
  } catch {
    return null;
  }
};

const collectGithubRepos = async () => {
  const fileText = await readFile(DATA_FILE, "utf-8");
  const githubMatches = [...fileText.matchAll(/github:\s*"([^"]+)"/g)];
  const repos = new Map();

  for (const match of githubMatches) {
    const url = match[1];
    const parsed = parseRepoFromUrl(url);
    if (!parsed?.owner || !parsed?.repo) continue;
    repos.set(`${parsed.owner}/${parsed.repo}`, parsed);
  }

  return [...repos.values()];
};

const fetchReadme = async ({ owner, repo }) => {
  const headers = {
    Accept: "application/vnd.github.raw+json",
    "User-Agent": "personal-portfolio-readme-sync",
  };

  const apiResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    { headers }
  );

  if (apiResponse.ok) {
    const content = await apiResponse.text();
    if (content.trim()) return content;
  }

  const rawResponse = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
    { headers: { "User-Agent": "personal-portfolio-readme-sync" } }
  );

  if (rawResponse.ok) {
    const content = await rawResponse.text();
    if (content.trim()) return content;
  }

  return null;
};

const main = async () => {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const repos = await collectGithubRepos();

  let successCount = 0;
  let failureCount = 0;

  for (const repo of repos) {
    const key = `${repo.owner}/${repo.repo}`;
    try {
      const readme = await fetchReadme(repo);
      if (!readme) {
        failureCount += 1;
        console.log(`FAIL ${key} -> README not found`);
        continue;
      }

      const filePath = path.join(OUTPUT_DIR, `${repo.owner}__${repo.repo}.md`);
      await writeFile(filePath, readme, "utf-8");
      successCount += 1;
      console.log(`OK   ${key}`);
    } catch (error) {
      failureCount += 1;
      const message = error instanceof Error ? error.message : "Unknown error";
      console.log(`FAIL ${key} -> ${message}`);
    }
  }

  console.log(
    `Done. Synced ${successCount}/${repos.length} README files (${failureCount} failed).`
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
