export const TECH_STACK_ICON_LINKS: Record<string, string> = {
  nextjs: "https://cdn.simpleicons.org/nextdotjs/111111",
  tailwindcss: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  typescript: "https://cdn.simpleicons.org/typescript/3178C6",
  javascript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  react: "https://cdn.simpleicons.org/react/61DAFB",
  langchain: "https://cdn.simpleicons.org/langchain/1C3C3C",
  openai: "https://cdn.simpleicons.org/openai/412991",
  shopify: "https://cdn.simpleicons.org/shopify/95BF47",
};

export const normalizeTechTag = (tag: string) =>
  tag.toLowerCase().replace(/[^a-z0-9]/g, "");
