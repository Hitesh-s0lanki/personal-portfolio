"use client";

import { blogsData } from "@/lib/data";
import { BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const BlogsPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(
    blogsData.length > 0 ? blogsData[0].id : null
  );

  const currentBlog = blogsData.find((blog) => blog.id === selectedBlog);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="w-full flex justify-center items-start py-10">
        <div className="w-full max-w-7xl px-5 md:px-8 lg:px-10 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 md:gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
              <BookOpen className="h-3 w-3" />
              <span>My Blogs</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-semibold">
              Thoughts & <span className="text-[#9b4819]">Insights</span>
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-gray-600">
              Explore my technical writings on AI, development, and software engineering.
            </p>
          </div>

          {/* Main Content - Responsive Layout */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 w-full">
            {/* Blog List - Sidebar on desktop, top on mobile */}
            <div className="w-full lg:w-1/3 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Articles
              </h2>
              <div className="space-y-3">
                {blogsData.map((blog) => (
                  <button
                    key={blog.id}
                    onClick={() => setSelectedBlog(blog.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedBlog === blog.id
                        ? "border-[#9b4819] bg-orange-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <h3
                      className={`font-semibold text-sm md:text-base mb-1 ${
                        selectedBlog === blog.id
                          ? "text-[#9b4819]"
                          : "text-gray-800"
                      }`}
                    >
                      {blog.title}
                    </h3>
                    {blog.description && (
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                        {blog.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Viewer - Main content area */}
            <div className="w-full lg:w-2/3 space-y-4">
              {currentBlog ? (
                <>
                  {/* Action Bar */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">
                      {currentBlog.title}
                    </h3>
                    <Button
                      onClick={() => window.open(currentBlog.url, "_blank")}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-[#9b4819] border-[#9b4819] hover:bg-[#9b4819] hover:text-white"
                    >
                      <span className="hidden sm:inline">Open in</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Iframe Container */}
                  <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-lg border-2 border-gray-200 bg-white shadow-lg overflow-hidden relative">
                    <iframe
                      src={currentBlog.url}
                      className="w-full h-full border-0"
                      title={currentBlog.title}
                      allow="fullscreen"
                      loading="lazy"
                      onError={() => {
                        // Fallback handled by the overlay
                      }}
                    />
                    {/* Fallback Overlay - Shows if iframe fails to load */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-6 text-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-md">
                        <p className="text-gray-700 mb-4 text-sm md:text-base">
                          This article is best viewed on Medium. Click the button above to open it in a new tab.
                        </p>
                        <Button
                          onClick={() => window.open(currentBlog.url, "_blank")}
                          className="bg-[#9b4819] hover:bg-[#7a3814] text-white"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read on Medium
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-lg border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                  <p className="text-gray-500">Select a blog to read</p>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full pt-10 lg:pt-20 md:pt-20">
            <div className="h-[0.5px] bg-[#BDBDBD] w-full" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;

