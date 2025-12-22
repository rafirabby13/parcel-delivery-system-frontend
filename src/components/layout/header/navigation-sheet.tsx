import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { NavMenu } from "@/components/layout/header/nav-menu";
import Logo from "@/components/brand/Logo";

export const NavigationSheet = ({ navigationLinks }: { navigationLinks: Array<{ label: string; href: string }> }) => {
  return (
    <Sheet >
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild >
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3 bg-primary/90 w-fit">
        <Logo />
        <NavMenu  navigationLinks={navigationLinks} orientation="vertical" className="mt-6 [&>div]:h-full " />
      </SheetContent>
    </Sheet>
  );
};
