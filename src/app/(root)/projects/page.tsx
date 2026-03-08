"use client";

import { projectData } from "@/lib/data";
import { Project } from "@/type";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import ProjectListItem from "./_components/project-list-item";
import ProjectReadmeSheet from "./_components/project-readme-sheet";
import useProjectReadme from "./_components/use-project-readme";

const ProjectsPage = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { readmeContent, isReadmeLoading, readmeError, resetReadmeState } =
    useProjectReadme(activeProject);

  const allTechnologies = Array.from(
    new Set(projectData.flatMap((project) => project.technologies)),
  ).sort();

  const filteredProjects = projectData.filter((project) => {
    const matchesTech =
      selectedTech === null || project.technologies.includes(selectedTech);
    return matchesTech;
  });

  const onCloseProjectSheet = (open: boolean) => {
    if (!open) {
      setActiveProject(null);
      resetReadmeState();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="w-full flex justify-center items-center py-10">
        <div className="w-full max-w-7xl px-5 md:px-8 lg:px-10 space-y-8 md:space-y-10">
          <div className="flex flex-col items-center text-center gap-3 md:gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
              <Sparkles className="h-3 w-3" />
              <span>All Projects</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-semibold">
              Ideas <span className="text-[#9b4819]">in Flight</span>
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-gray-600">
              Explore my work across web development, AI, and cloud.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center justify-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedTech === null
                    ? "bg-[#9b4819] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {allTechnologies.slice(0, 10).map((tech) => (
                <button
                  key={tech}
                  onClick={() =>
                    setSelectedTech(selectedTech === tech ? null : tech)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedTech === tech
                      ? "bg-[#9b4819] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  onOpen={setActiveProject}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4">
              <p className="text-gray-500 text-lg">No projects found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          <div className="w-full pt-10 lg:pt-20 md:pt-20">
            <div className="h-[0.5px] bg-[#BDBDBD] w-full" />
          </div>
        </div>
      </section>

      <ProjectReadmeSheet
        project={activeProject}
        isReadmeLoading={isReadmeLoading}
        readmeError={readmeError}
        readmeContent={readmeContent}
        onOpenChange={onCloseProjectSheet}
      />
    </div>
  );
};

export default ProjectsPage;
