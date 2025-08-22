import About from "@/pages/About";
import type { RouteItem } from "@/types/route.type";
import { History, LayoutDashboard } from "lucide-react";

export const AdminRoutes: RouteItem[] = [
    {
      title: "Dashboard",
      url: "hello",
      icon: LayoutDashboard,
      items: [
        {
          title: "History",
          url: "hello",
          icon: History,
          Component: About
        },
      ],
    }
  ]