import { Experience } from "@/type";
import { cn } from "@/lib/utils";
import { EXPERIENCE_DETAIL_ID } from "./data";
import LogoTile from "./logo-tile";

type Props = {
  experience: Experience;
  isActive: boolean;
  /** Sits before the active node, so its rail segment is already filled. */
  isDone: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
};

const filledSegment = "bg-gradient-to-r from-[#f97316] to-[#9b4819]";

const TimelineNode = ({
  experience,
  isActive,
  isDone,
  isFirst,
  isLast,
  onSelect,
}: Props) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={isActive}
    aria-controls={EXPERIENCE_DETAIL_ID}
    className="group flex w-full cursor-pointer flex-col items-center rounded-2xl px-2 pb-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b4819]/50 focus-visible:ring-offset-2"
  >
    {/* Period above the rail */}
    <span
      className={cn(
        "flex h-9 items-end pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
        isActive
          ? "text-[#9b4819]"
          : "text-muted-foreground/70 group-hover:text-muted-foreground"
      )}
    >
      {experience.periodShort}
    </span>

    {/* The rail itself */}
    <span className="relative flex h-6 w-full items-center justify-center">
      <span
        className={cn(
          "absolute left-0 right-1/2 h-[2px] transition-colors duration-300",
          isFirst
            ? "bg-transparent"
            : isDone || isActive
              ? filledSegment
              : "bg-slate-200"
        )}
      />
      <span
        className={cn(
          "absolute left-1/2 right-0 h-[2px] transition-colors duration-300",
          isLast ? "bg-transparent" : isDone ? filledSegment : "bg-slate-200"
        )}
      />

      {isActive && experience.current && (
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#f97316]/40 motion-reduce:animate-none" />
      )}

      <span
        className={cn(
          "relative z-10 rounded-full transition-all duration-300",
          isActive
            ? "h-4 w-4 bg-gradient-to-br from-[#f97316] to-[#9b4819] ring-4 ring-orange-100"
            : isDone
              ? "h-3 w-3 bg-[#f97316]/70 ring-4 ring-white"
              : "h-3 w-3 border-2 border-slate-300 bg-white ring-4 ring-white group-hover:border-[#9b4819]"
        )}
      />
    </span>

    {/* Company + role below the rail */}
    <span
      className={cn(
        "mt-3 flex w-full flex-col items-center gap-1 rounded-xl border px-3 py-3 transition-all duration-200",
        isActive
          ? "border-orange-200/70 bg-gradient-to-b from-orange-50 to-orange-100/40"
          : "border-transparent group-hover:border-slate-200/80 group-hover:bg-card/70"
      )}
    >
      <LogoTile
        src={experience.logo}
        company={experience.company}
        sizes="36px"
        className={cn(
          "mb-1 size-9 rounded-lg p-1 transition-colors duration-200",
          isActive ? "border-orange-200/70" : "border-slate-200/80"
        )}
        imageClassName="p-0.5"
      />
      <span
        className={cn(
          "text-base font-semibold transition-colors",
          isActive ? "text-foreground" : "text-slate-700"
        )}
      >
        {experience.company}
      </span>
      <span className="text-sm text-muted-foreground">{experience.role}</span>
      {experience.current && (
        <span className="mt-1 rounded-full bg-[#9b4819] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
          Current
        </span>
      )}
    </span>
  </button>
);

export default TimelineNode;
