"use client";

import {
  IconApi,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandNextjs,
  IconBrandOpenai,
  IconBrandPython,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandYoutube,
  IconBrain,
  IconCloud,
  IconCode,
  IconDatabase,
  IconDeviceDesktopCode,
  IconServer,
  type Icon,
} from "@tabler/icons-react";

const techIconMap: Record<string, Icon> = {
  nextjs: IconBrandNextjs,
  react: IconBrandReact,
  typescript: IconBrandTypescript,
  "tailwind css": IconBrandTailwind,
  tailwind: IconBrandTailwind,
  python: IconBrandPython,
  openai: IconBrandOpenai,
  "spring boot": IconServer,
  java: IconCode,
  fastapi: IconApi,
  postgresql: IconDatabase,
  postgres: IconDatabase,
  mysql: IconDatabase,
  supabase: IconBrandSupabase,
  vercel: IconBrandVercel,
  docker: IconBrandDocker,
  github: IconBrandGithub,
  youtube: IconBrandYoutube,
  google: IconBrandGoogle,
  ai: IconBrain,
  agentic: IconBrain,
  agents: IconBrain,
  cloud: IconCloud,
  streamlit: IconDeviceDesktopCode,
};

const getTechIcon = (tech: string): Icon => {
  const key = tech.toLowerCase();
  return techIconMap[key] ?? IconCode;
};

interface TechIconTagProps {
  tech: string;
}

const TechIconTag = ({ tech }: TechIconTagProps) => {
  const TechIcon = getTechIcon(tech);

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors duration-150 hover:border-[#9b4819]/30 hover:bg-orange-50/60 hover:text-[#9b4819]"
      title={tech}
    >
      <TechIcon size={13} stroke={1.8} />
      <span>{tech}</span>
    </span>
  );
};

export default TechIconTag;
