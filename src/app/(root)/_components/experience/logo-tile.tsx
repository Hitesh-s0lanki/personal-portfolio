import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  company: string;
  /** Rendered box: size, radius, padding, border colour. */
  className?: string;
  /** Extra inset for the logo itself, inside the tile padding. */
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
};

/** White tile that normalises logos with very different backgrounds. */
const LogoTile = ({
  src,
  company,
  className,
  imageClassName,
  sizes,
  priority,
}: Props) => (
  <span
    className={cn(
      "relative block shrink-0 overflow-hidden border bg-white",
      className
    )}
  >
    <Image
      src={src}
      alt={`${company} logo`}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-contain", imageClassName)}
    />
  </span>
);

export default LogoTile;
