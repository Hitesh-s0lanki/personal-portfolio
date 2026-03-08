"use client";

import { GenerateAvatar } from "@/components/generate-avatar";
import { Button } from "@/components/ui/button";
import { useNavigationSheet } from "@/hooks/use-navigation-sheet";
import { cn } from "@/lib/utils";
import { Menu, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { onOpen: onOpenNavigation } = useNavigationSheet();

  const navItems = [
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <div className=" w-full p-4 md:px-10 lg:px-40 flex justify-end md:justify-between lg:justify-between items-center shadow-sm bg-transparent">
      {/* Logo Avatar */}
      <Link href="/" className="hidden md:flex items-center gap-2 group">
        <GenerateAvatar
          seed="Hitesh Solanki"
          variant="initials"
          className="size-9"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-wide">
            Hitesh Solanki
          </span>
          <span className="text-xs text-muted-foreground">
            Software Engineer & Builder
          </span>
        </div>
      </Link>

      <div className=" hidden text-[15px] md:flex lg:flex gap-4 font-semibold items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              " hover:text-[#9b4819] hover-underline-animation center transition-all inline-block px-2",
              pathname === item.path && "text-[#9b4819] link-active",
            )}
          >
            <span className="inline-flex items-center gap-2">{item.name}</span>
          </Link>
        ))}

        <Button
          variant={"outline"}
          className="rounded-full text-black border-black"
        >
          <Link
            href="https://www.linkedin.com/in/hitesh-s0lanki/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm"
          >
            Let&apos;s Connect
            <Image
              src="/social/linkedin.svg"
              alt="LinkedIn"
              height={20}
              width={20}
              className="transition-opacity"
            />
          </Link>
        </Button>
        <Button
          asChild
          className="rounded-full bg-gradient-to-r from-[#f97316] to-[#9b4819] text-white hover:from-[#ea580c] hover:to-[#7c3a14] border-0 shadow-md"
        >
          <Link
            href="/ai"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Sparkles className="size-4" aria-hidden />
            Assistant
          </Link>
        </Button>
      </div>

      <div className=" w-full flex md:hidden lg:hidden bg-background hover:bg-neutral-100 hover:text-neutral-900 p-1 rounded-sm justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <GenerateAvatar
              seed="Hitesh Solanki"
              variant="initials"
              className="size-9"
            />
          </Link>
          <Link
            href="/ai"
            aria-label="Personal Assistant"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#f97316] to-[#9b4819] text-white shadow-md transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-4" />
          </Link>
        </div>

        <Menu
          className="size-8 cursor-pointer"
          onClick={onOpenNavigation}
          aria-label="Open menu"
        />
      </div>
    </div>
  );
};

export default Navbar;
