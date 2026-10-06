"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  Loader2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import ChatMessages from "@/components/chat/chat-messages";
import { Button } from "@/components/ui/button";
import { CHAT_SUGGESTIONS } from "@/constants/chat-suggestions";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const MAX_TEXTAREA_LINES = 4;
const LINE_HEIGHT = 22;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [prompt, setPrompt] = useState("");

  const { messages, loading, sendMessage, reset } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEmpty = messages.length === 0;
  const canSend = !!prompt.trim() && !loading;

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Step back out of the expanded view before closing the panel outright.
      if (isExpanded) setIsExpanded(false);
      else setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isExpanded]);

  // Lock background scroll while the panel covers the screen on mobile
  useEffect(() => {
    if (!isOpen) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => textareaRef.current?.focus(), 250);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      LINE_HEIGHT * MAX_TEXTAREA_LINES,
    )}px`;
  };

  const submit = (value: string) => {
    if (!value.trim() || loading) return;
    trackEvent("chat_message_submit");
    sendMessage(value);
    setPrompt("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleSuggestion = (message: string) => {
    submit(message);
    textareaRef.current?.focus();
  };

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ delay: 0.15 }}
              className="hidden rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm md:block"
            >
              Ask me anything
            </motion.span>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            if (!isOpen) trackEvent("chat_open");
            setIsOpen((open) => !open);
          }}
          aria-label={isOpen ? "Close assistant" : "Open assistant"}
          aria-expanded={isOpen}
          className="relative flex size-13 items-center justify-center rounded-full bg-gradient-to-r from-[#f97316] to-[#9b4819] text-white shadow-lg shadow-[#9b4819]/30 transition-transform hover:scale-105 active:scale-95 sm:size-14"
        >
          {!isOpen && (
            <span className="absolute inset-0 animate-ping rounded-full bg-[#f97316]/30" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X className="size-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <Sparkles className="size-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              key="assistant-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] sm:hidden"
            />

            <motion.div
              key="assistant-panel"
              role="dialog"
              aria-modal="false"
              aria-label="AI assistant"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={cn(
                "fixed inset-x-3 bottom-24 top-20 z-50 flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-900/15 backdrop-blur-xl",
                "sm:inset-auto sm:bottom-24 sm:right-6",
                // The panel already fills the screen on mobile, so expanding is
                // a desktop affordance: same anchor, more room.
                "transition-[width,height] duration-300 ease-out",
                isExpanded
                  ? "sm:h-[calc(100vh-8rem)] sm:w-[min(760px,calc(100vw-3rem))] sm:bottom-16"
                  : "sm:h-[min(600px,calc(100vh-11rem))] sm:w-[390px]",
              )}
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-slate-200/80 bg-gradient-to-r from-[#f97316] to-[#9b4819] px-4 py-3 text-white">
                <div className="flex size-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
                  <Bot className="size-5" />
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-sm font-semibold">
                    Hitesh&apos;s AI Assistant
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                    <span className="size-1.5 shrink-0 rounded-full bg-emerald-300" />
                    <span className="truncate">
                      Online
                      <span className="hidden sm:inline">
                        {" "}
                        — usually replies instantly
                      </span>
                    </span>
                  </p>
                </div>

                {!isEmpty && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Clear conversation"
                    className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsExpanded((expanded) => !expanded)}
                  aria-label={isExpanded ? "Shrink assistant" : "Expand assistant"}
                  aria-pressed={isExpanded}
                  className="hidden rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white sm:block"
                >
                  {isExpanded ? (
                    <Minimize2 className="size-4" />
                  ) : (
                    <Maximize2 className="size-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant"
                  className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Conversation */}
              {isEmpty ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f97316]/15 to-[#9b4819]/15">
                    <Sparkles className="size-6 text-[#9b4819]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Ask anything about Hitesh Solanki
                    </p>
                    <p className="text-xs text-slate-500">
                      Projects, experience, tech stack or availability.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {CHAT_SUGGESTIONS.map((item) => (
                      <Button
                        key={item.label}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestion(item.message)}
                        className="h-auto rounded-full border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <item.icon className="size-3 opacity-70" />
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <ChatMessages messages={messages} loading={loading} compact />
              )}

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(prompt);
                }}
                className="border-t border-slate-200/80 bg-white/80 p-3"
              >
                <div className="relative flex items-end">
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      resizeTextarea(e.target);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submit(prompt);
                      }
                    }}
                    rows={1}
                    disabled={loading}
                    placeholder="Ask about my work…"
                    aria-label="Message the assistant"
                    className="scrollbar-none w-full resize-none rounded-2xl border border-slate-300/70 bg-white px-4 py-2.5 pr-12 text-[13px] leading-relaxed shadow-sm focus-visible:ring-2 focus-visible:ring-[#9b4819] focus-visible:outline-none disabled:opacity-70"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!canSend}
                    aria-label="Send message"
                    className="absolute right-2 bottom-1.5 size-8 rounded-full bg-[#9b4819] hover:bg-[#7c3a14]"
                  >
                    {loading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </Button>
                </div>
                <p className="mt-1.5 text-center text-[10px] text-slate-400">
                  Press <span className="font-medium">Enter</span> to send •{" "}
                  <span className="font-medium">Shift+Enter</span> for a new line
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
