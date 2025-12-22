

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { ComponentProps } from "react";
import { NavLink } from "react-router";

interface NavMenuProps extends ComponentProps<typeof NavigationMenu> {
  navigationLinks: Array<{ href: string; label: string }>;
}

export const NavMenu = (props: NavMenuProps) => (

  <NavigationMenu {...props}>
   
    <NavigationMenuList className="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      {props.navigationLinks.map((link) => (
        <NavigationMenuItem key={link.href}>
          <NavLink
            to={link.href}
            end={link.href === "/"}
            className={({ isActive }) =>
              isActive
                ? "inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b-2 border-secondary text-secondary hover:bg-secondary/80 h-10 px-4 py-2"
                : "inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-background"
            }
          >
            {link.label}
          </NavLink>
        </NavigationMenuItem>
      ))}

    </NavigationMenuList>
  </NavigationMenu>
);
