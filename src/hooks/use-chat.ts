"use client";

import { useChat as useAiChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart, getToolName } from "ai";
import { useCallback, useMemo, useRef } from "react";

import { toolLabel } from "@/lib/ai/tool-labels";
import type { PortfolioUIMessage } from "@/lib/ai/tools";
import type { Message } from "@/types/chat.types";

/**
 * Chat state for the floating assistant widget.
 *
 * Wraps the AI SDK's `useChat` — which streams from `/api/chat` and models a
 * message as a list of parts — and flattens it into the simpler `Message` shape
 * the chat UI renders, surfacing tool calls as a one-line activity string.
 */
const FALLBACK_ERROR =
  "Something went wrong reaching the assistant. Please try again in a moment.";

/** The route answers failures with `{ error }` JSON; unwrap it for the bubble. */
const describeError = (error: Error) => {
  try {
    const parsed = JSON.parse(error.message);
    if (typeof parsed?.error === "string") return parsed.error;
  } catch {
    // Stream-level errors arrive as plain text.
  }
  return error.message || FALLBACK_ERROR;
};

export const useChat = () => {
  const {
    messages: uiMessages,
    sendMessage: send,
    status,
    setMessages,
    stop,
    error,
    clearError,
  } = useAiChat<PortfolioUIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (cause) => console.error("Chat error:", cause),
  });

  // UIMessages carry no timestamp, so stamp each one the first time we see it.
  const timestamps = useRef(new Map<string, Date>());

  const loading = status === "submitted" || status === "streaming";

  const messages = useMemo<Message[]>(() => {
    const flattened: Message[] = uiMessages.map((message) => {
      let timestamp = timestamps.current.get(message.id);
      if (!timestamp) {
        timestamp = new Date();
        timestamps.current.set(message.id, timestamp);
      }

      const content = message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");

      // Whatever tool ran last, unless it already produced its output — that's
      // the one worth naming while the visitor waits.
      const pending = message.parts.findLast(
        (part) =>
          isToolUIPart(part) &&
          part.state !== "output-available" &&
          part.state !== "output-error",
      );

      return {
        id: message.id,
        role: message.role,
        content,
        timestamp,
        created: timestamp.toISOString(),
        activity:
          pending && isToolUIPart(pending)
            ? toolLabel(getToolName(pending))
            : undefined,
      };
    });

    const last = flattened.at(-1);

    if (error) {
      flattened.push({
        id: `${last?.id ?? "chat"}-error`,
        role: "assistant",
        content: describeError(error),
        isError: true,
      });
      return flattened;
    }

    // Between send and first token there is no assistant message yet — show the
    // thinking bubble so the conversation never looks stalled.
    if (loading && last?.role === "user") {
      flattened.push({
        id: `${last.id}-pending`,
        role: "assistant",
        content: "",
        isTyping: true,
      });
      return flattened;
    }

    if (loading && last?.role === "assistant") {
      last.isTyping = true;
    }

    return flattened;
  }, [uiMessages, loading, error]);

  const sendMessage = useCallback(
    (prompt: string) => {
      const text = prompt.trim();
      if (!text || loading) return;
      if (error) clearError();
      send({ text });
    },
    [send, loading, error, clearError],
  );

  const reset = useCallback(() => {
    if (loading) stop();
    if (error) clearError();
    timestamps.current.clear();
    setMessages([]);
  }, [loading, stop, error, clearError, setMessages]);

  return { messages, loading, sendMessage, reset, stop };
};
