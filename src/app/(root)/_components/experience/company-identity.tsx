import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarRange,
  MapPin,
} from "lucide-react";
import { Experience } from "@/type";
import { hostnameOf } from "./data";
import LogoTile from "./logo-tile";

type Props = {
  experience: Experience;
};

/** Left column of the detail panel: who, where, when. */
const CompanyIdentity = ({ experience }: Props) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <LogoTile
        src={experience.logo}
        company={experience.company}
        sizes="48px"
        priority
        className="size-12 rounded-xl border-slate-200/80 p-1.5 shadow-sm"
        imageClassName="p-1"
      />
      <div className="min-w-0">
        <h3 className="truncate text-xl font-semibold">{experience.role}</h3>
        <p className="truncate text-sm font-medium text-[#9b4819]">
          {experience.company}
        </p>
      </div>
    </div>

    <p className="text-sm leading-relaxed text-muted-foreground">
      {experience.companyTagline}
    </p>

    <dl className="flex flex-col gap-2 border-t border-slate-200/80 pt-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2.5">
        <CalendarRange className="h-4 w-4 shrink-0 text-[#9b4819]" />
        <dt className="sr-only">Period</dt>
        <dd>{experience.period}</dd>
      </div>
      <div className="flex items-center gap-2.5">
        <MapPin className="h-4 w-4 shrink-0 text-[#9b4819]" />
        <dt className="sr-only">Location</dt>
        <dd>{experience.location}</dd>
      </div>
      <div className="flex items-center gap-2.5">
        <BriefcaseBusiness className="h-4 w-4 shrink-0 text-[#9b4819]" />
        <dt className="sr-only">Employment type</dt>
        <dd>{experience.employmentType}</dd>
      </div>
    </dl>

    {experience.companyUrl && (
      <a
        href={experience.companyUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex w-fit items-center gap-1.5 rounded-lg border border-slate-200/80 bg-card px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-[#9b4819]/40 hover:text-[#9b4819] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b4819]/50 focus-visible:ring-offset-2"
      >
        {hostnameOf(experience.companyUrl)}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    )}
  </div>
);

export default CompanyIdentity;
