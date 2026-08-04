"use client";

import { Button } from "@/components/ui/button";
import { projectData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FolderOpen, Plus, SearchX } from "lucide-react";
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

/** How many projects are rendered before the reader asks for more. */
const PAGE_SIZE = 12;

/** Featured first, original data order preserved within each group. */
const sortFeaturedFirst = (projects: typeof projectData) =>
  [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

const ProjectsExplorer = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategoryId>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [stuck, setStuck] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => buildCategories(projectData), []);

  // Search index built once — 41 projects, but rebuilding the haystack on every
  // keystroke is still needless work.
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

  // A new filter means a new list — start it from the top again.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, category]);

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

  const shown = results.slice(0, visible);
  const remaining = results.length - shown.length;
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
                  {shown.map((project, position) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={position % PAGE_SIZE}
                      priority={position < 3}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {shown.map((project, position) => (
                    <div
                      key={project.id}
                      className="project-reveal"
                      style={{
                        animationDelay: `${Math.min(position % PAGE_SIZE, 8) * 45}ms`,
                      }}
                    >
                      <ProjectListItem project={project} />
                    </div>
                  ))}
                </div>
              )}

              {/* Paged on purpose: an explicit control beats an infinite scroll
                  that keeps the footer out of reach. */}
              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-xs text-gray-400 tabular-nums">
                  Showing {shown.length} of {results.length}
                  {isFiltered ? ` matching project${results.length === 1 ? "" : "s"}` : " projects"}
                </p>

                {remaining > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setVisible((count) => count + PAGE_SIZE)}
                    className="cursor-pointer rounded-full border-gray-300 px-6 text-sm transition-colors hover:border-[#9b4819]/40 hover:bg-orange-50/60 hover:text-[#9b4819]"
                  >
                    <Plus className="mr-1.5 size-4" />
                    Show {Math.min(remaining, PAGE_SIZE)} more
                  </Button>
                )}

                <div
                  className={cn(
                    "h-1 w-40 overflow-hidden rounded-full bg-gray-100",
                    results.length <= PAGE_SIZE && "invisible",
                  )}
                >
                  <div
                    className="h-full rounded-full bg-[#9b4819]/60 transition-[width] duration-500"
                    style={{
                      width: `${Math.round((shown.length / results.length) * 100)}%`,
                    }}
                  />
                </div>
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
