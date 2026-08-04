"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/types/chat.types";
import { cn } from "@/lib/utils";
import { Loader2, Bot, User } from "lucide-react";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  /** Tighter spacing + smaller bubbles for the floating widget. */
  compact?: boolean;
}

function formatTime(date: Date | string | undefined): string {
  if (!date) return "";
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(dateObj);
  } catch {
    return "";
  }
}

/** Trailing margin on the final block would push the timestamp down. */
const BLOCK = "mb-3 last:mb-0";

/**
 * The answer is markdown, so every block element needs its own spacing. The
 * bubble deliberately does NOT set `whitespace-pre-wrap` around this — the
 * source newlines are already consumed by the parser, and preserving them too
 * doubles every gap and splits list items apart.
 */
const buildMarkdownComponents = (compact: boolean): Components => {
  const heading = "font-semibold text-slate-50 mt-4 mb-2 first:mt-0";

  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(heading, compact ? "text-[15px]" : "text-base", className)}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(heading, compact ? "text-[14px]" : "text-[15px]", className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(heading, compact ? "text-[13px]" : "text-sm", className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(heading, compact ? "text-[13px]" : "text-sm", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p className={cn(BLOCK, "leading-relaxed", className)} {...props} />
    ),
    // `list-outside` + padding keeps wrapped lines aligned under the text
    // instead of sliding back under the marker. The `has-` variants strip the
    // bullets off GFM task lists, which render their own checkboxes.
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          BLOCK,
          "list-disc list-outside space-y-1 pl-5 marker:text-slate-400",
          "has-[input[type=checkbox]]:list-none has-[input[type=checkbox]]:pl-0",
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          BLOCK,
          "list-decimal list-outside space-y-1 pl-5 marker:text-slate-400",
          className,
        )}
        {...props}
      />
    ),
    // A "loose" list wraps each item's text in a <p>; that <p>'s own margin
    // has to be dropped or every bullet gains a blank line under it.
    li: ({ className, ...props }) => (
      <li
        className={cn(
          "leading-relaxed [&>p]:mb-0 [&>ul]:mt-1 [&>ul]:mb-0 [&>ol]:mt-1 [&>ol]:mb-0",
          className,
        )}
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn("font-semibold text-slate-50", className)} {...props} />
    ),
    em: ({ className, ...props }) => (
      <em className={cn("italic", className)} {...props} />
    ),
    del: ({ className, ...props }) => (
      <del className={cn("line-through opacity-70", className)} {...props} />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          "break-words text-orange-200 underline underline-offset-2 hover:text-orange-100",
          className,
        )}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    // Inline styling only. Fenced blocks land inside <pre>, which undoes the
    // pill below via descendant selectors — react-markdown v10 dropped the
    // `inline` prop, so this is the reliable way to tell the two apart.
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "rounded bg-slate-800/70 px-1.5 py-0.5 text-[0.9em] break-words text-orange-100",
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          BLOCK,
          "overflow-x-auto rounded-lg border border-slate-700/60 bg-slate-950/60 p-3 text-[12px] leading-5",
          "[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[12px] [&_code]:text-slate-100",
          className,
        )}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          BLOCK,
          "border-l-2 border-orange-300/50 bg-slate-950/30 py-1.5 pl-3 pr-2 italic text-slate-200 [&>p:last-child]:mb-0",
          className,
        )}
        {...props}
      />
    ),
    hr: () => <hr className="my-4 border-slate-700/60" />,
    // A table is the one block that can outgrow the bubble, so it scrolls
    // inside its own box rather than stretching the message.
    table: ({ className, ...props }) => (
      <div
        className={cn(
          BLOCK,
          "overflow-x-auto rounded-lg border border-slate-700/60",
        )}
      >
        <table
          className={cn("w-full border-collapse text-left text-[12px]", className)}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "whitespace-nowrap border-b border-slate-700/60 bg-slate-950/40 px-2.5 py-1.5 font-semibold text-slate-50",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "border-b border-slate-800/60 px-2.5 py-1.5 align-top",
          className,
        )}
        {...props}
      />
    ),
    input: ({ className, ...props }) => (
      <input
        className={cn("mr-2 align-middle accent-orange-300", className)}
        {...props}
        readOnly
      />
    ),
    img: ({ src, alt }) => {
      const url = typeof src === "string" ? src : "";
      if (!url) return null;
      return (
        // Answers can cite arbitrary remote images; next/image would need
        // every host allow-listed up front.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt ?? ""}
          loading="lazy"
          className="my-2 h-auto max-w-full rounded-md"
        />
      );
    },
  };
};

