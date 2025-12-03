"use client";

import { GenerateAvatar } from "@/components/generate-avatar";
import { useNavigationSheet } from "@/hooks/use-navigation-sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { onOpen: onOpenNavigation } = useNavigationSheet();

  const navItems = [
    { name: "About", path: "/" },
    { name: "Experience", path: "/#experience" },
    { name: "Projects", path: "/#projects" },
    { name: "Chat", path: "/ai" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <div className=" w-full p-4 md:px-10 lg:px-40 flex justify-end md:justify-between lg:justify-between items-center shadow-sm">
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

      <div className=" hidden text-[15px] md:flex lg:flex  gap-8 font-semibold items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              " hover:text-[#9b4819] hover-underline-animation center transition-all inline-block",
              pathname === item.path && "text-[#9b4819] link-active"
            )}
          >
            <span className="inline-flex items-center gap-2">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className=" w-full flex md:hidden lg:hidden bg-background hover:bg-neutral-100 hover:text-neutral-900 p-1 rounded-sm justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <GenerateAvatar
            seed="Hitesh Solanki"
            variant="initials"
            className="size-9"
          />
        </Link>

        <Menu className="size-8" onClick={onOpenNavigation} />
      </div>
    </div>
  );
};

export default Navbar;
