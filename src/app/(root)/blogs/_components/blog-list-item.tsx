import { Button } from "@/components/ui/button";
import { Blog } from "@/type";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogTag } from "./blog-tag";

interface BlogListItemProps {
  blog: Blog;
}

export const BlogListItem = ({ blog }: BlogListItemProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-100/70">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-72">
          <Image
            src={blog.image || "/projects/agentic-blog.png"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 288px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col justify-between space-y-4 p-5 md:p-6">
          <div className="space-y-4">
            <h2 className="line-clamp-2 text-xl font-semibold leading-snug text-gray-900">
              {blog.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
              {blog.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {(blog.tags || []).slice(0, 5).map((tag) => (
                <BlogTag key={tag} tag={tag} />
              ))}
            </div>
          </div>

          <Button asChild variant={"link"} className="w-fit underline">
            <Link href={blog.url} target="_blank" rel="noopener noreferrer">
              Read Article
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
