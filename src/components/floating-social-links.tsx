"use client";

import {
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconChevronDown,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/seo";

const links = [
  {
    label: "GitHub",
    href: siteConfig.socials.github,
    Icon: IconBrandGithub,
    colors:
      "bg-[#24292f] text-white shadow-[0_3px_12px_rgba(36,41,47,0.25)] hover:bg-[#161b22]",
  },
  {
    label: "LeetCode",
    href: siteConfig.socials.leetcode,
    Icon: IconBrandLeetcode,
    colors:
      "bg-[#ffa116] text-[#1a1a1a] shadow-[0_3px_12px_rgba(255,161,22,0.3)] hover:bg-[#ffb13d]",
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    Icon: IconBrandLinkedin,
    colors:
      "bg-[#0a66c2] text-white shadow-[0_3px_12px_rgba(10,102,194,0.28)] hover:bg-[#004182]",
  },
];

const linkClasses =
  "flex size-11 shrink-0 items-center justify-center rounded-full transition-[background-color,box-shadow,scale] duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b4819] active:scale-96";

function QuickLinks({
  tabIndex,
  showIdeaLabel = false,
}: {
  tabIndex?: number;
  showIdeaLabel?: boolean;
}) {
  return (
    <>
      {links.map(({ label, href, Icon, colors }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tabIndex}
          aria-label={`Visit my ${label} profile (opens in a new tab)`}
          title={label}
          className={`${linkClasses} ${colors}`}
        >
          <Icon size={22} stroke={1.8} aria-hidden="true" />
        </a>
      ))}
      <Link
        href="/idea/chalzi"
        tabIndex={tabIndex}
        aria-label="Chalzi the idea in flight"
        title="Chalzi the idea in flight"
        className={`${linkClasses} relative shadow-[0_3px_12px_rgba(47,53,91,0.28)]`}
      >
        <Image
          src="/chalzi.png"
          alt=""
          width={44}
          height={44}
          className="rounded-full"
        />
        {showIdeaLabel && (
          <span className="pointer-events-none absolute top-1/2 left-[calc(100%+0.75rem)] hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-[#2f355b] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_3px_12px_rgba(47,53,91,0.2)] sm:block">
            <span
              className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rotate-45 bg-[#2f355b]"
              aria-hidden="true"
            />
            <span className="relative">Chalzi the idea in flight</span>
          </span>
        )}
      </Link>
    </>
  );
}

export default function FloatingSocialLinks() {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!expanded) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setExpanded(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [expanded]);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Quick links"
        className="fixed bottom-5 left-5 z-40 flex flex-col-reverse items-start sm:hidden"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setExpanded(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setExpanded(false);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setExpanded(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setExpanded(false);
            navRef.current?.querySelector("button")?.focus();
          }
        }}
      >
        <button
          type="button"
          aria-label={expanded ? "Hide quick links" : "Show quick links"}
          aria-expanded={expanded}
          onClick={(event) => {
            if ((event.nativeEvent as PointerEvent).pointerType !== "mouse") {
              setExpanded((value) => !value);
            }
          }}
          className="relative isolate flex size-11 items-center justify-center rounded-full bg-[#24292f] text-white shadow-[0_3px_12px_rgba(36,41,47,0.28)] transition-[scale,box-shadow] duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9b4819] active:scale-96"
        >
          {!expanded && (
            <>
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 -translate-y-2 rounded-full bg-[#2f355b]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 -translate-x-1.5 -translate-y-1.5 rounded-full bg-[#0a66c2]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 -translate-x-1 -translate-y-1 rounded-full bg-[#ffa116]"
              />
            </>
          )}
          {expanded ? (
            <IconChevronDown size={22} stroke={1.8} aria-hidden="true" />
          ) : (
            <IconBrandGithub size={22} stroke={1.8} aria-hidden="true" />
          )}
        </button>

        <div
          aria-hidden={!expanded}
          className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
        >
          <div
            className={`flex min-h-0 flex-col gap-2.5 pb-2.5 ${expanded ? "overflow-visible" : "overflow-hidden"}`}
          >
            <QuickLinks tabIndex={expanded ? 0 : -1} />
          </div>
        </div>
      </nav>
      <nav
        aria-label="Quick links"
        className="fixed bottom-6 left-6 z-40 hidden flex-col gap-2.5 sm:flex"
      >
        <QuickLinks showIdeaLabel />
      </nav>
    </>
  );
}
