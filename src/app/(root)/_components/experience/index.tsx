"use client";

import { useState } from "react";
import { experiences } from "./data";
import ExperienceHeader from "./experience-header";
import TimelineRail from "./timeline-rail";
import MilestoneScroller from "./milestone-scroller";
import ExperienceDetail from "./experience-detail";

const ExperienceSection = () => {
  // Opens on the current role.
  const [activeIndex, setActiveIndex] = useState(experiences.length - 1);
  const active = experiences[activeIndex];

  return (
    <section
      id="experience"
      className="relative w-full flex justify-center py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white fadeInDown-animation"
    >
      {/* Soft warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
      >
        <div className="absolute -top-10 left-1/4 h-56 w-56 rounded-full bg-orange-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-orange-50 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-8 lg:px-10 flex flex-col gap-8 md:gap-10">
        <ExperienceHeader />

        <TimelineRail activeIndex={activeIndex} onSelect={setActiveIndex} />
        <MilestoneScroller
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <ExperienceDetail key={active.id} experience={active} />

        <div className="w-full pt-6 lg:pt-12">
          <div className="h-[0.5px] w-full bg-[#BDBDBD]" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
