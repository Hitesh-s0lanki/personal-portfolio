import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { blogsData } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  siteConfig,
  siteUrl,
} from "@/lib/seo";
import { BlogListItem } from "./_components/blog-list-item";
import { BlogsHeader } from "./_components/blogs-header";

export const metadata: Metadata = buildMetadata({
  title: "Blogs",
  description:
    "Technical writing by Hitesh Solanki on agentic AI systems, LangChain, full-stack architecture, and shipping real products — with previews and the stack behind each build.",
  path: "/blogs",
  eyebrow: "Writing",
  keywords: [
    "Hitesh Solanki blog",
    "agentic AI",
    "LangChain tutorial",
    "software engineering writing",
    "AI engineering blog",
  ],
});

const blogsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blogs | Hitesh Solanki",
  url: absoluteUrl("/blogs"),
  description: "Technical writing on agentic AI systems and full-stack engineering.",
  author: { "@type": "Person", name: siteConfig.name, url: siteUrl },
  blogPost: blogsData.map((blog) => ({
    "@type": "BlogPosting",
    headline: blog.title,
    url: blog.url,
    ...(blog.description ? { description: blog.description } : {}),
    ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
    author: { "@type": "Person", name: siteConfig.name, url: siteUrl },
  })),
};

const BlogsPage = () => {
  return (
    <div className="min-h-screen w-full ">
      <JsonLd
        data={[
          blogsJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
          ]),
        ]}
      />
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
