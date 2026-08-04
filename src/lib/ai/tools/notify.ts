import { tool } from "ai";
import { Resend } from "resend";
import { z } from "zod";

import { siteConfig } from "@/lib/seo";

/**
 * The Python agent pushed these notifications over Pushover. This site already
 * sends its contact form through Resend, so the assistant reuses that channel —
 * and falls back to a server log when Resend isn't configured, so a missing key
 * never breaks a conversation.
 */
const deliver = async (subject: string, lines: string[]) => {
  const body = lines.filter(Boolean).join("\n");
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[assistant] ${subject}\n${body}`);
    return { delivered: false as const, reason: "email-not-configured" };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.RESEND_TO_EMAIL ?? siteConfig.email],
      subject,
      text: body,
    });

    if (error) {
      console.error("[assistant] notification failed:", error);
      return { delivered: false as const, reason: "send-failed" };
    }

    return { delivered: true as const };
  } catch (error) {
    console.error("[assistant] notification failed:", error);
    return { delivered: false as const, reason: "send-failed" };
  }
};

export const recordContactRequest = tool({
  description:
    "Record that a visitor wants to get in touch with Hitesh. Call this once as soon as they share an email address or ask him to reach out.",
  inputSchema: z.object({
    email: z.string().describe("The visitor's email address."),
    name: z.string().optional().describe("Their name, if they gave one."),
    notes: z
      .string()
      .optional()
      .describe(
        "Why they're reaching out — role, company, project, or whatever context came up in the chat.",
      ),
  }),
  execute: async ({ email, name, notes }) => {
    const result = await deliver(
      `Portfolio assistant: ${name ?? "someone"} wants to connect`,
      [
        `Name:  ${name ?? "not provided"}`,
        `Email: ${email}`,
        `Notes: ${notes ?? "not provided"}`,
      ],
    );

    return {
      recorded: true as const,
      ...result,
      message:
        "Contact details passed to Hitesh. Confirm to the visitor that he'll follow up by email.",
    };
  },
});

export const recordUnansweredQuestion = tool({
  description:
    "Log a question about Hitesh that the portfolio data couldn't answer, so he can fill the gap. Call this before telling a visitor you don't know.",
  inputSchema: z.object({
    question: z.string().describe("The question, as the visitor asked it."),
    context: z
      .string()
      .optional()
      .describe("What you did look at, and why it fell short."),
  }),
  execute: async ({ question, context }) => {
    const result = await deliver("Portfolio assistant: unanswered question", [
      `Question: ${question}`,
      context ? `Context:  ${context}` : "",
    ]);

    return {
      recorded: true as const,
      ...result,
      message:
        "Question logged. Tell the visitor you've passed it to Hitesh, and point them at the contact page if they want a direct answer.",
    };
  },
});
