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
import { useGetMeQuery } from "@/features/admin/api/user.api"
import { getSidebarByRole } from "@/lib/routing/getSidebarByRole"
import { TeamSwitcher } from "./team-switcher"
// import { Loader } from "@/utils/Loader"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data } = useGetMeQuery(undefined)
  // if (isLoading) {
  //   return <Loader/>;
  // }
  // console.log(data?.data?.user)
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
        <TeamSwitcher teams={navLinks?.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navLinks?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navLinks?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
