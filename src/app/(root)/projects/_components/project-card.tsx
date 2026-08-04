import { Project } from "@/type";
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TechIconTag from "./tech-icon-tag";

interface ProjectCardProps {
  project: Project;
  /** Position in the visible grid — drives the staggered entrance only. */
  index?: number;
  priority?: boolean;
}

/**
 * Compact grid card. The list view shows one project per row; this one packs
 * three per row on a wide screen so 41 projects stay browsable instead of
 * turning the page into a ten-thousand-pixel scroll.
 */
const ProjectCard = ({ project, index = 0, priority = false }: ProjectCardProps) => {
  const isInternalDemo = project.demo?.startsWith("/");

  return (
    <article
      className="project-reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b4819]/25 hover:shadow-[0_18px_40px_-18px_rgba(155,72,25,0.4)]"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
        <Image
          src={project.cover ?? project.image}
          alt={project.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 380px"
        />
        {project.ribbon && (
          <div className="ribbon z-10">{project.ribbon}</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-1.5 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={13} />
          View project
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base leading-snug font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#9b4819]">
              {/* Stretched link: the whole card is clickable while the markup
                  stays a single valid anchor. */}
              <Link
                href={`/projects/${project.id}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {project.name}
              </Link>
            </h2>
            {project.featured && (
              <span
                className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-[#9b4819]"
                title="Featured project"
              >
                <Sparkles size={10} />
                Featured
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
            {project.tagline}
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <TechIconTag key={`${project.id}-${tech}`} tech={tech} />
            ))}
            {project.technologies.length > 3 && (
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50 px-2 py-1 text-xs font-medium text-gray-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Sits above the stretched link so these stay separately clickable. */}
          {(project.github || project.demo) && (
            <div className="relative z-10 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-3 text-xs font-medium">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-[#9b4819]"
                >
                  <Github className="size-3.5" />
                  Code
                </a>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  target={isInternalDemo ? undefined : "_blank"}
                  rel={isInternalDemo ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center gap-1.5 text-[#9b4819] transition-colors hover:text-[#7a3914]"
                >
                  <ExternalLink className="size-3.5" />
                  {isInternalDemo ? "Case study" : "Live demo"}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
