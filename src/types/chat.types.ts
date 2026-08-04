export type Message = {
  id: string;
  role: string;
  content: string;
  created?: string;
  timestamp?: Date;
  isTyping?: boolean;
  /** What the assistant is doing right now, e.g. "Searching the web". */
  activity?: string;
  /** Set when the turn failed — rendered as a warning bubble. */
  isError?: boolean;
};
