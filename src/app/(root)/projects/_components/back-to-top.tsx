"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Scroll-position dial for a long list: the ring shows how far down the page
 * you are, and clicking it returns to the top. Anchored bottom-left so it never
 * collides with the chat widget bottom-right.
 */
const BackToTop = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      setProgress(scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0);
      setVisible(scrolled > 600);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        "group fixed bottom-5 left-5 z-40 flex size-11 cursor-pointer items-center justify-center rounded-full border border-gray-200/80 bg-white/90 shadow-lg shadow-slate-900/10 backdrop-blur transition-all duration-300 hover:border-[#9b4819]/30 hover:text-[#9b4819] sm:bottom-6 sm:left-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg
        viewBox="0 0 40 40"
        className="absolute inset-0 size-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-200"
        />
        <circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="#9b4819"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp
        size={16}
        className="relative text-gray-500 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-[#9b4819]"
      />
    </button>
  );
};

export default BackToTop;
