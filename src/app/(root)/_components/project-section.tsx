"use client";

import { projectData } from "@/lib/data";
import IdeaCard from "./idea-card";

const ProjectSection = () => {
  return (
    <section
      id="projects"
      className=" px-5 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
      <h1 className=" text-3xl pl-1  md:text-5xl lg:text-5xl text-center md:text-center lg:text-center font-semibold ">
        Ideas <span className="text-[#9b4819]">in Flight</span>
      </h1>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((idea) => (
          <IdeaCard key={idea.name} idea={idea} />
        ))}
      </div>
      <div className="w-full  pt-10 lg:pt-28 md:pt-28">
        <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
      </div>
    </section>
  );
};

export default ProjectSection;
