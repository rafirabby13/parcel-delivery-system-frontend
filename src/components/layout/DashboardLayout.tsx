import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";
import { Outlet, useLocation } from "react-router";
import { useGetMeQuery, userApi } from "@/features/admin/api/user.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ConfirmDialogue } from "@/components/shared/interactions/ConfirmDialogue";
import { LogOut, User, Settings, Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { authApi, useLogoutMutation } from "@/features/auth/api/auth.api";
import { ModeToggle } from "../shared/interactions/ModeToggle";
import { Loader } from "../shared/feedback/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardLayout() {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  // Robust Logout Handler
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // Reset API state to clear cache immediately
      dispatch(userApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Generate dynamic breadcrumbs based on path
  const pathSegments = location.pathname.split("/").filter((p) => p !== "");

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center"><Loader /></div>;

  return (
    <SidebarProvider>
      {/* Pass user data to Sidebar to avoid double-fetching if needed */}
      <AppSidebar user={user?.data?.user} />
      
      <SidebarInset>
        {/* HIGH CLASS: Sticky, Blurry Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          
          {/* Left Side: Trigger & Breadcrumbs */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => (
                  <div key={segment} className="flex items-center">
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      {index === pathSegments.length - 1 ? (
                        <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href="#" className="capitalize hidden md:block">
                          {segment}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            
            {/* Minimalist User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:bg-accent transition ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <div className="font-semibold text-sm">
                    {user?.data?.user?.name?.[0]?.toUpperCase()}
                  </div>
                  {/* Online Indicator */}
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.data?.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.data?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                {/* Logout with Dialogue */}
                <DropdownMenuItem asChild className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20 cursor-pointer">
                  <ConfirmDialogue
                    title="Sign Out"
                    description="Are you sure you want to sign out?"
                    onConfirm={handleLogout}
                  >
                    <div className="flex w-full items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </div>
                  </ConfirmDialogue>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}