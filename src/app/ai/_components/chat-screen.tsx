"use client";

import { useState } from "react";
import BlankScreen from "./blank-screen";
import ChatMessage from "./chat-message";
import ChatPrompt from "./chat-prompt";
import { Message } from "@/types/chat.types";

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen w-full flex justify-center items-center relative flex-col py-5 md:py-10 lg:py-10 gap-5">
      {/* <NavbarDemo /> */}
      <div className=" absolute h-full w-full blur-lg bg-[url('/bg-design.svg')] -z-10" />

      {messages.length === 0 ? (
        <BlankScreen />
      ) : (
        <ChatMessage messages={messages} loading={loading} />
      )}
      <ChatPrompt
        loading={loading}
        setLoading={setLoading}
        messages={messages}
        isFirst={messages.length === 0}
        setMessages={setMessages}
      />
    </div>
  );
};

export default ChatScreen;
