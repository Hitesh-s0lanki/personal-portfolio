import { Check } from "lucide-react";
import { Experience } from "@/type";
import { EXPERIENCE_DETAIL_ID } from "./data";
import CompanyIdentity from "./company-identity";
import VentureCard from "./venture-card";

type Props = {
  experience: Experience;
};

/** The panel the timeline swaps in. Keyed by role, so it re-animates on change. */
const ExperienceDetail = ({ experience }: Props) => (
  <article
    id={EXPERIENCE_DETAIL_ID}
    className="experience-panel-in relative overflow-hidden rounded-2xl border border-slate-200/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm md:p-8"
  >
    <div
      aria-hidden
      className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-100/40 blur-3xl"
    />

    <div className="relative grid gap-6 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-10">
      <CompanyIdentity experience={experience} />

      <div className="flex flex-col gap-5">
        <p className="text-base leading-relaxed text-muted-foreground">
          {experience.summary}
        </p>
        <ul className="flex flex-col gap-2.5">
          {experience.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-50">
                <Check className="h-3 w-3 text-[#9b4819]" />
              </span>
              <span className="text-sm leading-relaxed text-slate-700">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
        {experience.ventures && experience.ventures.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
              Studio ventures I built on
            </h4>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {experience.ventures.map((venture) => (
                <VentureCard key={venture.name} venture={venture} />
              ))}
            </div>
          </div>
        )}
        <div className="h-px w-full bg-gradient-to-r from-primary/20 via-slate-200 to-transparent" />
        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </article>
);

export default ExperienceDetail;
