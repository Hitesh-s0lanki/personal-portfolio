"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SendHorizonalIcon, Loader2Icon } from "lucide-react";
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

const ChatPrompt: React.FC<ChatPromptProps> = ({
  loading,
  setLoading,
  isFirst,
  messages,
  setMessages,
}) => {
  const form = useForm<FormValues>({ defaultValues: { prompt: "" } });

  const onSubmit = async (values: FormValues) => {
    if (loading) return;
    const userContent = values.prompt.trim();
    if (!userContent) return;

    form.reset();
    setLoading(true);

    // 1️⃣ add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userContent,
      created: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        message: userContent,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      });
      const aiContent: string = res.data.response;

      // 2️⃣ append assistant reply
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiContent,
        created: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-5 md:px-40 lg:px-40 flex flex-col gap-5 transition-all">
      {isFirst && (
        <div className="space-y-4 px-4">
          <h2 className="text-muted-foreground text-sm font-semibold text-center">
            Suggestions on what to ask Our AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-5">
            {[
              "What can I ask you to do?",
              "Any Project or work related to Java, Spring Boot?",
              "list all certificates achived by him?",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-white/50 text-md p-3 px-4 shadow-xs cursor-pointer"
                onClick={() => form.setValue("prompt", item)}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 bg-white">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Ask me anything about your projects"
                    {...field}
                    className="text-sm"
                    disabled={loading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" variant="ghost" size="icon" disabled={loading}>
            {loading ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <SendHorizonalIcon className="size-6" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatPrompt;
