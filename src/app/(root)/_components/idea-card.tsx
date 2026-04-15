import Image from "next/image";
import { Project } from "@/type";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

type Props = {
  idea: Project;
};

const IdeaCard = ({ idea }: Props) => {
  return (
    <div className="group w-full rounded-xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:shadow-[#9b4819]/8 hover:-translate-y-1 hover:border-[#9b4819]/20 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        {idea.ribbon && <div className="ribbon">{idea.ribbon}</div>}
        <Image
          src={idea.image}
          alt={idea.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {/* gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="space-y-1.5">
          <h2 className="text-base font-semibold text-gray-900 group-hover:text-[#9b4819] transition-colors duration-200 leading-tight">
            {idea.name}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {idea.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {idea.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-gray-600"
            >
              {tech}
            </span>
          ))}
          {idea.technologies.length > 4 && (
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-gray-400">
              +{idea.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="px-4 pb-4 flex gap-2 border-t border-gray-100 pt-3">
        {idea.github && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 text-xs cursor-pointer hover:border-[#9b4819]/40 hover:text-[#9b4819] transition-colors"
          >
            <a href={idea.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
        )}
        {idea.demo && (
          <Button
            asChild
            size="sm"
            className="h-8 text-xs cursor-pointer bg-[#9b4819] hover:bg-[#7a3914] text-white"
          >
            <Link href={idea.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Live
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default IdeaCard;
