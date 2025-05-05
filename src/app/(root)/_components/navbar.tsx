"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Experience", path: "/#experience" },
    { name: "Certificates", path: "/#certificates" },
  ];

  return (
    <div className=" w-full p-6 md:px-10 lg:px-40 flex justify-center items-center shadow-sm">
      <div className=" hidden text-lg md:flex lg:flex  gap-8 font-bold items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              " hover:text-[#9b4819] hover-underline-animation center transition-all",
              pathname === item.path && "text-[#9b4819] link-active"
            )}>
            {item.name}
          </Link>
        ))}
      </div>

      <div
        className="  flex md:hidden lg:hidden bg-background hover:bg-neutral-100 hover:text-neutral-900 p-1 rounded-sm"
        // onClick={onOpenNavigation}
      >
        <Menu className="size-8" />
      </div>
    </div>
  );
};

export default Navbar;
