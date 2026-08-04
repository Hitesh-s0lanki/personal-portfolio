import { cn } from "@/lib/utils";

/**
 * The section label used above every heading — the wide-tracked uppercase
 * "Featured work" treatment. Kept in one place so section eyebrows stay
 * identical across the site instead of drifting into pills and badges.
 */
const SectionEyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={cn(
      "text-xs font-medium tracking-[0.3em] text-[#9b4819] uppercase",
      className
    )}
  >
    {children}
  </p>
);

export default SectionEyebrow;
