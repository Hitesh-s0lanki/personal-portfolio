import { Lightbulb, MessageCircle, Target, type LucideIcon } from "lucide-react";

export type ChatSuggestion = {
  label: string;
  message: string;
  icon: LucideIcon;
};

export const CHAT_SUGGESTIONS: ChatSuggestion[] = [
  {
    label: "What can I ask you to do?",
    message: "What can I ask you to do?",
    icon: Lightbulb,
  },
  {
    label: "Java/Spring Boot projects",
    message: "Any Project or work related to Java, Spring Boot?",
    icon: Target,
  },
  {
    label: "List certificates",
    message: "list all certificates achived by him?",
    icon: MessageCircle,
  },
];
