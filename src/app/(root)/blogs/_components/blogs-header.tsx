import SectionEyebrow from "@/components/section-eyebrow";

export const BlogsHeader = () => {
  return (
    <div className="mb-10 flex flex-col items-center gap-4 text-center">
      <SectionEyebrow>My Blogs</SectionEyebrow>
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
