"use client";

import { projectData } from "@/lib/data";
import { Project } from "@/type";
import { FolderOpen, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import ProjectListItem from "./_components/project-list-item";
import ProjectReadmeSheet from "./_components/project-readme-sheet";
import useProjectReadme from "./_components/use-project-readme";

const ProjectsPage = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { readmeContent, isReadmeLoading, readmeError, resetReadmeState } =
    useProjectReadme(activeProject);

  const allTechnologies = useMemo(
    () =>
      Array.from(
        new Set(projectData.flatMap((project) => project.technologies)),
      ).sort(),
    [],
  );

  const filteredProjects = projectData.filter(
    (project) =>
      selectedTech === null || project.technologies.includes(selectedTech),
  );

  const onCloseProjectSheet = (open: boolean) => {
    if (!open) {
      setActiveProject(null);
      resetReadmeState();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50/80 to-white">
      <section className="w-full flex justify-center items-center py-12">
        <div className="w-full max-w-5xl px-5 md:px-8 lg:px-10 space-y-10">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
              <Sparkles className="h-3 w-3" />
              <span>All Projects</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Ideas <span className="text-[#9b4819]">in Flight</span>
            </h1>
            <p className="max-w-xl text-sm md:text-base text-gray-500">
              Explore my work across web development, AI, and cloud.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <FolderOpen size={13} />
              <span>
                {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""}
                {selectedTech && (
                  <span className="text-[#9b4819]"> in &ldquo;{selectedTech}&rdquo;</span>
                )}
              </span>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTech(null)}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedTech === null
                  ? "bg-[#9b4819] text-white shadow-sm shadow-[#9b4819]/30"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-[#9b4819]/40 hover:bg-orange-50/50 hover:text-[#9b4819]"
              }`}
            >
              All
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  selectedTech === null
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {projectData.length}
              </span>
            </button>

            {allTechnologies.slice(0, 14).map((tech) => (
              <button
                key={tech}
                onClick={() =>
                  setSelectedTech(selectedTech === tech ? null : tech)
                }
                className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  selectedTech === tech
                    ? "bg-[#9b4819] text-white shadow-sm shadow-[#9b4819]/30"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-[#9b4819]/40 hover:bg-orange-50/50 hover:text-[#9b4819]"
                }`}
              >
                {tech}
                {selectedTech === tech && (
                  <X size={10} className="ml-0.5 opacity-70" />
                )}
              </button>
            ))}
          </div>

          {/* Projects list */}
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
            <div className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
              <FolderOpen size={40} className="text-gray-300" />
              <p className="font-medium text-gray-500">No projects found</p>
              <button
                onClick={() => setSelectedTech(null)}
                className="cursor-pointer text-xs text-[#9b4819] hover:underline"
              >
                Clear filter
              </button>
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
