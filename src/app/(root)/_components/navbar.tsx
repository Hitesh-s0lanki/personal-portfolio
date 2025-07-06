"use client";

import { useNavigationSheet } from "@/hooks/use-navigation-sheet";
import { cn } from "@/lib/utils";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { onOpen: onOpenNavigation } = useNavigationSheet();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Experience", path: "/#experience" },
    { name: "Certificates", path: "/#certificates" },
    { name: "Ask Me", path: "/ai", icon: <Sparkles className="size-4" /> },
  ];

  return (
    <div className=" w-full p-6 md:px-10 lg:px-40 flex justify-end md:justify-center lg:justify-center items-center shadow-sm">
      <div className=" hidden text-lg md:flex lg:flex  gap-8 font-bold items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              " hover:text-[#9b4819] hover-underline-animation center transition-all inline-block",
              pathname === item.path && "text-[#9b4819] link-active"
            )}>
            <span className="inline-flex items-center gap-2">
              {item.name} {item.icon}
            </span>
          </Link>
        ))}
      </div>

      <div
        className=" w-full flex md:hidden lg:hidden bg-background hover:bg-neutral-100 hover:text-neutral-900 p-1 rounded-sm justify-between items-center"
        onClick={onOpenNavigation}>
        <h1 className="font-bold text-lg capitalize">
          {pathname.replace("/", "")}
        </h1>
        <Menu className="size-8" />
      </div>
    </div>
  );
};

export default Navbar;
