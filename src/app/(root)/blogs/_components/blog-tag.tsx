import {
  normalizeTechTag,
  TECH_STACK_ICON_LINKS,
} from "@/constants/tech-stack-icons";
import { Code2 } from "lucide-react";

interface BlogTagProps {
  tag: string;
}

export const BlogTag = ({ tag }: BlogTagProps) => {
  const normalizedTag = normalizeTechTag(tag);
  const tagIconLink = TECH_STACK_ICON_LINKS[normalizedTag];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/70 bg-orange-50 px-2.5 py-1 text-xs font-medium text-[#8a3f15]">
      {tagIconLink ? (
        <span
          aria-hidden
          className="h-3.5 w-3.5 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${tagIconLink})` }}
        />
      ) : (
        <Code2 className="h-3.5 w-3.5" />
      )}
      {tag}
    </span>
  );
};
