import { Button } from "@/components/ui/button";
import { Project } from "@/type";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TechIconTag from "./tech-icon-tag";

interface ProjectListItemProps {
  project: Project;
}

const ProjectListItem = ({ project }: ProjectListItemProps) => {
  const isInternalDemo = project.demo?.startsWith("/");

  return (
    <article className="group relative w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9b4819]/20 hover:shadow-xl hover:shadow-[#9b4819]/8">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-80">
          <Image
            src={project.cover ?? project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          {project.ribbon && <div className="ribbon z-10">{project.ribbon}</div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-3 left-3 flex translate-y-2 items-center gap-1.5 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowRight size={12} />
            <span>View project</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-4 p-5 md:p-6">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg leading-tight font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#9b4819]">
                  {/* Stretched link: the whole card is clickable, but the
                      markup stays a single valid anchor. */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {project.name}
                  </Link>
                </h2>
                <ArrowRight
                  size={16}
                  className="mt-0.5 shrink-0 text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#9b4819]"
                />
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((tech) => (
                <TechIconTag key={`${project.id}-${tech}`} tech={tech} />
              ))}
              {project.technologies.length > 6 && (
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-gray-500">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>
          </div>

          {/* Sits above the stretched link so these stay separately clickable. */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
            {project.github && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 text-xs transition-colors hover:border-[#9b4819]/40 hover:text-[#9b4819]"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-1.5 h-3.5 w-3.5" />
                  GitHub
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                asChild
                size="sm"
                className="h-8 bg-[#9b4819] text-xs text-white hover:bg-[#7a3914]"
              >
                <Link
                  href={project.demo}
                  target={isInternalDemo ? undefined : "_blank"}
                  rel={isInternalDemo ? undefined : "noopener noreferrer"}
                >
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  {isInternalDemo ? "View Case Study" : "Live Demo"}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectListItem;
