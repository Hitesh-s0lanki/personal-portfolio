"use client";

import { LayoutGrid } from "@/components/ui/layout-grid";
import { projectData } from "@/lib/data";
import { Sparkles, ExternalLink, Github, ArrowRight } from "lucide-react";
import { Project } from "@/type";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeaturedProjectsSection = () => {
  const featuredProjects = projectData.filter((project) => project.featured);

  // Create skeleton components for each project
  const createProjectSkeleton = (project: Project) => {
    return (
      <div>
        <p className="font-bold text-lg text-white">{project.name}</p>
        <p className="font-normal text-base max-w-lg text-neutral-200">
          {project.description}
        </p>
        <div className="flex gap-4 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  // Transform featured projects into cards format
  const cards = featuredProjects.map((project, index) => ({
    id: project.id,
    content: createProjectSkeleton(project),
    className:
      index === 0 || index === featuredProjects.length - 1
        ? "md:col-span-2"
        : "col-span-1",
    thumbnail: project.image,
  }));

  return (
    <section
      id="projects"
      className="w-full flex justify-center items-center py-10 bg-gradient-to-b from-white via-slate-50 to-white"
    >
      <div className="w-full max-w-7xl px-6 md:px-8 lg:px-10 space-y-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
            <Sparkles className="h-3 w-3" />
            <span>Featured Projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              Designed & Built
            </span>
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-gray-600">
            A curated selection of projects showcasing my experience with
            scalable systems, cloud-native architecture, and AI-driven products.{" "}
          </p>
        </div>
        {cards.length > 0 ? (
          <>
            <div className="w-full md:h-[700px]">
              <LayoutGrid cards={cards} />
            </div>
            <div className="flex justify-center">
              <Button variant={"link"} asChild>
                <Link href="/projects">
                  Explore More Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center">
            <p className="text-gray-500">No featured projects available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
