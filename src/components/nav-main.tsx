

import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string,
      icon: LucideIcon
    }[]
  }[]
}) {

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (url: string) => currentPath.endsWith(`/${url}`);
  return (
    // <SidebarGroup>
    //   {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
    //   <SidebarMenu>
    //     {items.map((item) => (

    //       <SidebarMenuItem key={item.title}>




    //         <SidebarMenu>
    //           {item.items?.map((subItem) => (
    //             <SidebarMenuItem key={subItem.title}>
    //               <SidebarMenuButton asChild>
    //                 <Link to={subItem.url}>
    //                   <subItem.icon />
    //                   <span>{subItem.title}</span>
    //                 </Link>
    //               </SidebarMenuButton>
    //             </SidebarMenuItem>
    //           ))}
    //         </SidebarMenu>

    //       </SidebarMenuItem>

    //     ))}
    //   </SidebarMenu>
    // </SidebarGroup>
     <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title} >
            {/* <SidebarMenuButton>
              <div className="flex items-center gap-2">
                {/* <item.icon className="w-5 h-5" /> 
                <span>{item.title}</span>
              </div>
            </SidebarMenuButton> */}

            <SidebarMenu>
              {item.items?.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={subItem.url}
                      className={`flex items-center gap-2 px-3 py-4 rounded-sm transition-all duration-200 ${
                        isActive(subItem.url)
                          ? "bg-primary text-background "
                          : "text-gray-700 hover:bg-primary dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                    >
                      <subItem.icon className="w-4 h-4" />
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
