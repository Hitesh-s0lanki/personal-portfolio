"use client";

import { projectData } from "@/lib/data";
import { Sparkles, ArrowRight } from "lucide-react";
import { Project } from "@/type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import ProjectListItem from "../projects/_components/project-list-item";
import ProjectReadmeSheet from "../projects/_components/project-readme-sheet";
import useProjectReadme from "../projects/_components/use-project-readme";

const FeaturedProjectsSection = () => {
  const featuredProjects = projectData.filter((project) => project.featured);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { readmeContent, isReadmeLoading, readmeError, resetReadmeState } =
    useProjectReadme(activeProject);

  const onCloseProjectSheet = (open: boolean) => {
    if (!open) {
      setActiveProject(null);
      resetReadmeState();
    }
  };

  return (
    <section
      id="projects"
      className="w-full flex justify-center py-10 bg-gradient-to-b from-white via-slate-50 to-white"
    >
      <div className="w-full max-w-7xl px-6 md:px-8 lg:px-10 flex flex-col gap-8 md:gap-10">
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

        {featuredProjects.length > 0 ? (
          <>
            <div className="w-full pr-1">
              <div className="space-y-4">
                {featuredProjects.map((project) => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    onOpen={setActiveProject}
                  />
                ))}
              </div>
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

      <ProjectReadmeSheet
        project={activeProject}
        isReadmeLoading={isReadmeLoading}
        readmeError={readmeError}
        readmeContent={readmeContent}
        onOpenChange={onCloseProjectSheet}
      />
    </section>
  );
};

export default FeaturedProjectsSection;
