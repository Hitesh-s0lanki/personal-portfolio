"use client";

import { Button } from "@/components/ui/button";
import { projectData } from "@/lib/data";
import { FolderOpen, SearchX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import BackToTop from "./back-to-top";
import ProjectCard from "./project-card";
import {
  buildCategories,
  isInCategory,
  ProjectCategoryId,
  searchHaystack,
} from "./project-categories";
import ProjectListItem from "./project-list-item";
import ProjectsToolbar, { ViewMode } from "./projects-toolbar";
import { trackEvent } from "@/lib/analytics";

/** Featured first, original data order preserved within each group. */
const sortFeaturedFirst = (projects: typeof projectData) =>
  [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

const ProjectsExplorer = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategoryId>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [stuck, setStuck] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => buildCategories(projectData), []);

  // Keep every project in the initial HTML; filters only narrow the directory.
  const index = useMemo(
    () =>
      projectData.map((project) => ({
        project,
        haystack: searchHaystack(project),
      })),
    [],
  );

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    const matched = index
      .filter(
        ({ project, haystack }) =>
          isInCategory(project, category) &&
          terms.every((term) => haystack.includes(term)),
      )
      .map(({ project }) => project);

    return sortFeaturedFirst(matched);
  }, [index, query, category]);

  // Track when the toolbar leaves the flow so it can pick up its glass
  // background only while it is actually pinned.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: "0px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const changeCategory = (next: ProjectCategoryId) => {
    if (next !== category) {
      trackEvent("project_filter_select", { category: next });
    }
    setCategory(next);

    // If the reader is already deep in the list, bring the new results into
    // view instead of leaving them stranded above the fold.
    const top = resultsRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  const isFiltered = category !== "all" || query.trim().length > 0;

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />

      <ProjectsToolbar
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        activeCategory={category}
        onCategoryChange={changeCategory}
        view={view}
        onViewChange={setView}
        resultCount={results.length}
        totalCount={projectData.length}
        stuck={stuck}
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 lg:px-10">
        <div ref={resultsRef} className="scroll-mt-32 pt-6">
          {results.length > 0 ? (
            <>
              {view === "grid" ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((project, position) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={position}
                      priority={position < 3}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {results.map((project, position) => (
                    <div
                      key={project.id}
                      className="project-reveal"
                      style={{
                        animationDelay: `${Math.min(position, 8) * 45}ms`,
                      }}
                    >
                      <ProjectListItem project={project} />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-xs text-gray-400 tabular-nums">
                  Showing {results.length}
                  {isFiltered ? ` matching project${results.length === 1 ? "" : "s"}` : " projects"}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-16 text-center">
              <SearchX size={36} className="text-gray-300" />
              <div className="space-y-1">
                <p className="font-medium text-gray-600">No projects found</p>
                <p className="text-sm text-gray-400">
                  {query ? (
                    <>
                      Nothing matches &ldquo;
                      <span className="text-gray-500">{query}</span>&rdquo;
                      {category !== "all" && " in this stack"}.
                    </>
                  ) : (
                    "Try a different stack."
                  )}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-1 cursor-pointer rounded-full border-gray-300 text-xs hover:border-[#9b4819]/40 hover:text-[#9b4819]"
              >
                <FolderOpen className="mr-1.5 size-3.5" />
                Show all {projectData.length} projects
              </Button>
            </div>
          )}
        </div>
      </div>

      <BackToTop />
    </>
  );
};

export default ProjectsExplorer;