const COMPACT_MARKDOWN = buildMarkdownComponents(true);
const FULL_MARKDOWN = buildMarkdownComponents(false);

export default function ChatMessages({
  messages,
  loading,
  compact = false,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto",
        !compact && "flex justify-center items-center",
      )}
    >
      <div
        className={cn(
          "flex flex-col w-full",
          compact
            ? "gap-3 px-3 py-4"
            : "h-full max-w-5xl gap-4 px-4 py-4 md:px-6 md:py-6 pb-32 md:pb-40",
        )}
      >
        {messages.map((message) => {
          const isUser = message.role === "user";
          const isAssistant = message.role === "assistant";

          return (
            <div
              key={message.id}
              className={cn(
                "flex w-full gap-2",
                isUser ? "justify-end" : "justify-start",
              )}
            >
              {/* ICON (left for assistant, right for user) */}
              {!isUser && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d1c24] border border-slate-900/40 shadow-sm flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div
                className={cn(
                  // `min-w-0` lets the scrollable blocks inside (tables, code)
                  // clip instead of stretching the bubble past its max width.
                  "min-w-0 rounded-2xl shadow-sm transition-all",
                  compact
                    ? "max-w-[85%] px-3 py-2"
                    : "max-w-[85%] md:max-w-[70%] px-3 py-2.5 md:px-4 md:py-3",
                  !message.isTyping && "animate-[fadeIn_0.16s_ease-out]",
                  isAssistant &&
                    !message.isTyping &&
                    "bg-[#1d1c24]/80 text-slate-50 border border-slate-900/40",
                  isAssistant &&
                    message.isTyping &&
                    "bg-[#1d1c24]/60 text-slate-50 border border-slate-900/40",
                  isUser &&
                    "bg-slate-100 text-slate-900 border border-slate-200",
                  message.isError &&
                    "bg-red-950/40 text-red-50 border border-red-900/50",
                  message.isTyping && !message.content && "opacity-90",
                )}
              >
                {/* Message Content */}
                {message.isTyping && !message.content ? (
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{message.activity ?? "Assistant is thinking"}…</span>
                  </div>
                ) : isAssistant ? (
                  <div
                    className={cn(
                      // No `whitespace-pre-wrap` here: the markdown parser
                      // already turned the source newlines into blocks.
                      "min-w-0 break-words leading-relaxed text-slate-50",
                      compact ? "text-[13px]" : "text-sm",
                    )}
                  >
                    <Markdown
                      // Answers use GFM — tables, task lists, strikethrough.
                      // Without this they render as raw pipes and tildes.
                      remarkPlugins={[remarkGfm]}
                      components={compact ? COMPACT_MARKDOWN : FULL_MARKDOWN}
                    >
                      {message.content}
                    </Markdown>
                    {message.isTyping && !message.activity && (
                      <span className="inline-block w-2 h-4 ml-1 rounded-sm bg-slate-300/80 align-baseline animate-pulse" />
                    )}
                    {/* A tool fired mid-answer — say what it's doing. */}
                    {message.activity && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>{message.activity}…</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "whitespace-pre-wrap break-words leading-relaxed",
                      compact ? "text-[13px]" : "text-sm",
                    )}
                  >
                    {message.content}
                  </div>
                )}

                {/* Timestamp */}
                {!message.isTyping &&
                  (message.timestamp || message.created) && (
                    <div className="mt-1 flex justify-end">
                      <span className="text-[10px] text-slate-400">
                        {formatTime(message.timestamp || message.created)}
                      </span>
                    </div>
                  )}
              </div>

              {/* USER ICON (only on right side) */}
              {isUser && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-300 border border-slate-400 shadow-sm flex-shrink-0">
                  <User className="h-4 w-4 text-slate-900" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
        {/* Some extra space for the input */}
        {!compact && <div className="min-h-44 md:h-40" />}
      </div>
    </div>
  );
}
