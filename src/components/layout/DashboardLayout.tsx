
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { Outlet } from "react-router"
import { ModeToggle } from "../ModeToggle"
import { useGetMeQuery, userApi } from "@/redux/feature/user/user.api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ConfirmDialogue } from "@/utils/ConfirmDialogue"
import { LogOut } from "lucide-react"
import { Loader1 } from "@/utils/Loader1"
import { useDispatch } from "react-redux"
import { authApi, useLogoutMutation } from "@/redux/feature/auth/auth.api"

export default function DashboardLayout() {

  const { data: user, isLoading } = useGetMeQuery(undefined)
  // const res = generateRoutes(SenderRoutesItems)
  // console.log(user?.data?.user)
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    // console.log("object")
    await logout().unwrap()
    dispatch(userApi.util.resetApiState())
    dispatch(authApi.util.resetApiState())
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between px-10  h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />


          </div>
          <div className="hidden lg:flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-xl border  px-3 py-1.5 hover:bg-accent transition">
                  <div className="h-7 w-7 rounded-full bg-background  border-2 border-primary flex items-center justify-center  font-semibold shadow-sm">
                    {user?.data?.user?.name?.[0]}
                  </div>

                  {/* User info */}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold leading-tight">
                      {user?.data?.user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground  max-w-[140px]">
                      {user?.data?.user?.role}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-lg shadow-lg border bg-popover p-2"
              >
                {/* Header */}
                <DropdownMenuLabel className="flex items-center gap-3 px-2 py-2">
                  {/* Avatar with initials */}
                  <div className="h-10 w-10 rounded-full bg-background border-2 border-primary flex items-center justify-center  font-semibold shadow-sm">
                    {user?.data?.user?.name?.[0]}
                  </div>

                  {/* User info */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">
                      {user?.data?.user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                      {user?.data?.user?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>


                <DropdownMenuSeparator />

                {/* Items */}
                <DropdownMenuItem className="px-2 py-2 cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="px-2 py-2 cursor-pointer">
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="px-2 py-2 cursor-pointer text-red-500 focus:text-red-600">
                  <ConfirmDialogue title="Sign Out" description="Are you sure you want to sign out? You’ll need to log in again to access your account."
                    onConfirm={handleLogout}>
                    <div className="flex items-center justify-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      {isLoading ? <Loader1 /> : "Sign Out"}
                    </div>

                  </ConfirmDialogue>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-muted/50 transition">
                  <span className="text-sm font-medium">{user?.data?.user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.data?.user?.role}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.data?.user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.data?.user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </header>
        <Separator className="mb-7" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
