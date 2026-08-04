import JsonLd from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { getProjectById, getRelatedProjects, projectData } from "@/lib/data";
import {
  getProjectReadme,
  rawContentBase,
  repoBlobBase,
} from "@/lib/project-readme";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechIconTag from "../_components/tech-icon-tag";
import ReadmeArticle from "./_components/readme-article";

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () =>
  projectData.map((project) => ({ id: project.id }));

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "This project does not exist.",
      path: `/projects/${id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.id}`,
    eyebrow: "Project",
    keywords: [project.name, ...project.technologies, "Hitesh Solanki"],
  });
};

const ProjectPage = async ({ params }: Props) => {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  const readme = await getProjectReadme(project.github);
  const related = getRelatedProjects(project);
  const isInternalDemo = project.demo?.startsWith("/");

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: absoluteUrl(`/projects/${project.id}`),
    image: project.image.startsWith("http")
      ? project.image
      : absoluteUrl(project.image),
    programmingLanguage: project.technologies,
    keywords: project.technologies.join(", "),
    author: { "@type": "Person", name: "Hitesh Solanki" },
    ...(project.github ? { codeRepository: project.github } : {}),
  };

  return (
    <main className="min-h-screen bg-[#fbf4e9] text-[#222222]">
      <JsonLd
        data={[
          projectJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.name, path: `/projects/${project.id}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-black/10 bg-[#fbfaf7]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 md:px-8 md:py-14 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              asChild
              variant="ghost"
              className="h-9 px-0 text-[#6f4a2d] hover:bg-transparent hover:text-[#9b4819]"
            >
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to projects
              </Link>
            </Button>
            {project.ribbon && (
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c6b7] bg-white px-3 py-1 text-xs font-medium text-[#6f4a2d]">
                {project.ribbon}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-[0.14em] text-[#9b4819] uppercase">
              {project.tagline}
            </p>
            <h1 className="max-w-4xl text-4xl leading-[1.08] font-medium text-[#1c1c1c] sm:text-5xl">
              {project.name}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#5f5b55] md:text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              {project.github && (
                <Button
                  asChild
                  variant="outline"
                  className="h-9 border-[#d8c6b7] bg-white text-[#3f3c38] hover:border-[#9b4819]/60 hover:text-[#9b4819]"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View source
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button
                  asChild
                  className="h-9 bg-[#9b4819] text-white hover:bg-[#7a3914]"
                >
                  <Link
                    href={project.demo}
                    target={isInternalDemo ? undefined : "_blank"}
                    rel={isInternalDemo ? undefined : "noopener noreferrer"}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {isInternalDemo ? "Read the case study" : "Live demo"}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <figure className="overflow-hidden rounded-lg border border-black/10 bg-white">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={project.cover ?? project.image}
                alt={`${project.name} screenshot`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1fr_260px] lg:px-10 lg:py-16">
        <div className="min-w-0">
          {readme ? (
            <>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                Documentation
              </p>
              <ReadmeArticle
                content={readme.content}
                rawBase={rawContentBase(readme.repo)}
                blobBase={repoBlobBase(readme.repo)}
              />
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-black/15 bg-white/60 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                Documentation
              </p>
              <p className="mt-3 text-base leading-8 text-[#5f5b55]">
                A written breakdown for this project isn&apos;t published yet.
                {project.github
                  ? " The source is on GitHub in the meantime."
                  : ""}
              </p>
              {project.github && (
                <Button
                  asChild
                  variant="outline"
                  className="mt-5 border-[#d8c6b7] bg-white"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Open repository
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-black/10 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
              Built with
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <TechIconTag key={tech} tech={tech} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-black/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 lg:px-10 lg:py-16">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                  Keep exploring
                </p>
                <h2 className="mt-2 text-3xl font-medium text-[#1f1f1f]">
                  Related work
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-fit border-[#d8c6b7] bg-white"
              >
                <Link href="/projects">
                  All projects
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.id}`}
                  className="group overflow-hidden rounded-lg border border-black/10 bg-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#fbf4e9]">
                    <Image
                      src={item.cover ?? item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[#25221f] group-hover:text-[#9b4819]">
                      {item.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6f6a63]">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProjectPage;
