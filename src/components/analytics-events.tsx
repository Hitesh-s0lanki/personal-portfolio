"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Captures useful link actions across server and client components. */
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      if (href.startsWith("mailto:")) {
        trackEvent("contact_link_click", { contact_method: "email" });
        return;
      }
      if (href.startsWith("tel:")) {
        trackEvent("contact_link_click", { contact_method: "phone" });
        return;
      }

      let destination: URL;
      try {
        destination = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (destination.origin === window.location.origin) {
        if (/\.pdf$/i.test(destination.pathname)) {
          trackEvent("resume_download", { file_name: destination.pathname.split("/").pop() || "resume.pdf" });
        } else if (/^\/projects\/[^/]+\/?$/.test(destination.pathname)) {
          trackEvent("project_open", {
            project_id: destination.pathname.split("/")[2],
            source_page: window.location.pathname,
          });
        }
        return;
      }

      if (destination.protocol !== "https:" && destination.protocol !== "http:") return;
      trackEvent("external_link_click", {
        destination_host: destination.hostname,
        source_page: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
