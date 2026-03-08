"use client";

import { Project } from "@/type";
import { useEffect, useState } from "react";

const useProjectReadme = (project: Project | null) => {
  const [readmeContent, setReadmeContent] = useState("");
  const [isReadmeLoading, setIsReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;

    if (!project.github) {
      setReadmeContent("");
      setReadmeError("GitHub repository link is not available for this project.");
      setIsReadmeLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadReadme = async () => {
      setIsReadmeLoading(true);
      setReadmeError(null);

      try {
        const url = `/api/project-readme?githubUrl=${encodeURIComponent(
          project.github ?? ""
        )}`;
        const response = await fetch(url, {
          signal: controller.signal,
          cache: "no-store",
        });
        const payload = await response.json();

        if (!response.ok || !payload.content) {
          throw new Error(payload.error ?? "Unable to load README.");
        }

        setReadmeContent(payload.content);
      } catch (error) {
        if (controller.signal.aborted) return;
        const message =
          error instanceof Error ? error.message : "Unable to load README.";
        setReadmeError(message);
        setReadmeContent("");
      } finally {
        if (!controller.signal.aborted) {
          setIsReadmeLoading(false);
        }
      }
    };

    loadReadme();
    return () => controller.abort();
  }, [project]);

  const resetReadmeState = () => {
    setReadmeContent("");
    setReadmeError(null);
    setIsReadmeLoading(false);
  };

  return {
    readmeContent,
    isReadmeLoading,
    readmeError,
    resetReadmeState,
  };
};

export default useProjectReadme;
