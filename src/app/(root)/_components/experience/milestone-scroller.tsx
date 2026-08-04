import { cn } from "@/lib/utils";
import { EXPERIENCE_DETAIL_ID, experiences } from "./data";
import LogoTile from "./logo-tile";

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

/** Snap-scrolling milestone strip — the rail's mobile and tablet form. */
const MilestoneScroller = ({ activeIndex, onSelect }: Props) => (
  <div className="lg:hidden -mx-6 px-6 md:-mx-8 md:px-8">
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-hide">
      {experiences.map((experience, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={experience.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            aria-controls={EXPERIENCE_DETAIL_ID}
            className={cn(
              "flex min-w-[13rem] shrink-0 cursor-pointer snap-start flex-col gap-1 rounded-xl border px-4 py-3 text-left transition-colors duration-200",
              isActive
                ? "border-orange-200/70 bg-gradient-to-br from-orange-50 to-orange-100/50"
                : "border-slate-200/80 bg-card/80 hover:border-[#9b4819]/30"
            )}
          >
            <span className="flex items-center gap-2">
              <LogoTile
                src={experience.logo}
                company={experience.company}
                sizes="28px"
                className={cn(
                  "size-7 rounded-md p-0.5",
                  isActive ? "border-orange-200/70" : "border-slate-200/80"
                )}
                imageClassName="p-0.5"
              />
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-[0.12em]",
                  isActive ? "text-[#9b4819]" : "text-muted-foreground/70"
                )}
              >
                {experience.periodShort}
              </span>
            </span>
            <span className="text-sm font-semibold text-foreground">
              {experience.company}
            </span>
            <span className="text-xs text-muted-foreground">
              {experience.role}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default MilestoneScroller;
