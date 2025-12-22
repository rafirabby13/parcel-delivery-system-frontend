/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { NavMain } from "@/components/layout/sidebar/nav-main"
import { NavUser } from "@/components/layout/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getSidebarByRole } from "@/lib/routing/getSidebarByRole"
import { TeamSwitcher } from "./team-switcher"

// Define props to make it robust
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: any; // Replace 'any' with your actual User type (e.g., IUser)
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  // We use the prop 'user' instead of fetching again for better performance
  
  const role = user?.role
  
  // Memoize routes so they don't recalculate on every render
  const sidebarItems = React.useMemo(() => getSidebarByRole(role), [role]);

  const navLinks = {
    teams: [
      {
        name: "Parcelo",
        logo: React.Fragment, // Or your Logo component
        plan: "Enterprise",
      }
    ],
    navMain: sidebarItems
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navLinks.teams} />
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={navLinks.navMain} />
      </SidebarContent>
      
      <SidebarFooter>
        {/* Ensure NavUser handles the skeleton state internally or check user existence here */}
        {user && <NavUser user={{
            name: user.name,
            email: user.email,
            avatar: user.image || "", // fallback if needed
        }} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}