"use client";

import { Database } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const ANNOUNCEMENT_KEY = "portfolio-project-announcement:klyro:v2";

const NewProjectAnnouncement = () => {
  useEffect(() => {
    try {
      if (window.localStorage.getItem(ANNOUNCEMENT_KEY)) return;

      // Record the impression when it is shown so a refresh cannot show it twice.
      window.localStorage.setItem(ANNOUNCEMENT_KEY, "seen");
    } catch {
      // Storage can be unavailable in privacy-restricted browsers. The toast
      // still appears for this page view without preventing the site from loading.
    }

    toast("Meet Klyro", {
      id: ANNOUNCEMENT_KEY,
      description:
        "A Redis-compatible in-memory database built in Rust, with vector and hybrid retrieval.",
      icon: <Database className="size-4 text-[#9b4819]" aria-hidden="true" />,
      action: {
        label: "Explore",
        onClick: () => window.location.assign("/projects/klyro"),
      },
      position: "top-right",
      duration: 12_000,
      closeButton: true,
      classNames: {
        toast: "border-[#d8c6b7]! bg-[#fbfaf7]!",
        title: "text-[#1c1c1c]!",
        description: "text-[#5f5b55]!",
        actionButton: "bg-[#9b4819]! text-white! hover:bg-[#7a3914]!",
      },
    });
  }, []);

  return null;
};

export default NewProjectAnnouncement;
