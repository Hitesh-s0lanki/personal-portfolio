"use client";

import { sendGAEvent } from "@next/third-parties/google";

type AnalyticsValue = string | number | boolean;

/** Send only non-identifying interaction context to the existing GA4 tag. */
export function trackEvent(
  name: string,
  parameters: Record<string, AnalyticsValue> = {},
) {
  if (typeof window === "undefined" || !window.dataLayer) return;

  sendGAEvent("event", name, parameters);
}
