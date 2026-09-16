import type { MetadataRoute } from "next";
import { projectData } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticRoutes: Route[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects/relivo", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

/** One entry per project page — featured work ranks a little higher. */
const projectRoutes: Route[] = projectData.map((project) => ({
  path: `/projects/${project.id}`,
  changeFrequency: "monthly",
  priority: project.featured ? 0.8 : 0.6,
}));

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  return [...staticRoutes, ...projectRoutes].map(
    ({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    }),
  );
};

export default sitemap;
