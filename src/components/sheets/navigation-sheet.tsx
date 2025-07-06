import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useNavigationSheet } from "@/hooks/use-navigation-sheet";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

const NavigationSheet = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Experience", path: "/#experience" },
    { name: "Certificates", path: "/#certificates" },
    { name: "Ask Me", path: "/ai", icon: <Sparkles className="size-5" /> },
  ];

  const { isOpen, onClose } = useNavigationSheet();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-72 h-full">
        <SheetTitle></SheetTitle>
        <div className=" w-full h-full  flex flex-col justify-between">
          <div>
            <div className=" mt-5 flex py-5 px-5 flex-col gap-2 text-2xl  p-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path);
                    onClose();
                  }}
                  variant="ghost"
                  className={cn(
                    " hover:text-[#9b4819]  center transition-all",
                    pathname === item.path && "text-[#9b4819]"
                  )}>
                  <span className="inline-flex items-center gap-2">
                    {item.name} {item.icon}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
