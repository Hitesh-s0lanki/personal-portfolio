"use client";

import React, { useState } from "react";
import { Code, Server, Cloud, Github, Sparkles } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  description: string;
}

const SkillSection: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frameworks",
      icon: <Code className="h-5 w-5" />,
      skills: [
        "React",
        "Next.js",
        "Spring",
        "Spring Boot",
        "FastApi",
        "Flask",
        "Flutter",
        "Android",
      ],
      description:
        "Building fast, responsive, and production-ready applications across web and mobile using modern frameworks and UI stacks.",
    },
    {
      title: "Backend & Tools",
      icon: <Server className="h-5 w-5" />,
      skills: [
        "Redis",
        "Kafka",
        "GraphQL",
        "Microservices",
        "System Design",
        "Node.js",
        "Nest.js",
        "Web Scraping",
      ],
      description:
        "Designing scalable, event-driven backends with strong fundamentals in system design, microservices, and distributed systems.",
    },
    {
      title: "AI & Tools",
      icon: <Sparkles className="h-5 w-5" />,
      skills: [
        "Agentic AI",
        "langchain",
        "langGraph",
        "Machine Learning",
        "Deep Learning",
        "Hugging Face",
        "AI Workflow",
        "NER",
      ],
      description:
        "Leveraging AI to build agentic workflows, intelligent automation, and ML-powered features that ship to real users.",
    },
    {
      title: "DevOps & Tools",
      icon: <Github className="h-5 w-5" />,
      skills: [
        "GitHub",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "GitHub Actions",
        "Terraform",
        "Jenkins",
        "Ansible",
      ],
      description:
        "Owning the full delivery pipeline from code to cloud using containers, orchestration, and infrastructure as code.",
    },
    {
      title: "Cloud",
      icon: <Cloud className="h-5 w-5" />,
      skills: [
        "AWS EC2",
        "AWS S3",
        "AWS Lambda",
        "AWS EKS",
        "AWS ECS",
        "CloudWatch",
        "Load Balancing",
        "Cloud Security",
      ],
      description:
        "Architecting cloud-native workloads with a focus on reliability, observability, and secure, scalable infrastructure.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = skillCategories[activeIndex];

  return (
    <section
      id="skills"
      className="w-full flex justify-center items-center py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white fadeInDown-animation"
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-5 md:px-8 lg:px-10 space-y-8 md:space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <span>Technical Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
            Skills that power my{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              end-to-end work
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            From frontend to backend, AI, and DevOps – I work across the stack
            to ship reliable, scalable, and intelligent systems.
          </p>
        </div>

        {/* Main layout: Sidebar + Detail panel */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <aside className="hidden md:block w-72 lg:w-80 flex-shrink-0">
            <div className="rounded-2xl border border-slate-200/80 bg-card/80 backdrop-blur-sm shadow-sm p-2.5 space-y-1">
              {skillCategories.map((category, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all",
                      "hover:bg-primary/5 hover:border-primary/20 border border-transparent",
                      isActive
                        ? "bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50"
                        : "bg-transparent",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex size-9 items-center justify-center rounded-lg flex-shrink-0",
                        isActive
                          ? "bg-primary/20 text-[#9b4819]"
                          : "bg-primary/10 text-primary",
                      ].join(" ")}
                    >
                      {category.icon}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={[
                          "text-sm font-semibold truncate",
                          isActive ? "text-foreground" : "text-slate-700",
                        ].join(" ")}
                      >
                        {category.title}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-2">
                        {category.description.slice(0, 30)}...
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Unified Panel - Mobile: includes category selector, Desktop: detail panel only */}
          <div className="flex-1 min-w-0">
            <div className="h-full rounded-xl md:rounded-2xl border border-slate-200/80 bg-card/90 backdrop-blur-sm shadow-sm p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-5">
              {/* Mobile Category Selector - Only visible on mobile */}
              <div className="md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                  {skillCategories.map((category, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={category.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={[
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                          isActive
                            ? "bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 text-[#9b4819]"
                            : "bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-primary/5 hover:border-primary/20",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "flex size-6 items-center justify-center rounded",
                            isActive
                              ? "bg-primary/20 text-[#9b4819]"
                              : "bg-primary/10 text-primary",
                          ].join(" ")}
                        >
                          {category.icon}
                        </div>
                        <span>{category.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 md:space-y-2 flex-1 min-w-0">
                  {/* <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2">
                    <span className="md:hidden flex-shrink-0">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {activeCategory.icon}
                      </div>
                    </span>
                    <span className="truncate">{activeCategory.title}</span>
                  </h3> */}
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {activeCategory.description}
                  </p>
                </div>
                <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                  {activeCategory.icon}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

              {/* Skill tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2.5">
                {activeCategory.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center justify-center px-2.5 md:px-3 py-1.5 rounded-full text-xs md:text-sm bg-slate-50 text-slate-800 border border-slate-200/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all text-center"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Small note */}
              <p className="mt-1 md:mt-2 text-[10px] sm:text-[11px] md:text-xs text-muted-foreground">
                These represent the tools and concepts I actively use in
                real-world projects, not just tutorial-level exposure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
