import Image from "next/image";
import { Project } from "@/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

type Props = {
  idea: Project;
};

const IdeaCard = ({ idea }: Props) => {
  return (
    <div
      className=" w-full rounded-md group cursor-pointer border shadow-lg flex flex-col justify-between"
      // onClick={() => onOpen(idea)}
    >
      <div className=" w-full relative transition-all duration-1000">
        {idea.ribbon && <div className="ribbon">{idea.ribbon}</div>}
        <Image
          src={idea.image}
          alt="Frame"
          height={400}
          width={400}
          className="w-full rounded-t-md max-h-44 object-center"
        />
      </div>
      <div className=" py-3 px-3 flex flex-col justify-start items-start  gap-4">
        <div className="flex  flex-col gap-4">
          <div className=" flex flex-col gap-1">
            <h1 className=" text-lg font-semibold">{idea.name}</h1>
            <p className=" text-xs text-[#4F4F4F]">{idea.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {idea.technologies.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className=" pb-3 px-3 flex gap-2 justify-start items-start w-full">
        {idea.github && (
          <Button asChild variant="outline" size="sm">
            <a href={idea.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        )}
        {idea.demo && (
          <Button asChild size="sm" className=" bg-[#333333]">
            <Link href={idea.demo} target="_blank" rel="noopener noreferrer">
              Live <ExternalLink />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default IdeaCard;
