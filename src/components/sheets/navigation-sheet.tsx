import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useNavigationSheet } from "@/hooks/use-navigation-sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavigationSheet = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Experience", path: "/#experience" },
    { name: "Certificates", path: "/#certificates" },
  ];

  const { isOpen, onClose } = useNavigationSheet();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full h-full">
        <SheetTitle></SheetTitle>
        <div className=" w-full h-full  flex flex-col justify-between">
          <div>
            <div className=" mt-5 flex py-5 px-5 flex-col gap-2 text-2xl  p-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    " hover:text-[#9b4819]  center transition-all",
                    pathname === item.path && "text-[#9b4819]"
                  )}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
