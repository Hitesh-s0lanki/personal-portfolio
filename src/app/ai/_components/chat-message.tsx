"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/types/chat.types";
import { cn } from "@/lib/utils";
import { Loader2, Bot, User } from "lucide-react";
import Markdown from "react-markdown";

interface ChatMessageProps {
  messages: Message[];
  loading: boolean;
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

export default function ChatMessage({ messages, loading }: ChatMessageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto flex justify-center items-center">
      <div className="flex h-full max-w-5xl flex-col gap-4 px-4 py-4 md:px-6 md:py-6 pb-32 md:pb-40 w-full">
        {messages.map((message) => {
          const isUser = message.role === "user";
          const isAssistant = message.role === "assistant";

          return (
            <div
              key={message.id}
              className={cn(
                "flex w-full gap-2",
                isUser ? "justify-end" : "justify-start"
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
                  "max-w-[85%] md:max-w-[70%] rounded-2xl px-3 py-2.5 md:px-4 md:py-3 shadow-sm transition-all",
                  !message.isTyping && "animate-[fadeIn_0.16s_ease-out]",
                  isAssistant &&
                    !message.isTyping &&
                    "bg-[#1d1c24]/80 text-slate-50 border border-slate-900/40",
                  isAssistant &&
                    message.isTyping &&
                    "bg-[#1d1c24]/60 text-slate-50 border border-slate-900/40",
                  isUser &&
                    "bg-slate-100 text-slate-900 border border-slate-200",
                  message.isTyping && !message.content && "opacity-90"
                )}
              >
                {/* Message Content */}
                {message.isTyping && !message.content ? (
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Assistant is thinking…</span>
                  </div>
                ) : isAssistant ? (
                  <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    <Markdown
                      components={{
                        h1: (props) => (
                          <h1
                            className="text-xl font-medium mb-3 mt-2 text-slate-50"
                            {...props}
                          />
                        ),
                        h2: (props) => (
                          <h2
                            className="text-lg font-medium mb-3 mt-2 text-slate-50"
                            {...props}
                          />
                        ),
                        h3: (props) => (
                          <h3
                            className="text-base font-medium mb-2 mt-2 text-slate-50"
                            {...props}
                          />
                        ),
                        h4: (props) => (
                          <h4
                            className="text-sm font-medium mb-2 mt-2 text-slate-50"
                            {...props}
                          />
                        ),
                        p: (props) => (
                          <p
                            className="mb-2 leading-relaxed text-slate-50"
                            {...props}
                          />
                        ),
                        ul: (props) => (
                          <ul
                            className="list-disc list-inside mb-2 text-slate-50"
                            {...props}
                          />
                        ),
                        ol: (props) => (
                          <ol
                            className="list-decimal list-inside mb-2 text-slate-50"
                            {...props}
                          />
                        ),
                        li: (props) => (
                          <li className="mb-1 text-slate-50" {...props} />
                        ),
                        strong: (props) => (
                          <strong
                            className="font-semibold text-slate-50"
                            {...props}
                          />
                        ),
                        code: (props) => (
                          <code
                            className="bg-slate-800/50 px-1.5 py-0.5 rounded text-slate-50 text-xs"
                            {...props}
                          />
                        ),
                        blockquote: (props) => (
                          <blockquote
                            className="border-l-4 border-slate-400 pl-4 italic my-2 text-slate-50"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.content}
                    </Markdown>
                    {message.isTyping && (
                      <span className="inline-block w-2 h-4 ml-1 rounded-sm bg-slate-300/80 align-baseline animate-pulse" />
                    )}
                  </div>
                ) : (
                  <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
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
        <div className="min-h-44 md:h-40" />
      </div>
    </div>
  );
}
