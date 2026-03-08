"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Project } from "@/type";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

interface ProjectReadmeSheetProps {
  project: Project | null;
  isReadmeLoading: boolean;
  readmeError: string | null;
  readmeContent: string;
  onOpenChange: (open: boolean) => void;
}

const ProjectReadmeSheet = ({
  project,
  isReadmeLoading,
  readmeError,
  readmeContent,
  onOpenChange,
}: ProjectReadmeSheetProps) => {
  return (
    <Sheet open={Boolean(project)} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl p-0">
        <SheetHeader className="border-b px-6 py-5 pr-12">
          <SheetTitle className="text-xl">{project?.name}</SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            {project?.description}
          </SheetDescription>
          <div className="flex flex-wrap gap-2 pt-2">
            {project?.github && (
              <Button asChild variant="outline" size="sm">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
            {project?.demo && (
              <Button asChild size="sm" className="bg-[#333333]">
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  Live
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-170px)]">
          <div className="px-6 py-5">
            {isReadmeLoading && (
              <p className="text-sm text-gray-500">Loading README.md...</p>
            )}

            {!isReadmeLoading && readmeError && (
              <p className="text-sm text-red-600">{readmeError}</p>
            )}

            {!isReadmeLoading && !readmeError && readmeContent && (
              <div className="space-y-2 text-sm leading-relaxed text-gray-800">
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-semibold mt-2 mb-3" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
                    ),
                    p: (props) => <p className="mb-3 text-gray-700" {...props} />,
                    ul: (props) => (
                      <ul className="list-disc list-inside mb-3 space-y-1" {...props} />
                    ),
                    ol: (props) => (
                      <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />
                    ),
                    li: (props) => <li className="text-gray-700" {...props} />,
                    a: (props) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9b4819] underline"
                      />
                    ),
                    code: (props) => (
                      <code
                        className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-gray-800"
                        {...props}
                      />
                    ),
                    pre: (props) => (
                      <pre
                        className="mb-4 overflow-x-auto rounded-md bg-slate-100 p-3 text-xs"
                        {...props}
                      />
                    ),
                  }}
                >
                  {readmeContent}
                </Markdown>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectReadmeSheet;
