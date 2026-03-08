import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const parseGitHubRepo = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;

    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length < 2) return null;

    const owner = segments[0];
    const repo = segments[1].replace(/\.git$/, "");
    if (!owner || !repo) return null;

    return { owner, repo };
  } catch {
    return null;
  }
};

const tryReadLocalReadme = async (owner: string, repo: string) => {
  const readmeDir = path.join(process.cwd(), "public", "project-readmes");
  const candidates = [
    `${owner}__${repo}.md`,
    `${repo}.md`,
    `${owner}-${repo}.md`,
  ];

  for (const fileName of candidates) {
    const filePath = path.join(readmeDir, fileName);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      if (content.trim()) {
        return content;
      }
    } catch {
      // Continue trying candidate files.
    }
  }

  return null;
};

export async function GET(request: NextRequest) {
  const githubUrl = request.nextUrl.searchParams.get("githubUrl");

  if (!githubUrl) {
    return NextResponse.json(
      { error: "Missing githubUrl query parameter." },
      { status: 400 }
    );
  }

  const repoInfo = parseGitHubRepo(githubUrl);
  if (!repoInfo) {
    return NextResponse.json(
      { error: "Invalid GitHub repository URL." },
      { status: 400 }
    );
  }

  const { owner, repo } = repoInfo;
  const githubHeaders = {
    Accept: "application/vnd.github.raw+json",
    "User-Agent": "personal-portfolio-readme-loader",
  };

  try {
    const githubApiReadme = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers: githubHeaders, cache: "no-store" }
    );

    if (githubApiReadme.ok) {
      const content = await githubApiReadme.text();
      if (content.trim()) {
        return NextResponse.json({ content, source: "github" });
      }
    }
  } catch {
    // Continue with fallback flow.
  }

  try {
    const rawReadme = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
      { headers: { "User-Agent": "personal-portfolio-readme-loader" }, cache: "no-store" }
    );

    if (rawReadme.ok) {
      const content = await rawReadme.text();
      if (content.trim()) {
        return NextResponse.json({ content, source: "github-raw" });
      }
    }
  } catch {
    // Continue with fallback flow.
  }

  const localReadme = await tryReadLocalReadme(owner, repo);
  if (localReadme) {
    return NextResponse.json({ content: localReadme, source: "local" });
  }

  return NextResponse.json(
    {
      error:
        "README.md could not be loaded from GitHub, and no local cached README was found.",
    },
    { status: 404 }
  );
}
