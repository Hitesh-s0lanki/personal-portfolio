"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, Rows3, Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ProjectCategory, ProjectCategoryId } from "./project-categories";

export type ViewMode = "grid" | "list";

interface ProjectsToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  categories: ProjectCategory[];
  activeCategory: ProjectCategoryId;
  onCategoryChange: (id: ProjectCategoryId) => void;
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  resultCount: number;
  totalCount: number;
  /** True once the bar has stuck to the top of the viewport. */
  stuck: boolean;
}

/**
 * Search, stack filters and the layout switch. Sticks to the top of the
 * viewport so the controls stay reachable however far down the list you are —
 * the whole point being that you never have to scroll back up to re-filter.
 */
const ProjectsToolbar = ({
  query,
  onQueryChange,
  categories,
  activeCategory,
  onCategoryChange,
  view,
  onViewChange,
  resultCount,
  totalCount,
  stuck,
}: ProjectsToolbarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" jumps to search, Escape leaves it — the shortcut people already expect
  // from every list UI.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape" && target === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isFiltered = activeCategory !== "all" || query.trim().length > 0;

  return (
    <div
      className={cn(
        "sticky top-0 z-30 w-full border-b transition-all duration-300",
        stuck
          ? "border-gray-200/70 bg-white/85 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.5)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 md:px-8 lg:px-10">
        {/* Search + view switch */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search projects, tech, keywords…"
              aria-label="Search projects"
              className="h-10 w-full rounded-full border border-gray-200 bg-white/90 pr-20 pl-10 text-sm text-gray-800 shadow-sm transition-all outline-none placeholder:text-gray-400 hover:border-gray-300 focus:border-[#9b4819]/40 focus:ring-2 focus:ring-[#9b4819]/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  onQueryChange("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] text-gray-400 sm:block">
                /
              </kbd>
            )}
          </div>

          <div className="hidden items-center rounded-full border border-gray-200 bg-white p-0.5 shadow-sm sm:flex">
            {(
              [
                { mode: "grid" as const, Icon: LayoutGrid, label: "Grid view" },
                { mode: "list" as const, Icon: Rows3, label: "List view" },
              ]
            ).map(({ mode, Icon, label }) => (
              <button
                key={mode}
                type="button"
                onClick={() => onViewChange(mode)}
                aria-label={label}
                aria-pressed={view === mode}
                title={label}
                className={cn(
                  "cursor-pointer rounded-full p-2 transition-colors duration-200",
                  view === mode
                    ? "bg-[#9b4819] text-white"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600",
                )}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* Stack filters */}
        <div className="flex items-center gap-2">
          <div className="scrollbar-hide -mx-1 flex flex-1 gap-2 overflow-x-auto px-1 py-0.5 lg:flex-wrap lg:overflow-visible">
            {categories.map((category) => {
              const active = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200",
                    active
                      ? "bg-[#9b4819] text-white shadow-sm shadow-[#9b4819]/30"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-[#9b4819]/40 hover:bg-orange-50/60 hover:text-[#9b4819]",
                  )}
                >
                  {category.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                      active
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500",
                    )}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="hidden shrink-0 text-xs text-gray-400 tabular-nums lg:block"
          >
            {isFiltered ? `${resultCount} of ${totalCount}` : `${totalCount} projects`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsToolbar;
