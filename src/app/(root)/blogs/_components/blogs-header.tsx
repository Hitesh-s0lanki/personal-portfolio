import { BookOpen } from "lucide-react";

export const BlogsHeader = () => {
  return (
    <div className="mb-10 flex flex-col items-center gap-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
        <BookOpen className="h-3 w-3" />
        <span>My Blogs</span>
      </div>
      <h1 className="text-2xl font-semibold sm:text-3xl md:text-3xl">
        Blog{" "}
        <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
          Writeups
        </span>
      </h1>
      <p className="max-w-2xl text-sm text-gray-600 md:text-base">
        Browse technical blogs with concise previews and key tech stacks.
      </p>
    </div>
  );
};
