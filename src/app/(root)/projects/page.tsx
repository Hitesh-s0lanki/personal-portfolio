"use client";

import { projectData } from "@/lib/data";
import IdeaCard from "../_components/idea-card";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const ProjectsPage = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(projectData.flatMap((project) => project.technologies))
  ).sort();

  // Filter projects based on search and technology
  const filteredProjects = projectData.filter((project) => {
    const matchesTech =
      selectedTech === null || project.technologies.includes(selectedTech);
    return matchesTech;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="w-full flex justify-center items-center py-10">
        <div className="w-full max-w-7xl px-5 md:px-8 lg:px-10 space-y-8 md:space-y-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 md:gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
              <Sparkles className="h-3 w-3" />
              <span>All Projects</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-semibold">
              Ideas <span className="text-[#9b4819]">in Flight</span>
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-gray-600">
              A comprehensive collection of projects showcasing my work across
              web development, AI, cloud infrastructure, and more.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center justify-center">
            {/* Technology Filter */}
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

          {/* Projects Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredProjects.length} of {projectData.length} projects
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {filteredProjects.map((project) => (
                <IdeaCard key={project.id} idea={project} />
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

          {/* Divider */}
          <div className="w-full pt-10 lg:pt-20 md:pt-20">
            <div className="h-[0.5px] bg-[#BDBDBD] w-full" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
