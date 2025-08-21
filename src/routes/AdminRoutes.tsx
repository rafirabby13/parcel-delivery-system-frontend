import About from "@/pages/About";
import type { RouteItem } from "@/types/route.type";
import { History, LayoutDashboard } from "lucide-react";

export const adminRoutes: RouteItem[] = [
    {
      title: "Dashboard",
      url: "/hello",
      icon: LayoutDashboard,
      items: [
        {
          title: "History",
          url: "/dashboard/hello",
          icon: History,
          component: About
        },
      ],
    }
  ]