
import ManageUsers from "@/pages/admin/ManageUsers";
import type { RouteItem } from "@/types/route.type";
import {  LayoutDashboard, Users2 } from "lucide-react";

export const AdminRoutes: RouteItem[] = [
    {
      title: "Dashboard",
      url: "hello",
      icon: LayoutDashboard,
      items: [
        {
          title: "Manage Users",
          url: "hello",
          icon: Users2,
          Component: ManageUsers
        },
      ],
    }
  ]