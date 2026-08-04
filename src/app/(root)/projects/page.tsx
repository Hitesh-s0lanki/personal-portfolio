import JsonLd from "@/components/json-ld";
import SectionEyebrow from "@/components/section-eyebrow";
import { featuredProjects, projectData } from "@/lib/data";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import ProjectsExplorer from "./_components/projects-explorer";

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects | Hitesh Solanki",
  url: absoluteUrl("/projects"),
  description:
    "Projects spanning full-stack web apps, AI agent systems, and cloud infrastructure.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projectData.length,
    itemListElement: projectData.slice(0, 20).map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      description: project.description,
      url: absoluteUrl(`/projects/${project.id}`),
    })),
  },
};

const uniqueTechnologies = new Set(
  projectData.flatMap((project) =>
    project.technologies.map((tech) => tech.toLowerCase()),
  ),
).size;

const stats = [
  { value: projectData.length, label: "Projects" },
  { value: featuredProjects.length, label: "Featured" },
  { value: uniqueTechnologies, label: "Technologies" },
];

/**
 * Server-rendered shell: header and structured data ship as static HTML, and
 * only the interactive browsing (search, filters, layout, paging) is a client
 * island.
 */
const ProjectsPage = () => (
  <div className="min-h-screen w-full">
    <JsonLd
      data={[
        projectsJsonLd,
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]),
      ]}
    />

    <header className="mx-auto w-full max-w-6xl px-5 pt-10 pb-8 md:px-8 md:pt-14 lg:px-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <SectionEyebrow>All Projects</SectionEyebrow>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Ideas <span className="text-[#9b4819]">in Flight</span>
        </h1>
        <p className="max-w-xl text-sm text-gray-500 md:text-base">
          Everything I&apos;ve shipped across full-stack web, AI agents, and
          cloud infrastructure. Search it, or filter by the stack you care
          about.
        </p>

        <dl className="mt-2 flex items-center gap-6 sm:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-xl font-semibold text-gray-900 tabular-nums sm:text-2xl">
                {stat.value}
              </dd>
              <span className="text-[11px] tracking-[0.18em] text-gray-400 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </header>

    <ProjectsExplorer />

    <div className="mx-auto w-full max-w-6xl px-5 pb-4 md:px-8 lg:px-10">
      <div className="h-[0.5px] w-full bg-[#BDBDBD]" />
    </div>
  </div>
);

export default ProjectsPage;
