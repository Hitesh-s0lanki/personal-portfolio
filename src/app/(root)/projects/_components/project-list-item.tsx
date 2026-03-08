"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/type";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TechIconTag from "./tech-icon-tag";

interface ProjectListItemProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const ProjectListItem = ({ project, onOpen }: ProjectListItemProps) => {
  return (
    <article
      className="w-full rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md cursor-pointer"
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl md:h-auto md:w-72 md:rounded-l-xl md:rounded-tr-none">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4 p-5">
          <div className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {project.name}
              </h2>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechIconTag key={`${project.id}-${tech}`} tech={tech} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.github && (
              <Button asChild variant="outline" size="sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
            {project.demo && (
              <Button asChild size="sm" className="bg-[#333333]">
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  Live
                  <ExternalLink className="h-4 w-4" />
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
