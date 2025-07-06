import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";

const font = Manrope({
  subsets: ["latin"],
  weight: ["600", "400", "500"],
});

const messages = [
  {
    id: 1,
    role: "ai",
    content: "What can I ask you to do?",
  },
  {
    id: 2,
    role: "user",
    content:
      "Great question! You can ask for my help with the following: Anything to do with your reports in our software e.g. What is the last report we exported? Anything to do with your organisation e.g. how many employees are using our software? Anything to do with the features we have in our software e.g how can I change the colours of my report?",
  },
  {
    id: 3,
    role: "ai",
    content: "What can I ask you to do?",
  },
  {
    id: 4,
    role: "user",
    content:
      "Great question! You can ask for my help with the following: Anything to do with your reports in our software e.g. What is the last report we exported? Anything to do with your organisation e.g. how many employees are using our software? Anything to do with the features we have in our software e.g how can I change the colours of my report?",
  },
  {
    id: 5,
    role: "ai",
    content: "What can I ask you to do?",
  },
  {
    id: 6,
    role: "user",
    content:
      "Great question! You can ask for my help with the following: Anything to do with your reports in our software e.g. What is the last report we exported? Anything to do with your organisation e.g. how many employees are using our software? Anything to do with the features we have in our software e.g how can I change the colours of my report?",
  },
];

const ChatMessage = () => {
  return (
    <ScrollArea
      className={cn(
        "flex-1 w-full h-full px-6 md:px-48 lg:px-48 flex flex-col gap-4 items-center  justify-end overflow-auto",
        font.className
      )}>
      {messages.map((item) => {
        if (item.role === "ai") {
          return (
            <div
              key={item.id}
              className="w-full text-black  flex flex-col pr-2 md:pr-20 lg:pr-20 justify-start items-start gap-2">
              <h1 className=" text-muted-foreground text-sm font-semibold px-2">
                Our AI
              </h1>
              <p className="p-3 rounded-xl  bg-white shadow  md:max-w-1/2 lg:max-w-1/2">
                {item.content}
              </p>
            </div>
          );
        }

        return (
          <div
            key={item.id}
            className="w-full text-black flex flex-col pl-2 md:pl-20 lg:pl-20 justify-end items-end gap-2">
            <h1 className=" text-muted-foreground text-sm font-semibold text-end md:text-start lg:text-start px-2 md:max-w-1/2 lg:max-w-1/2">
              Your Message
            </h1>
            <p className="p-3 rounded-xl  bg-white shadow md:max-w-1/2 lg:max-w-1/2">
              {item.content}
            </p>
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default ChatMessage;
