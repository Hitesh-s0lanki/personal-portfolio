import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import { Message } from "@/types/chat.types";
import Markdown from "react-markdown";

const font = Manrope({
  subsets: ["latin"],
  weight: ["600", "400", "500"],
});

type Props = {
  loading: boolean;
  messages: Message[];
};

const ChatMessage = ({ loading, messages }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
    }
  }, [messages]); // If messages are static, no deps; otherwise add messages as dependency

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn(
        "flex-1 w-full h-full px-6 md:px-48 lg:px-48 flex flex-col gap-4 items-center justify-end overflow-auto",
        font.className
      )}>
      {messages.map((item) => {
        if (item.role === "assistant") {
          return (
            <div
              key={item.id}
              className="w-full text-black flex flex-col pr-2 md:pr-20 lg:pr-20 justify-start items-start gap-1 pb-5">
              <h1 className="text-muted-foreground text-sm font-semibold px-2">
                Our AI
              </h1>
              <div className="p-3 rounded-xl bg-white shadow md:max-w-1/2 lg:max-w-1/2">
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-medium mb-6" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-medium mb-6" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-medium mb-6" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-base font-medium mb-6" {...props} />
                    ),
                    p: (props) => (
                      <p className="mb-6 leading-relaxed" {...props} />
                    ),
                    ul: (props) => (
                      <ul className=" list-disc list-inside mb-6" {...props} />
                    ),
                    ol: (props) => (
                      <ol
                        className=" list-decimal list-inside mb-6"
                        {...props}
                      />
                    ),
                    li: (props) => <li className=" mb-1" {...props} />,
                    strong: (props) => (
                      <strong className=" font-semibold" {...props} />
                    ),
                    code: (props) => (
                      <code
                        className=" bg-gray-100 px-1 py-0.5 rounded"
                        {...props}
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className=" border-l-4 pl-4 italic my-4"
                        {...props}
                      />
                    ),
                  }}>
                  {item.content}
                </Markdown>
              </div>
            </div>
          );
        }

        return (
          <div
            key={item.id}
            className="w-full text-black flex flex-col pl-2 md:pl-20 lg:pl-20 justify-end items-end gap-1  pb-5">
            <h1 className="text-muted-foreground text-sm font-semibold text-end px-2 md:max-w-1/2 lg:max-w-1/2">
              Your Message
            </h1>
            <p className="p-3 rounded-xl bg-white shadow md:max-w-1/2 lg:max-w-1/2">
              {item.content}
            </p>
          </div>
        );
      })}

      {loading && (
        <div className="w-full text-black flex flex-col pr-2 md:pr-20 lg:pr-20 justify-start items-start gap-1 pb-5">
          <h1 className="text-muted-foreground text-sm font-semibold px-2">
            Our AI
          </h1>
          <div className="p-3 rounded-xl bg-white shadow md:max-w-1/2 lg:max-w-1/2">
            Thinking.....
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default ChatMessage;
