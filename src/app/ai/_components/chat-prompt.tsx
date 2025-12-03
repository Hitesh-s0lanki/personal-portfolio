"use client";

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Send, Lightbulb, MessageCircle, Target, Loader2 } from "lucide-react";
import { Message } from "@/types/chat.types";

interface ChatPromptProps {
  isFirst: boolean;
  loading: boolean;
  setLoading: (value: boolean) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

type FormValues = {
  prompt: string;
};

const suggestions = [
  {
    label: "What can I ask you to do?",
    icon: Lightbulb,
    message: "What can I ask you to do?",
  },
  {
    label: "Java/Spring Boot projects",
    icon: Target,
    message: "Any Project or work related to Java, Spring Boot?",
  },
  {
    label: "List certificates",
    icon: MessageCircle,
    message: "list all certificates achived by him?",
  },
];

const ChatPrompt: React.FC<ChatPromptProps> = ({
  loading,
  setLoading,
  isFirst,
  messages,
  setMessages,
}) => {
  const form = useForm<FormValues>({ defaultValues: { prompt: "" } });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const value = form.watch("prompt");

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    const lineHeight = 22;
    const maxLines = 5;
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      lineHeight * maxLines
    )}px`;
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setValue("prompt", e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      adjustTextareaHeight(textarea);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (loading) return;
    const userContent = values.prompt.trim();
    if (!userContent) return;

    form.reset();
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // 1️⃣ add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userContent,
      created: new Date().toISOString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Add typing indicator
    const typingMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      created: new Date().toISOString(),
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMsg]);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        message: userContent,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      });
      const aiContent: string = res.data.response;

      // Remove typing indicator and add assistant reply
      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.isTyping);
        const aiMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: aiContent,
          created: new Date().toISOString(),
          timestamp: new Date(),
        };
        return [...filtered, aiMsg];
      });
    } catch (err) {
      console.error("Chat API error:", err);
      // Remove typing indicator on error
      setMessages((prev) => prev.filter((m) => !m.isTyping));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!value && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value]);

  const disabled = !value.trim() || loading;

  const handleQuickAction = (message: string) => {
    form.setValue("prompt", message);
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.focus();
        adjustTextareaHeight(textarea);
      }
    }, 0);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 backdrop-blur-md">
      {/* Suggested Messages Quick Actions Buttons */}
      {isFirst && !value.trim() && (
        <div className="mx-auto max-w-3xl mb-3">
          <div className="space-y-3">
            <h2 className="text-muted-foreground text-xs sm:text-sm font-semibold text-center">
              Suggestions on what to ask Our AI
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(item.message)}
                  className="rounded-full text-xs flex items-center gap-1.5 bg-white hover:bg-slate-50 border-slate-200"
                >
                  <item.icon className="h-3 w-3 opacity-70" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.label.split(" ")[0]}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INPUT WRAPPER */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative mx-auto flex max-w-3xl items-center">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormControl>
                    <Textarea
                      ref={textareaRef}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInput(e);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about your projects..."
                      disabled={loading}
                      rows={1}
                      className="w-full resize-none bg-white/90 backdrop-blur-sm border border-slate-300/60 rounded-2xl px-4 pr-14 py-3 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 scrollbar-none shadow-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* SEND BUTTON OVERLAY */}
            <Button
              type="submit"
              size="icon"
              disabled={disabled}
              className="absolute right-3 bottom-3 h-9 w-9 rounded-full shadow-sm bg-[#9b4819]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* KEYBOARD HINT */}
      <p className="mt-2 text-center text-[11px] text-slate-500">
        Press <span className="font-medium">Enter</span> to send •{" "}
        <span className="font-medium">Shift+Enter</span> for a new line
      </p>
    </div>
  );
};

export default ChatPrompt;
