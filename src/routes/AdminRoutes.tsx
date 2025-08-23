
import ManageUsers from "@/pages/admin/ManageUsers";
import ManagParcels from "@/pages/admin/ManagParcels";
import type { RouteItem } from "@/types/route.type";
import {  BlocksIcon, LayoutDashboard, Users2 } from "lucide-react";

export const AdminRoutes: RouteItem[] = [
    {
      title: "Dashboard",
      url: "hello",
      icon: LayoutDashboard,
      items: [
        {
          title: "Manage Users",
          url: "manage-users",
          icon: Users2,
          Component: ManageUsers
        },
        {
          title: "Manage Parcels",
          url: "manage-parcels",
          icon: BlocksIcon ,
          Component: ManagParcels
        },
      ],
    }
  ]