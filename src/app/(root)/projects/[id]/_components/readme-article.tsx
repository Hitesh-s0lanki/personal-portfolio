"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ReadmeArticleProps {
  content: string;
  /** Base URLs used to resolve the README's relative links back to the repo. */
  rawBase: string;
  blobBase: string;
}

const isRelative = (href?: string) =>
  Boolean(href) && !/^(https?:|mailto:|#|\/\/)/i.test(href!);

/**
 * A repo README rendered as the body of the project page. Relative links are
 * resolved against the repository, since the markdown was written to be read
 * on GitHub.
 */
const ReadmeArticle = ({ content, rawBase, blobBase }: ReadmeArticleProps) => (
  <div className="text-[15px] leading-8 text-[#4f4a44]">
    <Markdown
      // READMEs are written for GitHub, so they lean on GFM — tables,
      // strikethrough, task lists. Without this they render as raw pipes.
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (props) => (
          <h2
            className="mt-10 mb-4 text-2xl font-medium text-[#1f1f1f] first:mt-0"
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className="mt-10 mb-4 border-t border-black/10 pt-8 text-xl font-medium text-[#1f1f1f] first:mt-0 first:border-0 first:pt-0"
            {...props}
          />
        ),
        h3: (props) => (
          <h3 className="mt-7 mb-3 text-lg font-semibold text-[#25221f]" {...props} />
        ),
        h4: (props) => (
          <h4 className="mt-6 mb-2 text-base font-semibold text-[#25221f]" {...props} />
        ),
        p: (props) => <p className="mb-5" {...props} />,
        ul: (props) => <ul className="mb-5 list-disc space-y-1.5 pl-5" {...props} />,
        ol: (props) => (
          <ol className="mb-5 list-decimal space-y-1.5 pl-5" {...props} />
        ),
        li: (props) => <li className="leading-7" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="mb-5 border-l-2 border-[#9b4819]/40 bg-white/60 px-4 py-2 text-[#6f6a63] italic"
            {...props}
          />
        ),
        hr: () => <hr className="my-8 border-black/10" />,
        a: ({ href, ...props }) => (
          <a
            {...props}
            href={isRelative(href) ? `${blobBase}${href}` : href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9b4819] underline underline-offset-2 hover:text-[#7a3914]"
          />
        ),
        img: ({ src, alt }) => {
          const url = typeof src === "string" ? src : "";
          return (
            // README images are arbitrary remote URLs (badges, gifs) that
            // next/image would need every host allow-listed for.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={isRelative(url) ? `${rawBase}${url}` : url}
              alt={alt ?? ""}
              loading="lazy"
              className="my-5 inline-block h-auto max-w-full rounded-md"
            />
          );
        },
        code: (props) => (
          <code
            className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] text-[#7a3914]"
            {...props}
          />
        ),
        pre: (props) => (
          <pre
            className="mb-5 overflow-x-auto rounded-lg border border-black/10 bg-white p-4 text-[13px] leading-6 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[#3f3c38]"
            {...props}
          />
        ),
        table: (props) => (
          <div className="mb-5 overflow-x-auto rounded-lg border border-black/10">
            <table className="w-full border-collapse text-sm" {...props} />
          </div>
        ),
        th: (props) => (
          <th
            className="border-b border-black/10 bg-white px-3 py-2 text-left font-semibold text-[#25221f]"
            {...props}
          />
        ),
        td: (props) => (
          <td className="border-b border-black/5 px-3 py-2 align-top" {...props} />
        ),
      }}
    >
      {content}
    </Markdown>
  </div>
);

export default ReadmeArticle;
