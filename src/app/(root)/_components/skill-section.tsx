import React from "react";
import {
  Braces,
  Brain,
  Cloud,
  CloudCog,
  Code,
  Cpu,
  Database,
  GitBranch,
  Sparkles,
} from "lucide-react";
import SectionEyebrow from "@/components/section-eyebrow";
import { cn } from "@/lib/utils";
import { skillCategories, type SkillIcon } from "@/lib/skills-data";

const categoryIcons: Record<SkillIcon, React.ReactNode> = {
  ai: <Sparkles className="h-5 w-5" />,
  systems: <Cpu className="h-5 w-5" />,
  languages: <Braces className="h-5 w-5" />,
  frameworks: <Code className="h-5 w-5" />,
  data: <Database className="h-5 w-5" />,
  ml: <Brain className="h-5 w-5" />,
  devops: <GitBranch className="h-5 w-5" />,
  aws: <Cloud className="h-5 w-5" />,
  cloud: <CloudCog className="h-5 w-5" />,
};

const SkillSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full flex justify-center items-center overflow-hidden py-16 md:py-20 lg:py-24 fadeInDown-animation"
    >
      {/* Background gradient + glow now come from the app-wide layer in globals.css */}
      <div className="relative z-10 w-full max-w-6xl px-5 md:px-8 lg:px-10 space-y-8 md:space-y-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <SectionEyebrow>Technical Stack</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Skills that power my{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              end-to-end work
            </span>
          </h2>
          <p className="max-w-xl text-sm md:text-base text-gray-500">
            Go backends, agentic AI, and multi-cloud delivery — tools I actually
            ship with.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
          {skillCategories.map((category) => (
            <article
              key={category.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300",
                "hover:border-orange-300/80 hover:shadow-lg hover:shadow-orange-900/5",
                "motion-safe:hover:-translate-y-1",
                category.featured
                  ? "border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-white"
                  : "border-slate-200/80 bg-white/70 backdrop-blur-sm",
                category.span
              )}
            >
              {/* Card glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(75%_60%_at_100%_0%,rgba(249,115,22,0.10),transparent_70%)]"
              />

              <div className="relative space-y-4">
                {/* Card header */}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 flex-shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                      category.featured
                        ? "border-orange-200 bg-orange-100/70 text-[#9b4819]"
                        : "border-slate-200/80 bg-slate-50 text-[#9b4819] group-hover:border-orange-200 group-hover:bg-orange-50"
                    )}
                  >
                    {categoryIcons[category.icon]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-slate-900">
                      {category.title}
                    </h3>
                    {category.tagline ? (
                      <p className="truncate text-xs text-gray-500">
                        {category.tagline}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">
                        {category.skills.length} tools
                      </p>
                    )}
                  </div>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-[11px] md:text-xs font-medium text-slate-700 transition-colors duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-[#9b4819]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
