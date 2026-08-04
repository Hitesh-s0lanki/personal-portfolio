"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

/**
 * Apple-style cards carousel (adapted from ui.aceternity.com). A horizontally
 * scrolling rail of image cards, restyled to the portfolio's palette and wired
 * to lucide + motion. Every card links to its own page, so the rail is plain
 * navigation — no modals, no scroll locking.
 */

export type CarouselCard = {
  src: string;
  title: string;
  /** Small label above the title, e.g. "01 — AI reading companion". */
  category: string;
  /** Corner badge, e.g. "New". */
  badge?: string;
  href: string;
};

/**
 * Cards are landscape (~3:2) because every project image is a wide app
 * screenshot — a portrait card would crop the middle out of all of them.
 * Widths + gap, so the arrows scroll exactly one card.
 */
const CARD_STEP = { mobile: 280 + 16, desktop: 480 + 16 };

export function Carousel({
  items,
  initialScroll = 0,
}: {
  items: React.ReactElement[];
  initialScroll?: number;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft = initialScroll;
    checkScrollability();
  }, [initialScroll]);

  const scrollBy = (direction: 1 | -1) => {
    const step =
      typeof window !== "undefined" && window.innerWidth < 768
        ? CARD_STEP.mobile
        : CARD_STEP.desktop;
    carouselRef.current?.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <div
        className="scrollbar-hide flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 md:py-8"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {/* Right-edge fade, so cards dissolve into the section background */}
        <div className="pointer-events-none absolute right-0 z-20 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        {/* Left inset matches the max-w-6xl (72rem) page container, so the
            first card lines up with the section heading above it. */}
        <div className="flex flex-row justify-start gap-4 pl-[max(1.5rem,calc((100%-72rem)/2+1.5rem))] sm:pl-[max(2.5rem,calc((100%-72rem)/2+2.5rem))]">
          {items.map((item, index) => (
            <motion.div
              key={`card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.5,
                delay: 0.12 * index,
                ease: "easeOut",
              }}
              className="rounded-3xl last:pr-6 sm:last:pr-10"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-2 mr-6 flex justify-end gap-2 sm:mr-10">
        <button
          type="button"
          aria-label="Scroll left"
          className="relative z-40 flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#9b4819] hover:bg-[#9b4819] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-600"
          onClick={() => scrollBy(-1)}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          className="relative z-40 flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#9b4819] hover:bg-[#9b4819] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-600"
          onClick={() => scrollBy(1)}
          disabled={!canScrollRight}
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

export function Card({ card, priority }: { card: CarouselCard; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={card.href}
      className="group relative z-10 flex h-48 w-[17.5rem] flex-col items-start justify-start overflow-hidden rounded-3xl bg-slate-100 md:h-[18rem] md:w-[30rem]"
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        priority={priority}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 768px) 280px, 480px"
        className={cn(
          "z-10 object-cover object-top transition-all duration-700 ease-out group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Scrims: top for the label, bottom for the hover pill */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2/3 bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
      <span className="pointer-events-none absolute inset-0 z-20 bg-black/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />

      {card.badge && (
        <span className="absolute top-5 right-5 z-30 inline-flex rounded-full bg-[#9b4819] px-2.5 py-1 text-[0.6rem] font-semibold tracking-wide text-white uppercase md:top-6 md:right-6">
          {card.badge}
        </span>
      )}

      <div className="relative z-30 p-5 md:p-6">
        <p className="text-left text-[0.65rem] font-medium tracking-[0.16em] text-white/85 uppercase md:text-[0.7rem] md:tracking-[0.2em]">
          {card.category}
        </p>
        <p className="mt-1.5 max-w-[92%] text-left text-lg font-medium tracking-tight text-balance text-white md:text-2xl">
          {card.title}
        </p>
      </div>

      {/* The whole card is the hit area; the pill is the affordance — revealed
          on hover, always shown on touch, where there is no hover to reveal it. */}
      <span className="absolute bottom-5 left-5 z-30 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#25221f] transition-all duration-300 ease-out md:bottom-6 md:left-6 md:translate-y-2 md:px-5 md:py-2.5 md:opacity-0 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        Explore
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
