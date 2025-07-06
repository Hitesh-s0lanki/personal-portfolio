import Tags from "@/components/tags";

const ExperienceSeciton = () => {
  return (
    <section
      id="experience"
      className=" w-full px-10 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 gap-4 md:gap-20 lg:gap-20 flex flex-col fadeInDown-animation">
      <div className=" flex flex-col justify-center items-center gap-2">
        <h1 className=" font-semibold w-full text-3xl md:text-4xl lg:text-4xl text-center flex justify-center items-center ">
          My Experience
        </h1>
        <p className="text-muted-foreground mb-12 max-w-2xl text-center">
          A concise overview of my professional journey, showcasing key roles,
          projects, and growth in software engineering
        </p>
      </div>

      <div className="hidden w-full lg:grid grid-cols-2 justify-start">
        <div />
        <div className="w-full flex items-center gap-8">
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className=" mt-3 h-48 md:h-64 w-[2px] bg-[#707070] absolute -left-[3px] top-1/2"></div>
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -left-2 top-1/2" />
          </div>
          {/* <Image src="/images/idea-validation.svg" alt="idea-validation" height={100} width={100} /> */}
          <div className=" flex flex-col gap-3 py-4">
            <h1 className="text-2xl font-medium text-[#828282]">
              01 - Software Engineer Intern
            </h1>
            <p className=" text-3xl font-semibold">26ideas</p>
            <p className=" text-xl text-muted-foreground">
              Apr 2024 - Aug 2024
            </p>
            <p className=" text-2xl">
              26ideas is a full-stack venture studio that builds, incubates, and
              invests in early-stage startups.Built foundational components of
              CRM tools, including roles management, product categories,
              subcategories, users, projects, and task management.
            </p>
            <div className=" flex flex-wrap gap-2">
              {[
                "Market Research",
                "Concept Validation",
                "ChatGPT",
                "Automation",
                "CRM",
                "Python",
                "Typescript",
                "Nextjs",
              ].map((e) => (
                <Tags key={e} text={e} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-8 justify-end">
          <div className=" w-full flex flex-col gap-3 justify-end text-right py-2">
            <h1 className="text-2xl font-medium text-[#828282]">
              02 - Engineering Lead
            </h1>
            <p className=" text-3xl font-semibold">26ideas</p>
            <p className=" text-xl text-muted-foreground">
              Aug 2024 - Apr 2025
            </p>
            <p className=" text-2xl">
              Developed an internal business CRM (crm.26ideas.com) from scratch
              using Next.js, NestJS, Prisma, PostgreSQL, and OpenAI for AI
              utilities.
            </p>
            <div className=" flex flex-wrap gap-4 justify-end">
              {["Product", "Engineering", "Developement"].map((e) => (
                <Tags key={e} text={e} />
              ))}
            </div>
          </div>
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className=" mb-[0.25px] h-40 md:h-64 w-[2px] bg-[#707070] absolute right-[1px] bottom-1/2"></div>
            <div className=" mt-3 h-40 md:h-56 w-[2px] bg-[#707070] absolute right-[1px] top-1/2"></div>
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
          </div>
        </div>
        <div />
        <div />
        <div className="w-full flex items-center gap-8">
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className="mb-[0.25px] h-40 md:h-64 w-[2px] bg-[#707070] absolute -left-[3px] bottom-1/2"></div>
            <div className=" mt-3 h-40 md:h-56  w-[2px] bg-[#707070] absolute -left-[3px] top-1/2"></div>
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -left-2 top-1/2" />
          </div>
          <div className=" flex flex-col gap-3 py-2">
            <h1 className="text-2xl font-medium text-[#828282]">
              03 - Builder
            </h1>
            <p className=" text-3xl font-semibold">JustWalkIndia</p>
            <p className=" text-xl text-muted-foreground">
              Nov 2024 - Apr 2025
            </p>
            <p className=" text-2xl">
              JustWalkIndia is a venture by 26ideas Led external integrations,
              including WhatsApp and SMS services partners, and Zerobounce for
              email validation.
            </p>
            <div className=" flex gap-2">
              {["Tech", "Sports", "External", "Operations"].map((e) => (
                <Tags key={e} text={e} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-8 justify-end">
          <div className=" w-full flex flex-col gap-3 justify-end text-right py-2">
            <h1 className="text-2xl font-medium text-[#828282]">
              04 - Software Engineer
            </h1>
            <p className=" text-3xl font-semibold">Strique AI</p>
            <p className=" text-xl text-muted-foreground">
              June 2025 - Present
            </p>
            <p className=" text-2xl">
              Monitor campaigns, manage catalog, and automate reporting—all from
              one dashboard developed exclusively for e-commerce brands and
              agencies focused on ROAS.
            </p>
            <div className=" flex flex-wrap gap-4 justify-end">
              {["Product", "Java", "Spring Boot", "Protobuf", "Nextjs"].map(
                (e) => (
                  <Tags key={e} text={e} />
                )
              )}
            </div>
          </div>
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className=" mb-[0.25px] h-40 md:h-64 w-[2px] bg-[#707070] absolute right-[1px] bottom-1/2"></div>
            <div className=" mt-3 h-40 md:h-56 w-[2px] bg-[#707070] absolute right-[1px] top-1/2"></div>
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden md:px-10 w-full flex flex-col gap-3">
        <div className="w-full flex items-center gap-4">
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className=" mt-3 h-64 w-[2px] bg-[#707070] absolute -left-[3px] top-1/2"></div>
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -left-2 top-1/2" />
          </div>
          <div className=" flex flex-col gap-1 py-4">
            <h1 className="text-lg font-medium text-[#828282]">
              01 - Software Engineer Intern
            </h1>
            <p className=" text-xl font-semibold">26ideas</p>
            <p className=" text-sm text-muted-foreground">
              Apr 2024 - Aug 2024
            </p>
            <p className=" text-md">
              26ideas is a full-stack venture studio that builds, incubates, and
              invests in early-stage startups.Built foundational components of
              CRM tools, including roles management, product categories,
              subcategories, users, projects, and task management.
            </p>
            <div className=" flex flex-wrap gap-2 mt-1">
              {[
                "Market Research",
                "Concept Validation",
                "ChatGPT",
                "Automation",
                "CRM",
                "Python",
                "Typescript",
                "Nextjs",
              ].map((e) => (
                <Tags key={e} text={e} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className=" mt-3 h-40 w-[2px] bg-[#707070] absolute right-[1px] -top-40"></div>
            <div className=" mt-3 h-64 w-[2px] bg-[#707070] absolute right-[1px] top-1/2"></div>
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
          </div>
          <div className=" flex flex-col gap-1 py-4">
            <h1 className="text-lg font-medium text-[#828282]">
              02 - Engineering Lead
            </h1>
            <p className=" text-xl font-semibold">26ideas</p>
            <p className=" text-sm text-muted-foreground">
              Aug 2024 - Mar 2025
            </p>
            <p className=" text-md">
              Developed an internal business CRM (crm.26ideas.com) from scratch
              using Next.js, NestJS, Prisma, PostgreSQL, and OpenAI for AI
              utilities.
            </p>
            <div className=" flex flex-wrap gap-2 mt-1">
              {["Product", "Engineering", "Developement"].map((e) => (
                <Tags key={e} text={e} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className=" mt-3 h-40 w-[2px] bg-[#707070] absolute right-[1px] -top-40"></div>
            <div className=" h-64 w-[2px] bg-[#707070] absolute right-[1px] top-1/2"></div>
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
          </div>

          <div className=" flex flex-col gap-1 py-2">
            <h1 className="text-lg font-medium text-[#828282]">03 - Builder</h1>
            <p className=" text-xl font-semibold">JustWalkIndia</p>
            <p className=" text-sm text-muted-foreground">
              Nov 2024 - Mar 2025
            </p>
            <p className=" text-md">
              JustWalkIndia is a venture by 26ideas Led external integrations,
              including WhatsApp and SMS services partners, and Zerobounce for
              email validation.
            </p>
            <div className=" flex flex-wrap gap-2 mt-1">
              {["Tech", "External", "Operations"].map((e) => (
                <Tags key={e} text={e} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className=" h-full flex flex-col items-start justify-end relative">
            <div className=" mt-3 h-40 w-[2px] bg-[#707070] absolute right-[1px] -top-40"></div>
            {/* <div className=" h-64 w-[2px] bg-[#707070] absolute right-[1px] top-1/2"></div> */}
            <div className=" rounded-full h-3 w-3 bg-[#707070] absolute -right-1 top-1/2" />
          </div>

          <div className=" flex flex-col gap-1 py-2">
            <h1 className="text-lg font-medium text-[#828282]">
              04 - Software Engineer
            </h1>
            <p className=" text-xl font-semibold">Strique AI</p>
            <p className=" text-sm text-muted-foreground">Jun 2025 - Present</p>
            <p className=" text-md">
              Monitor campaigns, manage catalog, and automate reporting—all from
              one dashboard developed exclusively for e-commerce brands and
              agencies focused on ROAS.
            </p>
            <div className=" flex flex-wrap gap-2 mt-1">
              {["Product", "Java", "Spring Boot", "Protobuf", "Nextjs"].map(
                (e) => (
                  <Tags key={e} text={e} />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  pt-10 lg:pt-28 md:pt-28">
        <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
      </div>
    </section>
  );
};

export default ExperienceSeciton;
