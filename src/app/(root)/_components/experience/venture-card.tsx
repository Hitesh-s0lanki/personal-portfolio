import { ArrowUpRight } from "lucide-react";
import { Venture } from "@/type";
import { cn } from "@/lib/utils";
import LogoTile from "./logo-tile";

type Props = {
  venture: Venture;
};

const VentureCard = ({ venture }: Props) => {
  const Wrapper = venture.url ? "a" : "div";

  return (
    <Wrapper
      {...(venture.url
        ? {
            href: venture.url,
            target: "_blank",
            rel: "noreferrer noopener",
          }
        : {})}
      className={cn(
        "group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-card/80 p-3 transition-all duration-200",
        venture.url &&
          "cursor-pointer hover:border-[#9b4819]/40 hover:bg-orange-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b4819]/50 focus-visible:ring-offset-2"
      )}
    >
      <LogoTile
        src={venture.logo}
        company={venture.name}
        sizes="36px"
        className="size-9 rounded-lg border-slate-200/80"
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-slate-800">
            {venture.name}
          </span>
          {venture.url && (
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9b4819]" />
          )}
        </span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/80">
          {venture.period}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {venture.description}
        </span>
      </span>
    </Wrapper>
  );
};

export default VentureCard;
