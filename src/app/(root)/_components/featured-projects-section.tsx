"use client";

import { projectData } from "@/lib/data";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  buildCategories,
  isInCategory,
  type ProjectCategoryId,
} from "../projects/_components/project-categories";

const projects = [...projectData].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
);
const categories = buildCategories(projects).filter(({ id }) => id !== "all");
const categoryProjects = new Map(
  categories.map(({ id }) => [id, projects.filter((project) => isInCategory(project, id))]),
);
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b4819]";

const FeaturedProjectsSection = () => {
  const [category, setCategory] = useState<ProjectCategoryId>("ai");
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollEdges, setScrollEdges] = useState({ start: true, end: false });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wheelGesture = useRef({ delta: 0, lastEvent: 0, lockedUntil: 0 });
  const matchingProjects = categoryProjects.get(category) ?? [];
  const selectedIndex = categories.findIndex((item) => item.id === category);
  const selectedCategory = categories[selectedIndex];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateLayout = () => setIsDesktop(media.matches);
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const updateEdges = () => {
      const start = scroller.scrollLeft <= 1;
      const end = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1;
      setScrollEdges((previous) => previous.start === start && previous.end === end
        ? previous
        : { start, end });
    };
    const observer = new ResizeObserver(updateEdges);
    observer.observe(scroller);
    scroller.addEventListener("scroll", updateEdges, { passive: true });
    updateEdges();
    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", updateEdges);
    };
  }, [category]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
      // Trackpad swipes and Shift+wheel keep browsing the project columns.
      if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const bounds = section.getBoundingClientRect();
      if (bounds.top > window.innerHeight * 0.25 || bounds.bottom < window.innerHeight * 0.75) return;

      const direction = Math.sign(event.deltaY);
      const scroller = scrollRef.current;
      // On short screens, let readers reach both card rows before changing type.
      if (scroller?.contains(event.target as Node)) {
        const canScrollVertically = direction > 0
          ? scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1
          : scroller.scrollTop > 1;
        if (canScrollVertically) return;
      }

      const now = performance.now();
      const gesture = wheelGesture.current;
      if (now < gesture.lockedUntil) {
        event.preventDefault();
        return;
      }

      const nextIndex = selectedIndex + direction;
      // Release the page naturally at either end of the category list.
      if (nextIndex < 0 || nextIndex >= categories.length) {
        gesture.delta = 0;
        return;
      }

      event.preventDefault();
      if (now - gesture.lastEvent > 200 || Math.sign(gesture.delta) !== direction) gesture.delta = 0;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      gesture.delta += event.deltaY * unit;
      gesture.lastEvent = now;
      if (Math.abs(gesture.delta) < 60) return;

      gesture.delta = 0;
      gesture.lockedUntil = now + 550;
      section.scrollIntoView({ block: "start", behavior: "instant" });
      setCategory(categories[nextIndex].id);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [selectedIndex]);

  const scrollProjects = (direction: number) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const card = scroller.querySelector("article");
    const distance = card ? card.getBoundingClientRect().width + 12 : scroller.clientWidth;
    scroller.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="featured-work-heading"
      className="relative isolate h-screen h-[100svh] w-full overflow-hidden text-[#1c1c1c]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_30%,rgba(155,72,25,0.035),transparent_55%)]" />
      <Tabs.Root
        value={category}
        onValueChange={(value) => setCategory(value as ProjectCategoryId)}
        orientation={isDesktop ? "vertical" : "horizontal"}
        className="mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] px-5 py-4 [--work-gutter:1.25rem] md:px-8 md:py-8 md:[--work-gutter:2rem] lg:grid-cols-[0.32fr_0.68fr] lg:grid-rows-1 lg:px-10 lg:py-10 lg:[--work-gutter:2.5rem]"
      >
        <div className="min-h-0 min-w-0 border-b border-[#e9e2d9] pb-4 lg:flex lg:flex-col lg:justify-center lg:overflow-y-auto lg:border-e lg:border-b-0 lg:pe-7 lg:pb-0">
          <p className="flex items-center gap-2.5 text-[10px] font-medium tracking-[0.24em] text-[#9b4819] uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-[#9b4819]/50" />
            Featured work
          </p>
          <h2
            id="featured-work-heading"
            className="mt-2 max-w-sm text-2xl leading-[1.12] font-medium tracking-[-0.045em] text-balance sm:text-3xl lg:mt-6 lg:text-[clamp(2rem,3.2vw,2.75rem)]"
          >
            Things I&apos;ve designed &amp; built.
          </h2>
          <p className="mt-4 hidden max-w-xs text-xs leading-6 text-[#746b61] lg:block">
            A curated selection of products spanning scalable systems,
            cloud-native architecture, and AI-driven interfaces.
          </p>

          <Tabs.List
            aria-label="Project type"
            className="mt-3 flex max-w-full gap-1.5 overflow-x-auto overscroll-x-contain p-1 [scrollbar-color:#cbb9a6_transparent] [scrollbar-width:thin] lg:mt-7 lg:flex-col lg:gap-1 lg:overflow-visible lg:p-0"
          >
            {categories.map((item, index) => (
              <Tabs.Trigger
                key={item.id}
                value={item.id}
                className={`group relative inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-transparent px-2.5 py-1.5 text-start text-xs whitespace-nowrap text-[#746b61] transition-[color,background-color,border-color] duration-150 hover:bg-[#f5f0e9] hover:text-[#9b4819] data-[state=active]:border-[#9b4819]/10 data-[state=active]:bg-[#f5ece2] data-[state=active]:text-[#9b4819] lg:min-h-10 lg:w-full lg:gap-3 lg:px-3 lg:py-2 ${focusRing}`}
              >
                <span className="hidden text-[10px] tabular-nums text-[#8d8175] group-data-[state=active]:text-[#9b4819] lg:inline">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
                <span className="ms-auto hidden rounded-md px-1.5 py-0.5 text-[10px] text-[#8d8175] tabular-nums group-data-[state=active]:bg-white/80 group-data-[state=active]:text-[#9b4819] lg:block">
                  {item.count}
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Link
            href="/projects"
            className={`mt-6 hidden min-h-9 w-fit items-center gap-3 rounded-full border border-[#e5dfd6] bg-white/60 px-4 text-xs text-[#686057] transition-colors hover:border-[#9b4819]/30 hover:text-[#9b4819] lg:inline-flex ${focusRing}`}
          >
            All projects
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <Tabs.Content
          key={category}
          value={category}
          className={`flex min-h-0 min-w-0 flex-col pt-3 lg:justify-center lg:ps-5 lg:pt-0 ${focusRing}`}
        >
          <div className="shrink-0">
            <p className="hidden text-[10px] tracking-[0.16em] text-[#8d8175] tabular-nums lg:block">
              {String(selectedIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            </p>
            <div className="flex items-center justify-between gap-3 border-b border-[#e9e2d9] pb-3 lg:mt-3">
              <h3 className="text-xl leading-tight font-medium tracking-[-0.035em] sm:text-2xl lg:text-3xl">
                {selectedCategory.label}
              </h3>
              <p className="shrink-0 rounded-full border border-[#e9e2d9] bg-white/70 px-2.5 py-1 text-[10px] text-[#746b61] tabular-nums">
                {matchingProjects.length} projects
              </p>
            </div>
          </div>

          <div
            key={`${category}-cards`}
            ref={scrollRef}
            id="featured-work-cards"
            role="region"
            aria-label={`${selectedCategory.label} projects, scroll horizontally`}
            tabIndex={0}
            style={{ marginInlineEnd: "calc(-1 * max(var(--work-gutter), (100vw - 72rem) / 2 + var(--work-gutter)))" }}
            className={`mt-3 grid max-h-[620px] min-h-0 flex-1 auto-cols-[min(85%,280px)] grid-flow-col grid-rows-[repeat(2,minmax(300px,1fr))] snap-x snap-mandatory gap-3 overflow-auto overscroll-x-contain overscroll-y-auto rounded-s-2xl p-1 pe-0 pb-2 [scrollbar-color:#cbb9a6_transparent] [scrollbar-width:thin] sm:auto-cols-[280px] lg:auto-cols-[260px] lg:grid-rows-[repeat(2,minmax(260px,1fr))] ${focusRing}`}
          >
            {matchingProjects.map((project) => (
              <article
                key={project.id}
                className="group relative flex h-full min-h-0 min-w-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#e7e1d9] bg-white shadow-[0_2px_4px_rgba(60,40,20,0.025)] transition-[border-color,box-shadow] duration-150 hover:border-[#9b4819]/30 hover:shadow-[0_3px_12px_rgba(60,40,20,0.08)] focus-within:border-[#9b4819]/40"
              >
                <div className="relative mx-2 mt-2 min-h-16 flex-1 overflow-hidden rounded-lg bg-[#f4f1ed] outline-1 -outline-offset-1 outline-black/10">
                  <Image
                    src={project.cover ?? project.image}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 380px) 80vw, (max-width: 1023px) 280px, 260px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none"
                  />
                  {project.ribbon && (
                    <span className="absolute start-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/95 px-2 py-0.5 text-[9px] font-medium text-[#9b4819] shadow-sm">
                      <span aria-hidden="true" className="size-1 rounded-full bg-[#9b4819]/70" />
                      {project.ribbon}
                    </span>
                  )}
                </div>
                <div className="shrink-0 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm leading-5 font-semibold tracking-tight">
                      <Link
                        href={`/projects/${project.id}`}
                        className="after:absolute after:inset-0 after:rounded-2xl hover:text-[#9b4819] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[#9b4819]"
                      >
                        {project.name}
                      </Link>
                    </h4>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f7f2ec] text-[#9b4819] transition-colors duration-150 group-hover:bg-[#f0e2d2]">
                      <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-[1.6] text-[#746b61] lg:text-[11px]">{project.tagline}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-md border border-[#eee9e2] bg-[#faf8f5] px-1.5 py-0.5 text-[10px] leading-4 text-[#746b61] lg:text-[9px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.github || project.demo) && (
                    <div className="mt-2 flex flex-wrap gap-x-5 border-t border-[#eee9e2] pt-1 text-xs text-[#746b61] lg:text-[11px]">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} source code (opens in a new tab)`}
                          className={`relative z-10 inline-flex min-h-11 items-center gap-1.5 rounded-sm hover:text-[#9b4819] lg:min-h-9 ${focusRing}`}
                        >
                          <Github aria-hidden="true" className="size-3" />
                          Source code
                        </a>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target={project.demo.startsWith("/") ? undefined : "_blank"}
                          rel={project.demo.startsWith("/") ? undefined : "noopener noreferrer"}
                          aria-label={`${project.name} ${project.demo.startsWith("/") ? "case study" : "live demo (opens in a new tab)"}`}
                          className={`relative z-10 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-[#9b4819] hover:text-[#713512] lg:min-h-9 ${focusRing}`}
                        >
                          {project.demo.startsWith("/") ? "Case study" : "Live demo"}
                          <ArrowUpRight aria-hidden="true" className="size-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-2 flex shrink-0 items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)] lg:mt-3 lg:pb-0">
            <Link href="/projects" className={`inline-flex min-h-11 items-center gap-2 rounded-sm text-xs text-[#746b61] hover:text-[#9b4819] lg:hidden ${focusRing}`}>
              All projects <ArrowUpRight aria-hidden="true" className="size-3" />
            </Link>
            <span className="hidden items-center gap-2 text-[10px] text-[#8d8175] lg:inline-flex">
              <span aria-hidden="true" className="h-px w-5 bg-[#cbb9a6]" />
              Scroll to switch · swipe to explore
            </span>
            <div className="ms-auto flex gap-2">
              {([-1, 1] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  aria-label={direction === -1 ? "Previous project" : "Next project"}
                  aria-controls="featured-work-cards"
                  disabled={direction === -1 ? scrollEdges.start : scrollEdges.end}
                  onClick={() => scrollProjects(direction)}
                  className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#ded8d0] bg-white text-[#686057] shadow-sm transition-[color,background-color,border-color,transform] duration-150 hover:border-[#9b4819]/30 hover:bg-[#f5ece2] hover:text-[#9b4819] active:scale-[0.96] disabled:cursor-default disabled:opacity-35 disabled:shadow-none motion-reduce:transform-none lg:size-9 ${focusRing}`}
                >
                  {direction === -1 ? <ArrowLeft aria-hidden="true" className="size-4" /> : <ArrowRight aria-hidden="true" className="size-4" />}
                </button>
              ))}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
};

export default FeaturedProjectsSection;
