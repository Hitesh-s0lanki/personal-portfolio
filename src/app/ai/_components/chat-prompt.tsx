"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { useState } from "react";

export function ChatPrompt() {
  const [input, setInput] = useState("");

  return (
    <div className="w-full px-5 md:px-40 lg:px-40 flex flex-col gap-5 transition-all">
      <div className=" space-y-4  px-4">
        <h2 className=" text-muted-foreground text-sm font-semibold text-center">
          Suggestions on what to ask Our AI
        </h2>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-5">
          {[
            "What can I ask you to do?",
            "Which one of my projects is performing the best?",
            "What projects should I be concerned about right now?",
          ].map((item) => (
            <div
              key={item}
              className=" rounded-lg bg-white/50 text-md p-3 px-4 shadow-xs cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-200 z-1">
        <Input
          placeholder="Ask me anything about your projects"
          className="flex-1 text-sm focus-visible:none placeholder:text-muted-foreground selection:border-none selection:text-primary-foreground border-none flex h-9 w-full min-w-0 px-3 py-1 shadow-none transition-[color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="ghost" size="icon">
          <SendHorizonalIcon className="size-6" />
        </Button>
      </div>
    </div>
  );
}
