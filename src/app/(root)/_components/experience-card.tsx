import Tags from "@/components/tags";
import { Briefcase } from "lucide-react";
import { Fragment } from "react";
import { Experience } from "@/type";
import experienceData from "@/lib/experience-data.json";

const ExperienceSection = () => {
  const experiences = experienceData as Experience[];

  return (
    <section
      id="experience"
      className=" w-full px-10 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 gap-4 md:gap-20 lg:gap-20 flex flex-col fadeInDown-animation"
    >
      <div className=" flex flex-col justify-center items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
          <Briefcase className="h-3 w-3" />
          <span>Experience</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold">
          My{" "}
          <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
            Experience
          </span>
        </h1>
        <p className="text-muted-foreground mb-12 max-w-2xl text-center">
          A concise overview of my professional journey, showcasing key roles,
          projects, and growth in software engineering
        </p>
      </div>

      {/* Desktop zigzag layout */}
      <div className="hidden w-full lg:grid grid-cols-2 justify-start">
        {experiences.map((exp, index) => {
          const isFirst = index === 0;
          const isLast = index === experiences.length - 1;
          const isEven = index % 2 === 0;
          const num = String(index + 1).padStart(2, "0");

          if (isEven) {
            return (
              <Fragment key={exp.id}>
                <div />
                <div className="w-full flex items-center gap-8">
                  <div className="h-full flex flex-col items-start justify-end relative">
                    {!isFirst && (
                      <div className="mb-[0.25px] h-40 md:h-64 w-[2px] bg-[#707070] absolute -left-[3px] bottom-1/2" />
                    )}
                    {!isLast && (
                      <div className="mt-3 h-48 md:h-64 w-[2px] bg-[#707070] absolute -left-[3px] top-1/2" />
                    )}
                    <div className="rounded-full h-3 w-3 bg-[#707070] absolute -left-2 top-1/2" />
                  </div>
                  <div className="flex flex-col gap-3 py-4">
                    <h1 className="text-2xl font-medium text-[#828282]">
                      {num} - {exp.role}
                    </h1>
                    <p className="text-3xl font-semibold">{exp.company}</p>
                    <p className="text-xl text-muted-foreground">{exp.period}</p>
                    <p className="text-2xl">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Tags key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          }

          return (
            <Fragment key={exp.id}>
              <div className="w-full flex items-center gap-8 justify-end">
                <div className="w-full flex flex-col gap-3 justify-end text-right py-2">
                  <h1 className="text-2xl font-medium text-[#828282]">
                    {num} - {exp.role}
                  </h1>
                  <p className="text-3xl font-semibold">{exp.company}</p>
                  <p className="text-xl text-muted-foreground">{exp.period}</p>
                  <p className="text-2xl">{exp.description}</p>
                  <div className="flex flex-wrap gap-4 justify-end">
                    {exp.tags.map((tag) => (
                      <Tags key={tag} text={tag} />
                    ))}
                  </div>
                </div>
                <div className="h-full flex flex-col items-start justify-end relative">
                  {!isFirst && (
                    <div className="mb-[0.25px] h-40 md:h-64 w-[2px] bg-[#707070] absolute right-[1px] bottom-1/2" />
                  )}
                  {!isLast && (
                    <div className="mt-3 h-40 md:h-56 w-[2px] bg-[#707070] absolute right-[1px] top-1/2" />
                  )}
                  <div className="rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
                </div>
              </div>
              <div />
            </Fragment>
          );
        })}
      </div>

      {/* Mobile stacked layout */}
      <div className="lg:hidden md:px-10 w-full flex flex-col gap-3">
        {experiences.map((exp, index) => {
          const isFirst = index === 0;
          const isLast = index === experiences.length - 1;
          const num = String(index + 1).padStart(2, "0");

          return (
            <div key={exp.id} className="w-full flex items-center gap-4">
              <div className="h-full flex flex-col items-start justify-end relative">
                {!isFirst && (
                  <div className="mt-3 h-40 w-[2px] bg-[#707070] absolute right-[1px] -top-40" />
                )}
                {!isLast && (
                  <div className="mt-3 h-64 w-[2px] bg-[#707070] absolute right-[1px] top-1/2" />
                )}
                <div className="rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
              </div>
              <div className="flex flex-col gap-1 py-4">
                <h1 className="text-lg font-medium text-[#828282]">
                  {num} - {exp.role}
                </h1>
                <p className="text-xl font-semibold">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="text-md">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {exp.tags.map((tag) => (
                    <Tags key={tag} text={tag} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full pt-10 lg:pt-28 md:pt-28">
        <div className="h-[0.5px] bg-[#BDBDBD] w-full" />
      </div>
    </section>
  );
};

export default ExperienceSection;
