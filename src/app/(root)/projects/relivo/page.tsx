"use client";

import { Button } from "@/components/ui/button";
import { demoCaseStudyData } from "@/lib/demo.data";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Dot,
  Github,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const RelivoProjectPage = () => {
  const data = demoCaseStudyData;
  const [activeSection, setActiveSection] = useState("overview");
  const navItems = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      ...data.sections.map((section) => ({
        id: section.id,
        label: section.eyebrow,
      })),
      { id: "reflection", label: "Reflection" },
    ],
    [data.sections],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.12, 0.28, 0.44, 0.6],
      },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <main className="min-h-screen bg-[#fbf4e9] text-[#222222]">
      <section className="border-b border-black/10 bg-[#fbfaf7]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 md:px-8 md:py-14 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              asChild
              variant="ghost"
              className="h-9 px-0 text-[#6f4a2d] hover:bg-transparent hover:text-[#9b4819]"
            >
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to projects
              </Link>
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c6b7] bg-white px-3 py-1 text-xs font-medium text-[#6f4a2d]">
              <Sparkles className="h-3.5 w-3.5" />
              {data.category}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                  {data.projectName}
                </p>
                <h1 className="max-w-4xl text-4xl font-medium leading-[1.08] text-[#1c1c1c] sm:text-5xl lg:text-6xl">
                  {data.headline}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[#5f5b55] md:text-lg">
                  {data.summary}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {data.sourceLinks.map((link) => (
                    <Button
                      key={link.href}
                      asChild
                      variant="outline"
                      className="h-9 border-[#d8c6b7] bg-white text-[#3f3c38] hover:border-[#9b4819]/60 hover:text-[#9b4819]"
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-black/10 bg-black/10">
              {data.meta.map((item) => (
                <div key={item.label} className="bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9b4819]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#3f3c38]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <figure className="overflow-hidden rounded-lg border border-black/10 bg-white">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={data.heroImage.src}
                alt={data.heroImage.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            </div>
            {data.heroImage.caption && (
              <figcaption className="border-t border-black/10 px-4 py-3 text-xs text-[#6f6a63]">
                {data.heroImage.caption}
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
              Index
            </p>
            <nav className="space-y-1.5 rounded-lg border border-black/10 bg-white/70 p-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? "true" : undefined}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-all ${
                    activeSection === item.id
                      ? "bg-[#9b4819] font-semibold text-white shadow-sm"
                      : "text-[#68635d] hover:bg-[#fbf4e9] hover:text-[#9b4819]"
                  }`}
                >
                  <Dot
                    className={`h-4 w-4 ${
                      activeSection === item.id ? "scale-125" : ""
                    }`}
                  />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="space-y-16">
          <section id="overview" className="scroll-mt-24">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                  Overview
                </p>
                <h2 className="text-3xl font-medium text-[#1f1f1f] md:text-4xl">
                  {data.overview.title}
                </h2>
                <div className="space-y-4">
                  {data.overview.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-[#5f5b55]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-px self-start overflow-hidden rounded-lg border border-black/10 bg-black/10">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="bg-white p-5">
                    <p className="text-3xl font-semibold text-[#1f1f1f]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#3f3c38]">
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-lg border border-[#dfd4ca] bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                Current Build Scope
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {data.requiredInputs.map((input) => (
                  <div
                    key={input.label}
                    className="flex gap-3 rounded-md bg-[#fbf4e9] p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b4819]" />
                    <div>
                      <p className="text-sm font-semibold text-[#2f2c29]">
                        {input.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#6f6a63]">
                        {input.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {data.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-t border-black/10 pt-12"
            >
              <div className="grid gap-8 lg:grid-cols-[120px_1fr]">
                <p className="text-sm font-semibold text-[#9b4819]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                      {section.eyebrow}
                    </p>
                    <h2 className="max-w-3xl text-3xl font-medium leading-tight text-[#1f1f1f] md:text-4xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-[#5f5b55]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex gap-3 rounded-md border border-black/10 bg-white p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b4819]" />
                          <p className="text-sm leading-6 text-[#4f4a44]">
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.highlights && (
                    <div className="grid gap-4 md:grid-cols-3">
                      {section.highlights.map((highlight) => (
                        <div
                          key={highlight.title}
                          className="rounded-lg border border-black/10 bg-white p-5"
                        >
                          <h3 className="text-base font-semibold text-[#25221f]">
                            {highlight.title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
                            {highlight.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.image && (
                    <figure className="overflow-hidden rounded-lg border border-black/10 bg-white">
                      <div className="relative aspect-[16/9] w-full bg-[#fbf4e9]">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 900px"
                        />
                      </div>
                      {section.image.caption && (
                        <figcaption className="border-t border-black/10 px-4 py-3 text-xs text-[#6f6a63]">
                          {section.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              </div>
            </section>
          ))}

          <section
            id="reflection"
            className="scroll-mt-24 border-t border-black/10 pt-12"
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                Reflection
              </p>
              <h2 className="text-3xl font-medium text-[#1f1f1f] md:text-4xl">
                {data.reflection.title}
              </h2>
              {data.reflection.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-3xl text-base leading-8 text-[#5f5b55]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="border-t border-black/10 pt-12">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9b4819]">
                  View More Projects
                </p>
                <h2 className="mt-2 text-3xl font-medium text-[#1f1f1f]">
                  Related work
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-fit border-[#d8c6b7] bg-white"
              >
                <Link href="/projects">
                  All projects
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {data.relatedProjects.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  className="group overflow-hidden rounded-lg border border-black/10 bg-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 440px"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#25221f]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default RelivoProjectPage;
