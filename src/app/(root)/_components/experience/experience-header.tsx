import SectionEyebrow from "@/components/section-eyebrow";
import { companyCount, experiences } from "./data";

const ExperienceHeader = () => (
  <div className="flex flex-col items-center text-center gap-3">
    <SectionEyebrow>Experience</SectionEyebrow>
    <h2 className="text-3xl md:text-4xl font-semibold">
      The road{" "}
      <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
        so far
      </span>
    </h2>
    <p className="max-w-2xl text-sm md:text-base text-muted-foreground">
      {experiences.length} roles across {companyCount} companies — venture studio
      CRMs to AI agents in production.
    </p>
  </div>
);

export default ExperienceHeader;
