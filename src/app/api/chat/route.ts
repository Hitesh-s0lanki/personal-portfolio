import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  validateUIMessages,
} from "ai";
import { NextResponse } from "next/server";

import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { buildTools, type PortfolioUIMessage } from "@/lib/ai/tools";
import { hasWebAccess } from "@/lib/ai/tools/web";

/** Tool loops plus streaming can outrun the default serverless window. */
export const maxDuration = 60;

/** Reasoning models are the default; override per deployment if needed. */
const MODEL_ID = process.env.OPENAI_CHAT_MODEL ?? "gpt-5.4-mini";

/** How much history reaches the model — enough for context, capped for cost. */
const MAX_HISTORY = 24;

/** Tool call budget for a single turn, so a confused loop can't run away. */
const MAX_STEPS = 8;

const isReasoningModel = /^(gpt-5|o[134])/.test(MODEL_ID);

// Best-effort throttle. Serverless instances don't share it, but it still
// blunts the obvious "hold down enter" abuse of a public, paid endpoint.
const RATE_LIMIT = { windowMs: 60_000, max: 20 };
const hits = new Map<string, { count: number; resetAt: number }>();

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    if (hits.size > 5_000) {
      for (const [id, value] of hits) if (now > value.resetAt) hits.delete(id);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
};

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "The assistant is not configured — OPENAI_API_KEY is missing." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Give it a minute and try again." },
      { status: 429 },
    );
  }

  let messages: PortfolioUIMessage[];
  try {
    const body = await request.json();
    messages = await validateUIMessages<PortfolioUIMessage>({
      messages: body?.messages ?? [],
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid chat payload." },
      { status: 400 },
    );
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const result = streamText({
    model: openai(MODEL_ID),
    system: buildSystemPrompt({ webAccess: hasWebAccess() }),
    messages: await convertToModelMessages(messages.slice(-MAX_HISTORY)),
    tools: buildTools(),
    stopWhen: stepCountIs(MAX_STEPS),
    // Visitors want an answer, not a deliberation — keep the loop snappy.
    providerOptions: isReasoningModel
      ? { openai: { reasoningEffort: "low", textVerbosity: "low" } }
      : undefined,
    onError: ({ error }) => {
      console.error("[assistant] stream error:", error);
    },
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error("[assistant] response error:", error);
      return "Something went wrong reaching the assistant. Please try again in a moment.";
    },
  });
}
