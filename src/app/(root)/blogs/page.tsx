import { blogsData } from "@/lib/data";
import { BlogListItem } from "./_components/blog-list-item";
import { BlogsHeader } from "./_components/blogs-header";

const BlogsPage = () => {
  return (
    <div className="min-h-screen w-full ">
      <section className="mx-auto min-h-screen w-full max-w-7xl px-5 py-12 pb-10 md:px-8 md:py-16 lg:px-10">
        <BlogsHeader />

        <div className="flex flex-col gap-5">
          {blogsData.map((blog) => (
            <BlogListItem key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
