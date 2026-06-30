"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronDown, Hammer, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {
    const el = document.querySelector("#experience");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full flex flex-col gap-6 justify-center items-center py-24 md:py-32 lg:pt-48 fadeInDown-animation">
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
        <UserRound className="h-3 w-3" />
        <span>About Me</span>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col justify-center items-center gap-6 text-center px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          Hello, I am{" "}
          <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
            Hitesh Solanki
          </span>
          !
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl leading-relaxed">
          I believe in building meaningful products through clarity, ownership,
          and strong execution. I love breaking down complex challenges,
          designing simple solutions, and using technology as a multiplier for
          business growth.
        </p>

        {/* CTA Button */}
        <Button size="lg" variant={"link"} onClick={handleScroll}>
          Explore My Work
          <ChevronDown className="h-5 w-5" />
        </Button>

        <Link
          href="/projects/relivo"
          className="group mt-2 flex w-full max-w-md items-center gap-3 overflow-hidden rounded-lg border border-orange-200/80 bg-white/90 p-2 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9b4819]/40 hover:shadow-xl hover:shadow-[#9b4819]/10 sm:p-3"
        >
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-[#fbf4e9] sm:h-16 sm:w-24">
            <Image
              src="/projects/relivo/how.png"
              alt="Relivo ongoing work preview"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="128px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9b4819]">
              <Hammer className="h-3 w-3" />
              Ongoing
            </div>
            <h2 className="truncate text-sm font-semibold text-gray-950 sm:text-base">
              Building Relivo
            </h2>
            <p className="line-clamp-1 text-xs leading-5 text-gray-500 sm:text-sm">
              Agent orchestration for workflows, chat, API, memory, and
              observability.
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9b4819] text-white transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
