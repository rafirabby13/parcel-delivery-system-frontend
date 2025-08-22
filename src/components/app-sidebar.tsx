import * as React from "react"


import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useGetMeQuery } from "@/redux/feature/user/user.api"
import { Loader2 } from "lucide-react"
import { getSidebarByRole } from "@/utils/getSidebarByRole"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data, isLoading } = useGetMeQuery(undefined)
  if (isLoading) {
    return <Loader2 className="h-6 w-6 animate-spin text-primary" />;
  }
  console.log(data?.data?.user)
  const role = data?.data?.user?.role
  const navLinks = {
    user: data?.data?.user,
    teams: [
      {
        name: "Parcelo",
        plan: "Go with Parcelo",
      }
    ],
    navMain: getSidebarByRole(role)
    // navMain: userRoutes

  }
  // console.log(navLinks.navMain)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navLinks.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navLinks.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navLinks.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
